const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')

const app = express()
const port = services.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//console.log(publicDirectoryPath)

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Enter an address in query'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        weatherstack(data.place_name, (error, weatherData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                temperature: weatherData.temperature,
                feelslike: weatherData.feelslike,
                place_name: weatherData.place_name,
            })
        })
    })

    // res.send({
    //     name: 'Aman',
    //     age: 21,
    //     address: req.query.address
    // })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Aman Panjwani',
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aman Panjwani',
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Aman Panjwani',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page',
        name: 'Aman Panjwani',
        errorMessage: 'Help Page error'
    })
})
app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Help Page',
        name: 'Aman Panjwani',
        errorMessage: 'Page not Found'
    })
})



app.listen(port, () => {
    console.log('Server running')
})