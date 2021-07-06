const request = require('request')

const geocode =(address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJpbmNlbWlzaHJhIiwiYSI6ImNrcG8xam8yejBscmQycG13N2R0bnZsYXMifQ.H1FnySCgUS-LEw67V71vNw'

    request({ url , json : true},(error , {body}) =>{
        if(error){
            callback('unable to connect to location service', undefined)
        } else if (body.features.length === 0){
            callback('unable to find location , Try another search' , undefined)
        } else{
            callback(undefined ,{
                latitude : body.features[0].center[1] ,
                longitude : body.features[0].center[0] ,
                location : body.features[0].place_name ,
            })
        }
    })
}

module.exports = geocode