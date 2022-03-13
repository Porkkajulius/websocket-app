module.exports = function (api) {
    api.cache(true);
  
    const presets = [
      '@babel/react',
      ['@babel/preset-env', { modules: false }],
      ['@babel/typescript'],
    ];
  
    const plugins = [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      [
        'babel-plugin-styled-components',
        {
          ssr: false,
          displayName: true,
        },
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          absoluteRuntime: false,
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
    ];
  
    return {
      presets,
      plugins,
    };
  };
  