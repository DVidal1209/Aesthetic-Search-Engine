// Adding local storage
var previousMedia = [];
var previousKeyword = [];
var btnSearch = document.getElementById("searchBtn");
var historyEl = document.getElementById("history");
var historyBtn = document.getElementById("showHistory");
var historyContent = document.querySelector(".historyContent");

//Search Function
function search(e){
    e.preventDefault();
    document.getElementById("searchResults").innerHTML="";
    var search = document.getElementById("search");
    var results = document.getElementById("searchResults");
    var format = document.getElementById("format");
    var searchData;

    // Checks to see whether or not a media type selection has been make
    if(format.value==="none"){
        searchData = search.value;
    } else {
        searchData = search.value + " " + format.value;
    }

    // Checks to see if the event being triggered is from the history section
    if (e.target.classList.contains("previousSearch")){
        search.value = e.target.dataset.search;
        format.value = e.target.dataset.format; 
    }
    // Giphy API call
    fetch("https://api.giphy.com/v1/gifs/search?api_key=bwocb4KLlWPjMVn0GRDP3Dnzb0jsGyhW&q=" + searchData + "&limit=20&offset=0&rating=g&lang=en")
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
    fetch("https://api.imgur.com/3/gallery/search/?client_id=5e93bca5a9f11ff&client_secret=f83fdaa89a4073b6c0fcce78cda83b9894979360&perPage=5&q=" + searchData )
    .then(function(response){
        return response.json()
    })
    .then (function(e){
        for(var i=0; i<20; i++){
            try{
                // Create embed images from Imgur album
                if (Array.isArray(e.data[i].images)){
                    for(var v=0;v<e.data[i].images.length;v++){
                        var item = document.createElement("embed");
                        item.setAttribute("src", e.data[i].images[v].link);
                        item.setAttribute("class", "emb");
                        results.appendChild(item);
                    }
                } else {
                    // Create embed images from Imgur Image
                    var item = document.createElement("embed");
                    item.setAttribute("src", e.data[i].link);
                    item.setAttribute("class", "emb");
                    results.appendChild(item);
                }
            }
            catch{
                return;
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
    
    historyContent.innerHTML = "";
    for (i=0; i<previousKeyword.length;i++){
        var btn = document.createElement("button");
        btn.setAttribute("class", "previousSearch");
        btn.innerHTML = (previousKeyword[i] + "<br>Format: " + previousMedia[i]);
        btn.setAttribute("data-format", previousMedia[i]);
        btn.setAttribute("data-search", previousKeyword[i]);
        historyContent.appendChild(btn);
    }
}

// Function to initialize the page
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
            historyContent.appendChild(btn);
        }
    }
}


// Search Button Event Listener
btnSearch.addEventListener("click", search);

// Click handler for history area (includes previous searches, and close history)
historyEl.addEventListener("click", function(event){
    event.preventDefault();
    if (event.target.classList.contains("previousSearch")){
        search(event);
    } else if (event.target.classList.contains("close")){
        historyEl.style.display="none";
    } else if (event.target.classList.contains("reset")){
        historyContent.innerHTML="";
        localStorage.removeItem("previousMedia");
        localStorage.removeItem("previousKeyword");
        previousMedia = [];
        previousKeyword = [];
    }
})

// History button listener to show history
historyBtn.addEventListener("click", function(event){
    event.preventDefault();
    historyEl.style.display="flex";
})


// Added event listener to search input box so the search button is clicked when the enter key is pressed
document.getElementById("search")
.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        btnSearch.click();
    }
});

// calls initialization function on page startup
init()