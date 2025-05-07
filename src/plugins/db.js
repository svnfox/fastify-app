'use strict'

const fp = require('fastify-plugin')
const mongoose = require('mongoose')

module.exports = fp(async function (fastify, opts) {
    fastify.log.info('Starting MongoDB connection...')

    try {
        fastify.log.info(`Using MongoDB URI: ${process.env.MONGO_URI}`)
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000  // 增加超时设置，30秒
        })

        fastify.log.info('✅ MongoDB connected')

        fastify.decorate('mongoose', mongoose)

        fastify.addHook('onClose', async (instance, done) => {
            await mongoose.connection.close()
            fastify.log.info('🛑 MongoDB disconnected')
            done()
        })
    } catch (err) {
        fastify.log.error(`❌ MongoDB connection error: ${err.message}`)
        process.exit(1)  // 如果无法连接数据库，退出进程
    }
})
