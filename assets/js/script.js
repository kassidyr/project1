var userForm = document.querySelector("#submit-form");
var monthInput = document.querySelector("#month");
var dayInput = document.querySelector("#day");
var factContainer = document.querySelector("#results-container");
var dateSearch = document.querySelector("#date-search");



var getFacts = function(birthMonth, birthDay) {

    var funFacts = "https://byabbe.se/on-this-day/" + birthMonth + "/" + birthDay + "/events.json"

    fetch(funFacts).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            displayFacts(data, birthMonth, birthDay)
                });
        } else {
            alert("Not a valid date");
        }
    })
    
};

var submitHandler = function(event) {
    event.preventDefault();

    var monthEl = monthInput.value.trim();
    var dayEl = dayInput.value.trim();

    if (monthEl, dayEl) {
        getFacts(monthEl, dayEl);
        monthInput.value = "";
        dayInput.value = "";
    } else {
        alert("Please enter a date")
    }
};

var displayFacts = function(data, birthMonth, birthDay) {
    if (data.events.length === 0) {
        factContainer.textContent = "No facts for this date";
        return;
    }

    factContainer.textContent = "";
    dateSearch.textContent = " Below are events in history from " + birthMonth + "/" + birthDay;
    var eventsData = data.events;
    console.log(eventsData);
    console.log(birthMonth + "/" + birthDay);

    for (var i = 0; i < eventsData.length; i++) {
        var dateFacts = eventsData[i].year + ": " + eventsData[i].description;
        var factDiv = document.createElement("div");
        var factTitle = document.createElement("span");
        factTitle.textContent = dateFacts;
        factDiv.appendChild(factTitle);
        factContainer.appendChild(factDiv);
        
    }
}



userForm.addEventListener("submit", submitHandler);

