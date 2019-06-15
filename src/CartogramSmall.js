import React, { Component } from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';
import data from './data.json';
import {Table } from 'semantic-ui-react';

let capitalize = require('capitalize')

const colors = {
  "Party":{
    "BJP":"#fd9a3e",
    "INC":"#00e1e1",
    "Independent & Others":"#aaa",
    "NA":"#fff"
  }
}
let countdown;
let play = true;
let stateSeatNoObj = {};
const radius = 9;
const h = 1.5 * radius / Math.cos (Math.PI / 6)
let yearValue = 2009;
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
    this.updateOption();
  }
  updateOption = () => {
    var offsets = document.getElementById('arrow-icon').getBoundingClientRect();
    d3.selectAll('.subTextCopy')
      .style('margin-left',`${offsets.x + 20}px`)
    let state,seatNo = 543;
    d3.selectAll('.state-name-animated-map')
      .html(this.props.stateSelected)
    switch(this.props.stateSelected){
      case 'India':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': 1,
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'Hindi Belt':
        state = ['Haryana','Uttar Pradesh','Uttarakhand','Himachal Pradesh','Madhya Pradesh','Rajasthan','Bihar','Jharkhand','Chattisgarh','NCT OF Delhi']
        seatNo = 0
        state.forEach(d => {
          seatNo = seatNo + stateSeatNoObj[d]
        })
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': d => {
              if(state.indexOf(d.stateFullName) > -1)
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'North India':
        state = ['Jammu & Kashmir','Punjab','Uttarakhand','Himachal Pradesh','Chandigarh']
        seatNo = 0
        state.forEach(d => {
          seatNo = seatNo + stateSeatNoObj[d]
        })
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': d => {
              if(state.indexOf(d.stateFullName) > -1)
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'North East India':
        state = ['Mizoram','Manipur','Sikkim','Assam','Meghalaya','Nagaland']
        seatNo = 0
        state.forEach(d => {
          seatNo = seatNo + stateSeatNoObj[d]
        })
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': d => {
              if(state.indexOf(d.stateFullName) > -1)
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'East India':
        state = ['West Bengal','Odisha']
        seatNo = 0
        state.forEach(d => {
          seatNo = seatNo + stateSeatNoObj[d]
        })
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': d => {
              if(state.indexOf(d.stateFullName) > -1)
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'South India':
        state = ['Telangana','Andhra Pradesh','Tamil Nadu','Puducherry','Kerala','Karnataka','Goa']
        seatNo = 0
        state.forEach(d => {
          seatNo = seatNo + stateSeatNoObj[d]
        })
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': d => {
              if(state.indexOf(d.stateFullName) > -1)
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'West India':
        state = ['Maharashtra','Gujrat','Dadra Nagar & Haveli','Daman & Diu']
        seatNo = 0
        state.forEach(d => {
          seatNo = seatNo + stateSeatNoObj[d]
        })
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': d => {
              if(state.indexOf(d.stateFullName) > -1)
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      default:
        seatNo = stateSeatNoObj[this.props.stateSelected]
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': d => {
              if(d.stateFullName === this.props.stateSelected)
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
    }
    d3.selectAll('.state-all-animated-map')
      .html(seatNo)
    d3.selectAll('.party-selected')
      .html(this.props.partySelected)
    switch(this.props.partySelected){
      case 'All Parties':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') 
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'INC':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Party'] === 'INC')
                  return 1
                return 0.05
              }
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'BJP':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Party'] === 'BJP')
                  return 1
                return 0.05
              }
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'Other Parties':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Party'] !== 'BJP' && d[`${yearValue}-Result`]['1']['Party'] !== 'INC')
                  return 1
                return 0.05
              }
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'NDA':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Alliance'] === 'NDA')
                  return 1
                return 0.05
              }
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'UPA':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Alliance'] === 'UPA')
                  return 1
                return 0.05
              }
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'Other Alliances or Unaligned':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Alliance'] !== 'NDA' && d[`${yearValue}-Result`]['1']['Alliance'] !== 'UPA')
                  return 1
                return 0.05
              }
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      default:
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') 
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
    }
    let count = 0;
    d3.selectAll('.hex-animated-map')['_groups'][0].forEach(el => {
      if(d3.select(el).attr('opacity') === '1')
        count++
    })
    d3.selectAll('.filter-party-no-animated-map')
      .html(count)

    switch(this.props.selected){
      case 'All':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') 
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'Females':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Sex'] === 'F'){
                  return 1
                }
                return 0.05
              }
              else
                return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'Muslims':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Religion'] === 'Muslim'){
                  return 1
                }
                return 0.05
              }
              else
                return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'Graduate':
        let arr_12OrLess  = ['Illiterate','Literate','5th Pass','8th Pass','10th Pass','12th Pass']
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(arr_12OrLess.indexOf(d[`${yearValue}-Result`]['1']['Education']) === -1 && d[`${yearValue}-Result`]['1']['Education']){
                  return 1
                }
                return 0.05
              }
              else
                return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'Crorepati':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Assets'] >= 10000000){
                  return 1
                }
                return 0.05
              }
              else
                return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'Criminal Cases':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Criminal Cases'] > 0){
                  return 1
                }
                return 0.05
              }
              else
                return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      case 'Serious Criminal Cases':
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') {
                if(d[`${yearValue}-Result`]['1']['Criminal Cases'] > 0){
                  return 1
                }
                return 0.05
              }
              else
                return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
      default:
        d3.selectAll(`.hex-animated-map`)
          .attrs({
            'opacity': function(d){
              if(d3.select(this).attr('opacity') === '1') 
                return 1
              return 0.05
            },
            'fill': d => {
              if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
                return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
              }
              return colors["Party"]["Independent & Others"]
            }
          })
        break;
    }
    count = 0
    d3.selectAll('.hex-animated-map')['_groups'][0].forEach(el => {
      if(d3.select(el).attr('opacity') === '1')
        count++
    })
    d3.selectAll('.filter-no-animated-map')
      .html(count)
  }
  mouseMove = (event) => {
    d3.selectAll('.tooltip-section2')
      .style('top',`${event.pageY - 30}px`)
      .style('left',`${event.pageX + 10}px`)
  }
  mouseOver = (d,event) => {
    d3.selectAll('.mapG-animated-map')
      .append('path')
      .attrs({
        'd':getHexPoints(d['Coordinate'][0] * radius, d['Coordinate'][1] * h, radius),
        'class':'hexHighlight-section2',
        'stroke':'#000',
        'stroke-opacity':'1',
        'stroke-width':'2',
        'fill': "none"
      })
    d3.selectAll('.tooltip-section2')
      .style('display','inline')
      .style('top',`${event.pageY - 30}px`)
      .style('left',`${event.pageX + 10}px`)
    d3.selectAll('.const_Name-section2')
      .html(`${d.Name} (${d.stateFullName})`)
  
    d3.selectAll('.Name1-section2')
      .html(`${capitalize.words(d[`2009-Result`]['1']['Name'])}`)
    d3.selectAll('.Party1-section2')
      .html(`${d[`2009-Result`]['1']['Party']}`)
  
    d3.selectAll('.Name2-section2')
      .html(`${capitalize.words(d[`2014-Result`]['1']['Name'])}`)
    d3.selectAll('.Party2-section2')
      .html(`${d[`2014-Result`]['1']['Party']}`)
  
    d3.selectAll('.Name3-section2')
      .html(`${capitalize.words(d[`2019-Result`]['1']['Name'])}`)
    d3.selectAll('.Party3-section2')
      .html(`${d[`2019-Result`]['1']['Party']}`)
  }
  mouseLeave = () => {
    d3.selectAll('.hexHighlight-section2').remove()
    d3.selectAll('.tooltip-section2')
      .style('display','none')
  }
  componentDidMount(){

    d3.selectAll('.map-animated-map')
      .on('mouseover',() => {
        d3.selectAll('.play-pause-icon')
          .attrs({
            'opacity':1
          })
      })
      .on('mouseout',() => {
        d3.selectAll('.play-pause-icon')
          .attrs({
            'opacity':0
          })
      })
    let width = 688, height = 660;
    let stateSeatNo = d3.nest()
      .key(d => d[`stateFullName`])
      .rollup(v => v.length)
      .entries(data)
    stateSeatNo.forEach(d => {
      stateSeatNoObj[d.key] = d.value
    })
    
    let svg = d3.selectAll(`.map-animated-map`)
      .append('svg')
      .attrs({
        'width':width,
        'height':height,
        'class':'mapSVG' 
      })
      .append('g')
      .attrs({ 
        'transform':'translate(20,40)',
        'class':`mapG-animated-map` 
      })

    let stateList = d3.map(data, d => d.State).keys()
    stateList.forEach((el,k) => {
      svg.selectAll(`.${el}-animated-map`)
        .data(data.filter(d => d.State === el))
        .enter()
        .append('path')
        .attrs({
          'class':d => `${d.State}-animated-map hexOutline`,
          'd': d => getHexPoints(d['Coordinate'][0] * radius, d['Coordinate'][1] * h, radius),
          'fill':'none',
          'stroke':'#000',
          'stroke-width':'3'
        })
      svg.selectAll(`.${el}BG-animated-map`)
        .data(data.filter(d => d.State === el))
        .enter()
        .append('path')
        .attrs({
          'class':d => `${d.State}BG-animated-map`,
          'd':d => getHexPoints(d['Coordinate'][0] * radius, d['Coordinate'][1] * h, radius),
          'stroke':'#fff',
          'stroke-opacity':'0.6',
          'stroke-width':'1',
          'fill':'#fff'
        })      
      
      svg.selectAll(`.${el}Group-animated-map`)
        .data(data.filter(d => d.State === el))
        .enter()
        .append('g')
        .attrs({ 
          'class':d => {
            return `State_${d.State}-animated-map ConstituencyGroup-animated-map ${el}Group-animated-map`
          },
          'opacity':'1',
        })   
    })

    d3.selectAll(`.ConstituencyGroup-animated-map`)
      .append('path')
      .attrs({
        'd':d => getHexPoints(d['Coordinate'][0] * radius, d['Coordinate'][1] * h, radius),
        'class':d => `hex-animated-map state_${d.State}_const_${d['Constituency No']}-animated-map`,
        'stroke':'#fff',
        'stroke-opacity':'0.6',
        'stroke-width':'1',
        'fill': d => {
          if(Object.keys(colors['Party']).indexOf(d[`${yearValue}-Result`]['1']['Party']) > -1){
            return colors['Party'][d[`${yearValue}-Result`]['1']['Party']]
          }
          return colors["Party"]["Independent & Others"]
        }
      })
      .on("mouseover",d => {
        this.mouseOver(d,d3.event)
      })
      .on('mousemove',d => {
        this.mouseMove(d3.event)
      })
      .on("mouseout",this.mouseLeave)
    let legend = svg.append('g')
      .attrs({
        'transform':'translate(335,530)'
      })
    legend.append('circle')
      .attrs({
        'cx':0,
        'cy':5,
        'r':5,
        'fill':colors['Party']['BJP'],
      })
    legend.append('text')
      .attrs({
        'x':10,
        'y':5,
        'dy':5,
        'font-size':'18px',
        'font-weight':'700',
        'fill':colors['Party']['BJP'],
      })
      .text('BJP')
    legend.append('circle')
      .attrs({
        'cx':0,
        'cy':35,
        'r':5,
        'fill':colors['Party']['INC'],
      })
    legend.append('text')
      .attrs({
        'x':10,
        'y':35,
        'dy':5,
        'font-size':'18px',
        'font-weight':'700',
        'fill':colors['Party']['INC'],
      })
      .text('INC')
    legend.append('circle')
      .attrs({
        'cx':0,
        'cy':65,
        'r':5,
        'fill':colors['Party']['Independent & Others'],
      })
    legend.append('text')
      .attrs({
        'x':10,
        'y':65,
        'dy':5,
        'font-size':'18px',
        'font-weight':'700',
        'fill':colors['Party']['Independent & Others'],
      })
      .text('Others')
    
    let playIcon = svg.append('g')
      .attrs({
        'class':'play-pause-icon',
        'opacity':0,
        'transform':`translate(194,270)`
      })
    playIcon.append('circle')
      .attrs({
        'cx':0,
        'cy':0,
        'r':65,
        'fill':'none',
        'stroke':'#262626',
        'stroke-width':'20',
        'opacity':0.25,
      })
    playIcon.append('rect')
      .attrs({
        'class':'pause',
        'x':-30,
        'y':-30,
        'width':25,
        'height':60,
        'fill':'#262626',
        'opacity':0.25,

      })
      playIcon.append('rect')
        .attrs({
          'class':'pause',
          'x':10,
          'y':-30,
          'width':25,
          'height':60,
          'fill':'#262626',
          'opacity':0.25,
        })
      playIcon.append('path')
        .attrs({
          'class':'play',
          'd':'M -20,-30 L 25,0 L -20,30 z',
          'fill':'#262626',
          'opacity':0,
        })
    countdown = setInterval(this.changeYear, 1500);
  }
  changeYear = () => {
    if(yearValue === 2019)
      yearValue = 2009
    else  
      yearValue = yearValue + 5 
    d3.selectAll('.year')
      .html(yearValue)
    this.updateOption();
  }
  playPause = () => {
    if(play){
      clearInterval(countdown)
      d3.selectAll('.play')
        .attrs({
          'opacity':0.25
        })
      d3.selectAll('.pause')
        .attrs({
          'opacity':0
        })
      play = false;
    }
    else {
      countdown = setInterval(this.changeYear, 1500);
      d3.selectAll('.play')
        .attrs({
          'opacity':0
        })
      d3.selectAll('.pause')
        .attrs({
          'opacity':0.25
        })
      play = true;

    }
  }
  render() {
    return ( 
      <div className='vizArea'>
        <div className='map-message-animated-map'>
          <div><span className='year bold'>2019</span><span className="year-sub-text">Click on the map to start and stop the animation</span></div>
          <div className="state-selection">
            Filtered <span className={`filter-no-animated-map bold`}>543</span> out of <span className={`filter-party-no-animated-map bold`}>543</span> seats won by <span className={`party-selected bold`}>All Parties</span> in <span className={`state-name-animated-map bold`}>India</span> <span className='italic'>(Total seats in <span className={`state-name-animated-map`}>India</span>: <span className={`state-all-animated-map bold`}>{`543`}</span>)</span>
          </div>
        </div>
        <div className={`map-animated-map small-map`} onClick={this.playPause} />
        <div className='tooltip-section2'>
          <div className='tooltip_Head'>
            <div className='const_Name-section2'>Contituency</div>
          </div>
          <div className='Winner_Info'>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Year</Table.HeaderCell>
                  <Table.HeaderCell>Winning Candidate</Table.HeaderCell>
                  <Table.HeaderCell>Party</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>2009</Table.Cell>
                  <Table.Cell className='Name1-section2 bold'>Cell</Table.Cell>
                  <Table.Cell className='Party1-section2 bold'>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>2014</Table.Cell>
                  <Table.Cell className='Name2-section2 bold'>Cell</Table.Cell>
                  <Table.Cell className='Party2-section2 bold'>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>2019</Table.Cell>
                  <Table.Cell className='Name3-section2 bold'>Cell</Table.Cell>
                  <Table.Cell className='Party3-section2 bold'>Cell</Table.Cell>
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
