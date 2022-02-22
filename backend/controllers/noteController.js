const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')
const User = require('../models/userModel')

// @desc Get note
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler( async (req, res) => {
  const notes = await Note.find({ user: req.user.id})
    res.status(200).json(notes);
});

// @desc set note
// @route POST /api/notes
// @access Private
const setNote = asyncHandler (async (req, res) => {
    if (!req.body.note || !req.body.title) {
    res.status(400)
    throw new Error('Please add title / note')        
}


const note = await Note.create({
    title: req.body.title,
    note: req.body.note,
    user: req.user.id
})
        res.status(200).json(note)
  });
  
// @desc Update Note
// @route PUT /api/notes
// @access Private
const updateNote = asyncHandler( async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (!note) {
        res.status(400)
        throw new Error ('Note not found')
    }

    // check for user
    
    if (!req.user) {
        res.status(401)
        throw new Error ('User not found')
    }

    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('User not authorized')
    }
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedNote)
  });

  // @desc Delete note
// @route delete /api/notes
// @access Private
const deleteNote = asyncHandler( async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (!note) {
        res.status(400)
        throw new Error ('note not found')
    }

    // check for user
    
    if (!req.user) {
        res.status(401)
        throw new Error ('User not found')
    }

    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('User not authorized')
    }
    
    await Note.findByIdAndDelete(req.params.id)

    res.status(200).json({id: req.params.id})
  });
  

module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote,
}