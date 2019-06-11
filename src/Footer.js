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
                The data was gathered from the <a href ="https://www.eci.gov.in/" target ="_blank" rel="noopener noreferrer" >Election Commission of India</a> and <a href ="https://adrindia.org/" target ="_blank" rel="noopener noreferrer" >Association for Democratic Reforms</a> website. The cartogram was designed using <a href="https://pitchinteractiveinc.github.io/tilegrams/" target="_blank" rel="noopener noreferrer" >Tilegram</a> from <a href="https://www.pitchinteractive.com/" target="_blank" rel="noopener noreferrer" >Pitch Interactive</a>.<br/>
                For more information and feedback contact me via <a href="mailto:saifee.mustafa@gmail.com" target='_blank' rel="noopener noreferrer" >email</a> or via <a href="https://twitter.com/mustafasaifee42" target="_blank" rel="noopener noreferrer" >twitter</a><br/> 
                Datasheet for the visualization can be found <a href="https://github.com/mustafasaifee42/Indian-Lok-Sabha-Results-Visualization/blob/master/src/data.json" target='_blank' rel="noopener noreferrer" >here</a> and the code is open source and can be found on <a href="https://github.com/mustafasaifee42/Indian-Lok-Sabha-Results-Visualization" target='_blank' rel="noopener noreferrer" >Github</a><br /> <br/>
                PRIVACY POLICY<br />
                <span className="privacy">This website does not save any information about you. We do not directly use cookies or other tracking technologies. We do, however, use <a href="https://www.google.com/analytics" target='_blank' rel="noopener noreferrer">Google Analytics</a> for mere statistical reasons. It is possible that <a href="https://www.google.com/analytics" target='_blank' rel="noopener noreferrer">Google Analytics</a> sets cookies or uses other tracking technologies, but this data is not directly accessible by us.<br /><br /></span>
                This page is hosted on <a href="https://netlify.com" target='_blank' rel="noopener noreferrer">Netlify</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Visualization
