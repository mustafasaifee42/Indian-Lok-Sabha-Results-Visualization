import React, { Component } from 'react';

class Visualization extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className='table-body' style={ {borderLeft: `5px solid ${this.props.Color}` }}>
        <div className='table-name'>{this.props.Name}<br /><span className='table-party' style={ {color: `${this.props.Color}` }}>{this.props.Party}</span></div>
        <div className='table-constituency'>{this.props.Constituency}<br /><span className='table-state'>{this.props.State}</span></div>
        <div className='table-education'>{this.props.Education}</div>
        <div className='table-criminal-cases'>{this.props.CriminalCases}</div>
        <div className='table-assets'>{`${this.props.Assets}`}</div>
        <div className='table-votes'>{this.props.Votes}<br /><span className='table-percent'>{`(${this.props.VoteShare}%)`}</span></div>
      </div>
    )
  }
}

export default Visualization
