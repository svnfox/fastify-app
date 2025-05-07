const responseSchema = {
    type: 'object',
    properties: {
        message: { type: 'string' },
        id: { type: 'number' }
    },
    required: ['message', 'id']
}

module.exports = responseSchema
