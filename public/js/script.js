resetForm = ()=>{
    document.getElementById('form1').reset()
}

const setMessage1 = document.getElementById('message-1')
const setMessage2 = document.getElementById('message-2')
const submitBtn = document.getElementById('btn1')

submitBtn.addEventListener('click', (e)=>{
    const inputData = document.getElementById('input1').value
    setMessage1.innerHTML = 'Loading ...'
    resetForm()
    e.preventDefault()
    
    fetch(`http://localhost:3000/weather?address=${inputData}`).then(response => {
    response.json().then(data => {
        if (data.error){
            setMessage1.innerHTML = data.error
            setMessage2.innerHTML = ' '
        }else{
            setMessage1.innerHTML = ' '
            setMessage2.innerHTML = data.location + '<br>' + data.forecast
        }
    })
})
})