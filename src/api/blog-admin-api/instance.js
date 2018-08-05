import { createAPI } from '../util';
import config from '../config';

const baseUrl = {
  mock: 'https://easy-mock.com/mock/5ab5bd911a094046dab2cada',
  dev: 'http://localhost:8080/api',
  pre: '',
  prod: 'https://www.doraro.cn/api'
}[config.env || 'mock'];

export default createAPI(baseUrl);
export { baseUrl}
