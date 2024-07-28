/**
 * Checks if a string matches a 6 character hex code.
 * @param colour - The colour code to validate.
 * @returns If the string is in the correct format.
 */
const validateColour = (colour: string): boolean => {
  return /[\da-f]{6}/gi.test(colour);
};

/**
 * Checks if a url points to a valid image.
 * @param url - The URL to validate.
 * @returns If the URL provides a 2XX response, and if the response content type
 * is an image.
 */
const validateImage = async(url: string): Promise<boolean> => {
  const validImage = await fetch(url, {
    method: "HEAD",
  }).catch(() => {
    return null;
  });

  if (!validImage) {
    return false;
  }

  const contentType = validImage.headers.get("content-type");

  if (contentType === null) {
    return false;
  }

  if (!contentType.startsWith("image/")) {
    return false;
  }

  return true;
};

export { validateColour, validateImage };
