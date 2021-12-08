import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import JobAppInfo from './components/JobAppInfo.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfJobs: [],
      jobSummary: {},
      currentUser: ''
    }
  }

  componentDidMount(){
    axios.get('/jobInfo')
      .then(res => {
        console.log(res, 'response');
        console.log(res.data, 'response data');
        console.log(res.dummy, 'response Dummy')
        // this.setState({
        //   jobSummary: res.data.jobSummary,
        //   listOfJobs: res.data.listOfJobs
        // });
      });

  }

  render() {
    return (
       <div id = "container">
         <div id= "quote">
          <p id = "quote-text">QUOTE</p>
         </div>
         <div id= "summary">

          <h1 id="summary-header">Your summary</h1>
          <div id="summary-metric-label">
            <table>
              <tr class="summary-table-row">
                <th>Total # of Jobs Applied</th>
                <th>Total # of Phone Screens</th>
                <th>Total # of Unique Interview Processes</th>
                <th>Percentage of Offers to Total Applications</th>
              </tr>
              <tr class="summary-table-row">
                <td>{this.state.jobSummary.appQuantity ? this.state.jobSummary.appQuantity : 0}</td>
                <td>{this.state.jobSummary.phoneScreenQuantity ? this.state.jobSummary.phoneScreenQuantity : 0}</td>
                <td>{this.state.jobSummary.uniqueAppQty ? this.state.jobSummary.uniqueAppQty : 0}</td>
                <td>{this.state.jobSummary.offerPct ? (this.state.jobSummary.offerPct + '%') : '0%'}</td>
              </tr>
            </table>
          </div>
          <div id = "application-list">
            <h1 id ="application-header">Applications</h1>
            {()=>{
              if(this.state.jobAppInfo) {
                this.state.JobAppInfo.map((item)=>{
                  return <JobAppInfo jobInfo = {item}/>
                })
              }
            }}
          </div>
         </div>
       </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));