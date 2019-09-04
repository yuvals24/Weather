const tempManager = new TempManager()
const render = new Renderer()

async function loadPage() {
    const cities = await tempManager.getDataFromDB()
    render.renderData(tempManager.cityData)
}

async function handleSearch() {
    const cityinput = $("#city-input").val()
    $("#city-input").empty()
    await tempManager.getCityData(cityinput)
    render.renderData(tempManager.cityData)
}

$('body').on('click', '.fa-save', function () {
    let cityName = $(this).siblings('.name').text()
    tempManager.saveCity(cityName)
})


$('body').on('click', '.fa-trash-alt', function () {
    let cityName = $(this).siblings('.name').text()
    tempManager.removeCity(cityName)
    render.renderData(tempManager.cityData)
})


