var btnSearch = $("#searchBtn");
btnSearch.on("click", function(e){
    e.preventDefault();
    var search = document.getElementById("search");
    var results = document.getElementById("searchResults");
    // Youtube API call
    fetch('https://youtube.googleapis.com/youtube/v3/search?q='+ search.value + '&type=video&key=AIzaSyBM_6wUXV8lxTERcx1o0Gu144Zb18TsCbk')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.items.length, data);
        for (var i=0; i<data.items.length; i++){
            var item = document.createElement("embed");
            item.setAttribute("src", "https://www.youtube.com/embed/" + data.items[i].id.videoId);
            // console.log("https://www.youtube.com/watch?v=" + data.items[i].id.videoId);
            // results.appendChild(item);
            console.log(item)
        }
    })
    // Giphy API call
    fetch("https://api.giphy.com/v1/gifs/search?api_key=bwocb4KLlWPjMVn0GRDP3Dnzb0jsGyhW&q=" + search.value + "&limit=20&offset=0&rating=g&lang=en")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        for (i=0; i<data.data.length; i++){
            var item = document.createElement("embed");
            console.log(data.data[i].embed_url);
            item.setAttribute("src", data.data[i].embed_url);
            results.appendChild(item);
        }
    })
})