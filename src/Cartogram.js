import React, { Component } from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';
import data from './data.json';
import PartyName from './PartyNameList.json';
import colors from './colorList.json';
import {Table } from 'semantic-ui-react';

let capitalize = require('capitalize')

const totalSeats = {
  '2009':543,
  '2014':543,
  '2019':543
}
let stateSeatNoObj = {};
const radius = 10.5;
const h = 1.5 * radius / Math.cos (Math.PI / 6)

let Result_All_years,Result_Alliance_years;

let getHexPoints = (cx,cy, rad) => {
  let path = `M${cx + rad} ${cy - rad / Math.tan(Math.PI / 3)} L ${cx + rad} ${cy + rad / Math.tan(Math.PI / 3)} L ${cx} ${cy + radius / Math.cos (Math.PI / 6)} L ${cx - rad} ${cy + rad / Math.tan(Math.PI / 3)} L ${cx - rad} ${cy - rad / Math.tan(Math.PI / 3)} L ${cx} ${cy - radius / Math.cos (Math.PI / 6)} Z`
  return path
}

class Cartogram extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  componentDidUpdate(){
    d3.selectAll('.hex')
      .attrs({
        'fill':d => {
          if(Object.keys(colors[this.props.allianceSelected]).indexOf(d[`${this.props.yearSelected}-Result`]['1'][this.props.allianceSelected]) > -1){
            return colors[this.props.allianceSelected][d[`${this.props.yearSelected}-Result`]['1'][this.props.allianceSelected]]
          }
          return colors["Party"]["Independent & Others"]
        }
      })
    this.createInfoBar() 
    this.filteredParty()
  }
  filteredParty = () => {
    d3.selectAll('.ConstituencyGroup')
      .attrs({
        'opacity': (d) => {
          let op = 1;
          if(this.props.partyFiltered.length > 0){
            if(this.props.partyFiltered.indexOf(d[`${this.props.yearSelected}-Result`]['1']['Party']) === -1)
              op = 0.05
          }
          if(!this.props.filterValue.filterAlliances['All']){
            if(!this.props.filterValue.filterAlliances['NDA']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Alliance'] === 'NDA')
                op = 0.05
            }
            if(!this.props.filterValue.filterAlliances['UPA']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Alliance'] === 'UPA')
                op = 0.05
            }
            if(!this.props.filterValue.filterAlliances['Mahagatbandhan']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Alliance'] === 'Mahagatbandhan')
                op = 0.05
            }
            if(!this.props.filterValue.filterAlliances['Others']){
              if((d[`${this.props.yearSelected}-Result`]['1']['Alliance'] !== 'UPA') && (d[`${this.props.yearSelected}-Result`]['1']['Alliance'] !== 'NDA') && (d[`${this.props.yearSelected}-Result`]['1']['Alliance'] !== 'Mahagatbandhan'))
                op = 0.05
            }
          }
          if(!this.props.filterValue.filterSex['All']){
            if(!this.props.filterValue.filterSex['Male']){
              if((d[`${this.props.yearSelected}-Result`]['1']['Sex'] === 'M') || (!d[`${this.props.yearSelected}-Result`]['1']['Sex']))
                op = 0.05
            }
            if(!this.props.filterValue.filterSex['Female']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Sex'] === 'F')
                op = 0.05
            }
          }
          if(!this.props.filterValue.filterMinorities['All']){
            let arrTemp = [0,0,0,0]
            if(this.props.filterValue.filterMinorities['Not Available']){
              if(!d[`${this.props.yearSelected}-Result`]['1']['Caste'] && d[`${this.props.yearSelected}-Result`]['PC Type'] === 'None'  )
                arrTemp[3] = 1
            }
            if(this.props.filterValue.filterMinorities['GEN']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Caste'] === 'GEN')
                arrTemp[0] = 1
            }
            if(this.props.filterValue.filterMinorities['SC']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Caste'] === 'SC' || d[`${this.props.yearSelected}-Result`]['PC Type'] === 'SC' )
                arrTemp[1] = 1
            }
            if(this.props.filterValue.filterMinorities['ST']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Caste'] === 'ST' || d[`${this.props.yearSelected}-Result`]['PC Type'] === 'ST')
                arrTemp[2] = 1
            }
            if (arrTemp.indexOf(1) === -1)
              op = 0.05
          }
          if(!this.props.filterValue.filterReligion['All']){
            if(!this.props.filterValue.filterReligion['Muslim']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Religion'] === 'Muslim')
                op = 0.05
            }
            if(!this.props.filterValue.filterReligion['Non Muslim']){
              if(!d[`${this.props.yearSelected}-Result`]['1']['Religion'])
                op = 0.05
            }
          }
          if(!this.props.filterValue.filterEducation['All']){
            let arrTemp = [0,0,0,0,0,0]
            if(this.props.filterValue.filterEducation['Not Available']){
              if(!d[`${this.props.yearSelected}-Result`]['1']['Education'])
                arrTemp[0] = 1
            }
            let arr_12OrLess  = ['Illiterate','Literate','5th Pass','8th Pass','10th Pass','12th Pass']
            if(this.props.filterValue.filterEducation['12th or less']){
              if(arr_12OrLess.indexOf(d[`${this.props.yearSelected}-Result`]['1']['Education']) !== -1)
                arrTemp[1] = 1
            }
            if(this.props.filterValue.filterEducation['Graduate']){
              if((d[`${this.props.yearSelected}-Result`]['1']['Education'] === 'Graduate') || (d[`${this.props.yearSelected}-Result`]['1']['Education'] === 'Graduate Professional'))
                arrTemp[2] = 1
            }
            if(this.props.filterValue.filterEducation['Post Graduate']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Education'] === 'Post Graduate')
                arrTemp[3] = 1
            }
            if(this.props.filterValue.filterEducation['Doctorate']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Education'] === 'Doctorate')
                arrTemp[4] = 1
            }
            if(this.props.filterValue.filterEducation['Others']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Education'] === 'Others')
                arrTemp[5] = 1
            }
            if (arrTemp.indexOf(1) === -1)
              op = 0.05
          }
          if(!this.props.filterValue.filterAssets['All']){
            let arrTemp = [0,0,0]
            if(this.props.filterValue.filterAssets['Not Available']){
              if(!d[`${this.props.yearSelected}-Result`]['1']['Assets'])
                arrTemp[2] = 1
            }
            if(this.props.filterValue.filterAssets['Crorepati']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Assets'] >= 10000000)
                arrTemp[0] = 1
            }
            if(this.props.filterValue.filterAssets['Non Crorepati']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Assets'] < 10000000)
                arrTemp[1] = 1
            }
            if (arrTemp.indexOf(1) === -1)
              op = 0.05
          }
          if(!this.props.filterValue.filterVoteShare['All']){
            if(!this.props.filterValue.filterVoteShare['Decisive']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Decisive Victory'])
                op = 0.05
            }
            if(!this.props.filterValue.filterVoteShare['Non Decisive']){
              if(!d[`${this.props.yearSelected}-Result`]['1']['Decisive Victory'])
                op = 0.05
            }
          }
          if(!this.props.filterValue.filterVictoryMargin['All']){
            if(!this.props.filterValue.filterVictoryMargin['0-10%']){
              let mrgn = (d[`${this.props.yearSelected}-Result`]['1']['Votes'] - d[`${this.props.yearSelected}-Result`]['2']['Votes']) * 100 / d[`${this.props.yearSelected}-Result`]['1']['Votes']
              if(mrgn < 10)
                op = 0.05
            }
            if(!this.props.filterValue.filterVictoryMargin['10-20%']){
              let mrgn = (d[`${this.props.yearSelected}-Result`]['1']['Votes'] - d[`${this.props.yearSelected}-Result`]['2']['Votes']) * 100 / d[`${this.props.yearSelected}-Result`]['1']['Votes']
              if(mrgn >= 10 && mrgn < 20)
                op = 0.05
            }
            if(!this.props.filterValue.filterVictoryMargin['20-30%']){
              let mrgn = (d[`${this.props.yearSelected}-Result`]['1']['Votes'] - d[`${this.props.yearSelected}-Result`]['2']['Votes']) * 100 / d[`${this.props.yearSelected}-Result`]['1']['Votes']
              if(mrgn >= 20 && mrgn < 30)
                op = 0.05
            }
            if(!this.props.filterValue.filterVictoryMargin['30-40%']){
              let mrgn = (d[`${this.props.yearSelected}-Result`]['1']['Votes'] - d[`${this.props.yearSelected}-Result`]['2']['Votes']) * 100 / d[`${this.props.yearSelected}-Result`]['1']['Votes']
              if(mrgn >= 30 && mrgn < 40)
                op = 0.05
            }
            if(!this.props.filterValue.filterVictoryMargin['40-50%']){
              let mrgn = (d[`${this.props.yearSelected}-Result`]['1']['Votes'] - d[`${this.props.yearSelected}-Result`]['2']['Votes']) * 100 / d[`${this.props.yearSelected}-Result`]['1']['Votes']
              if(mrgn >= 40 && mrgn < 50)
                op = 0.05
            }
            if(!this.props.filterValue.filterVictoryMargin['>50%']){
              let mrgn = (d[`${this.props.yearSelected}-Result`]['1']['Votes'] - d[`${this.props.yearSelected}-Result`]['2']['Votes']) * 100 / d[`${this.props.yearSelected}-Result`]['1']['Votes']
              if(mrgn >= 50)
                op = 0.05
            }
          }
          if(!this.props.filterValue.filterCriminalCases['All']){
            let arrTemp = [0,0,0,0,0,0]
            if(this.props.filterValue.filterCriminalCases['Murder']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Murder'])
                arrTemp[0] = 1
            }
            if(this.props.filterValue.filterCriminalCases['Criminal Case']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Criminal Cases']  > 0)
                arrTemp[1] = 1
            }
            if(this.props.filterValue.filterCriminalCases['Serious Criminal Case']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Serious Criminal Cases'] > 0 && d[`${this.props.yearSelected}-Result`]['1']['Serious Criminal Cases'] !== undefined){
                arrTemp[2] = 1
              }
            }
            if(this.props.filterValue.filterCriminalCases['Communal Disharmony']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Communal Disharmony'])
                arrTemp[3] = 1
            }
            if(this.props.filterValue.filterCriminalCases['Crime Against Women']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Crimes against Women'])
                arrTemp[4] = 1
            }
            if(this.props.filterValue.filterCriminalCases['Not Available']){
              if(d[`${this.props.yearSelected}-Result`]['1']['Criminal Cases'] === undefined){
                arrTemp[5] = 1
              }
            }
            if (arrTemp.indexOf(1) === -1)
              op = 0.05
          }
          return op
        }
      })
    let count = 0
    d3.selectAll('.ConstituencyGroup')['_groups'][0].forEach(el => {
      if(d3.select(el).attr('opacity') === '1')
        count++
    })
    d3.selectAll('.filter-no')
      .html(count)
      
    d3.selectAll('.filter-percent')
      .html(`(${(count * 100 / 543).toFixed(2)}%)`)
  }
  mouseMove = (event) => {
    d3.selectAll('.tooltip')
      .style('top',`${event.pageY - 30}px`)
      .style('left',`${event.pageX + 10}px`)
  }
  mouseOver = (d,event) => {
    d3.selectAll('.ConstituencyGroup')
      .attrs({
        'opacity':function(el){
          if(d3.select(this).attr('opacity') === '1' && d.State === el.State)
            return 1
          return 0.05
        },
      })
    
      let count = 0
      d3.selectAll('.ConstituencyGroup')['_groups'][0].forEach(el => {
        if(d3.select(el).attr('opacity') === '1')
          count++
      })
      d3.selectAll('.filter-no')
        .html(count)
      
      d3.selectAll('.filter-percent')
        .html(`(${(count * 100 / stateSeatNoObj[d.stateFullName]).toFixed(2)}%)`)
      d3.selectAll('.state-all')
        .html(stateSeatNoObj[d.stateFullName])
    d3.select('.state-name')
      .html(`${d.stateFullName}`)
    
    d3.selectAll('.mapG')
      .append('path')
      .attrs({
        'd':getHexPoints(d['Coordinate'][0] * radius, d['Coordinate'][1] * h, radius),
        'class':'hexHighlight',
        'stroke':'#000',
        'stroke-opacity':'1',
        'stroke-width':'2',
        'fill': "none"
      })
    d3.selectAll('.tooltip')
      .style('display','inline')
      .style('top',`${event.pageY - 30}px`)
      .style('left',`${event.pageX + 10}px`)
    d3.selectAll('.const_Name')
      .html(`${d.Name} (${d.stateFullName})`)
  
    d3.selectAll('.Name1')
      .html(`${capitalize.words(d[`${this.props.yearSelected}-Result`]['1']['Name'])}`)
    d3.selectAll('.Party1')
      .html(`${d[`${this.props.yearSelected}-Result`]['1']['Party']}`)
    d3.selectAll('.Votes1')
      .html(`${d[`${this.props.yearSelected}-Result`]['1']['Votes']}`)
    d3.selectAll('.Percent1')
    .html(`${d[`${this.props.yearSelected}-Result`]['1']['VoteShare']}%`)
  
    d3.selectAll('.Name2')
      .html(`${capitalize.words(d[`${this.props.yearSelected}-Result`]['2']['Name'])}`)
    d3.selectAll('.Party2')
      .html(`${d[`${this.props.yearSelected}-Result`]['2']['Party']}`)
    d3.selectAll('.Votes2')
      .html(`${d[`${this.props.yearSelected}-Result`]['2']['Votes']}`)
    d3.selectAll('.Percent2')
    .html(`${d[`${this.props.yearSelected}-Result`]['2']['VoteShare']}%`)
  
    d3.selectAll('.Name3')
      .html(`${capitalize.words(d[`${this.props.yearSelected}-Result`]['3']['Name'])}`)
    d3.selectAll('.Party3')
      .html(`${d[`${this.props.yearSelected}-Result`]['3']['Party']}`)
    d3.selectAll('.Votes3')
      .html(`${d[`${this.props.yearSelected}-Result`]['3']['Votes']}`)
    d3.selectAll('.Percent3')
      .html(`${d[`${this.props.yearSelected}-Result`]['3']['VoteShare']}%`)
  }
  barsMouseOver = (d) => {
    let yearSelected = this.props.yearSelected
    d3.selectAll('.ConstituencyGroup')
      .attrs({
        'opacity':function(el){
          if(d3.select(this).attr('opacity') === '1' && d.key === el[`${yearSelected}-Result`]['1']['Party'])
            return 1
          return 0.05
        },
      })
    
      let count = 0
      d3.selectAll('.ConstituencyGroup')['_groups'][0].forEach(el => {
        if(d3.select(el).attr('opacity') === '1')
          count++
      })
      d3.selectAll('.filter-no')
        .html(count)
      
      d3.selectAll('.filter-percent')
        .html(`(${(count * 100 / 543).toFixed(2)}%)`)
      d3.selectAll('.state-all')
        .html(543)
    d3.select('.state-name')
      .html(`India`)
  }
  allianceMouseOver = (d) => {
    let yearSelected = this.props.yearSelected
    d3.selectAll('.ConstituencyGroup')
      .attrs({
        'opacity':function(el){
          if(d3.select(this).attr('opacity') === '1' && d.key === el[`${yearSelected}-Result`]['1']['Alliance'])
            return 1
          return 0.05
        },
      })
    
      let count = 0
      d3.selectAll('.ConstituencyGroup')['_groups'][0].forEach(el => {
        if(d3.select(el).attr('opacity') === '1')
          count++
      })
      d3.selectAll('.filter-no')
        .html(count)
      
      d3.selectAll('.filter-percent')
        .html(`(${(count * 100 / 543).toFixed(2)}%)`)
      d3.selectAll('.state-all')
        .html(543)
    d3.select('.state-name')
      .html(`India`)
  }
  mouseLeave = () => {
    d3.selectAll('.hexHighlight').remove()
    d3.selectAll('.tooltip')
      .style('display','none')
    d3.selectAll(`.hex`)
      .attrs ({
        'stroke':'#fff',
        'stroke-opacity':'0.6',
        'stroke-width':'1',
      })
      let count = 0
    d3.selectAll('.ConstituencyGroup')['_groups'][0].forEach(el => {
      if(d3.select(el).attr('opacity') === '1')
        count++
    })
    d3.selectAll('.filter-no')
      .html(count)
      
    d3.selectAll('.filter-percent')
      .html(`(${(count * 100 / 543).toFixed(2)}%)`)
      d3.selectAll('.state-all')
        .html('543')
    d3.select('.state-name')
      .html(`India`)
    this.filteredParty();
    
  }
  componentDidMount(){

    let width = 808, height = 820;
    let stateSeatNo = d3.nest()
      .key(d => d[`stateFullName`])
      .rollup(v => v.length)
      .entries(data)
    stateSeatNo.forEach(d => {
      stateSeatNoObj[d.key] = d.value
    })
    let Result_2014 = d3.nest()
      .key(d => d[`2014-Result`]['1']['Party'])
      .rollup(v => v.length)
      .entries(data.filter(d => d[`2014-Result`]['1']['Party'] !== 'NA'));
    let Result_2019 = d3.nest()
      .key(d => d[`2019-Result`]['1']['Party'])
      .rollup(v => v.length)
      .entries(data.filter(d => d[`2019-Result`]['1']['Party'] !== 'NA'));
    let Result_Alliance_2019 = d3.nest()
      .key(d => d[`2019-Result`]['1']['Alliance'])
      .rollup(v => v.length)
      .entries(data.filter(d => d[`2019-Result`]['1']['Party'] !== 'NA'));
    let Result_Alliance_2014 = d3.nest()
      .key(d => d[`2014-Result`]['1']['Alliance'])
      .rollup(v => v.length)
      .entries(data.filter(d => d[`2014-Result`]['1']['Party'] !== 'NA'));
    let Result_Alliance_Parties_2014 = d3.nest()
      .key(d => d[`2014-Result`]['1']['Alliance'])
      .key(d => d[`2014-Result`]['1']['Party'])
      .rollup(v => v.length)
      .entries(data.filter(d => d[`2014-Result`]['1']['Party'] !== 'NA'));
      let Result_Alliance_Parties_2019 = d3.nest()
        .key(d => d[`2019-Result`]['1']['Alliance'])
        .key(d => d[`2019-Result`]['1']['Party'])
        .rollup(v => v.length)
        .entries(data.filter(d => d[`2019-Result`]['1']['Party'] !== 'NA'));
    // eslint-disable-next-line
    let Result_StateWise_2014 = d3.nest()
      .key(d => d[`stateFullName`])
      .key(d => d[`2014-Result`]['1']['Party'])
      .rollup(v => v.length)
      .entries(data);
    let Result_2009 = d3.nest()
      .key(d => d[`2009-Result`]['1']['Party'])
      .rollup(v => v.length)
      .entries(data.filter(d => d[`2009-Result`]['1']['Party'] !== 'NA'));
    let Result_Alliance_2009 = d3.nest()
      .key(d => d[`2009-Result`]['1']['Alliance'])
      .rollup(v => v.length)
      .entries(data.filter(d => d[`2009-Result`]['1']['Party'] !== 'NA'));
    let Result_Alliance_Parties_2009 = d3.nest()
      .key(d => d[`2009-Result`]['1']['Alliance'])
      .key(d => d[`2009-Result`]['1']['Party'])
      .rollup(v => v.length)
      .entries(data.filter(d => d[`2009-Result`]['1']['Party'] !== 'NA'));
    // eslint-disable-next-line
    let Result_StateWise_2009 = d3.nest()
      .key(d => d[`stateFullName`])
      .key(d => d[`2009-Result`]['1']['Party'])
      .rollup(v => v.length)
      .entries(data);
    Result_Alliance_2009 = Result_Alliance_2009.filter(d => d.value > 0).sort((a, b) => d3.descending(a.value, b.value))
    Result_Alliance_2014 = Result_Alliance_2014.filter(d => d.value > 0).sort((a, b) => d3.descending(a.value, b.value))
    Result_Alliance_2019 = Result_Alliance_2019.filter(d => d.value > 0).sort((a, b) => d3.descending(a.value, b.value))
    Result_Alliance_2014 = Result_Alliance_2014.map(d => {
      Result_Alliance_Parties_2014.forEach(el => {
        if(d.key === el.key){
          d.Party = el.values
        }
      })
      d.Party = d.Party.sort((a, b) => d3.descending(a.value, b.value))
      d.Party = d.Party.map(el => {
        el.Alliance = d.key
        return el;
      })
      return d
    })
    Result_Alliance_2009 = Result_Alliance_2009.map(d => {
      Result_Alliance_Parties_2009.forEach(el => {
        if(d.key === el.key)
          d.Party = el.values
      })
      d.Party = d.Party.sort((a, b) => d3.descending(a.value, b.value))
      d.Party = d.Party.map(el => {
        el.Alliance = d.key
        return el;
      })
      return d
    })
    Result_Alliance_2019 = Result_Alliance_2019.map(d => {
      Result_Alliance_Parties_2019.forEach(el => {
        if(d.key === el.key)
          d.Party = el.values
      })
      d.Party = d.Party.sort((a, b) => d3.descending(a.value, b.value))
      d.Party = d.Party.map(el => {
        el.Alliance = d.key
        return el;
      })
      return d
    })

    Result_All_years={
      '2009':Result_2009.sort((a, b) => d3.descending(a.value, b.value)),
      '2014':Result_2014.sort((a, b) => d3.descending(a.value, b.value)),
      '2019':Result_2019.sort((a, b) => d3.descending(a.value, b.value))
    }
    Result_Alliance_years={
      '2009':Result_Alliance_2009,
      '2014':Result_Alliance_2014,
      '2019':Result_Alliance_2019
    }
    let svg = d3.selectAll('.map')
      .append('svg')
      .attrs({
        'width':width,
        'height':height,
        'class':'mapSVG' 
      })
      .append('g')
      .attrs({ 
        'transform':'translate(20,40)',
        'class':'mapG' 
      })

    let stateList = d3.map(data, d => d.State).keys()
    stateList.forEach((el,k) => {
      svg.selectAll(`.${el}`)
        .data(data.filter(d => d.State === el))
        .enter()
        .append('path')
        .attrs({
          'class':d => `${d.State} hexOutline`,
          'd': d => getHexPoints(d['Coordinate'][0] * radius, d['Coordinate'][1] * h, radius),
          'fill':'none',
          'stroke':'#000',
          'stroke-width':'3'
        })
        .on("mouseover",d => {
          this.mouseOver(d,d3.event)
        })
        .on('mousemove',d => {
          this.mouseMove(d3.event)
        })
        .on("mouseout",this.mouseLeave)
      svg.selectAll(`.${el}BG`)
        .data(data.filter(d => d.State === el))
        .enter()
        .append('path')
        .attrs({
          'class':d => `${d.State}BG`,
          'd':d => getHexPoints(d['Coordinate'][0] * radius, d['Coordinate'][1] * h, radius),
          'stroke':'#fff',
          'stroke-opacity':'0.6',
          'stroke-width':'1',
          'fill':'#fff'
        })      
      
      svg.selectAll(`.${el}Group`)
        .data(data.filter(d => d.State === el))
        .enter()
        .append('g')
        .attrs({ 
          'class':d => {
            return `Year_2014_${d[`2014-Result`]['1']['Party'].replace("(", "_").replace("(", "_").replace(")", "_").replace(")", "_")} Year_2019_${d[`2019-Result`]['1']['Party'].replace("(", "_").replace("(", "_").replace(")", "_").replace(")", "_")} Year_2009_${d[`2009-Result`]['1']['Party'].replace("(", "_").replace("(", "_").replace(")", "_").replace(")", "_")} State_${d.State} ConstituencyGroup ${el}Group`
          } 
        })
        .on("mouseover",d => {
          this.mouseOver(d,d3.event)
        })
        .on('mousemove',d => {
          this.mouseMove(d3.event)
        })
        .on("mouseout",this.mouseLeave)      
    })

    d3.selectAll('.ConstituencyGroup')
      .append('path')
      .attrs({
        'd':d => getHexPoints(d['Coordinate'][0] * radius, d['Coordinate'][1] * h, radius),
        'class':d => `hex state_${d.State}_const_${d['Constituency No']}`,
        'stroke':'#fff',
        'stroke-opacity':'0.6',
        'stroke-width':'1',
        'fill': d => {
          if(Object.keys(colors[this.props.allianceSelected]).indexOf(d[`${this.props.yearSelected}-Result`]['1'][this.props.allianceSelected]) > -1){
            return colors[this.props.allianceSelected][d[`${this.props.yearSelected}-Result`]['1'][this.props.allianceSelected]]
          }
          return colors["Party"]["Independent & Others"]
        }
      })

      d3.selectAll('.ConstituencyGroup')
        .append('circle')
        .attrs({
          'cx':d => d['Coordinate'][0] * radius,
          'cy':d => d['Coordinate'][1] * h,
          'r':d => {
            if(d[`${this.props.yearSelected}-Result`]['PC Type'] !== 'None')
              return 3
            return 0
          },
          'fill':'#000'
        })

      let keyG = svg.append('g')
        .attrs({ 'transform':'translate(375,650)'})

      keyG.append('circle')
        .attrs({
          'fill': '#000',
          'r':5,
          'cx':0,
          'cy':60
        })
      keyG.append('text')
        .text('Reserved Seats: 84 for SC & 47 for ST')
        .attrs({
          'fill': '#000',
          'x':10,
          'y':65,
          'font-weight':700
        })
      
      this.createInfoBar();
  }

  createInfoBar = () => {
    d3.selectAll('.barChart').remove();
    let info = d3.selectAll('.infoSection')
                  .append('div')
                  .attrs({ 'class':'barChart' })
    
    info.selectAll('.partyBars')
      .data(Result_All_years[this.props.yearSelected])
      .enter()
      .append('div')
      .attrs({ 
        'class':'partyBars',
        'title':d => PartyName[d.key]
      })
      .on("mouseover",d => {
        this.barsMouseOver(d)
      })
      .on("mouseout",this.mouseLeave)
    
    info.selectAll('.partyBars')
      .append('div')
      .attrs({ 'class':'partyNames' })
      .html(d => d.key)
    
    info.selectAll('.partyBars')
      .append('div')
      .attrs({ 'class':'partyBarBG' })
    info.selectAll('.partyBarBG')
      .append('div')
      .style('width',d => `${d.value * 100/ totalSeats[this.props.yearSelected]}%`)
      .style('background-color',d => {
        if(Object.keys(colors['Party']).indexOf(d['key']) > -1){
          return colors['Party'][d['key']]
        }
        return colors["Party"]["Independent & Others"]
      })
    info.selectAll('.partyBarBG')
      .append('div')
      .attrs({'class':'seatShare'})
      .html(d => `${d.value} (${(d.value * 100/totalSeats[this.props.yearSelected]).toFixed(1)}%)`)
    
    info.selectAll('.AllianceBars')
      .data(Result_Alliance_years[this.props.yearSelected])
      .enter()
      .append('div')
      .attrs({ 'class':'AllianceBars' })
      .style('display','none')
    
      info.selectAll('.AllianceBars')
        .append('div')
        .attrs({ 'class':'AllianceNames' })
        .html(d => d.key)
    
      info.selectAll('.AllianceBars')
        .append('div')
        .attrs({ 'class':'AllianceBar' })
        .on("mouseover",d => {
          this.allianceMouseOver(d)
        })
        .on("mouseout",this.mouseLeave)

      info.selectAll('.AllianceBar')
        .append('div')
        .attrs({ 'class':'partyNames' })
        .html('All')
    info.selectAll('.AllianceBar')
      .append('div')
      .attrs({ 'class':'AllianceBarsBG' })
    info.selectAll('.AllianceBarsBG')
      .append('div')
      .style('width',d => `${d.value * 100/ totalSeats[this.props.yearSelected]}%`)
      .style('background-color',d =>  colors['Alliance'][d['key']])
    info.selectAll('.AllianceBarsBG')
      .append('div')
      .attrs({'class':'seatShare'})
      .html(d => `${d.value} (${(d.value*100/totalSeats[this.props.yearSelected]).toFixed(1)}%)`)

    let party_bars = info.selectAll('.AllianceBars')
      .append('div')
    
    party_bars.selectAll('.party_bars')
      .data(d => d['Party'])
      .enter()
      .append('div')
      .attrs({ 
        'class':'party_bars',
        'title':d => PartyName[d.key]
      })
      .on("mouseover",d => {
        this.barsMouseOver(d)
      })
      .on("mouseout",this.mouseLeave)
      
      party_bars.selectAll('.party_bars')
        .append('div')
        .attrs({ 'class':'partyNames alliancepartyNames' })
        .html(d => d.key)
      
      party_bars.selectAll('.party_bars')
        .append('div')
        .attrs({ 'class':'partyBarBG' })
      party_bars.selectAll('.partyBarBG')
        .append('div')
        .style('width',d => `${d.value * 100/ totalSeats[this.props.yearSelected]}%`)
        .style('background-color',d => colors["Alliance"][d['Alliance']])
      party_bars.selectAll('.partyBarBG')
        .append('div')
        .attrs({'class':'seatShare'})
        .html(d => `${d.value} (${(d.value * 100/totalSeats[this.props.yearSelected]).toFixed(1)}%)`)
      
    if(this.props.allianceSelected === "Alliance"){
      d3.selectAll(".partyBars").style('display','none')
      d3.selectAll(".AllianceBars").style('display','inline')
    } else {
      d3.selectAll(".AllianceBars").style('display','none')
      d3.selectAll(".partyBars").style('display','flex')
    }
  }
  render() {
    return ( 
      <div className='vizArea'>
        <div className='map-message'>
          <div className="state-selection bold">
            <span className='state-name'>India</span> — Filtered <span className='filter-no'>543</span> out of <span className='state-all'>543</span> <span className='filter-percent bold'> {`(100.00%)`} </span>
          </div>
        </div>
        <div className={'map'} />
        <div className='tooltip'>
          <div className='tooltip_Head'>
            <div className='const_Name'>Contituency</div>
          </div>
          <div className='Winner_Info'>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Candidate</Table.HeaderCell>
                  <Table.HeaderCell>Party</Table.HeaderCell>
                  <Table.HeaderCell className='right'>Votes</Table.HeaderCell>
                  <Table.HeaderCell className='right'>Pct.</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell className='Name1 ribbon bold'>First</Table.Cell>
                  <Table.Cell className='Party1 bold'>Cell</Table.Cell>
                  <Table.Cell className='Votes1 right bold'>Cell</Table.Cell>
                  <Table.Cell className='Percent1 right bold'>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className='Name2'>Cell</Table.Cell>
                  <Table.Cell className='Party2'>Cell</Table.Cell>
                  <Table.Cell className='Votes2 right'>Cell</Table.Cell>
                  <Table.Cell className='Percent2 right'>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className='Name3'>Cell</Table.Cell>
                  <Table.Cell className='Party3'>Cell</Table.Cell>
                  <Table.Cell className='Votes3 right'>Cell</Table.Cell>
                  <Table.Cell className='Percent3 right'>Cell</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

export default Cartogram
