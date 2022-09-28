var btnSearch = $("#searchBtn");
btnSearch.on("click", function(e){
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
        console.log(data)
        for (i=0; i<data.data.length; i++){
            var item = document.createElement("embed");
            item.setAttribute("src", data.data[i].embed_url);
            // item.setAttribute("data-source", data.data[i].
            item.addEventListener("click", function(event){
                event.preventDefault();
                window.open(this.getAttribute("src"), "_blank")
            })
            results.appendChild(item);
        }
    })
    // imgur API call
    fetch("https://api.imgur.com/3/gallery/search/?client_id=5e93bca5a9f11ff&client_secret=f83fdaa89a4073b6c0fcce78cda83b9894979360&perPage=5&q=" + search.value )
    .then(function(response){
        return response.json()
    })
    .then (function(e){
        console.log(e.data.length)
        for(var i=0;i<e.data.length;i++){
            try{
                for(var v=0;v<e.data[i].images.length;v++){
                    var item = document.createElement("embed");
                    item.setAttribute("src", e.data[i].images[v].link)
                    item.addEventListener("click", function(event){
                        event.preventDefault();
                        window.open(this.getAttribute("src"), "_blank")
                    })
                    results.appendChild(item);
                }
            }
            catch{
                console.log("No images found", e.data[i]);
                var item = document.createElement("embed");
                item.setAttribute("src", e.data[i].link)
                item.addEventListener("click", function(event){
                    event.preventDefault();
                    window.open(this.getAttribute("src"), "_blank")
                })
                results.appendChild(item);
            }
        }
    })
})