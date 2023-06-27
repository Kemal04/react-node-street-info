const express = require('express');
const router = express.Router();
const { Admin, Worker } = require('../models/model');
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { validateToken } = require("../middlewares/authMiddleware");

// Admin login
router.post("/rootman", async (req, res) => {
    const { email, password } = req.body;
    await Admin.findOne({ where: { email: email } })
        .then(admin => {
            if (!admin || admin.email !== email) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, admin.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    const accessToken = sign(
                        { id: admin.id, role: admin.role },
                        "importantsecret"
                    );
                    res.json({ token: accessToken });
                }
            }
        })
});

//current user
router.get("/current_user", validateToken, async (req, res) => {
    res.json(req.user)
})

module.exports = router;