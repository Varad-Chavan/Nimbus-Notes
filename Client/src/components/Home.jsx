import React, { useEffect, useContext } from 'react';
import Form from './Form';
import './static/Home.css';
import { useNavigate } from 'react-router-dom';


const Home = ({ writeAlert }) => {
  const navigator = useNavigate();


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigator('/login');
    }
  }, [navigator]);

  return (
    <div className={`home-container light`}> {/* Apply theme class */}
      <Form title_heading="Add Your Note" is_normal={true} writeAlert={writeAlert} />
    </div>
  );
};

export default Home;
