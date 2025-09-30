import urlSchema from "../models/shortUrl.model.js"

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try{
        const newUrl = new urlSchema({
            full_url:longUrl,
            short_url:shortUrl
        })
        if(userId){
            newUrl.user = userId
        }
        await newUrl.save()
    }catch(err){
        if(err.code == 11000){
            throw new Error("Short URL already exists")
        }
        throw new Error(err.message || err)
    }
};

export const getShortUrl = async (shortUrl) => {
    try {
        return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}},{new:true});
    } catch (err) { 
        throw new Error(err);
    }   
};

export const getCustomShortUrl = async (slug) => {
	try {
    return await urlSchema.findOne({short_url:slug});
	} catch (err) {
        throw new Error(err);
    }
}