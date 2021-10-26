var userForm = document.querySelector("#submit-form");
var monthInput = document.querySelector("#month");
var dayInput = document.querySelector("#day");
var factContainer = document.querySelector("#results-container");
var dateSearch = document.querySelector("#date-search");
var quoteContainer = document.querySelector("#activity-container");




var getFacts = function(birthMonth, birthDay) {

    var funFacts = "https://byabbe.se/on-this-day/" + birthMonth + "/" + birthDay + "/events.json"

    $.get(funFacts, function( data ) {
        $( ".result" ).html( data );
        displayFacts(data, birthMonth, birthDay)
        
    })
};

var getQuote = function() {

    $.get( "https://quote-garden.herokuapp.com/api/v3/quotes/random?count-1", function( data ) {
        $( ".result" ).html( data );
        console.log(data);
        displayQuote(data);
      });
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
        factContainer.textContent = "Please enter a valid date";
        return;
    }
};

var displayFacts = function(facts, birthMonth, birthDay) {
    if (facts.events.length === 0) {
        factContainer.textContent = "No facts for this date";
        return;
    }

    factContainer.textContent = "";
    dateSearch.textContent = " Below are events in history from " + birthMonth + "/" + birthDay;
    dateSearch.style.cssText =
    "font-size: 30px; font-weight: bold; font-style: italic;";
    var eventsData = facts.events;
    console.log(eventsData);
    console.log(birthMonth + "/" + birthDay);

    for (var i = 0; i < eventsData.length; i++) {
        var dateStyle = eventsData[i].year ;
        var regEvent = eventsData[i].description;
        var dateFacts = dateStyle + ": " + regEvent;
        var factDiv = document.createElement("div");
        var factTitle = document.createElement("span");
        factTitle.textContent = dateFacts;
        factDiv.appendChild(factTitle);
        factContainer.appendChild(factDiv);
        factTitle.style.cssText = "font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;";
    }
};

    var displayQuote = function(quote) {
    if (quote.data.length === 0) {
        factContainer.textContent = "Quote not available";
        return;
    }

    quoteContainer.textContent = "";
    var quoteData = quote.data;
    console.log(quoteData);

    for (var i = 0; i < quoteData.length; i++) {
        var quoteText = quoteData[0].quoteText;
        var quoteAuthor = quoteData[0].quoteAuthor;
        var quoteEl = '"' + quoteText + '"' + "    -    " + quoteAuthor;
        var quoteDiv = document.createElement("div");
        var divTitle = document.createElement("span");
        divTitle.textContent = quoteEl;
        quoteDiv.appendChild(divTitle);
        quoteContainer.appendChild(quoteDiv);
    }
}



userForm.addEventListener("submit", submitHandler);


getQuote();

setInterval(function(){ getQuote(); }, 7000);
