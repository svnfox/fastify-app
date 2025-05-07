const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

exports.register = async ({ username, password }) => {
    const existingUser = await User.findOne({ username })
    if (existingUser) throw new Error('用户名已存在')

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword })
    await user.save()

    return { id: user._id, username: user.username }
}

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username })
    if (!user) throw new Error('用户名不存在')

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new Error('密码错误')

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' })
    return token
}

exports.getProfile = async (id) => {
    const user = await User.findById(id).select('-password')
    if (!user) throw new Error('用户未找到')

    return user
}
