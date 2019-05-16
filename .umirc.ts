import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  "define": {
    "process.env.TEST": 1,
    "USE_COMMA": 2,
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'myapp',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts/index.tsx',
      routes: [
        {
          path: '/users',
          component: '../pages/users/page.tsx'
        },
        {
          path: '/push',
          component: '../pages/users/page.tsx'
        },
      ]
    },
  ]
}

export default config;
