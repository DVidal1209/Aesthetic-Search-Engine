// Adding local storage
var previousMedia = [];
var previousKeyword = [];
var btnSearch = document.getElementById("searchBtn");
var historyEl = document.getElementById("history");

//Search Function
function search(e){
    e.preventDefault();
    document.getElementById("searchResults").innerHTML="";
    var search = document.getElementById("search");
    var results = document.getElementById("searchResults");
    var format = document.getElementById("format");


    if (e.target.classList.contains("previousSearch")){
        search.value = e.target.dataset.search;
        format.value = e.target.dataset.format; 
    }
    // Giphy API call
    fetch("https://api.giphy.com/v1/gifs/search?api_key=bwocb4KLlWPjMVn0GRDP3Dnzb0jsGyhW&q=" + search.value + "%20" +format.value + "&limit=20&offset=0&rating=g&lang=en")
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
    fetch("https://api.imgur.com/3/gallery/search/?client_id=5e93bca5a9f11ff&client_secret=f83fdaa89a4073b6c0fcce78cda83b9894979360&perPage=5&q=" + search.value +  "%20" + format.value )
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

    //Add local storage for previous searches (keywords and drop-down menu items)
    previousMedia.unshift(format.value);
    localStorage.setItem("previousMedia", JSON.stringify(previousMedia));

    previousKeyword.unshift(search.value);
    localStorage.setItem("previousKeyword", JSON.stringify(previousKeyword));
    
    for (i=0; i<previousKeyword.length;i++){
        var btn = document.createElement("button");
        btn.setAttribute("class", "previousSearch");
        btn.innerHTML = (previousKeyword[i] + "<br>Format: " + previousMedia[i]);
        btn.setAttribute("data-format", previousMedia[i]);
        btn.setAttribute("data-search", previousKeyword[i]);
        historyEl.appendChild(btn);
    }
}


function init(){
    if(localStorage.previousKeyword === null || localStorage.previousKeyword === undefined){
        return;
    } else {
        previousKeyword = JSON.parse(localStorage.getItem("previousKeyword"));
        previousMedia = JSON.parse(localStorage.getItem("previousMedia"));
        for (i=0; i<previousKeyword.length;i++){
            var btn = document.createElement("button");
            btn.setAttribute("class", "previousSearch");
            btn.innerHTML = (previousKeyword[i] + "<br>Format: " + previousMedia[i]);
            btn.setAttribute("data-format", previousMedia[i]);
            btn.setAttribute("data-search", previousKeyword[i]);
            historyEl.appendChild(btn);
        }
    }
}

init()

// Search Button Event Listener
btnSearch.addEventListener("click", search);

// History button listener
historyEl.addEventListener("click", function(event){
    event.preventDefault();
    if (event.target.classList.contains("previousSearch")){
        search(event);
    }
})