import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';


const Mynotes = ({ writeAlert }) => {
  const refClose = useRef();
  const ref = useRef();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;


  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
  }, []);

  const handleUpdate = (note) => {
    ref.current.click();
    setTitle(note.title);
    setDescription(note.description);
    setTag(note.tag);
    setId(note._id);
  };

  const handleClick = (e) => {
    refClose.current.click();
    editNote(title, description, tag, id);
    writeAlert("Note Updated", "success");
    getNotes();
  };

  return (
    <div className={'bg-light text-dark'}>
      <div>
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="form-container">
                  <form>
                    <label>
                      Title:
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required minLength={3}
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
                        required minLength={5}
                      />
                    </label>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {notes.length === 0 ? (
        <div>No Notes Available RN...</div>
      ) : (
        notes.map((note) => (
          <NoteItem note={note} key={note._id} writeAlert={writeAlert} handleUpdate={handleUpdate} />
        ))
      )}
    </div>
  );
};
export default Mynotes;