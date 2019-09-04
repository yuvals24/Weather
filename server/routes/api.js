const express = require('express')
const router = express.Router()
const request = require('request-promise')
const API_KEY = 'f153d758295b47838b4113211191007'
const City = require('../model/City')

router.get('/city/:cityName', async (req, res) => {
    const cityName = req.params.cityName
    let response = await request.get(`http://api.apixu.com/v1/current.json?key=${API_KEY}&q=${cityName}`)
    response = JSON.parse(response)
    const cityCondition = {
        temperature: response.current.temp_c,
        name: response.location.name,
        conditionPic: response.current.condition.icon,
        condition: response.current.condition.text,
        updatedAt: response.location.localtime
    }
    res.send(cityCondition)
})


router.get('/cities', (req, res) => {
    City.find({}, function (err, response) {
        res.send(response)
    })
})

router.post('/city', (req, res) => {
    const data = req.body
    let city1 = new City(data)
    city1.save()
    res.end()
})

router.delete('/city/:cityName', function(req,res){
    let cityName = req.params.cityName
   City.findOneAndDelete({name:cityName}).exec()
   res.send(cityName)
})


module.exports = router
