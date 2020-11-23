const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password === undefined) {
      return response.status(400).json({error: 'password missing' })
  }
  if (body.password.length < 3) {
      return response.status(400).json( {error: 'password must contain atleast 3 letters'} )
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    return response.status(400).json({error: error.message})
  }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, id: 1})
    response.json(users.map(u => u.toJSON()))
  })

usersRouter.delete('/:id', async (request, response) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch {
    response.status(404).send({ error: 'no such id' })
  }
})

module.exports = usersRouter