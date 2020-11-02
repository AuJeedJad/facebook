const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
    // 
    const { username, password, name } = req.body;
    const targetUser = await db.User.findOne({ where: { username } });
    if (targetUser) {
        res.status(400).send({ message: "Username already taken" })
    } else {
        const salt = bcryptjs.genSaltSync(12);
        const hashPassword = bcryptjs.hashSync(password, salt);
        const newUser = await db.User.create({
            username,
            name,
            password: hashPassword,
            image: "Img.jpeg"
        })
        res.status(201).send({ newUser })
    }
}

const login = async (req,res)=>{
    const {username,password}= req.body;
    const targetUser = await db.User.findOne({ where: { username } });
    if (!targetUser) {
res.status(400).send({message: "not found"});
    } else {
        const isCorrect= bcryptjs.compareSync(password,targetUser.password);
        if (!isCorrect) {
            res.status(400).send({message: "= * ="});
        } else {
            const token=jwt.sign({id: targetUser.id, name: targetUser.name, createdAt: new Date()},"AuJeedJad",{expiresIn: 3600});
            res.status(200).send({token});
        }
    }    
}

const changePassword = async (req, res) => {
    const {oldPassword, newPassword, confirmNewPassword} = req.body;
    if(newPassword !== confirmNewPassword){
        res.status(400).send({message: "Password not match"});
    } else {
        const isCorrect = bcryptjs.compareSync(oldPassword, req.user.password);
        if (!isCorrect) {
            res.status(400).send({message: "= * ="});
        } else {
            const salt = bcryptjs.genSaltSync(12);
            const hashPassword = bcryptjs.hashSync(newPassword, salt);
            await req.user.update({password: hashPassword, passwordUpdate: new Date()})
            res.status(200).send({ message: "Password has been changed" })
        }
    }
}


module.exports={register, login, changePassword}