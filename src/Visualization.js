import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import 'd3-selection-multi';
import Cartogram from './Cartogram';
import Filters from './filters';
import 'semantic-ui-css/semantic.min.css'
import './button.css';


const totalSeats = {
  '2009':543,
  '2014':543,
  '2019':542
}
const display = {
  '2009':'none',
  '2014':'none',
  '2019':'inline'
}

class Visualization extends Component {
  constructor(props){
    super(props)
    this.state = {
      years:['2009','2014','2019'],
      yearSelected:'2019',
      filter:['Winners','Margin of Victory','Vote Share'],
      alliance:['Parties','Alliances'],
      filterSelected:'Winners',
      allianceSelected:'Party',
      allianceButtonActive:'Parties',
      active:true,
      filterValue:{
        'filterAlliances':{
          'All':true,
          'NDA':false,
          'UPA':false,
          'Mahagatbandhan':false,
          'Others':false
        },
        'filterSex':{
          'All':true,
          'Male':false,
          'Female':false
        },
        'filterMinorities':{
          'All':true,
          'SC':false,
          'ST':false,
          'GEN':false,
          'Not Available':false
        },
        'filterReligion':{
          'All':true,
          'Muslim':false,
          'Non Muslim':false
        },
        'filterEducation':{
          'All':true,
          '12th or less':false,
          'Graduate':false,
          'Post Graduate':false,
          'Doctorate':false,
          'Others':false,
          'Not Available':false
        },
        'filterAssets':{
          'All':true,
          'Crorepati':false,
          'Non Crorepati':false,
          'Not Available':false
        },
        'filterCriminalCases':{
          'All':true,
          'Criminal Case':false,
          'Serious Criminal Case':false,
          'Murder':false,
          'Cummonal Disharmony':false,
          'Crime Against Women':false,
          'Not Available':false
        },
        'filterVoteShare':{
          'All':true,
          'Decisive':false,
          'Non Decisive':false
        },
        'filterVictoryMargin':{
          'All':true,
          '0-10%':false, 
          '10-20%':false,
          '20-30%':false,
          '30-40%':false,
          '40-50%':false,
          '>50%':false,
        },
      },
      partyFiltered:[],
    }
  }
  changeYear = (ev) => {
    this.setState({
      yearSelected: ev.target.innerText,
    })
  } 
  changeFilter = (ev) => {
    this.setState({
      filterSelected: ev.target.innerText,
    })
  }
  changeFilterForMap = (filters) => {
    this.setState({
      filterValue:filters,
    })
  }
  changePartyFilter = (parties) => {
    this.setState({
      partyFiltered:parties
    })
  }
  changeAllianceFilter = (ev) => {
    let al = 'Party'
    if(ev.target.innerText==='Alliances')
      al = 'Alliance'
    this.setState({
      allianceSelected: al,
      allianceButtonActive:ev.target.innerText
    })
  }
  render() {
    let yearSelection = this.state.years.map((d,i) => {
      let buttonClass;
      if(this.state.yearSelected === d){
        buttonClass = 'activeButton'
      }
      return <Button key={i} className = {buttonClass} onClick={this.changeYear}>{d}</Button>
    })
    let allianceSelection = this.state.alliance.map((d,i) => {
      let buttonClass;
      if(this.state.allianceButtonActive === d){
        buttonClass = 'activeButton'
      }
      return <Button key={i} className = {buttonClass} onClick={this.changeAllianceFilter}>{d}</Button>
    })
    return (
      <div id='cartogram'>
        <div className="filters-container">
          <div className="filters-top">
            <div className="filters-level-one">
              <div className="filters-unit-top">
                Election Year
                <div className="filters">
                  {yearSelection}
                </div>
              </div>
              <div className="filters-unit-top">
                Color By
                <div className="filters">
                  {allianceSelection}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='graphArea'>
          <Filters 
            yearSelected={this.state.yearSelected}
            changeFilter={this.changeFilterForMap}
            changePartyFilter={this.changePartyFilter}
          />
          <Cartogram
            yearSelected={this.state.yearSelected}
            filterSelected={this.state.filterSelected}
            allianceSelected={this.state.allianceSelected}
            active={this.state.active}
            filterValue={this.state.filterValue}
            partyFiltered={this.state.partyFiltered}
          />
          <div className='infoSection infoBar'>
            <div className='infoTitle'>India <span className='seat_total'>(Total Seats: {totalSeats[this.state.yearSelected]})</span></div>
            <div className='subNote' style={{display:`${display[this.state.yearSelected]}`}}>Note: Poll cancelled in Vellore</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Visualization
