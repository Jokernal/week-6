/*get todays date*/
var today = moment().format('MMMM Do, YYYY');
$("#current-date").html(today);

/*Api logic*/
function searchForecast(city)
{
    var owApiKey = "4ac6ce3097194ce7da025a4a02a5e210"
    var owApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + owApiKey;
    var owfApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + owApiKey;
   
    
    $.ajax({
        url: owApiUrl, owfApiUrl,
        method: 'GET'       
    })

        .then(function(response){
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var humidity = response.main.humidity;
            var wind = response.wind.speed;
            
            var temp = response.main.temp;
            var icon = response.weather.icon;
            var owURl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&appid=" + owApiKey;

            
            $.ajax ({
                url: owURl,
                method: 'GET'

            })

                .then(function(response){
                    
                    var uvi = response.hourly.uvi;
                    $('weather-conditions').empty();
                    var weatherDiv = $('<div class ="index-items">').html("<li></li> Temp: " + temp + "." + "<li></li> humidity: " + humidity + "." + "<li></li> wind: " + wind + "." + "<li></li> uvi: " + uvi + "." + "<li></li> icon: " + icon + "."  )
                    $('#weather-conditions').html(weatherDiv);
                    console.dir(uvi);
                    console.dir(icon);

                })
           
                    
            
           

                
            




        })
}
/*location search logic*/
$("#search-btn").on("click", function (event) {
    event.preventDefault();
    // set and save searched city variable to localstorage //
    var saved = [];
    var savedSearches = JSON.parse(localStorage.getItem('city'));
    if (savedSearches) {
      //  console.log(savedSearches);
        saved.push(...savedSearches);
    }
    var citySearch = $("#city-input").val().trim();
    //citySearch = citySearch.toLowerCase();
    if (saved.includes(citySearch)) {
        return;
    }
    //var savedSearch = $(this).siblings("input").val();
    saved.push(citySearch)
    console.log(saved);
    localStorage.setItem('city', JSON.stringify(saved));

    searchForecast(citySearch);
    var searchHistory = $("<button class='styled-btn btn button is-dark is-outlined is-rounded is-fullwidth'>").text(citySearch);
    var divEl = $("<div>");
    divEl.append(searchHistory)
    $("#search-history").prepend(divEl);
    $("#city-name").text(citySearch);
});



function loadSaved() {
    var searchedItems = JSON.parse(localStorage.getItem('city'));
    if (searchedItems) {
        for (let index = 0; index < searchedItems.length; index++) {
            const searchedItem = searchedItems[index];
            var searchHistory = $("<button class='styled-btn btn button is-dark is-outlined is-rounded is-fullwidth'>").text(searchedItem);
            var divEl = $("<div>");
            divEl.append(searchHistory)
            $("#search-history").prepend(divEl);
        }
    }
}
$("#search-history").on('click', '.btn', function (event) {
    event.preventDefault();
    //searchForecast($(this).text());
    searchForecast($(this).text());
    $("#city-name").text($(this).text());
});
loadSaved();