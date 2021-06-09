const express = require('express')
const config = require('config')
const path = require('path')
const Sequelize = require("sequelize")
const db = require('./db')
const User = require('./models/User')
const app = express()
/*
db.sync({force:true}).then(()=>{
	console.log("Tables have been created");
  }).catch(err=>console.log(err)); 
*/

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  
	app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
  }

const PORT = config.get('port') || 5000

async function start() {
	try {
		
		await db.authenticate()
				.then(() => console.log('Database connected...'))
				.catch(err => console.log('Error:' + err))
		await db.sync()
				.then(() => console.log('Database syncsynchronized'))
				.catch(err => console.log('Error:' + err))
		app. listen(PORT, () => console.log('🌍 App has been started on port:', PORT))
	} catch (e) {
		console.log('Server Error', e.messege)
		process.exit(1)
	}

}

start()



