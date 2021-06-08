const {Router} = require('express')

const Sequelize = require("sequelize")
const Link = require('../models/Link')
const User = require('../models/User')
const router = Router()


router.get('/:code', async (req, res) => {
      
  try {

    const link = await Link.findOne({where: {code: req.params.code}})
    console.log('Параметр link:' +link)

    if (link) {
      link.clicks++
      //console.log(link)
      await Link.update({ from: link.from, to: link.to, code: link.code, clicks: link.clicks }, {where: {id: link.id}}).catch(err=>console.log(err))
      //console.log(link.code)
      return res.redirect(link.from)
    }

    res.status(404).json('Ссылка не найдена')

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router