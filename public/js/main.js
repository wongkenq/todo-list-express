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

    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markUnComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}