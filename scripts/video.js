/*
1. Fetch , Load and show categories on html
    --> Create loadCategories
    --> create displayCategories
*/

//Create loadCategories function
const loadCategories = () => {
    //Fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
}

const loadCategoryVideos = (id) => {
    //alert(id);
    //Fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        // sob button theke active class remove
        removeActiveClass();

        // active btton e active class add
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active');
        displayVideos(data.category);
    })
    .catch((error) => console.log(error));

}

// remove active class
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for(let btn of buttons){
       btn.classList.remove('active');
    }
}

//displayCategories  function
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');

    categories.forEach((item) => {
        console.log(item);

        /*
        //create a button
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;

        button.onclick = () => alert('hello');

        //addbutton to catagory container
        categoriesContainer.appendChild(button);

        */

        // button click korle category wise vdo anar jonno button er poriborte ekta div create korbo
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>
       `;

        categoriesContainer.appendChild(buttonContainer);

    });
}

// convert time into hour, minute, second
function getTimeString(time){
    //get hour and rest seconds
    const hour = parseInt(time / 3600);
    const remainingSec = time % 3600;
    
    //get minute and rest seconds
    const minute = parseInt(remainingSec / 60);
    const second = remainingSec % 60;
    
    return `${hour} hour ${minute} minute ${second} second ago`;
}



//Create loadVideos function
const loadVideos = (searchText = "") => {
    //Fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
}

/*
//Demo card object gulo kivabe ache eta dekhar jonno nichi
const cardDemo ={
    "category_id": "1001",
    "video_id": "aaah",
    "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
    "title": "Colors of the Wind",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
            "profile_name": "Ethan Clark",
            "verified": true
        }
    ],
    "others": {
        "views": "233K",
        "posted_date": "16090"
    },
    "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
}
*/


const loadDetails = async (videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
}

const displayDetails = (video) => {
console.log(video);
const detailsContainer = document.getElementById('modal-content');
    // way - 1
    //document.getElementById('showMOdalData').click();

    // way - 2
    document.getElementById('customModal').showModal();

    detailsContainer.innerHTML = `
    <img src="${video.thumbnail}" />
    <p> ${video.description} </p>
    `;
}

//displayVideos  function
const displayVideos = (Videos) => {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = "";

    if(Videos.length == 0){
        videosContainer.classList.remove('grid');
        videosContainer.innerHTML = `
        <div class="min-h-[400px] w-full flex flex-col gap-5 justify-center items-center">
            <img src="assets/icon.png" />
            <h2 class="text-xl font-medium"> No Content Here in this Category </h2>
        </div>
        `;
        return;
    }
    else
        videosContainer.classList.add('grid');

    Videos.forEach((video) => {
        console.log(video);

        // create card
        const card = document.createElement('div');
        card.classList = "card card-compact "
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img class="h-full w-full object-cover" src=${video.thumbnail} /> 
                ${
                    video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white text-sm">${getTimeString(video.others.posted_date)}</span>`
                }
            </figure>

            <div>
                <div class="px-0 py-2 flex gap-2">
                    <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}">
                    <div>
                        <h2 class="font-bold">${video.title}</h2>
                
                        <div class="flex gap-2 items-center">
                            <p class="text-gray-400 text-sm">${video.authors[0].profile_name}</p>
                            ${video.authors[0].verified == true ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />' : ''} 
                        </div>

                        <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error"> Details </button> </p>
                    </div>
                </div>
            </div>
        `;

        videosContainer.appendChild(card);
    });
}

document.getElementById('search-input').addEventListener("keyup",(event)=>{
    loadVideos(event.target.value);
})
loadCategories();
loadVideos();