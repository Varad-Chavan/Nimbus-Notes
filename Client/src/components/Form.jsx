import React, { useState, useContext } from 'react';
import './static/Form.css';
import noteContext from '../context/notes/noteContext';

const NoteForm = ({ title_heading, is_normal, writeAlert }) => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');

  const context = useContext(noteContext);
  const { addNote } = context;

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(title, description, tag);
    writeAlert("Note Added", "success");
    setTitle('');
    setTag('');
    setDescription('');
  };

  return (
    <div className='form-container bg-light text-dark'>
      <h2>{title_heading}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
          />
        </label>
        <label>
          Tag:
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={5}
          />
        </label>
        {is_normal && (
          <button type="submit">Add Note</button>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
