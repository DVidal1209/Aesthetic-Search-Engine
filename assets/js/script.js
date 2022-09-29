var btnSearch = document.getElementById("searchBtn");
btnSearch.addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("searchResults").innerHTML="";
    var search = document.getElementById("search");
    var results = document.getElementById("searchResults");

    // Giphy API call
    fetch("https://api.giphy.com/v1/gifs/search?api_key=bwocb4KLlWPjMVn0GRDP3Dnzb0jsGyhW&q=" + search.value + "&limit=20&offset=0&rating=g&lang=en")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        // Create embed gifs from GIPHY
        for (i=0; i<data.data.length; i++){
            var item = document.createElement("embed");
            item.setAttribute("src", data.data[i].embed_url);
            item.setAttribute("class", "emb");
            results.appendChild(item);
        }
    })
    // imgur API call
    fetch("https://api.imgur.com/3/gallery/search/?client_id=5e93bca5a9f11ff&client_secret=f83fdaa89a4073b6c0fcce78cda83b9894979360&perPage=5&q=" + search.value )
    .then(function(response){
        return response.json()
    })
    .then (function(e){
        for(var i=0;i<e.data.length;i++){
            try{
                // Create embed images from Imgur album
                for(var v=0;v<e.data[i].images.length;v++){
                    var item = document.createElement("embed");
                    item.setAttribute("src", e.data[i].images[v].link);
                    item.setAttribute("class", "emb");
                    results.appendChild(item);
                }
            }
            catch{
                // Create embed images from Imgur Image
                var item = document.createElement("embed");
                item.setAttribute("src", e.data[i].link);
                item.setAttribute("class", "emb");
                results.appendChild(item);
            }
        }
    })

    // Click handler to open image on click in new tab
    results.addEventListener("click", function(event){
        event.preventDefault()
        if(event.target.classList.contains("emb")){
            window.open(event.target.getAttribute("src", "_blank"));
        }
    })
})