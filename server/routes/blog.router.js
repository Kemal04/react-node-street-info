const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Blog } = require("../models/model");
const fileUpload = require("../helpers/file-upload")
const multer = require("multer");
const fs = require('fs')

router.get("/", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Blog.findAndCountAll({ limit, offset })
        .then((blogs) => {
            res.json({
                blogs: blogs.rows,
                pagination: {
                    before: before,
                    next: next,
                    page: page,
                    total: blogs.count,
                    pages: Math.ceil(blogs.count / limit)
                }
            })
        })
})

router.get("/:blogId", async (req, res) => {
    await Blog.findOne({
        where: { id: req.params.blogId }
    }).then((blog) => {
        res.json({
            blog: blog
        })
    })
});

router.post("/create", isAdmin, fileUpload.upload, async (req, res) => {
    await Blog.create({
        title: req.body.title,
        description: req.body.description,
        title_en: req.body.title,
        description_en: req.body.description,
        title_ru: req.body.title,
        description_ru: req.body.description,
        blog_img: req.files.blog_img[0].filename
    }).then(() => {
        res.json({
            success: "Üstunlikli goşuldy"
        })
    })
});

router.get("/edit/:blogId", isAdmin, async (req, res) => {
    await Blog.findOne({
        where: { id: req.params.blogId }
    }).then((blog) => {
        res.json({
            blog: blog
        })
    })
});

router.post("/edit/:blogId", isAdmin, fileUpload.upload, async (req, res) => {
    const current = await Blog.findOne({ where: { id: req.params.blogId } });
    let img = req.body.blog_img;
    let qr = req.body.blog_qr;
    if (req.files.blog_img && req.files.blog_qr) {
        fs.unlink("./public/img/blog/" + current.blog_img, err => {
            console.log(err);
        })
        fs.unlink("./public/img/blog_qr/" + current.blog_qr, err => {
            console.log(err);
        })
        img = req.files.blog_img[0].filename;
        qr = req.files.blog_qr[0].filename;

        await Blog.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title,
            description_en: req.body.description,
            title_ru: req.body.title,
            description_ru: req.body.description,
            blog_img: img,
            blog_qr: qr
        },
            { where: { id: req.params.blogId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.blog_img) {
        fs.unlink("./public/img/blog/" + current.blog_img, err => {
            console.log(err);
        })
        img = req.files.blog_img[0].filename;

        await Blog.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title,
            description_en: req.body.description,
            title_ru: req.body.title,
            description_ru: req.body.description,
            blog_img: img
        },
            { where: { id: req.params.blogId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })

    } else if (req.files.blog_qr) {
        fs.unlink("./public/img/blog_qr/" + current.blog_qr, err => {
            console.log(err);
        })
        qr = req.files.blog_qr[0].filename;
        await Blog.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title,
            description_en: req.body.description,
            title_ru: req.body.title,
            description_ru: req.body.description,
            blog_qr: qr
        },
            { where: { id: req.params.blogId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    } else {
        await Blog.update({
            title: req.body.title,
            description: req.body.description,
            title_en: req.body.title,
            description_en: req.body.description,
            title_ru: req.body.title,
            description_ru: req.body.description,
        },
            { where: { id: req.params.blogId } })
            .then(() => {
                res.json({
                    success: "Üstinlikli üýtgedildi"
                })
            })
    }
});

router.delete("/delete/:blogId", isAdmin, async (req, res) => {
    await Blog.findOne({ where: { id: req.params.blogId } })
        .then((blog) => {
            if (blog) {
                fs.unlink("./public/img/blog/" + blog.blog_img, err => { })
                blog.destroy()
                return res.json({
                    success: "Üstunlikli yok edildi"
                })
            } else {
                res.json({
                    error: "Tapylmady"
                })
            }
        })
});

module.exports = router;