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


app.get('/',async (request, response)=>{
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
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

app.post('/addTodo', (request, response) => {
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteItem', (request, response) => {
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})