var searchInput = document.getElementById("searchInput");
var fisrtContainer = document.getElementById('firstData-container')
var favContainer = document.getElementById("fav-container")
var headingEle = document.querySelector(".heading-ele")
var iconelement  = document.getElementById("icon-element")
var sliderContainer = document.getElementById("sliderContainer")

        
function fetchImagesAndCreateSlider(resData) {
  sliderContainer.textContent = "";
    let remainingData = resData.photos.slice(1)
    const newSliderContainer = document.createElement('div');
    newSliderContainer.classList.add('slider-container');
    const newSlider = document.createElement('div');
    newSlider.classList.add('splide');
     
    const slideList = remainingData.map(each => `
    <li class="splide__slide">
    <div style="width:90%;" id=${each.id}">
       <i class="fa-regular fa-heart icon" id="icon-element"></i>
       <img src="${each.src.small}" alt="Image" style="width:100%;height:200px;">
      <p class="slider-image-name">${each.alt}</p>
      <p class="slider-photographer">${each.photographer}</p>
    </div>
    </li>`).join('');
    newSlider.innerHTML = `
      <div class="splide__track">
        <ul class="splide__list">
          ${slideList}
        </ul>
      </div>
    `;

    newSliderContainer.appendChild(newSlider);
    sliderContainer.appendChild(newSliderContainer);

    new Splide(newSlider, {
      type: 'slide',
      perMove:1,
      perPage: 3,
      pauseOnHover: false,
      pagination: false,
      arrows: true,
      rewind: true,
    }).mount();
  }

  function displayFirst(resData){
      let firstData = resData.photos[0]
      console.log(firstData)
      fisrtContainer.innerHTML = `
              <div class="first-image-container">
                  <div >
                      <img src="${firstData.src.small}" class="fisrt-image"/>
                  </div>
                  <div class="first-content-container">
                      <h3>${firstData.alt}</h3>
                      <p class="author">${firstData.photographer}</p>
                      <button class="naviagation-button"><a href="${firstData.photographer_url}" target="_blank">Explore More</a></button>
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
                 console.log(result)
                 displayFirst(result)
                 fetchImagesAndCreateSlider(result)
                 let {photos} = result
                 console.log(photos)
             }
             display()
            }
        });


