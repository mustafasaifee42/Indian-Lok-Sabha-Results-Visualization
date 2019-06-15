import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { Checkbox } from 'semantic-ui-react';
import './button.css';
import PartyName from './PartyNameList.json';

const dataNa = {
  '2009':'',
  '2014':'',
  '2019':'(Data not available for 2019)'
}
const dataNaADR = {
  '2009':'(Data not available for 2009)',
  '2014':'',
  '2019':''
}
const disabledADR = {
  '2009':true,
  '2014':false,
  '2019':false
}
const partiesDropDown = Object.keys(PartyName).map((d,i) => {
  return  {
      key: d,
      text: `${PartyName[d]} (${d})`,
      value: d,
    }
})

class Visualization extends Component {
  constructor(props){
    super(props)
    this.state = {
      filterAlliances:{
        'All':true,
        'NDA':false,
        'UPA':false,
        'Mahagatbandhan':false,
        'Others':false
      },
      filterSex:{
        'All':true,
        'Male':false,
        'Female':false,
        'Third Gender':false,
      },
      filterMinorities:{
        'All':true,
        'SC':false,
        'ST':false,
        'GEN':false,
        'Not Available':false
      },
      filterReligion:{
        'All':true,
        'Muslim':false,
        'Non Muslim':false
      },
      filterEducation:{
        'All':true,
        '12th or less':false,
        'Graduate':false,
        'Post Graduate':false,
        'Doctorate':false,
        'Others':false,
        'Not Available':false
      },
      filterAssets:{
        'All':true,
        'Crorepati':false,
        'Non Crorepati':false,
        'Not Available':false
      },
      filterCriminalCases:{
        'All':true,
        'Criminal Case':false,
        'Serious Criminal Case':false,
        'Murder':false,
        'Communal Disharmony':false,
        'Crime Against Women':false,
        'Not Available':false
      },
      filterVoteShare:{
        'All':true,
        'Decisive':false,
        'Non Decisive':false
      },
      filterVictoryMargin:{
        'All':true,
        '0-10%':false, 
        '10-20%':false,
        '20-30%':false,
        '30-40%':false,
        '40-50%':false,
        '>50%':false,
      },
    }
  }
  changeParties = (event,data) => {
    this.props.changePartyFilter(data.value)
  }
  filterAlliances = (event,data) => {
    let temp = this.state.filterAlliances;
    temp[data.value] = data.checked
    let keys  = Object.keys(temp)
    let Alltemp = true;
    keys.forEach(el => {
      if (el !== 'All'){
        if(temp[el])
          Alltemp=false
      }
    })
    temp['All'] = Alltemp;
    this.setState({
      filterAlliances: temp
    })
    this.props.changeFilter(this.state)
  }
  filterSex = (event,data) => {
    let temp = this.state.filterSex;
    temp[data.value] = data.checked
    let keys  = Object.keys(temp)
    let Alltemp = true;
    keys.forEach(el => {
      if (el !== 'All'){
        if(temp[el])
          Alltemp=false
      }
    })
    temp['All'] = Alltemp;
    this.setState({
      filterSex: temp
    })
    this.props.changeFilter(this.state)
  }
  filterMinorities = (event,data) => {
    let temp = this.state.filterMinorities;
    temp[data.value] = data.checked
    let keys  = Object.keys(temp)
    let Alltemp = true;
    keys.forEach(el => {
      if (el !== 'All'){
        if(temp[el])
          Alltemp=false
      }
    })
    temp['All'] = Alltemp;
    this.setState({
      filterMinorities: temp
    })
    this.props.changeFilter(this.state)
  }
  filterReligion = (event,data) => {
    let temp = this.state.filterReligion;
    temp[data.value] = data.checked
    let keys  = Object.keys(temp)
    let Alltemp = true;
    keys.forEach(el => {
      if (el !== 'All'){
        if(temp[el])
          Alltemp=false
      }
    })
    temp['All'] = Alltemp;
    this.setState({
      filterReligion: temp
    })
    this.props.changeFilter(this.state)
  }
  filterEducation = (event,data) => {
    let temp = this.state.filterEducation;
    temp[data.value] = data.checked
    let keys  = Object.keys(temp)
    let Alltemp = true;
    keys.forEach(el => {
      if (el !== 'All'){
        if(temp[el])
          Alltemp=false
      }
    })
    temp['All'] = Alltemp;
    this.setState({
      filterEducation: temp
    })
    this.props.changeFilter(this.state)
  }
  filterAssets = (event,data) => {
    let temp = this.state.filterAssets;
    temp[data.value] = data.checked
    let keys  = Object.keys(temp)
    let Alltemp = true;
    keys.forEach(el => {
      if (el !== 'All'){
        if(temp[el])
          Alltemp=false
      }
    })
    temp['All'] = Alltemp;
    this.setState({
      filterAssets: temp
    })
    this.props.changeFilter(this.state)
  }
  filterCriminalCases = (event,data) => {
    let temp = this.state.filterCriminalCases;
    temp[data.value] = data.checked
    let keys  = Object.keys(temp)
    let Alltemp = true;
    keys.forEach(el => {
      if (el !== 'All'){
        if(temp[el])
          Alltemp=false
      }
    })
    temp['All'] = Alltemp;
    this.setState({
      filterCriminalCases: temp
    })
    this.props.changeFilter(this.state)
  }
  filterVictoryMargin = (event,data) => {
    let temp = this.state.filterVictoryMargin;
    temp[data.value] = data.checked
    let keys  = Object.keys(temp)
    let Alltemp = true;
    keys.forEach(el => {
      if (el !== 'All'){
        if(temp[el])
          Alltemp=false
      }
    })
    temp['All'] = Alltemp;
    this.setState({
      filterVictoryMargin: temp
    })
    this.props.changeFilter(this.state)
  }
  filterVoteShare = (event,data) => {
    let temp = this.state.filterVoteShare;
    temp[data.value] = data.checked
    let keys  = Object.keys(temp)
    let Alltemp = true;
    keys.forEach(el => {
      if (el !== 'All'){
        if(temp[el])
          Alltemp=false
      }
    })
    temp['All'] = Alltemp;
    this.setState({
      filterVoteShare: temp
    })
    this.props.changeFilter(this.state)
  }
  render() {
    return (
      <div className='filterBar'>
        <div className='filterBarTitle'>
          Filters
        </div>
        <div className="filters-unit filters-unit-two partyDropDown">
          Filter By Parties
          <div className="filters">
            <Dropdown className="dropdown-highlight" multiple placeholder='Filter by Parties' search selection options={partiesDropDown} onChange={this.changeParties}/>
          </div>
          </div>
        <div className='filters-checkbox-unit'>
          <div className="filters-unit filters-unit-two">
            Filter By Alliances
            <div className="filters filterCheckBox">
              <Checkbox label='NDA' value='NDA' onChange={this.filterAlliances}/>
              <Checkbox label='UPA' value='UPA' onChange={this.filterAlliances}/>
              <Checkbox label='Mahagatbandhan' value='Mahagatbandhan' onChange={this.filterAlliances}/>
              <Checkbox label='Others' value='Others' onChange={this.filterAlliances}/>
            </div>
          </div>
          <div className="filters-unit filters-unit-two">
            Filter By Gender
            <div className="filters filterCheckBox">
              <Checkbox label='Male'  value='Male' onChange={this.filterSex}/>
              <Checkbox label='Female' value='Female' onChange={this.filterSex}/>
              <Checkbox label='Third Gender' value='Third Gender' onChange={this.filterSex}/>
            </div>
          </div>
          <div className="filters-unit filters-unit-two">
            Filter By Caste
            <div className="filters filterCheckBox">
              <Checkbox label={`Schedule Castes (SC) ${dataNa[this.props.yearSelected]}`}  value='SC' onChange={this.filterMinorities}/>
              <Checkbox label={`Schedule Tribes (ST) ${dataNa[this.props.yearSelected]}`}  value='ST' onChange={this.filterMinorities}/>
              <Checkbox label={`General or OBC ${dataNa[this.props.yearSelected]}`}  value='GEN' onChange={this.filterMinorities}/>
              <Checkbox label={`Data Not Available`}  value='Not Available' onChange={this.filterMinorities}/>
            </div>
          </div>
          <div className="filters-unit filters-unit-two">
            Filter By Religion
            <div className="filters filterCheckBox">
              <Checkbox label='All Except Muslims' onChange={this.filterReligion}  value='Non Muslim'/>
              <Checkbox label='Muslims' onChange={this.filterReligion}  value='Muslim'/>
            </div>
          </div>
          <div className="filters-unit filters-unit-two">
            Filter By Education
            <div className="filters filterCheckBox">
              <Checkbox label={`12th Pass or Less`}  value='12th or less' onChange={this.filterEducation} />
              <Checkbox label={`Graduate`}  value='Graduate' onChange={this.filterEducation} />
              <Checkbox label={`Post Graduates`} value='Post Graduate' onChange={this.filterEducation} />
              <Checkbox label={`Doctorate`} value='Doctorate' onChange={this.filterEducation} />
              <Checkbox label={`Others`} value='Others' onChange={this.filterEducation} />
              <Checkbox label={`Data Not Available`} value='Not Available' onChange={this.filterEducation} />
            </div>
          </div>
          <div className="filters-unit filters-unit-two">
            Filter By Total Assets (liabilities not included)
            <div className="filters filterCheckBox">
              <Checkbox label={`Crorepati Canditates (Total Assets > Rs. 1 00 00 000)`} value='Crorepati' onChange={this.filterAssets} />
              <Checkbox label={`Total Assets < Rs. 1 00 00 000`} value='Non Crorepati' onChange={this.filterAssets} />
              <Checkbox label={`Data Not Available`} value='Not Available' onChange={this.filterAssets} />
            </div>
          </div>
          <div className="filters-unit filters-unit-two">
            Filter By Criminal Cases
            <div className="filters filterCheckBox">
              <Checkbox label={`Any Criminal Cases`} value='Criminal Case' onChange={this.filterCriminalCases}/>
              <Checkbox label={`Serious Criminal Cases`} value='Serious Criminal Case' onChange={this.filterCriminalCases}/>
              <Checkbox label={`Cases related to Murder/Attempt to Murder ${dataNaADR[this.props.yearSelected]}`} value='Murder' disabled={disabledADR[this.props.yearSelected]} onChange={this.filterCriminalCases}/>
              <Checkbox label={`Cases related to Crimes against Women ${dataNaADR[this.props.yearSelected]}`} value='Crime Against Women' disabled={disabledADR[this.props.yearSelected]} onChange={this.filterCriminalCases}/>
              <Checkbox label={`Cases related to Causing Communal Disharmony ${dataNaADR[this.props.yearSelected]}`} value='Communal Disharmony' disabled={disabledADR[this.props.yearSelected]} onChange={this.filterCriminalCases}/>
              <Checkbox label={`Data Not Available`} value='Not Available' onChange={this.filterCriminalCases}/>
            </div>
          </div>
          <div className="filters-unit filters-unit-two">
            Filter By Decisive Victory
            <div className="filters filterCheckBox">
              <Checkbox label='Vote Share > 50%' value='Decisive' onChange={this.filterVoteShare}/>
              <Checkbox label='Vote Share < 50%' value='Non Decisive' onChange={this.filterVoteShare}/>
            </div>
          </div>
          <div className="filters-unit filters-unit-two">
            Filter By Victory Margin
            <div className="filters filterCheckBox">
              <Checkbox label={`0-10%`} value='0-10%' onChange={this.filterVictoryMargin} />
              <Checkbox label={`10-20%`} value='10-20%' onChange={this.filterVictoryMargin} />
              <Checkbox label={`20-30%`} value='20-30%' onChange={this.filterVictoryMargin} />
              <Checkbox label={`30-40%`} value='30-40%' onChange={this.filterVictoryMargin} />
              <Checkbox label={`40-50%`} value='40-50%' onChange={this.filterVictoryMargin} />
              <Checkbox label={`> 50%`} value='>50%' onChange={this.filterVictoryMargin} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Visualization
