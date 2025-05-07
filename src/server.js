// server.js
require('dotenv').config()
const Fastify = require('fastify')
const app = require('./app')

const start = async () => {
    const fastify = Fastify({
        logger: true
    })

    // 注册 app.js 中的插件和路由
    await app(fastify, {})

    const port = process.env.PORT || 3000
    const host = '0.0.0.0'

    try {
        await fastify.listen({ port, host })
        console.log(`🚀 Server is running at http://${host}:${port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
