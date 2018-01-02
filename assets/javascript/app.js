$(document).ready(function(){
// global variables to populated buttons
  var animals = ["Bat", "Cat", "Bear", "Tiger", "Dog", "Monkey", 
  "Snake", "Cougar", "Fish", "Flying Squirrel", "Grasshopper", 
  "Shark", "Giraffe"];

  var overflow = [];
  

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
        giphyCall();
      
      };
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
          // loop through the length of the AJAX response 
          for(i = 0; i < response.data.length; i++){
          //defines secondDiv variable equal to <div> on html    
          var secondDiv = $('<div>');
          //defines var p as html <p> and puts the AJAX response in text (rating) on html            
          var p = $('<p>').text("Rating: "+response.data[i].rating);
                      
          var gifReturnImage = $('<img src="response.data[i].images.fixed_height.url" data-still="response.data[i].images.fixed_height_still.url" data-animate="response.data[i].images.fixed_height.url" data-state="still" class="gif">');

          var gifReturn = $('<img src="response.data[i].images.fixed_height.url" data-still="response.data[i].images.fixed_height_still.url" data-animate="response.data[i].images.fixed_height.url" data-state="still" class="gif">');
        
          gifReturn.attr('src', response.data[i].images.fixed_height.url);

          gifReturnImage.attr('src', response.data[i].images.fixed_height_still.url);

          // gifReturnImage.attr('src',response.data[i].images.fixed_height.url);
          
          secondDiv.prepend(p);
                      
          secondDiv.prepend(gifReturnImage);
                  
          $('#gifsLoadHere').prepend(secondDiv);
          hover();
          }
        });
      });
    };

// Handles the hover over gif function to change image
    function hover() {

      $(".gif").hover(function() {      
      
      var v = $(this).data('search');
      
      // holds giphy API query variable
      var queryURL = ("https://api.giphy.com/v1/gifs/search?q=("+ v +")&api_key=gnPcnf9Mt3R3VMryknoAcv9HUzbbpqZT&limit=12");
        
      // Executes the AJAX call
        $.ajax({
        url: queryURL,
        method: 'GET'
        }).done(function(response) {
          
        for(i = 0; i < response.data.length; i++){
          
          var gifReturn = $('<img src="response.data[i].bitly_gif_url" data-still="response.data[i].images.fixed_height_still.url" data-animate="response.data[i].bitly_gif_url" data-state="still" class="gif">'); 
          
          console.log(response);
          console.log(gifReturn);

          var state = $(this).attr("data-state")

          console.log(state);

          var dataStill = [response.data[i].images.fixed_height_still];

          var dataAnimate = [response.data[i].bitly_gif_url];

          dataAnimate = $("animate");

          dataStill = $("still");
              
          if (state === "still") {
                  
            $(this).attr([dataAnimate], $(this).attr("data-animate"));
                
          $(this).attr("data-state", "animate");
                
          } else {
                
            $(this).attr([dataStill], $(this).attr("data-still"));
                
          $(this).attr("data-state", "still");
                
          };

          gifReturn.attr('src', response.data[i].images.fixed_height.url);

          $('#gifsLoadHere').attr('src', response.data[i].images.fixed_height.url);     
        };     
        });
      });         
    };

      // Pushes animalInput to Animals array and calls addButtons functions
    $("#animalButton").on("click", function(event) {
        
        event.preventDefault();

        $("#animals-view2Buttons").empty();

        var animalInput = $("#animalInput").val().trim();
      
        overflow.push(animalInput);

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


}); //end of docuemnt ready function

