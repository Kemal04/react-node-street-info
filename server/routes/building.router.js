const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/authMiddleware');
const { Building } = require("../models/model");
const fileUpload = require("../helpers/file-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const fs = require('fs')


router.get("/", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 8;
    const offset = (page - 1) * limit;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Building.findAndCountAll({ limit, offset })
        .then((buildings) => {
            res.json({
                buildings: buildings.rows,
                pagination: {
                    before: before,
                    next: next,
                    page: page,
                    total: buildings.count,
                    pages: Math.ceil(buildings.count / limit)
                }
            })
        })
})

router.get("/:buildingId", async (req, res) => {
    await Building.findOne({
        where: { id: req.params.buildingId }
    }).then((building) => {
        res.json({
            building: building
        })
    })
});

router.post("/create", isAdmin, fileUpload.upload, async (req, res) => {
    await Building.create({
        title: req.body.title,
        name: req.body.name,
        description: req.body.description,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        title_en: req.body.title_en,
        description_en: req.body.description_en,
        title_ru: req.body.title_ru,
        description_ru: req.body.description_ru,
        building_img: req.files.building_img[0].filename
    }).then(() => {
        res.json({
            success: "Bina üstinlikli goşuldy"
        })
    })
});

router.get("/edit/:buildingId", isAdmin, async (req, res) => {
    await Building.findOne({
        where: { id: req.params.buildingId }
    }).then((building) => {
        res.json({
            building: building
        })
    })
});

router.post("/edit/:buildingId", isAdmin, fileUpload.upload, async (req, res) => {
    const current = await Building.findOne({ where: { id: req.params.buildingId } });
    let img = req.body.building_img;
    let qr = req.body.building_qr;
    if (req.files.building_img && req.files.building_qr) {
        fs.unlink("./public/img/building/" + current.building_img, err => {
            console.log(err);
        })
        fs.unlink("./public/img/building_qr/" + current.building_qr, err => {
            console.log(err);
        })
        img = req.files.building_img[0].filename;
        qr = req.files.building_qr[0].filename;

        await Building.update({
            title: req.body.title,
            name: req.body.name,
            description: req.body.description,
            name_en: req.body.name_en,
            name_ru: req.body.name_ru,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
            building_img: img,
            building_qr: qr
        },
            { where: { id: req.params.buildingId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.building_img) {
        fs.unlink("./public/img/building/" + current.building_img, err => {
            console.log(err);
        })
        img = req.files.building_img[0].filename;

        await Building.update({
            title: req.body.title,
            name: req.body.name,
            description: req.body.description,
            name_en: req.body.name_en,
            name_ru: req.body.name_ru,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
            building_img: img
        },
            { where: { id: req.params.buildingId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.building_qr) {
        fs.unlink("./public/img/building_qr/" + current.building_qr, err => {
            console.log(err);
        })
        qr = req.files.building_qr[0].filename;
        await Building.update({
            title: req.body.title,
            name: req.body.name,
            description: req.body.description,
            name_en: req.body.name_en,
            name_ru: req.body.name_ru,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
            building_qr: qr
        },
            { where: { id: req.params.buildingId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    } else {
        await Building.update({
            title: req.body.title,
            name: req.body.name,
            description: req.body.description,
            name_en: req.body.name_en,
            name_ru: req.body.name_ru,
            title_en: req.body.title_en,
            description_en: req.body.description_en,
            title_ru: req.body.title_ru,
            description_ru: req.body.description_ru,
        },
            { where: { id: req.params.buildingId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    }
});

router.delete("/delete/:buildingId", isAdmin, async (req, res) => {
    await Building.findOne({ where: { id: req.params.buildingId } })
        .then((building) => {
            if (building) {
                fs.unlink("./public/img/building/" + building.building_img, err => { })
                fs.unlink("./public/img/building_qr/" + building.building_qr, err => { })
                building.destroy()
                return res.json({
                    success: "Bina üstunlikli yok edildi"
                })
            } else {
                res.json({
                    error: "Tapylmady"
                })
            }
        })
});

module.exports = router;