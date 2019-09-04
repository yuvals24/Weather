class Renderer {
    constructor ()
    { }
    
    renderData(allCityData)
    {
        $('.container').empty()
        const source = $('#city-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({ cities: allCityData })
        $('.container').append(newHtml)
    }
}
