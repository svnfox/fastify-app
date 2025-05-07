const userSchema = {
    type: 'object',
    properties: {
        username: { type: 'string', minLength: 3 },
        password: { type: 'string', minLength: 6 }
    },
    required: ['username', 'password'],
    additionalProperties: false
}

module.exports = userSchema
