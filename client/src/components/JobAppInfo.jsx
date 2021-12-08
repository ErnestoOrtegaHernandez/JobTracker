import React from 'react';
import ReactDOM from 'react-dom';

class JobAppInfo extends  React.Component{

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e){
    e.preventDefault();
    this.setState({showDetails: !this.state.showDetails})
  }

  render(){
    return(
      <div class = "app-instance">
        <div class = "company-name">
          <table>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Date Applied</th>
              <th>Desire Level</th>
            </tr>
            <tr>
              <td>{this.props.companyName}</td>
              <td><a href= {this.props.jobLink}>{this.props.position}</a></td>
              <td>{this.props.appliedDate}</td>
              <td>{this.props.desireLevel}</td>
            </tr>
          </table>
        </div>
        <div class = "app-banner"></div>
        <button class = "show-more">{this.state.showDetails === false ? 'Show More' : 'Show Less'}</button>
        {()=>{
          if(this.state.showDetails === true) {
            return(
              <div class ="app-metrics">
                <table>
                  <tr>
                    <th>Point Of Contact</th>
                    <th>Referral?</th>
                    <th>Job Posting Date</th>
                    <th>Phone Screen Date</th>
                    <th>Interview Dates</th>
                  </tr>
                  <tr>
                    <td>{this.props.pointOfContact ? this.props.pointOfContact : 'Null'}</td>
                    <td>{this.props.referralStatus}</td>
                    <td>{this.props.jobPostDate ? this.props.jobPostDate : 'Null'}</td>
                    <td>{this.props.screenDate ? this.props.screenDate : 'Null'}</td>
                    <td>{()=>{
                      if(this.props.interviewDates.length !== 0) {
                        let allDates = '';
                        for(let i = 0; i < interviewDates.length; i++) {
                          allDates = allDates + interviewDates[i] + ', ';
                        }
                        return allDates;
                      } else {
                        return 'Null'
                      }
                    }}</td>
                  </tr>
                </table>
                <table>
                  <tr>
                    <th>Denial Date</th>
                    <th>Offer Date</th>
                    <th>Salary</th>
                    <th>Last Follow-up Date</th>
                  </tr>
                  <tr>
                    <td>{this.props.denialDate ? this.props.denialDate : 'Null'}</td>
                    <td>{this.props.offerDate ? this.props.offerDate : 'Null'}</td>
                    <td>{this.props.salary ? this.props.salary : 'Null'}</td>
                    <td>{this.props.followUpDate ? this.props.followUpDate : 'Null'}</td>
                  </tr>
                </table>
                <table>
                  <tr>
                    <th>Notes</th>
                  </tr>
                  <tr>
                    <td>{this.props.notes}</td>
                  </tr>
                </table>
              </div>
            )

          }
        }}
      </div>

    )
  }
}

export default JobAppInfo;











