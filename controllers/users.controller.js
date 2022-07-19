const db = require('../config/dbConfig')

exports.view = async (req, res) => {
  const credentials = await db.query(
    "SELECT DISTINCT * FROM users WHERE status = 'active'",
  )
  // console.log(credentials.rows)
  res.render('index', { data: credentials.rows })
}

exports.find = async (req, res) => {
  const searchTerm = req.body.search
  const searchResult = await db.query(
    'SELECT * FROM users WHERE first_name LIKE $1 OR last_name LIKE $2',
    [`%${searchTerm}%`, `%${searchTerm}%`],
  )
  // console.log(searchResult)
  res.render('index', { data: searchResult.rows })
}

// New user controller
exports.addUserForm = async (req, res) => {
  res.render('addUser-form')
}

exports.addUserDb = async (req, res) => {
  const { firstname, lastname, email, phone, comments} = req.body
   let status = 'active';
  const userInsert = await db.query(" INSERT INTO users (first_name, last_name, email, comments, status, phone) VALUES ($1, $2, $3, $4, $5, $6) ", [firstname, lastname, email, comments, status, phone])
  res.render('addUser-form', { title: "Add user", alert: "User added successfully !"})
}

// Editing and Viewing user information
exports.viewEditForm = async(req, res) => {
  const id = req.params.id
  try {
    const userInfo = await db.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
    res.render('editUser-form', { userInfo: userInfo.rows})
  } catch (error) {
    res.render('editUser-form', { alert: `${error}`})
  }
  
}

// Updating user information
exports.updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, comments} = req.body
  if(firstname && lastname && email && phone && comments) {
    const id = req.params.id
    const updateUser = await db.query("UPDATE users SET first_name = $1, last_name = $2, email = $3, comments = $4, phone = $5 WHERE user_id = $6 ", [firstname, lastname, email, comments, phone, id]);
    try {
      const userInfo = await db.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
      res.render('editUser-form', { userInfo: userInfo.rows, alert: `${firstname} was successfully updated !`})
    } catch (error) {
      res.render('editUser-form', { alert: `${error}`})
    }
  } else {
    res.render('addUser-form', { alert: `Provide all credentials`})
}
} catch (error) {
  res.render('editUser-form', { userInfo: userInfo.rows, alert: `${error}`})
  }
}

exports.deleteUser = async(req, res) => {
  const id = req.params.id
  try {
    const userDeleteInfo = await db.query(`DELETE FROM users WHERE user_id = $1`, [id]);
    res.redirect('/')
  } catch (error) {
    res.redirect('/')
  }
}

exports.viewUser = async(req, res) => {
  const id = req.params.id
  const credentials = await db.query("SELECT DISTINCT * FROM users WHERE status = 'active' AND user_id = $1", [id])
  res.render('viewUser', { data: credentials.rows })
}