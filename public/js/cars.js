"use strict";

// this is the base API url
var baseUrl = "http://mimeocarlisting.azurewebsites.net/api/cars/";
var pageNum = 3

function formatCars(carsJSON) {
  // this function should return a string of properly formatted html
  // refer to app/views/index.erb lines 16 - 22 for an example of how
  // to format three cars, each in a div with a class "col-md-4", in a 
  // div with a class "row"
    var bigString = carsJSON.map(function(obj) { return `<div class="col-md-4 car"><h2>${obj.Make}</h2><p><strong>Model:</strong>${obj.Model}</p><p><strong>Year:</strong> ${obj.Year}</p></div>`}).join('')
    return `<div class="row"> ${bigString} </div>`
}


function addCarsToDOM(carsJSON) {
  // this function should pass carsJSON to formatCars() and then 
  // add the resulting HTML to the div with an id of "cars"
    $('#cars').append(formatCars(carsJSON));
}

function fetchJSON() {
    // this function will make the ajax call
    // on success of the ajax call, it will pass the returned data
    // to addCarsToDOM()
    var myUrl = baseUrl + `/${pageNum}/3`
    $.ajax({
        url: myUrl,
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (data) {
            addCarsToDOM(data)
            pageNum += 1
        },
        error: function (response) {
            $("body").text("OH NO!")
        }
    });
}