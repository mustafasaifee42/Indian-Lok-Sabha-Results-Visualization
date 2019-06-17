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
        <div className='table-no'>{this.props.SrNo}</div>
        <div className='table-name'>{this.props.Name}</div>
        <div className='table-party' style={ {color: `${this.props.Color}` }}>{this.props.Party}</div>
        <div className='table-constituency'>{this.props.Constituency}</div>
        <div className='table-state'>{this.props.State}</div>
        <div className='table-education'>{this.props.Education}</div>
        <div className='table-criminal-cases' style={ {fontWeight: `${this.props.CriminalCaseWeight}` }}>{this.props.CriminalCases}</div>
        <div className='table-assets'>{`${this.props.Assets}`}</div>
      </div>
    )
  }
}

export default Visualization