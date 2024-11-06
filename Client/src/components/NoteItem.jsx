import React, { useContext } from 'react';
import './static/NoteItem.css';
import noteContext from '../context/notes/noteContext';

const NoteItem = ({ note, handleUpdate, writeAlert }) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;


    const handleDelete = () => {
        deleteNote(note._id);
        writeAlert("Note Deleted", "success");
    };

    return (
        <div className={`note-card bg-light text-dark`}>
      
            <h3 className="note-title">{note.title}</h3>
            <span className="note-tag">{note.tag}</span>
            <p className="note-description">{note.description}</p>
            <small className="note-date">{new Date(note.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</small>
            <div className="note-icons">
                <i className="fa-solid fa-trash-can" title="Delete" onClick={handleDelete}></i>
                <i className="fa-solid fa-pen-to-square" title="Edit" onClick={() => handleUpdate(note)}></i>
            </div>
        </div>
    );
};

export default NoteItem;