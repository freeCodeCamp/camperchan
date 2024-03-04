/**
 * Checks if a string matches a 6 character hex code.
 *
 * @param {string} colour The colour code to validate.
 * @returns {boolean} If the string is in the correct format.
 */
export const validateColour = (colour: string): boolean => {
  return /[\da-f]{6}/gi.test(colour);
};

/**
 * Checks if a url points to a valid image.
 *
 * @param {string} url The URL to validate.
 * @returns {boolean} If the URL provides a 2XX response, and if the response content type
 * is an image.
 */
export const validateImage = async (url: string): Promise<boolean> => {
  const validImage = await fetch(url, {
    method: "HEAD"
  }).catch(() => null);

  if (!validImage) {
    return false;
  }

  if (!validImage.headers.get("content-type")?.startsWith("image/")) {
    return false;
  }

  return true;
};
