const Hotel = require("../models/Hotel")
const Room = require("../models/Room")

const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body)
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  } catch (err) {
    next(err)
  }
}

const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true })
    res.status(200).json(updatedHotel)
  } catch (err) {
    next(err)
  }
}

const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json('Hotel has been deleted')
  } catch (err) {
    next(err)
  }
}

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  } catch (err) {
    next(err)
  }
}

const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query
  try {
    const hotels = await Hotel
      .find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 999 }})
      .limit(req.query.limit)
    res.status(200).json(hotels)
  } catch (err) {
    next(err)
  }
}

const getHotelsByCity = async (req, res, next) => {
  try {
    const hotels = await Hotel
      .find({city: req.params.name})
    res.status(200).json(hotels)
  } catch (err) {
    next(err)
  }
}

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',')
  try {
    const list = await Promise.all(cities.map(city => {
      return Hotel.countDocuments({ city: city })
    }))
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" })
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" })
    const resortCount = await Hotel.countDocuments({ type: "Resort" })
    const villaCount = await Hotel.countDocuments({ type: "Villa" })
    const cabinCount = await Hotel.countDocuments({ type: "Cabin" })

    res.status(200).json([
      { type: "Hotels", count: hotelCount },
      { type: "Cottages", count: apartmentCount },
      { type: "Resorts", count: resortCount },
      { type: "Villas", count: villaCount },
      { type: "Cabins", count: cabinCount },
    ])
  } catch (err) {
    next(err)
  }
}

const getHotelRooms = async (req, res, next) => {
  try { 
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(hotel.rooms?.map(room => {
      return Room.findById(room)
    }))
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}

module.exports = { createHotel, updateHotel, getHotel, getAllHotels, deleteHotel, countByCity, countByType, getHotelRooms, getHotelsByCity }