const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname ,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
 

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Prince Mishra",

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Prince Mishra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Prince Mishra',
        msg: 'Hi i have help to give you'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            Error : 'Please provide the Address'
        })
    }

    let address =  req.query.address

    geocode(address, (error, {latitude,longitude ,location} = {}) => {
        if (error) {
            return res.send({error})
        }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                     forecast : forecastData ,
                     location ,
                     address 
                })
            })
        })
})

app.get('/help/*' , (req, res) =>{
    res.render('404',{
        title : '404' ,
        name : 'Prince Mishra' ,
        errorMessage  : 'This help page cant be found'
    })
})

app.get('*' , (req,res) =>{
    res.render( '404', {
        title : '404' ,
        name : 'Prince Mishra' ,
        errorMessage : 'My 404 error'
    }
    )
})

app.listen(3000, () => [
    console.log('the server is running')
])