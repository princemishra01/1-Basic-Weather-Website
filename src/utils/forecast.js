const request = require('request')
const geocode = require('./geocode')

const forecast = (lat,long, callback)=>{

const url ='http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + long + '&appid=97a5c4710c350ddcdb47b20d8eed1051&units=metric'

request({url ,json : true}, (error,{body}) =>{
    if(error){
        callback('there is some netwok error', undefined)
    } else if(body.message) {
        callback('the addres is not ok try other one' , undefined)
    } else{
        callback(undefined, {
            temperature : body.main.temp ,
            description : body.weather[0].description, 
            humidity : body.main.humidity ,
            windSpeed : body.wind.speed
        })
    }
})
}


module.exports = forecast