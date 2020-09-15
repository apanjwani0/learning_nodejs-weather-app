console.log('Client side javascript file is loaded!')
const basicUrl = 'http://localhost:3000/weather?address='


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    fetch(basicUrl + location).then((response) => {
        response.json().then((data) => {
            console.log(data)
        })

    })

})
