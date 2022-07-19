const router = require('express').Router()
const userController = require('../controllers/users.controller')

router.get('/', userController.view)
router.post('/', userController.find)
// Adding new User
router.get('/adduser', userController.addUserForm)
router.post('/adduser', userController.addUserDb)

// Edit the user
router.get('/editUser/:id', userController.viewEditForm)
router.post('/editUser/:id', userController.updateUser)

// Delete the user
router.get('/:id', userController.deleteUser)

// View data
router.get('/viewUser/:id', userController.viewUser)
module.exports = router
