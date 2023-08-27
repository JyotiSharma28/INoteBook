const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator')

//ROUTE-1:get all notes  using: get "/api/notes/fetchallnotes" Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
       try {
              const notes = await Note.find({ user: req.user.id })
              res.json(notes)
       } catch (error) {
              console.error(error.message)
              res.status(500).send("Internal Server Error")
       }

})

//ROUTE-2:add note in particular user using: POST "/api/notes/addnote" Login required
router.post('/addnote', fetchuser, [
       body("title", "Enter valid title").isLength({ min: 3 }),
       body("description", "").isLength({ min: 5 })
], async (req, res) => {

       try {
              const { title, description, tag } = req.body;

              const errors = validationResult(req);

              if (!errors.isEmpty()) {
                     return res.status(400).json({ errors: errors.array() });
              }
              const note = new Note({
                     title, description, tag, user: req.user.id

              })

              const savenote = await note.save()
              res.json(savenote)


       } catch (error) {
              console.error(error.message)
              res.status(500).send("Internal Server Error")
       }
})


//ROUTE-3: update note in particular user using: POST "/api/notes/updatenote" Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

       try {
              const { title, description, tag } = req.body;
              //craete new note
              const newNote = {};
              if (title) { newNote.title = title };
              if (description) { newNote.description = description };
              if (tag) { newNote.tag = tag };

              //Find the note to be updated and update it

              const note = await Note.findById(req.params.id)
              if (!note) { return res.status(404).send("not Found") }

              if (note.user.toString() !== req.user.id) {
                     return res.status(401).send("Not Allowed")
              }

              note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
              res.send(note)

       } catch (error) {
              console.error(error.message)
              res.status(500).send("Internal Server Error")
       }


})


//ROUTE-4: delete existing note in particular user using: POST "/api/notes/deletenote" Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

       try {

              //Find the note to be delete and delete it

              const note = await Note.findOneAndDelete({
                     _id: req.params.id,
                     user: req.user.id
              })
              if (!note) { return res.status(404).send("not Found") }

              // // allow deletion only if user own this Note
              // if (note.user.toString() !== req.user.id) {
              //        return res.status(401).send("Not Allowed")
              // }

              res.status(200).json({ Success: "Note has been deleted" })

       } catch (error) {
              console.error(error)
              res.status(500).send("Internal Server Error")
       }


})
module.exports = router