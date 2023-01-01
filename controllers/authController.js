const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createError } = require('../utils/error')

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt) 
    
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).json({ 'message': 'Missing input fields' })
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })
    await newUser.save()
    res.status(201).send('User has been created')
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if(!user) return next(createError(404, 'User not found'))

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordCorrect) return next(createError(400, 'Wrong password'))

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY)

    const { password, isAdmin, ...other } = user._doc

    res
    .cookie('access_token', token, { httpOnly: true })
    .status(200).json({...other})
  } catch (err) {
    next(err)
  }
}

module.exports = { register, login }