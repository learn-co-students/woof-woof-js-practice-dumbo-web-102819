const dogBarDiv = document.getElementById("dog-bar")
const dogInfoDiv = document.getElementById('dog-info')
const goodDogFilter = document.getElementById('good-dog-filter')


fetch("http://localhost:3000/pups")
.then(r => r.json())
.then(dogsArr => {
    goodDogFilter.addEventListener("click", (evt) => {
            
        if(evt.target.innerText.includes("OFF")){
            evt.target.innerText = "Filter good dogs: ON"
           goodDogsArr =dogsArr.filter(dog => dog.isGoodDog == true)
          dogBarDiv.innerHTML = ""
          goodDogsArr.forEach((dog) => {
            dogBarSpan = document.createElement("span")
            dogBarSpan.innerText = dog.name
            dogBarDiv.append(dogBarSpan)    
            dogBarSpan.addEventListener("click", () => {
                dogInfoDiv.innerHTML = `<img src="${dog.image}"><h2>${dog.name}</h2></img>`
                
                
            })
            
          })
           
           
        }else{
            evt.target.innerText = "Filter good dogs: OFF"
            dogBarDiv.innerHTML = ""
            dogsArr.forEach((dog) => {
                dogBarSpan = document.createElement("span")
                dogBarSpan.innerText = dog.name
                dogBarDiv.append(dogBarSpan)   
                dogBarSpan.addEventListener("click", () => {
                    dogInfoDiv.innerHTML = `<img src="${dog.image}"><h2>${dog.name}</h2></img>`
                    
                    
                })
                
                
                
            })
        }
    })
    dogsArr.forEach((dogObj) => {
        dogBarSpan = document.createElement("span")
        
        dogBarSpan.innerText = dogObj.name
        dogBarDiv.append(dogBarSpan)


        dogBarSpan.addEventListener('click', (evt) => {
        dogInfoDiv.innerHTML = `<img src="${dogObj.image}"><h2>${dogObj.name}</h2><button>${dogObj.isGoodDog ? "Good dog!" : "Bad dog!"}</button></img>`
        goodDogBtn = dogInfoDiv.querySelector("button")
        
        
        goodDogBtn.addEventListener('click', (evt) => {
            dogObj.isGoodDog = !dogObj.isGoodDog
            fetch(`http://localhost:3000/pups/${dogObj.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: dogObj.isGoodDog
                })
                
            })
            .then(r => r.json())
            .then((r) => { dogObj.isGoodDog? goodDogBtn.innerText = "Good dog!" : goodDogBtn.innerText = "Bad dog!"
            })

        })
         })
            
        
        
        
       
            
        })
        
    })




