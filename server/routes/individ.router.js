const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Individ } = require("../models/model");
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
    await Individ.findAndCountAll({ limit, offset })
        .then((individs) => {
            res.json({
                individs: individs.rows,
                pagination: {
                    before: before,
                    next: next,
                    page: page,
                    total: individs.count,
                    pages: Math.ceil(individs.count / limit)
                }
            })
        })
})

router.get("/:individId", async (req, res) => {
    await Individ.findOne({
        where: { id: req.params.individId }
    }).then((individ) => {
        res.json({
            individ: individ
        })
    })
});

router.post("/create", isAdmin, fileUpload.upload, async (req, res) => {
    await Individ.create({
        title: req.body.title,
        description: req.body.description,
        individ_img: req.files.individ_img[0].filename
    }).then(() => {
        res.json({
            success: "Üstinlikli goşuldy"
        })
    })
});

router.get("/edit/:individId", isAdmin, async (req, res) => {
    await Individ.findOne({
        where: { id: req.params.individId }
    }).then((individ) => {
        res.json({
            individ: individ
        })
    })
});

router.post("/edit/:individId",isAdmin, fileUpload.upload, async (req, res) => {
    const current = await Individ.findOne({ where: { id: req.params.individId } });
    let img = req.body.individ_img;
    let qr = req.body.individ_qr;
    if (req.files.individ_img && req.files.individ_qr) {
        fs.unlink("./public/img/individ/" + current.individ_img, err => {
            console.log(err);
        })
        fs.unlink("./public/img/individ_qr/" + current.individ_qr, err => {
            console.log(err);
        })
        img = req.files.individ_img[0].filename;
        qr = req.files.individ_qr[0].filename;

        await Individ.update({
            title: req.body.title,
            description: req.body.description,
            individ_img: img,
            individ_qr: qr
        },
            { where: { id: req.params.individId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.individ_img) {
        fs.unlink("./public/img/individ/" + current.individ_img, err => {
            console.log(err);
        })
        img = req.files.individ_img[0].filename;

        await Individ.update({
            title: req.body.title,
            description: req.body.description,
            individ_img: img
        },
            { where: { id: req.params.individId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.individ_qr) {
        fs.unlink("./public/img/individ_qr/" + current.individ_qr, err => {
            console.log(err);
        })
        qr = req.files.individ_qr[0].filename;
        await Individ.update({
            title: req.body.title,
            description: req.body.description,
            individ_qr: qr
        },
            { where: { id: req.params.individId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    } else {
        await Individ.update({
            title: req.body.title,
            description: req.body.description
        },
            { where: { id: req.params.individId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    }

});

router.delete("/delete/:individId", isAdmin, async (req, res) => {
    await Individ.findOne({ where: { id: req.params.individId } })
        .then((individ) => {
            if (individ) {
                fs.unlink("./public/img/individ/" + individ.individ_img, err => { })
                fs.unlink("./public/img/individ_qr/" + individ.individ_qr, err => { })
                individ.destroy()
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