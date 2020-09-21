const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Path For Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars Engine And View Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory To Serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather App',
        name : 'Rizal Aldiansyah'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About Me',
        name : 'Rizal Aldiansyah'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title : 'Help Page',
        name : 'Rizal Aldiansyah',
        pesan : 'Rizalaldiansyah85@gmail.com'
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error : "Please Input Search Location !"
        })
    }
        geoCode(req.query.address, (error, {longitude,latitude,location} = {})=>{
            if(error){
                res.send({
                    error : error
                })
            }
        
            forecast(longitude, latitude, (error, forecastData) => {
                if(error){
                    return console.log(error)
                }
                res.send({ 
                    address : req.query.address,
                    location,
                    forecast : forecastData
                })
            })
        })    
    
})

app.get('/help/*', (req, res) => {
    res.render('no_article', {
        title : 'Help Article Not Found !',
        name : 'Rizal Aldiansyah'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name: 'Rizal Aldiansyah',
        errorMessage : 'Page Not Found !'
    })
})

app.listen(3000, ()=>{
    console.log('Your Server Running')
})