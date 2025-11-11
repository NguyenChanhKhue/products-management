const cloudinary = require('cloudinary').v2; // upload file tĩnh
const streamifier = require('streamifier'); // upload file tĩnh


// congig cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Xử lý upload ảnh lên cloud
module.exports.upload = (req, res, next) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
            console.log(req.file.fieldname)
            req.body[req.file.fieldname] = result.secure_url // đường dẫn online, req.body[req.file.fieldname]  == req.body.thumbnail 
            next()
        }
        upload(req);
    } else {
        next()
    }

}