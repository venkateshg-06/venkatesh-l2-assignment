var searchInput = document.getElementById("searchInput");
var fisrtContainer = document.getElementById('firstData-container')
var favContainer = document.getElementById("fav-container")
var headingEle = document.querySelector(".heading-ele")
var sliderContainer = document.getElementById("sliderContainer")
let splideListContainer = document.getElementById("splideListContainer")
let favListContainer = document.getElementById("favContainer")


function getFavListFromLocalStorage() {
  let stringifiedFavList = localStorage.getItem("favList");
  let parsedFavList = JSON.parse(stringifiedFavList);
  if (parsedFavList === null) {
      return [];
  } else {
      return parsedFavList;
  }
}



let favList = getFavListFromLocalStorage();


function FavsectionUpdate(){
  displayFavSection(favList)

}

function removeItem(listId, each){
  let eleEle = document.querySelector(`[data-id="${listId}"]`)
  let index = favList.findIndex(eachEl => {
    if (listId === eachEl.id)
    {
      return true
    }
    else {
      return false
    }
  })
  if (index === -1){
    favList.push(each)
    localStorage.setItem("favList", JSON.stringify(favList)) 
   FavsectionUpdate()
  }
   splideListContainer.removeChild(eleEle)
   

   
  
}
function displayFavSection(resultData) {
 

  let favEl = document.getElementById("favEl");
  
   let r = resultData
   
   
   r.forEach((each) => {
     var listId = each.id 
     let listEle = document.createElement("li")
     listEle.setAttribute("data-id",each.id)
     listEle.classList.add("splide__slide")


   let itemsContainer = document.createElement("div")
   itemsContainer.setAttribute("style", "width:100%;")
   listEle.appendChild(itemsContainer)

   let iconcontainer = document.createElement("div")
   iconcontainer.classList.add("icon-bg")
   itemsContainer.appendChild(iconcontainer)

   iconcontainer.onclick = function(){
     console.log(listId)
     removeItem(listId, each)
   }

   let iconEle = document.createElement("i")
   iconEle.classList.add("fa-solid","fa-heart", "red-icon" )  
   iconcontainer.appendChild(iconEle)

   let imgEle = document.createElement("img")
   imgEle.src = each.src.medium 
   imgEle.alt = "image"
   imgEle.setAttribute("style", "width:100%; height:200px;")
   itemsContainer.appendChild(imgEle)

   let sliderName = document.createElement("p")
   sliderName.classList.add("slider-image-name")
   sliderName.textContent = each.alt
   itemsContainer.appendChild(sliderName)

   let photographer = document.createElement("p")
   photographer.classList.add("slider-photographer")
   photographer.textContent = each.photographer 
   itemsContainer.appendChild(photographer)

   favListContainer.appendChild(listEle)

   })
   

   new Splide(favEl, {
     type: 'slide',
     perMove:1,
     perPage: 3,
     gap: "2rem",
     pauseOnHover: false,
     pagination: false,
     arrows: true,
     rewind: true,
     breakpoints: {
   640: {
     perPage: 2,
     gap    : '.7rem',
     height : '300px',
   },
   480: {
     perPage: 1,
     gap    : '.7rem',
     height : '300px',
   },
 },
   }).mount();

 }
        
function createSlider(resultData) {
   
   let splideEl = document.getElementById("splideEl");

    let remainingData = resultData.photos.slice(1)
    console.log(remainingData)
    
    remainingData.forEach((each) => {
      var listId = each.id 
      let listEle = document.createElement("li")
      listEle.setAttribute("data-id",each.id)
      listEle.classList.add("splide__slide")


    let itemsContainer = document.createElement("div")
    itemsContainer.setAttribute("style", "width:100%;")
    listEle.appendChild(itemsContainer)

    let iconcontainer = document.createElement("div")
    iconcontainer.classList.add("icon-bg")
    itemsContainer.appendChild(iconcontainer)

    iconcontainer.onclick = function(){
      removeItem(listId, each)
    }

    let iconEle = document.createElement("i")
    iconEle.classList.add("fa-regular","fa-heart", "icon" )
    iconcontainer.appendChild(iconEle)

    let imgEle = document.createElement("img")
    imgEle.src = each.src.medium 
    imgEle.alt = "image"
    imgEle.setAttribute("style", "width:100%; height:200px;")
    itemsContainer.appendChild(imgEle)

    let sliderName = document.createElement("p")
    sliderName.classList.add("slider-image-name")
    sliderName.textContent = each.alt
    itemsContainer.appendChild(sliderName)

    let photographer = document.createElement("p")
    photographer.classList.add("slider-photographer")
    photographer.textContent = each.photographer 
    itemsContainer.appendChild(photographer)

    splideListContainer.appendChild(listEle)

    })
    

    new Splide(splideEl, {
      type: 'slide',
      perMove:1,
      perPage: 3,
      gap: "2rem",
      pauseOnHover: false,
      pagination: false,
      arrows: true,
      rewind: true,
      breakpoints: {
    640: {
      perPage: 2,
      gap    : '.7rem',
      height : '300px',
    },
    480: {
      perPage: 1,
      gap    : '.7rem',
      height : '300px',
    },
  },
    }).mount();

  }

  function displayFirstItem(result){
      let firstData = result.photos[0]
      console.log(firstData)
      fisrtContainer.innerHTML = `
              <div class="first-image-container">
                  <div class="img-container-first">
                      <img src="${firstData.src.medium}" class="fisrt-image"/>
                  </div>
                  <div class="first-content-container">
                      <h3 class="first-item-heading">${firstData.alt}</h3>
                      <p class="author">${firstData.photographer}</p>
                      <button class="naviagation-button"><a href="${firstData.photographer_url}" target="_blank">EXPLORE MORE</a></button>
                  </div>
              </div>`
  }



searchInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent the default action of the Enter key
                var inputValue = searchInput.value.trim(); // Get the trimmed value of the input
                if (inputValue !== "") {
                    // Clear the input value
                    searchInput.value = "";
                }
                let options = {
                    method : "GET",               
                    headers :{
                         Authorization: "kRFRFXREdHWB9nB02xbrqIkBNAu4HmIU20UHIL4wXqA7FKXP8Drz3NnR"
                    }
                        
                     }
             let url = `https://api.pexels.com/v1/search?query=${inputValue}`
             
             async function getResult(){
                 try{
                     let response = await fetch(url, options);
                     let Data = await response.json()
                     return Data
                 }catch(e){
                     console.log(e)
                 }
                 
             }
             
             async function display(){
                 let result = await getResult()
                 splideListContainer.textContent = ""
                 displayFirstItem(result)
                 createSlider(result)
                 let {photos} = result
                 console.log(photos)
             }
             display()
            }   
        });


displayFavSection(favList)