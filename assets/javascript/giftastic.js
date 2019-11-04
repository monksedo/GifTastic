$(document).ready(function () {

  // searchItem Array
  let searchItem = [];

  // Dislplay search Items
  function searchItemView() {

    let searchID = $(this).data('search');
    console.log(searchID);

    let searchAPI = "https://api.giphy.com/v1/gifs/search?api_key=ptzjh4nQoBW9XWrxjWosk5kdon70mN48&q=" +
      searchID + "&limit=10&offset=0&rating=G&lang=en";

    console.log(searchAPI);

    $.ajax({
      url: searchAPI,
      method: "GET"
    }).done(function (str) {
      let inputData = str.data;
      console.log(inputData);

      for (let i = 0; i < inputData.length; i++) {
        let addItem = $("<div class='gif'>");

        let rate = inputData[i].rate;
        let motionGif = inputData[i].images.fixed_height.url;
        let stillGif = inputData[i].images.fixed_height.url;
        let imgView = $("<img>");
        let pTag = $("</p>").text("Rate: " + rate);

        imgView.attr("src", stillGif);
        imgView.addClass("displayImgs");
        imgView.attr("data-state", "still");
        imgView.attr("data-still", stillGif);
        imgView.attr("data-animate", motionGif);
        addItem.append(pTag);
        addItem.append(imgView);
        $("gifItems").prepend(addItem);
      }
    });
  }

  // Submit
  $("#searchBtn").on("click", function (e) {
    e.preventDefault();
    let addSearch = $("#gifSearch").val().trim();
    searchItem.push(addSearch);
    console.log(searchItem);
    $("#gifSearch").val(' ');
    showSearchBtn();
  });

  function showSearchBtn() {
    $(".newBtn").empty();
    for (var i = 0; i < searchItem.length; i++) {
      let btn = $("<span class='searchItem'>");
      btn.attr("class", ".searchStr");
      btn.attr("data-search", searchItem[i]);
      btn.text(searchItem[i]);
      $(".newBtn").append(btn);
    }
  }

  showSearchBtn();

  // Click event on button id of show
  $(document).on("click", ".searchStr", searchItemView);

  // Click on gif to see animation
  $(document).on("click", ".displayImgs", stopMotionGif);

  // Function 
  function stopMotionGif() {
    let gifs = $(this).attr("data-state");
    if (gifs === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this.attr).attr("src", $(this).attr("data-still"));
      $(this.attr).attr("data-state", "still");
    }
  }
});