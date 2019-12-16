let dogBar = document.querySelector("#dog-bar");
let dogInfoDiv = document.querySelector("#dog-info");
let filterBtn = document.querySelector("#filter-div").firstElementChild;

//get all pups from restful route
fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogObjs => {
        dogObjs.forEach(turnObjToHtml);
    });

/// START DELEGATION 
dogBar.addEventListener('click', (e) => {
    //check if click is on span
   if(e.target.tagName === 'SPAN') {
       dogInfoDiv.innerHTML= ""
       fetchDog(e.target.dataset.id)
   }
});
// END DELEGATION

function turnObjToHtml(dog) {
    let span = document.createElement('span');
    span.innerText = dog.name;
    span.dataset.id = dog.id;
    span.dataset.status = dog.isGoodDog;
    dogBar.append(span);
}

//get single dog
function fetchDog(dogId) {
    fetch(`http://localhost:3000/pups/${dogId}`)
        .then(res => res.json())
        .then(dog => {
            showDog(dog)
        });
}

function showDog(dog) {
    dogInfoDiv.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button class="dog-status"></button>
    `;

    let statusBtn = dogInfoDiv.querySelector(".dog-status");
    
    statusBtn.innerHTML = dog.isGoodDog ? "Good Dog" : "Bad Dog";

    statusBtn.addEventListener('click', (e) => {
        updateDogStatus(dog, statusBtn)
    });
}

function updateDogStatus(dog, button) {

    dog.isGoodDog = dog.isGoodDog ? false : true;

    let dogSpan = document.querySelector(`[data-id="${dog.id}"]`)
    dogSpan.dataset.status = dog.isGoodDog;

    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({isGoodDog : dog.isGoodDog})
    })
    .then(res => res.json())
    .then(dogObj => {
        button.innerHTML = dogObj.isGoodDog ? "Good Dog" : "Bad Dog";
        let toggleOn = filterBtn.innerText.match(/ON|OFF/)[0];
        if(toggleOn === "ON") {
            //target element with with dataset of dog id
            let dogSpan = document.querySelector(`[data-id="${dogObj.id}"]`);
            if(dogSpan.dataset.status === "false") {
                dogSpan.style.display = "none";
            } else {
                dogSpan.style.display = ""
            }
        }
    });
}


filterBtn.addEventListener('click', () => {
    
    let toggleFilter = filterBtn.innerText === "Filter good dogs: OFF" ?
        "Filter good dogs: ON" : "Filter good dogs: OFF";
    
    filterBtn.innerText = toggleFilter;
    
    let spans = dogBar.querySelectorAll("span")
    spans.forEach(ele => {
        if(toggleFilter.match(/ON|OFF/)[0] === "ON") {
            if(ele.dataset.status === "false") {
                ele.style.display = "none";
            }
        } else if(toggleFilter.match(/ON|OFF/)[0] === "OFF"){
            ele.style.display = "";
        }
        
    });
});

