module.exports = {
  printWidth: 120,
  overrides: [
    {
      files: ['*.[jt]s'],
      options: {
        printWidth: 80,
        singleQuote: true,
        trailingComma: 'es5',
      },
    },
    {
      files: ['*.hbs'],
      options: {
        parser: 'glimmer',
      },
    },
  ],
};
