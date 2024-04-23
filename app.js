const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const inputPlaceholder = document.getElementById("searchInput").placeholder
const searchBtn = document.getElementById('searchBtn');
const imageContainer = document.querySelector('.image-container');
const loader = document.getElementById('loader');
const search_error__text = document.querySelector('.search_error__text');
const sectionTitle = document.querySelector(".section-title");
const messageCreate = document.getElementById("message-create");
const back_home = document.querySelector('.back_home');
const more = document.getElementById("more");


// darkmode
const darkmode = document.querySelector(".darkmode");
const body = document.querySelector('body');
const dark_icon = document.querySelector('.dark_icon');
const ligth_icon = document.querySelector('.ligth_icon');


if (localStorage.getItem("darkMode") === "dark") {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    dark_icon.classList.add("light_icon_hidden");
    ligth_icon.classList.remove("dark_icon_hidden");
    ligth_icon.setAttribute("src", "./images/light_icon.png");
} else if (localStorage.getItem("darkMode") === "light"){
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    dark_icon.setAttribute("src", "./images/night.png");
    ligth_icon.classList.add("dark_icon_hidden");
    dark_icon.classList.remove("light_icon_hidden");

}

darkmode.addEventListener( "click", () =>{
    if(document.body.classList.contains("light")){
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        dark_icon.classList.add("light_icon_hidden");
        ligth_icon.classList.remove("dark_icon_hidden");
        localStorage.setItem("darkMode", "dark");
    }
    else{
        document.body.classList.add('light');
        document.body.classList.remove('dark')
        ligth_icon.classList.add("dark_icon_hidden");
        dark_icon.classList.remove("light_icon_hidden");
        localStorage.setItem("darkMode", "light");
    }
})

loader.classList.remove('hidden')
// search btn click
searchBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    if(searchInput.value.trim().length){
        getItem(searchInput.value);
        more.classList.remove('hidden');
    }
    else{
        ShowError("message-create", "Please enter the some text !")
    }
    more.addEventListener('click', (e) =>{
        e.preventDefault();
        if(searchInput.value.trim().length){
            getItem(searchInput.value, 30); 
            more.classList.add('hidden');
        }
        else{
            ShowError("message-create", "Please enter the some text !")
        }
    })
});


// get item fetch
function getItem(dataType, count=15){
    
    fetch(`https://api.unsplash.com/search/photos?client_id=GFPtqSaf0JvrDfJdzq5omYNTE-UBdV6UKMqZCxmkuC8&query=${dataType}&per_page=${count}`)
        .then((res) => res.json())
        .then((data) => {
            sectionTitle.innerHTML = dataType
            loader.classList.add('hidden');
            back_home.classList.add('hidden')
            // if(dataType=="dog"){
            //     searchInput.value = ''
            // }
            // else{
            //     searchInput.value = searchInput.value
            // }
            createItem(data.results)})
        .catch((error) =>{
            loader.classList.add('hidden');
            back_home.classList.remove('hidden');
        });
}

getItem("dog");


// create item
function createItem(data){
    imageContainer.innerHTML = ""
    data.forEach((item) => {
        imageContainer.innerHTML += `
        <div class='item_div'>
            <a href='${item.urls.regular}' target="_blank">
                <img src=${item.urls.regular} class='img' alt="">
            </a>
            <div class="like">
            <img src="./images/heart.png" class='like_img' width='30' alt="likes">
            <h4 class='like_count'>${item.likes}</h4>
            </div>
            </div>
            `
            
        });
        if(!imageContainer.innerHTML.length == 0){
            // sectionTitle.innerHTML = searchInput.value;
        }
        else{
            searchInput.value = "";
            sectionTitle.innerHTML = "Result not found";
            searchInput.placeholder = "";
            back_home.classList.remove('hidden');
            more.classList.add('hidden');
        }
    }
    
    // <button class="btn"><a href="${item.links.download}.jpg" download>Download</a></button>

// show error message
function ShowError(where, message){
    document.getElementById(`${where}`).textContent = message;
    
    setTimeout(() =>{
        document.getElementById(`${where}`).textContent = ''
        searchInput.value = ""
    }, 2000)
}

