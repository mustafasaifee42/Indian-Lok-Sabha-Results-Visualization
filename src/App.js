import React from 'react';
import './App.css';
import Visualization from './Visualization';
import Footer from './Footer';
import head from './head.svg'; 

function App() {
  return (
    <div className="App">
      <div className="stickyinfo">
        2019 result will be updated when it is released! Stay tune!
      </div>
      <div className="head">
        <div className="headImg" >
          <img src={head} alt="Logo" height="120" width="600" />
        </div>
        <div className="subHead">This interactive cartogram visualizes the general election results, from the national standings down to individual constituencies.A cartogram is a distorted map. Rather than reflect actual geographic boundaries and spaces, the boundaries and spaces are changed to more accurately tell the story of the data it’s showing. <br /><span className="bold">Each hexagon in the map represents individual constituencies.</span></div>
      </div>
      <Visualization />
      <Footer />
    </div>
  );
}

export default App;
