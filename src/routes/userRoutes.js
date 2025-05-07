'use strict'

const userController = require('../controllers/userController')
const responseSchema = require('../schemas/responseSchema')
const userSchema = require('../schemas/userSchema')

module.exports = async function (fastify, opts) {
    // 注册用户
    fastify.post('/register', {
        schema: {
            body: userSchema, // 请求体验证
        }
    }, userController.registerUser)

    // 登录用户
    fastify.post('/login', userController.loginUser)

    // 获取当前登录用户信息（需要认证）
    fastify.get('/profile', {
        preHandler: [fastify.authenticate]  // 直接传递 authenticate 函数
    }, userController.getProfile)
}
