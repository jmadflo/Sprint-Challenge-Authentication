const db = require('../database/dbConfig')

module.exports = {
    add,
    find,
    findBy,
    findById,
}

function find() {
    return db('users')
        .select('users.id', 'users.username')
        .orderBy('users.id')
}

function findBy(filter) {
    // console.log('filter', filter)
    return db('users')
        .where(filter)
        .orderBy('users.id')
}

async function add(user) {
    try {
        const [id] = await db('users').insert(user, 'id')

        return findById(id)
    } catch (error) {
        throw error
    }
}

function findById(id) {
    return db('users').where({ id }).first()
}