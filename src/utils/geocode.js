const request = require('request')

const geoCode = (address, callback)=>{
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoicml6YWw4NSIsImEiOiJja2VhbXh3aTYwMGZoMnJxczcxcWo1dDVnIn0.qLxPz5V4B-4MkAfHn7M1QQ&limit=1`
    request({url, json : true}, (error, {body})=>{
        if(error){
            callback('Unable To Connect To Weather Service !', undefined)
        }else if(body.features < 1){
            callback('Location Not Valid. Try Another Search !', undefined)
        }else{
            callback(undefined, {
                longitude : body.features[0].center[1],
                latitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode