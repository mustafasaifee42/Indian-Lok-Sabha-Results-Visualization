import React from 'react';
import './App.css';
import MapVisualization from './Visualization';
import VisualizationThroughTime from './VisualizationThroughTime';
import ReactGA from 'react-ga';
import Footer from './Footer';
import head from './head.svg'; 

ReactGA.initialize('UA-140675599-1');
ReactGA.set({ anonymizeIp: true });
ReactGA.pageview('/');

function App() {
  return (
    <div className="App">
      <div className='main-body'>
        <div className="head">
          <div className="headImg" >
            <img src={head} alt="Logo" height="120" width="600" />
          </div>
          <div className='head-text'>Visual Exploration of Indian General Election Results</div>
          <div className="subHead">World's biggest electoral exercise took place in India <span role='img' aria-label='India'>🇮🇳</span> in 2019. About <span className='bold'>900 000 000</span><span role='img' aria-label='wow'> 😮</span> (more than the combined population of the United States 🇺🇸 and the European Union 🇪🇺) people were elligible to vote to elect their representatives in the Lok Sabha (India's Lower House). The marathon election took place in <span className='bold'>6 weeks</span> <span role='img' aria-label="calendar">📅</span> (between April 11th and May 19th) in around <span className='bold'>1 million</span><span role='img' aria-label='wow'>😮</span> polling stations (900 voters on average per polling station). The voter turn out was around <span className='bold'>67.1%</span>⁠ — highest ever <span role='img' aria-label="celebration-emoji">🎉</span> (over <span className='bold'>600 000 000</span> people voted).</div>
          <div className="subHead">The results were announced on 23rd March 2019; incumbent prime minister <span className='bold'>Narendra Modi's Bhartiya Janta Party</span> <span role='img' aria-label='won'>🏆</span> won an absolute majority for the second time crushing all the other competition winning <span className='bold'>303 out of 543</span> seats (around 6 times the largest opposition party which won only 52 seats). </div>
          <div className="subHead">The following interactive cartograms visualizes the general election results, from the national standings down to individual constituencies and an analysis of the result through different elections. <span className="infoText">A cartogram is a distorted map. Rather than reflect actual geographic boundaries and spaces, the boundaries and spaces are changed to more accurately tell the story of the data it’s showing. <span className="bold">Each hexagon in the map represents individual constituencies.</span></span></div>
          <div className='scrollOptions'>
            <a href="#cartogram"  className='scroll-link'><div className='scroll-buttons'><span role='img' aria-label="balot-box emoji" className='button-icon'>🗳️</span><br/>Scroll to Election Result Cartogram</div></a>
            <a href="#animated-cartogram" className='scroll-link'><div className='scroll-buttons'><span role='img' aria-label="balot-box emoji" className='button-icon'>🗳️</span><br />Scroll to Election Result Through Time Cartogram</div></a>
          </div>
        </div>
      </div>
      <MapVisualization />
      <VisualizationThroughTime />
      <Footer />
    </div>
  );
}

export default App;
