import { RollupOptions } from 'rollup';
import typescriptPlugin from '@rollup/plugin-typescript';
import cleaner from 'rollup-plugin-cleaner';
import dts from 'rollup-plugin-dts';

const config: RollupOptions = {
  input:  './src/index.ts',
  output: {
    dir:                 './build',
    format:              'esm',
    sourcemap:           true,
    preserveModules:     true,
    preserveModulesRoot: './src',
  },
  external: [
    'react',
    'react/jsx-runtime',
    '@reduxjs/toolki',
    'react-redux',
    'webpack-merge',
  ],
  plugins: [
    cleaner({ targets: ['./build'] }),
    typescriptPlugin({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*'],
    }),
  ],
};

const dtsConf: RollupOptions = {
  input:  './src/index.ts',
  output: {
    dir:    './build',
    format: 'esm',
  },
  plugins: [
    dts({
      compilerOptions: {
        baseUrl: './src',
      },
    }),
  ],
};

export default [config, dtsConf];
