/**{
      "category_id": "1001",
      "video_id": "aaad",
      "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
      "title": "Smells Like Teen Spirit",
      "authors": [
        {
          "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
          "profile_name": "Oliver Harris",
          "verified": true
        }
      ],
      "others": {
        "views": "5.4K",
        "posted_date": "1672656000"
      }, */
// 
const loadCategories = () => {
    //console.log('load categories');

    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
       .then(res => res.json())
       .then(data => displayCategories(data.categories))
       .catch(error=> console.log(error));
}


const loadVideos = (searchText = "") => {
    //console.log('load categories');

    //fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
       .then(res => res.json())
       .then(data => displayVideos(data.videos))
       .catch(error=> console.log(error));
}

const loadCategoryVideos= (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {

          //sobaike active class remove koraw

          removeActiveClass();
          //id er class k active koraw
          const activeBtn= document.getElementById(`btn-${id}`);
          activeBtn.classList.add("active");

          displayVideos(data.category);
          
        })
        .catch(error=> console.log(error));
}



const loadDetails = async (videoId) =>{
  console.log(videoId);
  const uri = (`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
  const res = await fetch(uri);
  const data= await res.json();
  //console.log(data);
  displayDetails(data.video);
  
 };

 const displayDetails= (video)=>{
  //console.log(video);

  const detailContainer=document.getElementById("modal-content");

  detailContainer.innerHTML=`
  <img src=${video.thumbnail} />
  <p>${video.description}</p>
  `
  //way-1
  //document.getElementById('showModalData').click();

  //way-2
  document.getElementById('customModal').showModal();
 }



const removeActiveClass = () =>{
  const buttons=document.getElementsByClassName("category-btn");
  console.log(buttons);
  for(let btn of buttons){
    btn.classList.remove("active");
  }
}

function getTimeString(time){
  let hour=parseInt (time/3600);
  let remindSc= time%3600;
  let minute= parseInt (remindSc/60);
  let second= remindSc%60;
  return `${hour} hour ${minute} minute ${second} second ago`;
}


console.log(getTimeString());


const displayVideos= (videos) => {
   // console.log(videos);
   const videoContainer= document.getElementById("videos");
   videoContainer.innerHTML="";

   if(videos.length == 0){
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML=`
    <div class=" flex flex-col justify-center items-center gap-5">
    <img class="h-20 " src="Icon.png"/>
    <h2 class="font-serif text-center text-lg font-bold">Oops! Sorry, There is no <br> Content Here</h2>
    </div>
    `;
    return;
   }
   

   videos.forEach((video) =>{
    console.log(video);

    const card = document.createElement("div");
    card.classList="card bg-base-100 shadow-sm";
    card.innerHTML= `
    <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length==0 ? "":`<span class="absolute right-2 bottom-2 text-white bg-slate-900 rounded-lg px-2 text-xs">${getTimeString(video.others.posted_date)}</span>`}
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
    </div>

    <div class=>
    <h class="font-bold">${video.title}</h>
    <div class="flex items-center gap-2">
    <p class="text-gray-600">${video.authors[0].profile_name}</p>
    ${ video.authors[0].verified == true ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>' :""}
    </div>
    <p onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</p>
    </div>
  </div>
    `
    videoContainer.append(card);
   })
}

const displayCategories = (categories) =>{
    // add data in HTML
    //console.log(data);
    const categoryContainer=document.getElementById("categories");

    categories.forEach((item) => {
        console.log(item);

        //create button
     
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML=`
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `;

        
        categoryContainer.append(buttonContainer);
    });
}

document.getElementById('search-input').addEventListener('keyup', (e) =>{
  loadVideos(e.target.value);
});

loadCategories();
loadVideos();