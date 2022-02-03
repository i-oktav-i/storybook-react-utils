import typescriptPlugin from '@rollup/plugin-typescript';
import cleaner from 'rollup-plugin-cleaner';

const config = {
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

export default config;
