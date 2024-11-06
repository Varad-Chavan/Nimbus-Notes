const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../modules/Note');
const { body, validationResult } = require("express-validator"); 

//ROUTE 1:  GET all notes of loggedin user using GET  "/api/notes/fetchallnotes." Login require
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{

        const notes = await Note.find({user:req.user.id})
        
        res.json(notes)
    }catch (
        error //while trying if any error occured, so to address that
      ) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
      }
})
//ROUTE 2:  POST all notes of loggedin user  "/api/notes/writenote." Login require
router.post('/writenote',fetchuser, [body('title','Enter a Valid Title ').isLength({min:3}),
    body('description','Enter a Description of minimun length 5').isLength({min:5})
],async (req,res)=>{
try {
    

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {title,description,tag,} = req.body;

    const note = new Note({
        title,description,tag,user:req.user.id
    });
    const savedNote = await note.save()
    res.json(savedNote)
}
catch (
    error //while trying if any error occured, so to address that
  ) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
})

//ROUTE 3:  Update an Exisiting Note of loggedin user  "/api/notes/updatenote." Login require
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
try {
    const {title,description,tag} = req.body

    let newNote ={}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString()!==req.user.id){return res.status(401).send("What are you trying to do ?")}

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.send(note)
}
catch (
    error //while trying if any error occured, so to address that
  ) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
})

//ROUTE 4:  Delete an Exisiting Note of loggedin user  "/api/notes/deletenote." Login require
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
    
        if(note.user.toString()!==req.user.id){return res.status(401).send("What are you trying to do ?")}
    
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note was Deleted Successfully"})
    }
    catch (
        error //while trying if any error occured, so to address that
      ) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
      }
    })
    
module.exports = router