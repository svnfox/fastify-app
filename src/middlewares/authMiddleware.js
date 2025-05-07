const fp = require('fastify-plugin')
const jwt = require('jsonwebtoken')

module.exports = fp(async function (fastify, opts) {
    fastify.decorate('authenticate', async function (req, reply) {
        try {
            const authHeader = req.headers.authorization
            if (!authHeader) throw new Error('未授权')

            const token = authHeader.split(' ')[1] // Bearer <token>
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key')

            // 确保 decoded 中有 id 字段
            req.user = { id: decoded.id }  // 将 decoded.id 存入 req.user
        } catch (err) {
            reply.code(401).send({ error: '认证失败' })
        }
    })
})
