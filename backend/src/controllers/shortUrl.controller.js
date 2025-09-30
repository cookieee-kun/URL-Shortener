import { getShortUrl } from "../dao/shortUrl.dao.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shortUrl.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req, res) => {
    const data = req.body
    let shortUrl
    if (req.user) {
        console.log(req.user._id)
        shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug)
    } else {
        shortUrl = await createShortUrlWithoutUser(data.url)
    }
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
})

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params
    const url = await getShortUrl(id)
    if (!url) {
        return res.status(404).json({ error: "Short URL not found" })
    }
    res.redirect(url.full_url)
})

export const createCustomShortUrl = wrapAsync(async (req, res) => {
    const { url, slug } = req.body
    const shortUrl = await createShortUrlWithUser(url, req.user._id, slug)
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
})
