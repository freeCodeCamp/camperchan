import { isSupportedByPrettier } from '../utilities/is-supported-by-prettier';

describe('isSupportedByPrettier tests', () => {
  describe('Tests for supported languages', () => {
    const languagesToCheck = ['HTML', 'CSS', 'JS', 'JSON', 'Markdown', 'YAML'];

    it.each(languagesToCheck)('should support `%s`', (field) => {
      expect(isSupportedByPrettier(field)).toBe(field.toLowerCase());
    });
  });

  describe('Tests for unsupported languages', () => {
    const unsupportedLanguages = ['PHP', 'Go', 'Rust'];

    it.each(unsupportedLanguages)('Should return false for `%s`', (field) => {
      expect(isSupportedByPrettier(field)).toBeFalsy();
    });
  });
});
