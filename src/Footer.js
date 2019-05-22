import React, { Component } from 'react';
import './button.css';
import {
  FacebookShareButton,
  TwitterShareButton
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

class Visualization extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <div className="share">
            Was this your jam? Consider sharing the 💖
            <div className='icons'>
                <FacebookShareButton url='https://loksabharesults.netlify.com/' quote="Lok Sabha election results visualized: " hashtags={['LokSabhaEelctions2019','Cartogram','TileGridMap']}>
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <TwitterShareButton url='https://loksabharesults.netlify.com/' title="Lok Sabha election results visualized: " via="mustafasaifee42" hashtags={['LokSabhaEelctions2019','IndiaElection2019 ','Cartogram','TileGridMap']}>
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
            </div>
        </div>
        <div className="footerInfo">
            <div className="footerText">
                This project was created my <a href="http://mustafasaifee.com" target='_blank' rel="noopener noreferrer" >Mustafa Saifee</a><br />
                The data was gathered from the <a href ="https://www.eci.gov.in/" target ="_blank" rel="noopener noreferrer" >Election Commission of India</a> website<br/>
                For more information contact me via <a href="mailto:saifee.mustafa@gmail.com" target='_blank' rel="noopener noreferrer" >email</a> or via <a href="https://twitter.com/mustafasaifee42" target="_blank" rel="noopener noreferrer" >twitter</a><br/>
                Datasheet for the visualization can be found <a href="https://raw.githubusercontent.com/mustafasaifee42/India-Lok-Sabha-Results-Data/master/lok-sabha-results.json" target='_blank' rel="noopener noreferrer" >here</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Visualization
