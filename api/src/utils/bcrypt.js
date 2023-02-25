const bcrypt = require('bcrypt');


const saltRounds = 10;

// Function to hash a password
async function hashPassword(password) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;

}

// Function to compare a password with a hash
async function comparePassword(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
}

module.exports = {
    hashPassword,
    comparePassword
}