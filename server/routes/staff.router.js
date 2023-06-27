const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Staff } = require("../models/model");
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
    await Staff.findAndCountAll({ limit, offset })
        .then((staffs) => {
            res.json({
                staffs: staffs.rows,
                pagination: {
                    before: before,
                    next: next,
                    page: page,
                    total: staffs.count,
                    pages: Math.ceil(staffs.count / limit)
                }
            })
        })
})

router.get("/:staffId", async (req, res) => {
    await Staff.findOne({
        where: { id: req.params.staffId }
    }).then((staff) => {
        res.json({
            staff: staff
        })
    })
});

router.post("/create", isAdmin, fileUpload.upload, async (req, res) => {
    await Staff.create({
        title: req.body.title,
        description: req.body.description,
        staff_img: req.files.staff_img[0].filename
    }).then(() => {
        res.json({
            success: "Üstinlikli goşuldy"
        })
    })
});

router.get("/edit/:staffId", isAdmin, async (req, res) => {
    await Staff.findOne({
        where: { id: req.params.staffId }
    }).then((staff) => {
        res.json({
            staff: staff
        })
    })
});

router.post("/edit/:staffId",isAdmin, fileUpload.upload, async (req, res) => {
    const current = await Staff.findOne({ where: { id: req.params.staffId } });
    let img = req.body.staff_img;
    let qr = req.body.staff_qr;
    if (req.files.staff_img && req.files.staff_qr) {
        fs.unlink("./public/img/staff/" + current.staff_img, err => {
            console.log(err);
        })
        fs.unlink("./public/img/staff_qr/" + current.staff_qr, err => {
            console.log(err);
        })
        img = req.files.staff_img[0].filename;
        qr = req.files.staff_qr[0].filename;

        await Staff.update({
            title: req.body.title,
            description: req.body.description,
            staff_img: img,
            staff_qr: qr
        },
            { where: { id: req.params.staffId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.staff_img) {
        fs.unlink("./public/img/staff/" + current.staff_img, err => {
            console.log(err);
        })
        img = req.files.staff_img[0].filename;

        await Staff.update({
            title: req.body.title,
            description: req.body.description,
            staff_img: img
        },
            { where: { id: req.params.staffId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.staff_qr) {
        fs.unlink("./public/img/staff_qr/" + current.staff_qr, err => {
            console.log(err);
        })
        qr = req.files.staff_qr[0].filename;
        await Staff.update({
            title: req.body.title,
            description: req.body.description,
            staff_qr: qr
        },
            { where: { id: req.params.staffId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    } else {
        await Staff.update({
            title: req.body.title,
            description: req.body.description
        },
            { where: { id: req.params.staffId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    }

});

router.delete("/delete/:staffId", isAdmin, async (req, res) => {
    await Staff.findOne({ where: { id: req.params.staffId } })
        .then((staff) => {
            if (staff) {
                fs.unlink("./public/img/staff/" + staff.staff_img, err => { })
                fs.unlink("./public/img/staff_qr/" + staff.staff_qr, err => { })
                staff.destroy()
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