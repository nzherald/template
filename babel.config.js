module.exports = function(api) {
  api.cache(true);

  const presets = [
      ["@babel/preset-env", {
          useBuiltIns: "usage",
          corejs: { version: 3, proposals: true },
          targets: "> 0.25%, not dead"
      }],
  ];
  const plugins = [
      "@babel/proposal-object-rest-spread",
      "@babel/transform-runtime",
      "@babel/plugin-proposal-optional-chaining"
  ];

  return {
      ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
      presets,
      plugins,
  };
};