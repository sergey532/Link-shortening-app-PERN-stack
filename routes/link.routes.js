const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Sequelize = require("sequelize")
const db = require('../db')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body
    
    const code = shortid.generate()

    const existing = await Link.findOne({where: {from: from, userId: req.user.userId}})

    if (existing) {
      return res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code
    
   

    
    await Link.create({from, to, code, userId: req.user.userId}).then(res=>{
      // получаем id link
      const Id = res.id
      const link = new Link({
        Id, from, to, code
       })  
      
    }).catch(err=>console.log(err))

    
 

    res.status(201).json({ link })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.findAll({ where:{userId: req.user.userId }})
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
