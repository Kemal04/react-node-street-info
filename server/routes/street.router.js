const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Street } = require("../models/model");
const fileUpload = require("../helpers/file-upload")
const multer = require("multer");
const fs = require('fs')
const qrcode = require("qrcode");


router.get("/", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 8;
    const offset = (page - 1) * limit;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Street.findAndCountAll({ limit, offset })
        .then((streets) => {
            res.json({
                streets: streets.rows,
                pagination: {
                    before: before,
                    next: next,
                    page: page,
                    total: streets.count,
                    pages: Math.ceil(streets.count / limit)
                }
            })
        })
})

router.get("/:streetId", async (req, res) => {
    await Street.findOne({
        where: { id: req.params.streetId }
    }).then((street) => {
        res.json({
            street: street
        })
    })
});

router.post("/qr", async (req, res) => {
    const url = req.body.url;
    if (url === null) {
        res.json({ error: "URL girizin!" })
    }
    qrcode.toDataURL(url, function (err, url) {
        console.log(url);
        res.json({ url: url, success: "QR kodynyz doredildi" })
    })
});


router.post("/create", isAdmin, fileUpload.upload, async (req, res) => {
    await Street.create({
        title: req.body.title,
        description: req.body.description,
        title_en: req.body.title_en,
        description_en: req.body.description_en,
        title_ru: req.body.title_ru,
        description_ru: req.body.description_ru,
        street_img: req.files.street_img[0].filename,
    }).then(() => {
        res.json({
            success: "Salgy üstinlikli goşuldy"
        })
    })
});

router.get("/edit/:streetId", isAdmin, async (req, res) => {
    await Street.findOne({
        where: { id: req.params.streetId }
    }).then((street) => {
        res.json({
            street: street
        })
    })
});

router.post("/edit/:streetId", isAdmin, fileUpload.upload, async (req, res) => {
    const current = await Street.findOne({ where: { id: req.params.streetId } });
    let img = req.body.street_img;
    let qr = req.body.street_qr;
    if (req.files.street_img && req.files.street_qr) {
        fs.unlink("./public/img/street/" + current.street_img, err => {
            console.log(err);
        })
        fs.unlink("./public/img/street_qr/" + current.street_qr, err => {
            console.log(err);
        })
        img = req.files.street_img[0].filename;
        qr = req.files.street_qr[0].filename;

        await Street.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
            street_img: img,
            street_qr: qr
        },
            { where: { id: req.params.streetId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.street_img) {
        fs.unlink("./public/img/street/" + current.street_img, err => {
            console.log(err);
        })
        img = req.files.street_img[0].filename;

        await Street.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
            street_img: img
        },
            { where: { id: req.params.streetId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.street_qr) {
        fs.unlink("./public/img/street_qr/" + current.street_qr, err => {
            console.log(err);
        })
        qr = req.files.street_qr[0].filename;
        await Street.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
            street_qr: qr
        },
            { where: { id: req.params.streetId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    } else {
        await Street.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,

        },
            { where: { id: req.params.streetId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    }
});

router.delete("/delete/:streetId", isAdmin, async (req, res) => {
    await Street.findOne({ where: { id: req.params.streetId } })
        .then((street) => {
            if (street) {
                fs.unlink("./public/img/street/" + street.street_img, err => { })
                fs.unlink("./public/img/street_qr/" + street.street_qr, err => { })
                street.destroy()
                return res.json({
                    success: "Sayoly üstunlikli yok edildi"
                })
            } else {
                res.json({
                    error: "Tapylmady"
                })
            }
        })
});





module.exports = router;