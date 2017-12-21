$(document).ready(function(){

// global variables to populated buttons
  var animals = ["Bat", "Cat", "Bear", "Tiger", "Dog", "Monkey", 
  "Snake", "Cougar", "Fish", "Goat", "Flying Squirel", "Grass Hopper", 
  "Shark", "Giraffe",];
  
  var btn = $("<button>");

  var s = $("<input>");
  
// Function to Display buttons dynamically from animals array
      function addButtons() {
//*************NEEDS ATTENTION LINE 16 ***********************
        // Deleting the animals prior to adding new animals
        $("#animals-view").empty();
        $("#animals-view").add(animals[i]++);
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
          // Dynamicaly generate buttons for each animal listed in array
          var z = $("<button>");
          
          // Adding z class of animal to our button
          z.addClass("animals");
          // Adding z data-attribute
          z.attr("data-search", animals[i]);
          // Providing the initial button text
          z.text(animals[i]);
          // Adding the button to the animals-view div
          $("#animals-view").append(z);
        }
        // button on click listener function for AJAX Query 
        $('button').on('click', function(){
        //declares v variable to look in the data search area
        var v = $(this).data('search');
        // holds giphy API query variable
        var queryURL = ("https://api.giphy.com/v1/gifs/search?q=("+ v +")&api_key=gnPcnf9Mt3R3VMryknoAcv9HUzbbpqZT&limit=10");
        // Executes the AJAX call
          $.ajax({
          url: queryURL,
          method: 'GET'
          }).done(function(response) {
            // loop through the length of the AJAX response 
            for(i=0; i < response.data.length; i++){
              
              var frustratedDiv = $('<div>');
                      
              var p = $('<p>').text("Rating: "+response.data[i].rating);
                      
              var frustratedImage = $('<img>');
                      
              frustratedImage.attr('src',response.data[i].images.fixed_height.url);
                      
              frustratedDiv.prepend(p);
                      
              frustratedDiv.prepend(frustratedImage);
                      
              $('#gifsLoadHere').prepend(frustratedDiv);
               console.log(response);
            }
          });
        });
      }
      // Pushes animalInput to Animals array and calls addButtons functions
    $("#animalInput").on("change", function(event) {
        
        event.preventDefault();

        var animalInput = $("#animalInput").val();
      
        animals.push(animalInput);

        addButtons();

    });

      // API Call when button is clicked
    // $(document).on('click' , addButtons); 
      
      addButtons();
       
}); //end of docuemnt ready function
