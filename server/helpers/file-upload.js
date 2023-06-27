const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if (file.fieldname === "street_qr") {
            cb(null, './public/img/street_qr/');
        }
        else if (file.fieldname === "building_qr") {
            cb(null, './public/img/building_qr/');
        }
        else if (file.fieldname === "street_img") {
            cb(null, './public/img/street/');
        }
        else if (file.fieldname === "building_img") {
            cb(null, './public/img/building/');
        }
        else if (file.fieldname === "blog_img") {
            cb(null, './public/img/blog/');
        }
        else if (file.fieldname === "blog_qr") {
            cb(null, './public/img/blog_qr/');
        }
        else if (file.fieldname === "artist_img") {
            cb(null, './public/img/artist/');
        }
        else if (file.fieldname === "artist_qr") {
            cb(null, './public/img/artist_qr/');
        }
        else if (file.fieldname === "individ_img") {
            cb(null, './public/img/individ/');
        }
        else if (file.fieldname === "individ_qr") {
            cb(null, './public/img/individ_qr/');
        } 
        else if (file.fieldname === "staff_img") {
            cb(null, './public/img/staff/');
        }
        else if (file.fieldname === "staff_qr") {
            cb(null, './public/img/staff_qr/');
        }
     },
        
    filename: function(req, file, cb){
        cb(null, path.parse(file.fieldname).name + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).fields([
    { name: 'street_qr', maxCount: 1 },
    { name: 'building_qr', maxCount: 1 },
    { name: 'street_img', maxCount: 1 },
    { name: 'building_img', maxCount: 1 },
    { name: 'blog_img', maxCount: 1 },
    { name: 'blog_qr', maxCount: 1 },
    { name: 'artist_img', maxCount: 1 },
    { name: 'artist_qr', maxCount: 1 },
    { name: 'staff_img', maxCount: 1 },
    { name: 'staff_qr', maxCount: 1 },
    { name: 'individ_img', maxCount: 1 },
    { name: 'individ_qr', maxCount: 1 },
]);

module.exports.upload = upload;