import fs from 'fs';
import path from 'path';
import { stringify } from 'javascript-stringify';
import { getModuleDir } from './utils.js';
/**
 * oh-my-live2d 的vite插件
 * 详见: https://oml2d.com
 * @param options
 * @returns
 */
export const oml2d = (options = {}) => {
  return {
    name: 'vite-plugin-oh-my-live2d',
    enforce: 'pre',
    transformIndexHtml() {
      const oml2dModuleDir = getModuleDir('oh-my-live2d');
      const res = fs.readFileSync(path.join(oml2dModuleDir, 'dist/index.min.js'));
      return [
        {
          tag: 'script',
          attrs: {
            type: 'text/javascript'
          },
          children: res.toString(),
          injectTo: 'body-prepend'
        },
        {
          tag: 'script',
          children: `OML2D.loadOml2d(${stringify(options)});`,
          attrs: {
            type: 'text/javascript'
          },
          injectTo: 'body-prepend'
        }
      ];
    }
  };
};
