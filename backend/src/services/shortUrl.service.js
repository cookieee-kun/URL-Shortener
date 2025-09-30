import { generateNanoId } from "../utils/helper.utils.js";
import { saveShortUrl, getShortUrl } from "../dao/shortUrl.dao.js";

export const createShortUrlWithoutUser = async (url) => {
  try {
    const shortUrl = generateNanoId(7);
    if (!shortUrl) {
      throw new Error("Short URL not generated");
    }
    await saveShortUrl(shortUrl, url);
    //console.log(shortUrl)
    return shortUrl;
  } catch (err) {
    console.error("❌ Error creating short URL without user:", err.message);
    throw err;
  }
};

export const createShortUrlWithUser = async (url, userId, slug = null) => {
  try {
    const shortUrl = slug || generateNanoId(7);
    if (slug) {
      const exists = await getShortUrl(slug);
      if (exists) {
        throw new Error("This custom URL already exists");
      }
    }

    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
  } catch (err) {
    console.error("❌ Error creating short URL with user:", err.message);
    throw err;
  }
};
