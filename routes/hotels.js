const { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType, getHotelsByCity, getHotelRooms } = require("../controllers/hotelController")
const { verifyAdmin } = require("../utils/verification")
const router = require("express").Router()

// CRUD HOTEL
router.post('/', verifyAdmin, createHotel)
router.put('/:id', verifyAdmin, updateHotel)
router.delete('/find/:id', verifyAdmin, deleteHotel)
router.get('/find/:id', getHotel)
router.get('/', getAllHotels)

router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/city/:name', getHotelsByCity)
router.get('/room/:id', getHotelRooms)

module.exports = router