import React from 'react';
import ReactDOM from 'react-dom';

class JobAppInfo extends  React.Component{

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e){
    e.preventDefault();
    this.setState({showDetails: !this.state.showDetails})
  }

  render(){
    console.log(this.props.jobInfo, ' this props')
    let bannerColor;
    if(this.props.jobInfo.app_status === 'pending') {
      bannerColor = 'orange';
    } else if (this.props.jobInfo.app_status === 'denied') {
      bannerColor = 'red';
    } else if (this.props.jobInfo.app_status === 'offered') {
      bannerColor = 'green';
    } else {
      bannerColor = 'white';
    }
    return(
      <div className = "app-instance">
        <div className = "company-name">
          <table>
            <tbody>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Date Applied</th>
                <th>Position Fit</th>
              </tr>
              <tr>
                <td>{this.props.jobInfo.company_name}</td>
                <td><a href= {this.props.jobInfo.job_url}>{this.props.jobInfo.job_name}</a></td>
                <td>{this.props.jobInfo.date_applied}</td>
                <td>{this.props.jobInfo.desire_level}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className = "app-banner" style = {{backgroundColor: bannerColor}}></div>
        <button className = "show-more" onClick = {this.handleToggle}>{this.state.showDetails === false ? 'Show More' : 'Show Less'}</button>
        {this.state.showDetails ?
        <div className ="app-metrics">
          <table>
            <tbody>
              <tr>
                <th>Point Of Contact</th>
                <th>Referral?</th>
                <th>Job Posting Date</th>
                <th>Phone Screen Date</th>
                <th>Interview Dates</th>
              </tr>
              <tr>
                <td>{this.props.jobInfo.pointOfContact ? this.props.jobInfo.pointOfContact : 'Null'}</td>
                <td>{this.props.jobInfo.referral ? 'Yes' : 'No'}</td>
                <td>{this.props.jobInfo.job_posting_date ? this.props.jobInfo.job_posting_date : 'Null'}</td>
                <td>{this.props.jobInfo.phone_screen_date ? this.props.jobInfo.phone_screen_date : 'Null'}</td>
                <td>{'Null' /* need to fix this to work when actually get interviews*/}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <th>Denial Date</th>
                <th>Offer Date</th>
                <th>Salary</th>
                <th>Last Follow-up Date</th>
              </tr>
              <tr>
                <td>{this.props.jobInfo.denial_date ? this.props.jobInfo.denial_date : 'Null'}</td>
                <td>{this.props.jobInfo.offer_date ? this.props.jobInfo.offer_date : 'Null'}</td>
                <td>{this.props.jobInfo.salary ? this.props.jobInfo.salary : 'Null'}</td>
                <td>{this.props.jobInfo.last_follow_up_date ? this.props.jobInfo.last_follow_up_date : 'Null'}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <th>Notes</th>
              </tr>
              <tr>
                <td>{this.props.jobInfo.notes}</td>
              </tr>
            </tbody>
          </table>
        </div>
        : <div></div>}
      </div>
    )
  }
}

export default JobAppInfo;



/*
<div className ="app-metrics">
  <table>
    <tbody>
      <tr>
        <th>Point Of Contact</th>
        <th>Referral?</th>
        <th>Job Posting Date</th>
        <th>Phone Screen Date</th>
        <th>Interview Dates</th>
      </tr>
      <tr>
        <td>{this.props.jobInfo.pointOfContact ? this.props.jobInfo.pointOfContact : 'Null'}</td>
        <td>{this.props.jobInfo.referral}</td>
        <td>{this.props.jobInfo.job_posting_date ? this.props.jobInfo.job_posting_date : 'Null'}</td>
        <td>{this.props.jobInfo.phone_screen_date ? this.props.jobInfo.phone_screen_date : 'Null'}</td>
        <td>{()=>{
          if(this.props.jobInfo.interview_dates.length !== 0) { //Will need to fix formatting - response comes as json, needs to be inspected an made sure it turns into array for this function to work.
            let allDates = '';
            for(let i = 0; i < this.props.jobInfo.interview_dates.length; i++) {
              allDates = allDates + this.props.jobInfo.interview_dates[i] + ', ';
            }
            return allDates;
          } else {
            return 'Null'
          }
        }}</td>
      </tr>
    </tbody>
  </table>
  <table>
    <tr>
      <th>Denial Date</th>
      <th>Offer Date</th>
      <th>Salary</th>
      <th>Last Follow-up Date</th>
    </tr>
    <tr>
      <td>{this.props.jobInfo.denial_date ? this.props.jobInfo.denial_date : 'Null'}</td>
      <td>{this.props.jobInfo.offer_date ? this.props.jobInfo.offer_date : 'Null'}</td>
      <td>{this.props.jobInfo.salary ? this.props.jobInfo.salary : 'Null'}</td>
      <td>{this.props.jobInfo.last_follow_up_date ? this.props.jobInfo.last_follow_up_date : 'Null'}</td>
    </tr>
  </table>
  <table>
    <tr>
      <th>Notes</th>
    </tr>
    <tr>
      <td>{this.props.jobInfo.notes}</td>
    </tr>
  </table>
</div>
*/











