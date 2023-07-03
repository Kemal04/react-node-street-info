const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Artist } = require("../models/model");
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
    await Artist.findAndCountAll({ limit, offset })
        .then((artists) => {
            res.json({
                artists: artists.rows,
                pagination: {
                    before: before,
                    next: next,
                    page: page,
                    total: artists.count,
                    pages: Math.ceil(artists.count / limit)
                }
            })
        })
})

router.get("/:artistId", async (req, res) => {
    await Artist.findOne({
        where: { id: req.params.artistId }
    }).then((artist) => {
        res.json({
            artist: artist
        })
    })
});

router.post("/create", isAdmin, fileUpload.upload, async (req, res) => {
    await Artist.create({
        title: req.body.title,
        description: req.body.description,
        title_en: req.body.title_en,
        description_en: req.body.description_en,
        title_ru: req.body.title_ru,
        description_ru: req.body.description_ru,
        artist_img: req.files.artist_img[0].filename
    }).then(() => {
        res.json({
            success: "Üstinlikli goşuldy"
        })
    })
});

router.get("/edit/:artistId", isAdmin, async (req, res) => {
    await Artist.findOne({
        where: { id: req.params.artistId }
    }).then((artist) => {
        res.json({
            artist: artist
        })
    })
});

router.post("/edit/:artistId", isAdmin, fileUpload.upload, async (req, res) => {
    const current = await Artist.findOne({ where: { id: req.params.artistId } });
    let img = req.body.artist_img;
    let qr = req.body.artist_qr;
    if (req.files.artist_img && req.files.artist_qr) {
        fs.unlink("./public/img/artist/" + current.artist_img, err => {
            console.log(err);
        })
        fs.unlink("./public/img/artist_qr/" + current.artist_qr, err => {
            console.log(err);
        })
        img = req.files.artist_img[0].filename;
        qr = req.files.artist_qr[0].filename;

        await Artist.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
            artist_img: img,
            artist_qr: qr
        },
            { where: { id: req.params.artistId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.artist_img) {
        fs.unlink("./public/img/artist/" + current.artist_img, err => {
            console.log(err);
        })
        img = req.files.artist_img[0].filename;

        await Artist.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
            artist_img: img
        },
            { where: { id: req.params.artistId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.artist_qr) {
        fs.unlink("./public/img/artist_qr/" + current.artist_qr, err => {
            console.log(err);
        })
        qr = req.files.artist_qr[0].filename;
        await Artist.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
            artist_qr: qr
        },
            { where: { id: req.params.artistId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    } else {
        await Artist.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
        },
            { where: { id: req.params.artistId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    }

});

router.delete("/delete/:artistId", isAdmin, async (req, res) => {
    await Artist.findOne({ where: { id: req.params.artistId } })
        .then((artist) => {
            if (artist) {
                fs.unlink("./public/img/artist/" + artist.artist_img, err => { })
                fs.unlink("./public/img/artist_qr/" + artist.artist_qr, err => { })
                artist.destroy()
                return res.json({
                    success: "Üstinlikli yok edildi"
                })
            } else {
                res.json({
                    error: "Tapylmady"
                })
            }
        })
});





module.exports = router;