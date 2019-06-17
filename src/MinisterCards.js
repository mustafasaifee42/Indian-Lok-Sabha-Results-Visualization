import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './button.css';
import './MinisterCards.css';
import Cards from './Cards'
import data from './data.json';
import colors from './colorList.json';
import * as d3 from 'd3';

let capitalize = require('capitalize')

function numDifferentiation (value) {
  let val_cr, val_lc, val_th, val_hund;
 if (value >= 10000000) {
   val_cr = Math.floor(value / 10000000);
   val_lc = Math.floor((value % 10000000) / 100000);
   if(val_lc < 10) val_lc = `0${val_lc}`
   val_th = Math.floor(((value % 10000000) % 100000) / 1000);
   if(val_th < 10) val_th = `0${val_th}`
   val_hund = value % 1000
   if(val_hund < 10) 
     val_hund = `00${val_hund}`
   else
    if(val_hund < 100 & val_hund >= 10) val_hund = `0${val_hund}`
   return (`${val_cr} ${val_lc} ${val_th} ${val_hund}`)
 } 
 else {
  val_lc = Math.floor(value / 100000);
  val_th = Math.floor((value % 100000) / 1000);
  if(val_th < 10) val_th = `0${val_th}`
  val_hund = value % 1000
  if(val_hund < 10) 
    val_hund = `00${val_hund}`
  else 
    if(val_hund < 100 & val_hund >= 10) val_hund = `0${val_hund}`
  return (`${val_lc} ${val_th} ${val_hund}`)
 }
}

let data2;

class Visualization extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: data
    }
  }
  componentWillMount(){
    let dataTemp = [...data]
    let Education = ['Others','Illiterate','Literate','5th Pass','8th Pass','10th Pass','12th Pass','Graduate','Graduate Professional','Post Graduate','Doctorate']
    data2 = dataTemp.map(el => {
      el['2019-Result']['1']['Criminal Cases'] = !el['2019-Result']['1']['Criminal Cases'] ? 0 : el['2019-Result']['1']['Criminal Cases']
      el['2019-Result']['1']['Assets'] = !el['2019-Result']['1']['Assets'] ? 0 : el['2019-Result']['1']['Assets']
      el['2019-Result']['1']['EducationIndx'] = !el['2019-Result']['1']['Education'] ? -1 : Education.indexOf(el['2019-Result']['1']['Education'])
      return el
    })
    this.setState({
      data: data2
    })

  }
  sortByEducation = () => {
    data2.sort((x, y) => d3.ascending(parseInt(x['Constituency No']), parseInt(y['Constituency No'])))
    data2.sort((x, y) => d3.ascending(x['stateCode'], y['stateCode']))
    data2.sort((x, y) => d3.descending(x[`2019-Result`]['1']['EducationIndx'], y[`2019-Result`]['1']['EducationIndx']))
    this.setState({
      data: data2
    })
  }
  sortByCriminalCases = () => {
    data2.sort((x, y) => d3.ascending(parseInt(x['Constituency No']), parseInt(y['Constituency No'])))
    data2.sort((x, y) => d3.ascending(x['stateCode'], y['stateCode']))
    data2.sort((x, y) => d3.descending(x[`2019-Result`]['1']['Criminal Cases'], y[`2019-Result`]['1']['Criminal Cases']))
    this.setState({
      data: data2
    })
  }
  sortByAssets = () => {
    data2.sort((x, y) => d3.descending(x[`2019-Result`]['1']['Assets'], y[`2019-Result`]['1']['Assets']))
    console.log(data)
    this.setState({
      data: data2
    })
  }
  sortByName = () => {
    data2.sort((x, y) => d3.ascending(parseInt(x['Constituency No']), parseInt(y['Constituency No'])))
    data2.sort((x, y) => d3.ascending(x['stateCode'], y['stateCode']))
    data2.sort((x, y) => d3.ascending(x[`2019-Result`]['1']['Name'], y[`2019-Result`]['1']['Name']))
    this.setState({
      data: data2
    })
  }
  sortConstituency = () => {
    data2.sort((x, y) => d3.ascending(parseInt(x['Constituency No']), parseInt(y['Constituency No'])))
    data2.sort((x, y) => d3.ascending(x['stateCode'], y['stateCode']))
    data2.sort((x, y) => d3.ascending(x['Name'], y['Name']))
    this.setState({
      data: data2
    })
  }
  sortParty = () => {
    data2.sort((x, y) => d3.ascending(parseInt(x['Constituency No']), parseInt(y['Constituency No'])))
    data2.sort((x, y) => d3.ascending(x['stateCode'], y['stateCode']))
    data2.sort((x, y) => d3.ascending(x[`2019-Result`]['1']['Party'], y[`2019-Result`]['1']['Party']))
    this.setState({
      data: data2
    })
  }
  sortState = () => {
    data2.sort((x, y) => d3.ascending(x[`2019-Result`]['1']['Party'], y[`2019-Result`]['1']['Party']))
    data2.sort((x, y) => d3.ascending(x['stateCode'], y['stateCode']))
    this.setState({
      data: data2
    })
  }
  render() {
    let cards = this.state.data.map((d,i) => {
      let color = colors["Party"]["Independent & Others"];
      if(Object.keys(colors['Party']).indexOf(d[`2019-Result`]['1']['Party']) > -1){
        color = colors['Party'][d[`2019-Result`]['1']['Party']]
      }
      return (
        <Cards
          key={i} 
          SrNo={i + 1}
          Name={capitalize.words(d['2019-Result']['1']['Name'])}
          Party={d['2019-Result']['1']['Party']}
          Constituency={`${d['Name']}`}
          State={d['stateFullName']}
          CriminalCases= {!d['2019-Result']['1']['Criminal Cases'] ? 0 : d['2019-Result']['1']['Criminal Cases']}
          Education={!d['2019-Result']['1']['Education'] ? 'NA' : d['2019-Result']['1']['Education']}
          Assets={d['2019-Result']['1']['Assets'] === 0 ? 'NA' : `Rs. ${numDifferentiation(d['2019-Result']['1']['Assets'])}`}
          Votes={`${numDifferentiation(d['2019-Result']['1']['Votes'])}`}
          VoteShare = {d['2019-Result']['1']['VoteShare']}
          Color = {color}
          CriminalCaseWeight={!d['2019-Result']['1']['Criminal Cases'] ? '400' : '700'}
        />
      )
    })
    return (
      <div id='minister-list'>
        <div className='section-head'>List of Winners in Lok Sabha 2019 for All 543 Constituencies</div>
        <div className='section-byline'>This section lists all the winners and their background. Click on the header to sort the winners.</div>
        <div className='table-body mp-table-head-bg' style={ {borderLeft: `5px solid rgba(255,255,255,0)` }}>
          <div className='table-no mp-table-head'>#</div>
          <div className='table-name mp-table-head' onClick={this.sortByName}>Name</div>
          <div className='mp-table-head table-party' onClick={this.sortParty}>Party</div>
          <div className='mp-table-head table-constituency' onClick={this.sortConstituency}>Constituency</div>
          <div className='mp-table-head table-state' onClick={this.sortState}>State</div>
          <div className='mp-table-head table-education' onClick={this.sortByEducation}>Education</div>
          <div className='mp-table-head table-criminal-cases' onClick={this.sortByCriminalCases}>Criminal Cases</div>
          <div className='mp-table-head table-assets' onClick={this.sortByAssets}>Total Assets</div>
        </div>
        {cards}
      </div>
    )
  }
}

export default Visualization
