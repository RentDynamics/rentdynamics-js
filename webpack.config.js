import PACKAGE from './package.json' assert { type: 'json' };
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: {
    [PACKAGE.version]: './dist/esm/index.js'
  },
  output: {
    filename: 'rentdynamics.[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'RentDynamics'
  }
};
