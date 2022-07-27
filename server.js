// load express module
const express = require('express')
// declare variable to use express()
const app = express()
// load MongoClient for MongoDB
const MongoClient = require('mongodb').MongoClient
// declare which port to use
const PORT = 2121
// load dotenv
require('dotenv').config()

// declare variables
let db,
// mongo connection string is is another file to hide it, this variable calls that file containing the string
    dbConnectionStr = process.env.DB_STRING,
// declare name for DB
    dbName = 'todo'

// load mongo, connect to the DB using the connection string
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
// after connection is successful log to console that connection is successful
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        // assign value to the db variable
        db = client.db(dbName)
    })
    
// load express method to set view engine to ejs
app.set('view engine', 'ejs')
// load express method to set static folder to 'public'
app.use(express.static('public'))
// load express method to parse the URL encoded data with qs library, allows for rich objects and arrays to be encoded in to URL-encoded format
app.use(express.urlencoded({ extended: true }))
// load express method to parse incoming requests as JSON
app.use(express.json())

// calls express method to route HTTP get request to root
app.get('/',async (request, response)=>{
    // declare variable as await mongodb methods to find the collection 'todos' and put it into an array
    const todoItems = await db.collection('todos').find().toArray()
    // declare variable as await mongodb methods to return the number of documents which match the specified query
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    //express method to render the object into ejs
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

// express method to route post data to /addTodo. 
app.post('/addTodo', (request, response) => {
    //mongodb method to add one object to the collection
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    .then(result => {
        // after completing insertion of object, log to console the task was completed, then reload page to root
        console.log('Todo Added')
        response.redirect('/')
    })
    // if unable to complete insertion, log out error
    .catch(error => console.error(error))
})

// express method to route put request to /markComplete
app.put('/markComplete', (request, response) => {
    // mongodb method to look in todos collection and update one object, request item from body
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        // set completion to true
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    // if method is complete then log to console and send response in json
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    // if method doesn't complete, send error and log to console
    .catch(error => console.error(error))

})

// express method to route put request to /markUncomplete
app.put('/markUnComplete', (request, response) => {
    // mongodb method to go through todos collection and update one object, request an item from the body
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            // set completion to false
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    // when completed, log to console and send response in json
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    // if failed, log to console the error
    .catch(error => console.error(error))

})

// express method to route delete request to /deleteItem. 
app.delete('/deleteItem', (request, response) => {
    // mongodb method to go into collection and delete item from body 
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    // log completed request to console and send response in json
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    // if cannot be complete then log error to console
    .catch(error => console.error(error))

})

// express method to set port to the PORT variable or heroku port
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})