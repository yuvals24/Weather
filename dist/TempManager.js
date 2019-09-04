class TempManager {
    constructor() 
    {
        this.cityData = []
    }

    async getDataFromDB() 
    {
        const cities = await $.get('/cities')
        if (cities) {
            this.cityData = cities
        }
    }

    async getCityData(cityName) 
    {
        const newcity = await $.get('/city/' + cityName)
        if (this.cityData.some(c => c.name === newcity.name)) {
            console.log('This city is already excist')
        }
        else {
            this.cityData.push(newcity)
        }
    }

    async saveCity(cityName) 
    {
        const cityData = await $.get('/city/' + cityName)
        const allCities = await $.get('/cities')
        if (allCities.some(c => c.name === cityName))
        {
            console.log('This city is already excist')
        }
        else {
            await $.post('/city', cityData)
            console.log(`${cityName} saved!`)
        }
    }

    removeCity(cityName) {
        let cityIndex = this.cityData.findIndex(c => c.name === cityName)
        this.cityData.splice(cityIndex, 1)
        $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: function (cityinput) {
                console.log(`your city : "${cityinput}" is being deleted from your page!`)
            }
        })
    }
}

