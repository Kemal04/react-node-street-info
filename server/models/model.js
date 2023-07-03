const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");

const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "User", allowNull: false },
});


const Street = sequelize.define("street", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    title_en: { type: DataTypes.STRING, allowNull: false },
    description_en: { type: DataTypes.TEXT, allowNull: false },
    title_ru: { type: DataTypes.STRING, allowNull: false },
    description_ru: { type: DataTypes.TEXT, allowNull: false },
    street_img: { type: DataTypes.STRING, allowNull: false },
    street_qr: { type: DataTypes.STRING, allowNull: true }
});

const Building = sequelize.define("building", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    name_en: { type: DataTypes.STRING, allowNull: false },
    name_ru: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    title_en: { type: DataTypes.STRING, allowNull: false },
    description_en: { type: DataTypes.TEXT, allowNull: false },
    title_ru: { type: DataTypes.STRING, allowNull: false },
    description_ru: { type: DataTypes.TEXT, allowNull: false },
    building_img: { type: DataTypes.STRING, allowNull: false },
    building_qr: { type: DataTypes.STRING, allowNull: true }
});

const Contact = sequelize.define("contact", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: false }
});

const Blog = sequelize.define("blog", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    title_en: { type: DataTypes.STRING, allowNull: false },
    description_en: { type: DataTypes.TEXT, allowNull: false },
    title_ru: { type: DataTypes.STRING, allowNull: false },
    description_ru: { type: DataTypes.TEXT, allowNull: false },
    blog_img: { type: DataTypes.STRING, allowNull: false },
    blog_qr: { type: DataTypes.STRING, allowNull: true }
});

const Artist = sequelize.define("artist", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    title_en: { type: DataTypes.STRING, allowNull: false },
    description_en: { type: DataTypes.TEXT, allowNull: false },
    title_ru: { type: DataTypes.STRING, allowNull: false },
    description_ru: { type: DataTypes.TEXT, allowNull: false },
    artist_img: { type: DataTypes.STRING, allowNull: false },
    artist_qr: { type: DataTypes.STRING, allowNull: true }
});

const Individ = sequelize.define("individ", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    title_en: { type: DataTypes.STRING, allowNull: false },
    description_en: { type: DataTypes.TEXT, allowNull: false },
    title_ru: { type: DataTypes.STRING, allowNull: false },
    description_ru: { type: DataTypes.TEXT, allowNull: false },
    individ_img: { type: DataTypes.STRING, allowNull: false },
    individ_qr: { type: DataTypes.STRING, allowNull: true }
});

const Staff = sequelize.define("staff", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    title_en: { type: DataTypes.STRING, allowNull: false },
    description_en: { type: DataTypes.TEXT, allowNull: false },
    title_ru: { type: DataTypes.STRING, allowNull: false },
    description_ru: { type: DataTypes.TEXT, allowNull: false },
    staff_img: { type: DataTypes.STRING, allowNull: false },
    staff_qr: { type: DataTypes.STRING, allowNull: true }
});

Admin.findOrCreate({ where: { email: "admin@gmail.com", password: "$2b$10$.2s8SLEln9Dnql5sPuvtfec93qtcKyvMAqDY8zeLg8IcndoHNtXWS", role: "Admin" } })

module.exports = {
    Admin,
    Street,
    Contact,
    Building,
    Blog,
    Individ,
    Artist,
    Staff
};
