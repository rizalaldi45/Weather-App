const request = require('request')

const forecast = (long, lat, callback)=> {
    let url = `http://api.weatherstack.com/forecast?access_key=55fbe259a678a04e7bc4674dbfd6bf3f&query=${long},${lat}`
    request({url, json : true}, (error, {body})=>{
        if(error){
            callback('Unable To Connect To Weather Service !', undefined)
        }else if(body.success === false){
            callback('Cant Found Your Location :(', undefined)
        }else{
            callback(undefined, `Its ${body.current.weather_descriptions[0]}. This is current ${body.current.temperature} C degrees out. There is a ${body.current.precip} chance of rain. The humidity its ${body.current.humidity} & pressure is ${body.current.pressure}`)
        }
    })
 
}

module.exports = forecast