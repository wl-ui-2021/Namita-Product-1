// selectors 
// const restaurantList = document.querySelector('#buttn1');

const restaurantDataDiv = document.querySelector('#dataDiv')
const restaurantData = [];

// load listeners
loadListeners();
function loadListeners(){

    //get the data from xhr 
    loadRestaurantsData()
    ///
    document.addEventListener('DOMContentLoaded' , onload); 
}


function loadRestaurantsData(){
    // create xhr 
    const xhr = new XMLHttpRequest();

    xhr.open('GET','data.json',true)    
    xhr.onload= function(){
        if(this.status === 200){
            const resData = JSON.parse(this.response)
             const cityData = resData.filter((r)=> r.location == "")
            console.log("city" , cityData)
            let output = document.createElement('div');
            output.classList.add('row')
            output.classList.add('border')
            output.classList.add('border-primary')
            resData.forEach((function(rData){
                
                output.innerHTML += `
                
                <div class="col" data-id=${rData.id}>
                    <div class="card ">
                            <div class="card-header">
                                 <img class="card-img-top" src="${rData.img}" >
                            </div>
                            <div class="card-body">
                                    <div>   
                                        <h5 class="card-title">${rData.name}</h5>
                                        <p class="card-text"><small class="text-muted">${rData.location}</small></p>
                                    </div>
                            </div>
                        <div>
                    </div>
                
                </div>
            `
            }))
            // restaurantDataDiv.appendChild(output);
            // save into the storage 
            saveIntoStorage(resData);
        }
    }

    xhr.send();
}

function saveIntoStorage(restaurantsData){
  
    localStorage.setItem('restaurants' , JSON.stringify(restaurantsData))
}

function getRestaurantsFromStorage(){
    let restaurants; 

    if(localStorage.getItem('restaurants') === null){
        return restaurants = []; 
    }else{
        restaurants = JSON.parse(localStorage.getItem('restaurants'))
    }
    return restaurants;
}



function onload(){
    console.log("Data will load here on DOMCONTENT ")
    //read query params 
    const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log("param" ,params)

    if(params.search){
    let restaurantsOn = getRestaurantsFromStorage()
    console.log("rOn",restaurantsOn)
    const cityData = restaurantsOn.filter((r)=> r.location == params.search)
    console.log("city" , cityData)
    ///

    let output = document.createElement('div');
    output.classList.add('row')
    // output.classList.add('border')
            // output.classList.add('border-primary')
            output.classList.add('fromcss')
            cityData.forEach((function(rData){
        
        output.innerHTML += `
        
        
        <div class="row" data-id=${rData.id}>
        
        

        <div class="row fromcss">
       
            <div class="card ">
             
                         <img class="card-img-top" src="${rData.img}" >
                    
                    <div class="card-body">
                            <div>   
                                <h5 class="card-title">${rData.name}</h5>
                                <p class="card-text"><small class="text-muted">${rData.location}</small></p>
                                </div>

                               
                            </div>
                    </div>
                   </div>
                   <div class="card-para1"> <p><small class="text-muted">${rData.Paragraph}</small></p></div>  
            </div>
            
            </div>
        </div>
    `
    }))
    restaurantDataDiv.appendChild(output);
    
    }
}

// ----------------------------------------------------------------------

