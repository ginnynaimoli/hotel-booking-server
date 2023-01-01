const { deleteUser, updateUser, getUser, getAllUsers } = require("../controllers/userController")
const { verifyUser, verifyAdmin } = require("../utils/verification")
const router = require("express").Router()

// CRUD USER
router.put('/:id', verifyUser, updateUser)
router.delete('/:id', verifyUser, deleteUser)
router.get('/:id', verifyUser, getUser)
router.get('/', verifyAdmin, getAllUsers)

module.exports = router