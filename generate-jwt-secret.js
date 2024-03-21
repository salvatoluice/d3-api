const fs = require('fs');
const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(64).toString('hex');

fs.writeFileSync('.env', `JWT_SECRET=${jwtSecret}\n`, { flag: 'a' });
