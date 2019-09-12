const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../client/src/assets/images')
    },
    filename: function (req,file,cb){
        cb(null, file.originalname)

    }
});
const fileFilter = (req, file, cb) =>{
    if(file.mimetype !== 'image/png'){
        cb(new Error("your file type must be png") , false);
    }
    cb(null , true)

}
const upload = multer({storage: storage, limits:
{fileSize: 1024 * 1024 * 5}
,fileFilter:fileFilter
});

module.exports = {
    upload
}