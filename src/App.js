import React from 'react';
import './App.css';
import Visualization from './Visualization';
import ReactGA from 'react-ga';
import Footer from './Footer';
import head from './head.svg'; 

ReactGA.initialize('UA-140675599-1');
ReactGA.set({ anonymizeIp: true });
ReactGA.pageview('/');

function App() {
  return (
    <div className="App">
      <div className="stickyinfo">
        2019 live counting. Last Updated 03:04 PM IST. 2019 data is showing lead and not wins. The female winner, SC/ST winner and turnout data is unavailable.
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
