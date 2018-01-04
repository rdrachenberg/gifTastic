$(document).ready(function(){
// global variables to populated buttons
  var animals = ["Bat", "Cat", "Bear", "Tiger", "Dog", "Monkey", 
  "Snake", "Cougar", "Fish", "Flying Squirrel", "Grasshopper", 
  "Shark", "Giraffe"];

  // creates a variable called overflow and equals it to an empty array to be filled later
  var overflow = [];
  
  // creates a variable called textInput equal to the overflow array
  var textInput = overflow;
  // creates a variable btn and defines all buttons as that var  
  var btn = $("<button>");
  // creates variable s and defines input as that var
  var s = $("<input>");
  
// Function to Display buttons dynamically from animals array
      function addButtons() {
        //loop through the length of the animals array
        for (var i = 0; i < animals.length; i++) {
          // Dynamicaly generate buttons for each string listed in array
          var z = $("<button>");
          // Adding class of animals to our button
          z.addClass("animals");
          // Adding data-search attribute and looking at each string in animals variable
          z.attr("data-search", animals[i]);
          // Providing the initial button text
          z.text(animals[i]);
          // Adding the button to the animals-view div
          $("#animals-view").append(z);
        }
        // executes the giphyCall function
        giphyCall();
      };
      // executes the addButtons function
      addButtons();

    function giphyCall() {
       // button on click listener function for AJAX Query 
      $('button').on('click', function(){
        //declares v variable to look in the data search area
      var v = $(this).data('search');
        // holds giphy API query variable
      var queryURL = ("https://api.giphy.com/v1/gifs/search?q=("+ v +")&api_key=gnPcnf9Mt3R3VMryknoAcv9HUzbbpqZT&limit=12");
      
      // Executes the AJAX call
        $.ajax({
        url: queryURL,
        method: 'GET'
        }).done(function(response) {

          var results = response.data;
          // loop through the length of the AJAX response 
          for(i = 0; i < results.length; i++){
          //defines secondDiv variable equal to <div> on html    
          var secondDiv = $('<div id="myDiv" class="myDiv" >');
          //defines var p as html <p> and puts the AJAX response in text (rating) on html            
          var p = $('<p>').text("Rating: "+results[i].rating);
          // creates variable gifReturnImage and assigns image attributes
          var gifReturnImage = $('<img type="text/javascript" src="results[i].images.fixed_height.url" data-still="results[i].images.fixed_height_still.url" data-animate="results[i].images.fixed_height.url" data-state="still" id="still" class="image">');
          // attached an attribute to gifReturnImage variable from AJAX call 
          gifReturnImage.attr('src', results[i].images.fixed_height_still.url);
          // creates variable gifReturn and assigns image attributes 
          var gifReturn = $('<img type="text/javascript" src="results[i].images.fixed_height.url" data-still="results[i].images.fixed_height_still.url" data-animate="results[i].images.fixed_height.url" data-state="still" id="animate" class="gif">');
          // attached an attribute to gifReturn variable from AJAX call        
          gifReturn.attr('src', results[i].images.fixed_height.url);
          // prepends our secondDiv with the variable p          
          secondDiv.prepend(p);
          // prepends our <div> with a paragraph id and adds rating of gif from AJAX call                      
          secondDiv.prepend(gifReturn);
          // prepends our <div> with the still image                       
          secondDiv.prepend(gifReturnImage);
          // this is the id target of where we want our gifs to go                 
          $('#gifsLoadHere').prepend(secondDiv);
          // this handles applying an initializing a class to the gif images of hidden
          $('.gif').addClass("hidden").removeClass('.gif'); 
         // Executes hover function
         hover();
          
          }
        });
      });
    };

    // handles the hover over gif function to change image
    function hover() {
      // monitors the image class as a mouse hover event
      $(".image").hover(function() {  
        // selects the current hidden class and then adds class of gif to the previously changed gif class, then removes the hidden class
        $(" .hidden").addClass('gif').removeClass('hidden').ready();
        // selects the image class and fades off the image class. Then assigns a class of hidden before removing the image class.   
        $(".image").fadeOut(10).addClass('hidden').removeClass('image');
      
      });
    };
      // Pushes animalInput to Animals array and calls addButtons functions
    $("#animalButton").on("click", function(event) {
        // prevents the normal default event from occuring
        event.preventDefault();

        // emptys the animals-viewButtons div and replaces it with the newly created input button. This is to prevent it from creating duplicate buttons
        $("#animals-view2Buttons").empty();
        // creates variable animalInput and sets that value equal to the value in the animalInput tag, then trims that value 
        var animalInput = $("#animalInput").val().trim();
        // pushes the data collected in animalInput and pushes it to our empty overflow array
        overflow.push(animalInput);
        // creates a loop to add button from animalInput var/ animalInput tag
        for (var i = 0; i < overflow.length; i++) {
          // Dynamicaly generate buttons for each string listed in array
          var t = $("<button>" + s);
          // Adding class of animals to our button
          t.addClass("overflow");
          // Adding data-search attribute and looking at each string in overflow variable
          t.attr("data-search", overflow[i]);
          // Providing the initial button text
          t.text(overflow[i]);
          // Adding the button to the view2Buttons div
          $("#animals-view2Buttons").append(t);
        }
        giphyCall();
    }); //ends on submit "click" funciton 
  hover();

}); //end of docuemnt ready function

