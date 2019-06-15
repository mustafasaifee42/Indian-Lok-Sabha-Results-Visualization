import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Dropdown } from 'semantic-ui-react';
import CartogramSmall from './CartogramSmall';
import data from './data.json';
import * as d3 from 'd3';
import arrow from './arrow.svg'; 

const dropDownOptions = [
  {
    key: "All",
    text: `All Winners`,
    value: 'All',
  },
  {
    key: "Females",
    text: `All Females Winners`,
    value: 'Females',
  },
  {
    key: "Muslims",
    text: `All Muslims Winners`,
    value: 'Muslims',
  },
  {
    key: "Graduate",
    text: `All Winner who are Graduate and above`,
    value: 'Graduate',
  },
  {
    key: "Crorepati",
    text: `All winner who are Crorepati (Assets > Rs. 1,00,00,000)`,
    value: 'Crorepati',
  },
  {
    key: "Criminal Cases",
    text: `All winner who are involved in Any Criminal Case`,
    value: 'Criminal Cases',
  },
  {
    key: "Serious Criminal Cases",
    text: `All winner who are involved in Any Serious Criminal Case`,
    value: 'Serious Criminal Cases',
  },
]

const partyDropDownOptions = [
  {
    key: "All Parties",
    text: `All Parties`,
    value: 'All Parties',
  },
  {
    key: "BJP",
    text: `BJP`,
    value: 'BJP',
  },
  {
    key: "INC",
    text: `INC`,
    value: 'INC',
  },
  {
    key: "Other Parties",
    text: `Other Parties`,
    value: 'Other Parties',
  },
  {
    key: "NDA",
    text: `NDA (Alliance led by BJP)`,
    value: 'NDA',
  },
  {
    key: "UPA",
    text: `UPA (Alliance led by INC)`,
    value: 'UPA',
  },
  {
    key: "Other Alliances or Unaligned",
    text: `Other Alliances or Unaligned`,
    value: 'Other Alliances or Unaligned',
  }
]
let stateSeatNo = d3.nest()
  .key(d => d[`stateFullName`])
  .rollup(v => v.length)
  .entries(data)
  
let stateDropDownOptions = [
  {
    key: "India",
    text: `India`,
    value: 'India',
  },
  {
    key: "Hindi Belt",
    text: `Hindi Belt`,
    value: 'Hindi Belt',
  },
  {
    key: "North India",
    text: `North India`,
    value: 'North India',
  },
  {
    key: "East India",
    text: `East India`,
    value: 'East India',
  },
  {
    key: "North East India",
    text: `North East India`,
    value: 'North East India',
  },
  {
    key: "South India",
    text: `South India`,
    value: 'South India',
  },
  {
    key: "West India",
    text: `West India`,
    value: 'West India',
  }
];
let stateSeatNoObj = {};
stateSeatNo.forEach(d => {
  stateSeatNoObj[d.key] = d.value
})
stateSeatNo.forEach((d,i) => {
  stateDropDownOptions.push(
    {
      key: d.key,
      text: `${d.key}`,
      value: d.key,
    }
  )
})
class Visualization extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'All',
      stateSelected:'India',
      partySelected:'All Parties'
    }
  }
  componentDidMount() {
    var offsets = document.getElementById('arrow-icon').getBoundingClientRect();
    d3.selectAll('.subTextCopy')
      .style('margin-left',`${offsets.x + 20}px`)
  }
  changeOption = (event,data) => {
    this.setState({
      selected: data.value,
    })
  }
  changeState = (event,data) => {
    this.setState({
      stateSelected: data.value,
    })
  }
  changePartyOption = (event,data) => {
    this.setState({
      partySelected: data.value,
    })
  }
  render() {
    return (
      <div className='section2' id='animated-cartogram'>
        <div className='section-head'>Analyze Election Result Through Time</div>
        <div className='section-byline'>This section helps you see the changes and patterns in election results. The following maps shows how India voted through 3 different general elections and about different winners and their background.</div>
        <div className='filter-unit'> 
          <div className='section2-selection'>
            <img src={arrow} alt="Pointer" height="44" width="44" className="arrow-icon" id="arrow-icon"/>
            <div className='section-subhead'>Highlight </div>
            <Dropdown className="section2-dropdown" placeholder='All Winners' selection options={dropDownOptions} onChange={this.changeOption}/> 
            <div className='section-subhead middle'> from</div> 
            <Dropdown className="state-dropdown" placeholder='India' selection search options={stateDropDownOptions} onChange={this.changeState}/>
            <div className='section-subhead'>and from</div>
            <Dropdown className="state-dropdown" placeholder='All Parties' selection options={partyDropDownOptions} onChange={this.changePartyOption}/>
          </div>
          <div className='subText'>
            <div className='subTextCopy'>
              Filter winner on basis of gender, education, assets, parties, alliances, regions etc.
            </div>
          </div>
        </div>
        <div className="section2-viz">
          <CartogramSmall
            selected={this.state.selected}
            stateSelected = {this.state.stateSelected}
            partySelected = {this.state.partySelected}
            stateSeatNoObj = {stateSeatNoObj}
          />
        </div>
      </div>
    )
  }
}

export default Visualization
