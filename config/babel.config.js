module.exports = function(api) {
  api.cache(true);

  const presets = [
      ["@babel/preset-env", {
          useBuiltIns: "entry", // or "entry"
          corejs: 2,
      }],
  ];
  const plugins = [
      "@babel/proposal-object-rest-spread",
      "@babel/transform-runtime"
  ];

  return {
      ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
      presets,
      plugins,
  };
};