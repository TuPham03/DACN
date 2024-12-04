import db from '../models/index'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { where } from 'sequelize'
import { v4 } from 'uuid'
import dotenv from 'dotenv';
dotenv.config();

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const registerService = ({ phone, password, name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { phone }, //dung de kiem tra nguoi dung neu chua co phone thi se tao moi
            defaults: { //day la code thuc hien viec tao moi
                phone,
                name,
                password: hashPassword(password),
                id: v4()
            }
        })
        const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' }) //code dung de tao token

        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Register is susscessfully !' : 'Phone number has been already used !',
            token: token || null //neu token fail thi se tra ve la null
        })

    } catch (error) {
        reject(error)
    }
})

export const loginService = ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { phone },  // Kiểm tra xem số điện thoại có tồn tại hay không
            raw: true
        });

        // Nếu có người dùng, kiểm tra mật khẩu
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password);

        // Nếu mật khẩu đúng, tạo token
        const token = isCorrectPassword && jwt.sign(
            { id: response.id, phone: response.phone },
            process.env.SECRET_KEY,
            { expiresIn: '2d' }
        );

        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Login is successfully!' : response ? 'Password is not correct' : 'Phone number not found!',
            token: token || null  // Nếu không tạo được token, trả về null
        });

    } catch (error) {
        reject(error);
    }
});  
