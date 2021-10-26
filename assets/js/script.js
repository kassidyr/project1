// global variables
var userForm = document.querySelector("#submit-form");
var monthInput = document.querySelector("#month");
var dayInput = document.querySelector("#day");
var factContainer = document.querySelector("#results-container");
var dateSearch = document.querySelector("#date-search");
var quoteContainer = document.querySelector("#activity-container");



// function to fetch events API
var getFacts = function(birthMonth, birthDay) {

    var funFacts = "https://byabbe.se/on-this-day/" + birthMonth + "/" + birthDay + "/events.json"

    $.get(funFacts, function( data ) {
        $( ".result" ).html( data );
        displayFacts(data, birthMonth, birthDay)
        
    })
};

// function to fetch quote API
var getQuote = function() {

    $.get( "https://quote-garden.herokuapp.com/api/v3/quotes/random?count-1", function( data ) {
        $( ".result" ).html( data );
        console.log(data);
        displayQuote(data);
      });
    };
  
// this function explains what happens when the submit button is clicked
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

// function that displays facts from API on screen
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

// function that displays quotes from API beneath header
var displayQuote = function(quote) {
    if (quote.data.length === 0) {
        factContainer.textContent = "Quote not available";
        return;
    }

    quoteContainer.textContent = "";
    var quoteData = quote.data;
    console.log(quoteData);

    // for loop to retrieve quotes from array 
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


// event listener for submit button below input field
userForm.addEventListener("submit", submitHandler);

// function call for fetching quotes from API
getQuote();

// refreshes quote function every 7 seconds for a new quote on screen
setInterval(function(){ getQuote(); }, 7000);
