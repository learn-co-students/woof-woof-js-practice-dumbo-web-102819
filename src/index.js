let filterOn = false
document.addEventListener("DOMContentLoaded", () => {
    addFilterFunctionality()
    getDogs()
})

const getDogs = () => {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then((objArray) => {
        filterOn ? createDogSpan(objArray.filter(dog => dog.isGoodDog === true)) : createDogSpan(objArray)
    })
}

const addFilterFunctionality = () => {
    document.getElementById('good-dog-filter').addEventListener("click", (event) => {
        filterOn = !filterOn;
        filterOn ? (event.target.innerText = 'Filter good dogs: ON') : (event.target.innerText = 'Filter good dogs: OFF')
        clearSpan()
        getDogs()
    })
}

const createDogSpan = (dogArray) => {
    dogArray.forEach( (dog) => {
        let dogSpan = document.createElement('span')
        dogSpan.innerText = dog.name
        addSpanEventListener(dogSpan, dog)
        document.querySelector('#dog-bar').append(dogSpan)
    });
}

const clearSpan = () => {
    let bar = document.querySelector('#dog-bar')
    while (bar.firstChild) {
        bar.removeChild(bar.firstChild)
    }
}

const clearInfo = () => {
   let dogInfo = document.getElementById('dog-info')
   while(dogInfo.firstChild) {
       dogInfo.removeChild(dogInfo.firstChild)
   }
}
const addSpanEventListener = (span, dogObj) => {
    span.addEventListener("click", () => {
        clearInfo()
        showDogInfo(dogObj)
    })
}

const showDogInfo = (dog) => {
    let dogImg = document.createElement('img'),
        dogName = document.createElement('h2'),
        goodBadBtn = document.createElement('button');
    dogImg.src = dog.image, dogName.innerText = dog.name;
    dog.isGoodDog ? (goodBadBtn.innerText = "Good Dog!") : (goodBadBtn.innerText = "Bad Dog!")
    addGoodBadListener(goodBadBtn, dog)
    document.getElementById('dog-info').append(dogImg, dogName, goodBadBtn)
}

const addGoodBadListener = (button, dog) => {
    button.addEventListener("click", (event) => {
        dog.isGoodDog = !dog.isGoodDog
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: "PATCH",
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({
                isGoodDog: dog.isGoodDog
            })
        })
        .then(resp => resp.json())
        .then((dogObj) => {
            dogObj.isGoodDog ? (button.innerText = "Good Dog!") : (button.innerText = "Bad Dog!")
            clearSpan()
            getDogs()
        })
    })
}

