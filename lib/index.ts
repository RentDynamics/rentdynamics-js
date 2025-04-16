export class Client {
  private helpers: ClientHelpers;
  private options: ClientOptions;

  constructor(options: ClientOptions) {
    this.options = options;
    this.helpers = new ClientHelpers(options);
  }

  public get(endpoint: string, parameters: object = {}) {
    let queryParams = this.helpers.stringifyParameters(parameters);
    let options: RequestInit = {};
    options.method = 'GET';
    options.headers = this.helpers.getHeaders(endpoint + queryParams);
    let fullUrl = this.helpers.getBaseUrl() + endpoint + queryParams;
    return fetch(fullUrl.replace(/\|/g, '%7C'), options);
  }

  public put(endpoint: string, payload: object) {
    let options: RequestInit = {};
    options.method = 'PUT';
    options.headers = this.helpers.getHeaders(endpoint, payload);
    options.body = JSON.stringify(payload);
    let fullUrl = this.helpers.getBaseUrl() + endpoint;
    return fetch(fullUrl, options);
  }

  public post(endpoint: string, payload: object) {
    let options: RequestInit = {};
    options.method = 'POST';
    options.headers = this.helpers.getHeaders(endpoint, payload);
    options.body = JSON.stringify(payload);
    let fullUrl = this.helpers.getBaseUrl() + endpoint;
    return fetch(fullUrl, options);
  }

  public delete(endpoint: string) {
    let options: RequestInit = {};
    options.method = 'DELETE';
    options.headers = this.helpers.getHeaders(endpoint);
    let fullUrl = this.helpers.getBaseUrl() + endpoint;
    return fetch(fullUrl, options);
  }

  public async login(username: string, password: string) {
    password = await this.encryptPassword(password);
    let endpoint = '/auth/login';
    const result = await this.post(endpoint, { username, password });
    if (!result.ok) {
      return result;
    }
    this.options.authToken = await result.text();
    return result;
  }

  async encryptPassword(password: string) {
    const encodedPassword = new TextEncoder().encode(password);
    const digestedPassword = await crypto.subtle.digest('SHA-1', encodedPassword);
    return _hexDigest(digestedPassword);
  }

  public async logout() {
    let endpoint = '/auth/logout';
    const res = await this.post(endpoint, { authToken: this.options.authToken });
    this.options.authToken = undefined;
    return res;
  }
}

export class ClientOptions {
  public apiKey?: string = undefined;
  public apiSecretKey?: string = undefined;
  public authToken?: string = undefined;
  public development?: boolean = false;
  public developmentUrl?: string = undefined;
  public baseUrl?: string = undefined;
}

export class ClientHelpers {
  private options: ClientOptions;

  constructor(options: ClientOptions) {
    this.options = options;
  }

  public formatPayload(payload: any): any {
    let formattedPayload: any = {};

    if (typeof payload === undefined || payload === null) {
      formattedPayload = null;
    } else if (payload !== Object(payload)) {
      formattedPayload = payload;
    } else if (Array.isArray(payload)) {
      formattedPayload = [];

      for (let i = 0; i < payload.length; i++) {
        formattedPayload[i] = this.formatPayload(payload[i]);
      }
    } else {
      Object.keys(payload)
        .sort()
        .forEach((k: any, v: any) => {
          if (typeof payload[k] == 'object') {
            formattedPayload[k] = this.formatPayload(payload[k]);
          } else if (typeof payload[k] == 'string') {
            formattedPayload[k] = payload[k].replace(/ /g, '');
          } else {
            formattedPayload[k] = payload[k];
          }
        }, this);
    }
    return formattedPayload;
  }

  public getBaseUrl() {
    if (this.options.development && this.options.developmentUrl) {
      return this.options.developmentUrl;
    } else if (this.options.development) {
      return 'https://api-dev.rentdynamics.com';
    }
    if (this.options.baseUrl) {
      return this.options.baseUrl;
    } else {
      return 'https://api.rentdynamics.com';
    }
  }

  public getHeaders(endpoint: string, payload?: Object) {
    let headers: any = {};
    if (this.options.apiKey && this.options.apiSecretKey) {
      if (typeof payload !== 'undefined') {
        payload = this.formatPayload(payload);
      }
      let timestamp = Date.now();
      let nonce = this.getNonce(timestamp, endpoint, JSON.stringify(payload));
      if (this.options.authToken) {
        headers['Authorization'] = 'TOKEN ' + this.options.authToken;
      }
      headers['x-rd-api-key'] = this.options.apiKey;
      headers['x-rd-api-nonce'] = nonce;
      headers['x-rd-timestamp'] = timestamp.toString();
      headers['Content-Type'] = 'application/json';
      return headers;
    }
    return headers;
  }

  public async getNonce(timestamp: number, url: string, payloadStr?: string): Promise<string> {
    if (!this.options.apiSecretKey) return Promise.resolve('');
    const encodedUrl = encodeURI(url).replace(/%7[Cc]/g, '|');
    const nonceStr =
      typeof payloadStr !== 'undefined'
        ? timestamp + encodedUrl + payloadStr
        : timestamp + encodedUrl;
    const encoder = new TextEncoder();
    const key = encoder.encode(this.options.apiSecretKey);
    const data = encoder.encode(nonceStr);
    const algorithm = { name: 'HMAC', hash: 'SHA-1' };
    const hmac = await crypto.subtle.importKey('raw', key, algorithm, false, ['sign']);
    const signed = await crypto.subtle.sign(algorithm.name, hmac, data);
    return _hexDigest(signed);
  }

  public stringifyParameters(object: any): string {
    let results = [];

    if (object.filters && this.stringifyFilters(object.filters))
      results.push(`filters=${this.stringifyFilters(object.filters)}`);

    if (object.include && object.include.length)
      results.push(`include=${object.include.join(',')}`);

    if (object.exclude && object.exclude.length)
      results.push(`exclude=${object.exclude.join(',')}`);

    if (object.fields && object.fields.length) results.push(`fields=${object.fields.join(',')}`);

    if (object.orderBy) results.push(`orderBy=${object.orderBy}`);

    if (object.page) results.push(`page=${object.page}`);

    if (object.pageSize) results.push(`pageSize=${object.pageSize}`);

    if (object.distinct) results.push(`distinct=true`);

    return results.join('&') ? `?${results.join('&')}` : '';
  }

  private mapKeyValuePairs(key: string, value: any): string[] {
    let results: string[] = [];

    if (Array.isArray(value)) {
      if (value.length) results.push(`${key}__in=${value.join(',')}`);
      return results;
    }

    if (value !== null && typeof value === 'object') {
      for (var filterValKey in value) {
        let result: string[];

        result = this.mapKeyValuePairs(`${key}__${filterValKey}`, value[filterValKey]);

        if (result && result.length) results.push(result.join('|'));
      }
      return results;
    }

    if (value !== null && value !== undefined && value !== '') {
      results.push(`${key}=${value}`);
      return results;
    }

    return results;
  }

  private stringifyFilters(filter: { [key: string]: any }): string {
    let results: string[] = [];

    for (var key in filter) {
      let result: string[] = this.mapKeyValuePairs(key, filter[key]);

      if (result && result.length) results.push(result.join('|'));
    }

    return results.join('|');
  }
}

const _hexDigest = (buf: ArrayBuffer): string =>
  Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
