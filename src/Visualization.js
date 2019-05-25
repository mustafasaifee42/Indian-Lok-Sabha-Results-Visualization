import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Cartogram from './Cartogram';
import './button.css';

class Visualization extends Component {
  constructor(props){
    super(props)
    this.state = {
      years:['2009','2014','2019'],
      yearSelected:'2019',
      filter:['All','Female Winners','SC/ST Winners','Muslim Winners','Voter TurnOut','Margin of Victory'],
      alliance:['Parties','Alliances'],
      filterSelected:'All',
      allianceSelected:'Party',
      allianceButtonActive:'Parties',
      active:true,
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
        buttonClass = 'activeButton'
      }
      return <Button key={i} className = {buttonClass} onClick={this.changeYear}>{d}</Button>
    })
    let filterSelection = this.state.filter.map((d,i) => {
      let buttonClass;
      if(this.state.filterSelected === d){
        buttonClass = 'activeButton'
      }
      let act = true;
      if(this.state.yearSelected === '2019')
        if(d === 'All' || d === 'Margin of Victory')
          act = true
        else
          act = false
      return <Button key={i} className = {buttonClass} onClick={this.changeFilter} active={act}>{d}</Button>
    })
    let allianceSelection = this.state.alliance.map((d,i) => {
      let buttonClass;
      if(this.state.allianceButtonActive === d){
        buttonClass = 'activeButton'
      }
      let act = true;
      if(this.state.yearSelected === '2019')
        if(d === 'All' || d === 'Margin of Victory')
          act = true
        else
          act = false
      return <Button key={i} className = {buttonClass} onClick={this.changeAllianceFilter} active={act}>{d}</Button>
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
          active={this.state.active}
        />
      </div>
    )
  }
}

export default Visualization
