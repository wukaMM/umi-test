import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  "define": {
    "process.env.TEST": 2,
    "USE_COMMA": 2,
  },
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}

export default config;
