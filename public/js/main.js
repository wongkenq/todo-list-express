// declare variable for class fa-trash
const deleteBtn = document.querySelectorAll('.fa-trash')
// declare variable for classes .item and .span
const item = document.querySelectorAll('.item span')
// declare variable for classes item, span, and completed.
const itemCompleted = document.querySelectorAll('.item span.completed')

// create an array from deleteBtn, then iterate through the array and add an event listener to call deleteItem function to each element in the array
Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

// create an array from item and iterate through each element to add eventlistener to call function markComplete
Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

// create array from itemCompleted and iterate through each element to add eventlistener to call function markUncomplete
Array.from(itemCompleted).forEach((element)=>{
    element.addEventListener('click', markUnComplete)
})

// declares async function called deleteItem
async function deleteItem(){
    //declare variable itemText, value is the text of 2nd child node of parent node
    const itemText = this.parentNode.childNodes[1].innerText
    // try block declares a variable, the value will await a fetch request to 'deleteItem', http method of delete, header json type, body will be stringified in json.
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        // variable which will wait for response to finish fetching, then assigns the value of response in json. logs variable to console. then reloads page.
        const data = await response.json()
        console.log(data)
        location.reload()
    // if try block fails, logs error to the console. 
    }catch(err){
        console.log(err)
    }
}

// declares function called markComplete
async function markComplete(){
    // variable called itemText which is the text value of the 2nd child node of the parent node
    const itemText = this.parentNode.childNodes[1].innerText
    // try block, declares variable called response which awaits a fetch request which has a put method, json type, stringifies the body to json format that includes an object
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        // variable which will wait for the previous variable to be declared and will have the value of that variable in json, then logs it out to the console, and finally reloads the screen
        const data = await response.json()
        console.log(data)
        location.reload()
    // if the try block fails, logs the error to the console. 
    }catch(err){
        console.log(err)
    }
}

// declares async function called markUncomplete
async function markUnComplete(){
    // declares variable called itemText, value is the text of the 2nd child node of the parent node
    const itemText = this.parentNode.childNodes[1].innerText
    // try block which declares variable. the value will be assigned fetch request of put when the request is completed. and the content of the request will be stringified in json
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        // variable assigned the value of response in json after the response is completed. then logs out the value to the console and reloads the page. 
        const data = await response.json()
        console.log(data)
        location.reload()
    // if try block fails, logs out error to the console.
    }catch(err){
        console.log(err)
    }
}