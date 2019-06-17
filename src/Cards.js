import React, { Component } from 'react';

class Visualization extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render() {
    let pc = ''
    if(this.props.PCType === 'SC' || this.props.PCType === 'ST')
      pc = ` (${this.props.PCType})`
    return (
      <div>
        <a href={this.props.Link} target='_blank' rel="noopener noreferrer" className="adr-link" >
          <div className={!this.props.Link ? 'table-body' : `table-body ADR-Link`} style={ {borderLeft: `5px solid ${this.props.Color}` }}>
            <div className='table-no'>{this.props.SrNo}</div>
            <div className='table-name'>{this.props.Name}</div>
            <div className='table-party' style={ {color: `${this.props.Color}` }}>{this.props.Party}</div>
            <div className='table-constituency'>{`${this.props.Constituency}${pc}`}</div>
            <div className='table-state'>{this.props.State}</div>
            <div className='table-education'>{this.props.Education}</div>
            <div className='table-criminal-cases' style={ {fontWeight: `${this.props.CriminalCaseWeight}` }}>{this.props.CriminalCases}</div>
            <div className='table-assets'>{`${this.props.Assets}`}</div>
          </div>
        </a>
      </div>
    )
  }
}

export default Visualization
