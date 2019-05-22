import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Cartogram from './Cartogram';
import './button.css';

class Visualization extends Component {
  constructor(props){
    super(props)
    this.state = {
      years:['2009','2014'],
      yearSelected:'2014',
      filter:['All','Female Winners','SC/ST Winner','Voter TurnOut','Margin of Victory'],
      alliance:['Parties','Alliances'],
      filterSelected:'All',
      allianceSelected:'Party',
      allianceButtonActive:'Parties'
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
        buttonClass = 'active'
      }
      return <Button key={i} className = {buttonClass} onClick={this.changeYear}>{d}</Button>
    })
    let filterSelection = this.state.filter.map((d,i) => {
      let buttonClass;
      if(this.state.filterSelected === d){
        buttonClass = 'active'
      }
      return <Button key={i} className = {buttonClass} onClick={this.changeFilter}>{d}</Button>
    })
    let allianceSelection = this.state.alliance.map((d,i) => {
      let buttonClass;
      if(this.state.allianceButtonActive === d){
        buttonClass = 'active'
      }
      return <Button key={i} className = {buttonClass} onClick={this.changeAllianceFilter}>{d}</Button>
    })
    return (
      <div>
        <div className="title">
          <div>{`${this.state.yearSelected} Election Results`}</div>
          <div className="yearSelector">
            <div className="allianceSelection">
              {allianceSelection}
            </div>
            {yearSelection}
          </div>
        </div>
        <div className="filters">
          {filterSelection}
        </div>
        <Cartogram
          yearSelected={this.state.yearSelected}
          filterSelected={this.state.filterSelected}
          allianceSelected={this.state.allianceSelected}
        />
      </div>
    )
  }
}

export default Visualization
