const { createRoom, deleteRoom, getRoom, getAllRooms, updateRoom, updateRoomAvailability } = require('../controllers/roomController')
const { verifyAdmin } = require("../utils/verification")
const router = require("express").Router()

// CRUD ROOM
router.post('/:hotelid', verifyAdmin, createRoom)
router.put('/:id', verifyAdmin, updateRoom)
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom)
router.get('/:id', getRoom)
router.get('/', getAllRooms )

router.put('/availability/:id', updateRoomAvailability)

module.exports = router