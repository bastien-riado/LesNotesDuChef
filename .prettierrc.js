module.exports = {
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  arrowParens: 'always',
  tabWidth: 2,
  singleAttributePerLine: false,
  override: [
    {
      files: '*.tsx',
      option: {
        endOfLine: 'lf',
      },
    },
  ],
};
