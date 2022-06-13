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
            var wind = response.main.wind_speed;
            var uvi = response.main.uvi;
            var temp = response.main.temp;


            
            
           
                    
            console.log(humidity);
            console.log(wind);
            console.log(temp);
            console.log(uvi);
                
            




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