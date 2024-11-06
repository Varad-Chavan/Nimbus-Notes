import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const notesinit = [];
  const [notes, setNotes] = useState(notesinit);

    // Get all notes
  const getNotes = async()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
        }
    });
    const data = await response.json()
    setNotes(data)
  }


  //Adding a note
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/writenote`,{
      // eslint-disable-next-line
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
    });

  };
  //edit a note
  const editNote = async (title, description, tag, id) => {
    console.log(description)
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });

      let newNotes= JSON.parse(JSON.stringify(notes))
      let element = newNotes[0];
      for (let index = 0; index < newNotes.length; index++) {
        element = newNotes[index];
        if(element._id===id)
        {
          newNotes[index].title=title
          newNotes[index].description=description
          newNotes[index].tag=tag
          break;
        }
      }

      setNotes(newNotes)
  };
  //delete a note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        // eslint-disable-next-line
        method:'DELETE',
        headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
        }
    }) 
    getNotes()    
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
