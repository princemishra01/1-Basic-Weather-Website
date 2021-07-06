console.log('this client side javascript is loaded ')



const weatherForm  = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
const messagethree = document.querySelector('#message-3')
const messagefour = document.querySelector('#message-4')
const messagefive = document.querySelector('#message-5')

weatherForm.addEventListener('submit' , (event) =>{
    event.preventDefault() 

    const location = search.value

    messageOne.textContent = 'Loading....'
    messagetwo.textContent =  ''
    messagethree.textContent =  ''
    messagefour.textContent =  ''
    messagefive.textContent =  ''

    if(!location){
       messageOne.textContent = 'Enter the Location'
    } else {
        fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    // console.log(data.error)
                    messageOne.textContent =  data.error
                } else {
                    messageOne.textContent = 'Location : ' + data.location
                    messagetwo.textContent = 'Weather : ' + data.forecast.description 
                    messagethree.textContent = 'Temperature : ' + data.forecast.temperature 
                    messagefour.textContent = 'Humidity : ' + data.forecast.humidity 
                    messagefive.textContent = 'Wind Speed : ' + data.forecast.windSpeed 
                    // console.log(data.location)
                    // console.log(data.forecast)
                }
                
            })
        })
    }
})