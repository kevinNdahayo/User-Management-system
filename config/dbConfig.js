const Pool = require('pg').Pool

const db = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'kevin',
  port: 5432,
  database: 'user_mgt_system',
})

module.exports = db
