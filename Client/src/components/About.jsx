import React, { useContext } from 'react';
import './static/AboutUs.css'; 

const AboutUs = () => {

  return (
    <div className='about-us bg-light'>
      <h1 className='about-us bg-light'>Welcome to Nimbus Notes</h1>
      <p>
        At Nimbus Notes, we believe in the power of organized thoughts. Our mission is to create a seamless note-taking experience that helps individuals and teams harness their ideas, boost productivity, and foster creativity.
      </p>
      
      <h2 className='about-us bg-light'>Our Story</h2>
      <p>
        Founded by a team of passionate developers and productivity enthusiasts, Nimbus Notes was born out of the desire to transform how people capture and manage information. We recognized the need for a tool that combines simplicity with powerful features, enabling users to focus on what truly matters—turning thoughts into action.
      </p>
      
      <h2 className='about-us bg-light'>What We Offer</h2>
      <ul>
        <li><strong>Intuitive Note-Taking:</strong> Easily create, edit, and organize your notes with a user-friendly interface.</li>
        <li><strong>Real-Time Collaboration:</strong> Work together with friends, colleagues, or classmates in real time, no matter where you are.</li>
        <li><strong>Customizable Organization:</strong> Tag, categorize, and search your notes to find exactly what you need, when you need it.</li>
        <li><strong>Cross-Platform Access:</strong> Whether you’re on your desktop, tablet, or smartphone, your notes are always at your fingertips.</li>
      </ul>
      
      <h2 className='about-us bg-light'>Our Vision</h2>
      <p>
        We envision a world where everyone can unlock their full potential through better organization and clarity. By continuously improving our platform and listening to our users, we aim to set the standard for note-taking solutions.
      </p>
      
      <h2 className='about-us bg-light'>Join Us on This Journey</h2>
      <p>
        We’re excited to have you with us! Whether you're a student, a professional, or just someone who loves to jot down ideas, Nimbus Notes is here to support your journey toward productivity and inspiration.
      </p>
      
      <h2 className='about-us bg-light'>Get in Touch</h2>
      <p>
        We’d love to hear from you! If you have questions, feedback, or suggestions, feel free to reach out to <strong>Varad Chavan.</strong>
      </p>
    </div>
  );
};

export default AboutUs;
