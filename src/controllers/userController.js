const userService = require('../services/userService')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, reply) => {
    try {
        const user = await userService.register(req.body)
        reply.send({ message: '注册成功', user })
    } catch (err) {
        console.error(err)  // 打印详细的错误信息
        reply.status(400).send({ error: err.message || '注册失败', details: err })
    }
}

exports.loginUser = async (req, reply) => {
    try {
        const { username, password } = req.body
        const user = await userService.login({ username, password })

        if (!user) {
            return reply.status(401).send({ error: 'Invalid credentials' })
        }

        // 生成 JWT Token，确保把 userId 放到 JWT 中
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        reply.send({ message: '登录成功', token })
    } catch (err) {
        reply.status(401).send({ error: err.message })
    }
}

exports.getProfile = async (req, reply) => {
    try {
        const user = await userService.getProfile(req.user.id)  // 使用 req.user.id
        reply.send(user)
    } catch (err) {
        reply.status(404).send({ error: err.message })
    }
}
