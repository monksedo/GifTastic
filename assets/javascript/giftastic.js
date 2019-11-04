///////////////////////////////////////////////////////////////////////////////////////////
// Begining Code

$(document).ready(function () {

  // searchItem Array
  let searchItem = [];

  // Dislplay search Items
  function searchItemView() {

    let searchID = $(this).data("search");
    console.log(searchID); // for testing purpose

    var searchAPI = "https://api.giphy.com/v1/gifs/search?api_key=ptzjh4nQoBW9XWrxjWosk5kdon70mN48&q=" + searchID + "&limit=10&offset=0&rating=G&lang=en";

    console.log(searchAPI); // for testing purpose

    $.ajax({
      url: searchAPI,
      method: "GET"
    }).done(function (str) {
      let inputData = str.data;
      console.log(inputData);  // for testing purpose

      for (let i = 0; i < inputData.length; i++) {
        let addItem = $("<div class='imgGroup'>");

        let rated = inputData[i].rating;
        let motionGif = inputData[i].images.fixed_height.url;
        let stillGif = inputData[i].images.fixed_height.url;
        let imgView = $("<img>");
        let pTag = $("<p>").text("Rated: " + rated.toUpperCase());

        imgView.attr("src", stillGif);
        imgView.addClass("displayImgs");
        imgView.attr("data-state", "still");
        imgView.attr("data-still", stillGif);
        imgView.attr("data-animate", motionGif);
        addItem.append(pTag);
        addItem.append(imgView);
        $(".gifItems").prepend(addItem);
      }
    });
  }

  // Add search keyword and button to the existing list
  $("#searchBtn").on("click", function (e) {
    e.preventDefault();
    let addSearch = $("#gifSearch").val().trim();
    searchItem.push(addSearch);
    console.log(searchItem); // for testing purpose
    $("#gifSearch").val("");
    showSearchBtn();
  });

  // Display the new search button
  function showSearchBtn() {
    $(".newBtn").empty();
    for (let i = 0; i < searchItem.length; i++) {
      let btn = $("<span>");
      console.log(btn); // for testing purpose
      btn.attr("class", "searchStr");
      btn.attr("data-search", searchItem[i]);
      btn.text(searchItem[i]);
      $(".newBtn").append(btn);
    }
  }

  showSearchBtn();

  // Click search on button id of show search images
  $(document).on("click", ".searchStr", searchItemView);

  // Click on gif to see animation
  $(document).on("click", ".displayImgs", stopMotionGif);

  // Function 
  function stopMotionGif() {
    let state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this.attr).attr("src", $(this).attr("data-still"));
      $(this.attr).attr("data-state", "still");
    }
  }
});