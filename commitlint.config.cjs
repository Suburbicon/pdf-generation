module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      /**
       * @see https://github.com/conventional-changelog/commitlint/issues/1016#issuecomment-842988864
       * Regexp below can be divided into two parts
       * 1) (?:\w*-\w*:\s) - optional issue id
       * 2) (\w*)(?:\((.*)\))?: (.*) - default regexp from https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#headerpattern
       */
      headerPattern: /^(?:\w*-\w*:\s)?(\w*)(?:\((.*)\))?: (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
      issuePrefixes: ['^[A-Z]*-[0-9]*'],
    },
  },
};
