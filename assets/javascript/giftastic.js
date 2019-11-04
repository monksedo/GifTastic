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

        let rate = inputDate[i].rate;
        let motionGif = inputData[i].images.fixed_height.url;
        let stillGif = inputData[i].images.fixed_height.url;
        let imgView = $("<img>");
        let pTag = $("</p>").text("Rate: " + rate);

        imgView.attr("src", stillSrc);
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
    $("#gifSearch").vale(' ');
    showSearchBtn();
  });

  function showSearchBtn() {
    $("#newBtn").empty();
    for (var i = 0; i < searchItem.length; i++) {
      let btn = $('<button class="btn btn-primary">');
      a.attr("id", "show");
      a.attr("data-search", searchItem[i]);
      a.text(searchItem[i]);
      $("#newBtn").append(btn);
    }
  }




})