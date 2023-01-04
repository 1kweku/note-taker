const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');
let db = require('./db/db.json');
const fs = require('fs');


app.use(express.json());
app.use(express.static('public'));

// GET route for index.html
app.get('/', (req, res) => res.sendFile('/Users/1kweku/Downloads/Bootcamp/note-taker/public/assets/index.html'))

// GET route for notes.html
app.get('/notes', (req, res) => res.sendFile('/Users/1kweku/Downloads/Bootcamp/note-taker/public/assets/notes.html'))

app.get('/api/notes', (req, res) => {
    res.json(db);
})

// POST route for title and note
app.post('/api/notes', (req, res) => {
    console.log(req.body);
   const {title, text} = req.body;
    // Checks to make sure title and note values are received then puts them in newNote variable, also generates user ID
    if (title && text) {
        const newNote = {title, text, id: uuidv4()}
    
      //  const newNoteString = JSON.stringify(newNote);
           // console.log(newNoteString);
        fs.readFile('./db/db.json', 'utf-8', (err, data) => { err?console.error(err): console.log('Success!')
            const notesParsed = JSON.parse(data);
            notesParsed.push(newNote); 
        fs.writeFile('./db/db.json', JSON.stringify(notesParsed, null, 1), (err) => {
            err?console.error(err): console.log('Note added!');
        })
        const response = {
            status: 'Success!',
            body: newNote,
        };
        console.log(response);
        db = notesParsed;
        res.json(db); 
        })
    
} else {
    
 res.status(500).json('Error posting note')
}
})

// app.delete('/api/notes/:id', (req, res) => {
//     const { id } = req.params
    
// })


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})