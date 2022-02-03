import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import JobAppInfo from './components/JobAppInfo.jsx';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import quotes from './inspirationalQuotes.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerQuote: '',
      listOfJobs: [],
      jobSummary: {},
      currentUser: '',
      showNewApp: false,
      formInfo: {
        app_status: 'pending',
        company_name: 'g',
        date_applied: '12-11-2021',
        denial_date: null,
        desire_level: 0,
        interview_dates: null,
        job_contact_date: null,
        job_name: 'testdddd',
        job_posting_date: null,
        job_rep: null,
        job_skills: null,
        job_url: 'hhh',
        last_follow_up_date: null,
        notes: 'nada',
        offer_date: null,
        phone_screen_date: null,
        referral: false,
        salary: null,
        user_id: 1
      }
    }
    this.handleAddApp = this.handleAddApp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    axios.get('/jobInfo')
      .then(res => {
        console.log(res.data, 'response data');
        this.setState({listOfJobs: res.data.appInfo, jobSummary: res.data.summary, headerQuote: quotes[Math.floor(Math.random() * quotes.length)]});
      });
  }
  // componentDidUpdated(prevProps, prevState) {
  //   if(prevState.formInfo.)
  // }
  handleAddApp(e){
    e.preventDefault();
    this.setState({showNewApp: !this.state.showNewApp})
  }

  handleSubmit(e){
    e.preventDefault();
    let options = this.state.formInfo;
    console.log('submitted')
    axios({
      method: 'POST',
      url: '/addJob',
      data: options
    }).then(res=>{
      axios.get('/jobInfo')
      .then(jobs => {
        console.log(res.data, 'response data');
        this.setState({listOfJobs: jobs.data.appInfo, jobSummary: jobs.data.summary, showNewApp: !this.state.showNewApp});
      });
    }).catch(err=>{console.log(err)});
  }
  handleChange(ev){ // could be refactored into using a loop. this should be sufficient for now.
    const oldState = this.state.formInfo;
    const newState = oldState;
    if(ev.target.name === 'company_name') {
      newState.company_name = ev.target.value;
      this.setState({formInfo: newState});
    } else if(ev.target.name==='job_name') {
      newState.job_name = ev.target.value;
      this.setState({formInfo: newState});
    } else if(ev.target.name==='job_url') {
      newState.job_url = ev.target.value;
      this.setState({formInfo: newState});
    } else if(ev.target.name==='job_rep') {
      newState.job_rep = ev.target.value;
      this.setState({formInfo: newState});
    } else if(ev.target.name==='job_posting_date') {
      newState.job_posting_date = ev.target.value;
      this.setState({formInfo: newState});
    } else if(ev.target.name==='date_applied') {
      newState.date_applied = ev.target.value;
      this.setState({formInfo: newState});
    } else if(ev.target.name==='referral') {
      newState.referral = (ev.target.value === 'true');
      this.setState({formInfo: newState});
    } else if(ev.target.name==='desire_level') {
      newState.desire_level = Number(ev.target.value);
      this.setState({formInfo: newState});
    } else if(ev.target.name==='job_skills') {
      newState.job_skills = JSON.stringify(ev.target.value);
      this.setState({formInfo: newState});
    } else if(ev.target.name==='notes') {
      newState.notes = ev.target.value;
      this.setState({formInfo: newState});
    }
  }

  render() {
    console.log(quotes, 'quotes')
    return (
       <div id = "container">
         <div id= "quote">
          <p id = "quote-text">{this.state.headerQuote}</p>
         </div>
         <div id= "summary">

          <h1 id="summary-header">Your summary</h1>
          <div id="summary-metric-label">
            <table>
              <tbody>
                <tr className="summary-table-row">
                  <th>Total # of Jobs Applied</th>
                  <th>Total # of Phone Screens</th>
                  <th>Total # of Unique Interview Processes</th>
                  <th>Percentage of Offers to Total Applications</th>
                </tr>
                <tr className="summary-table-row">
                  <td>{this.state.jobSummary.appQuantity ? this.state.jobSummary.appQuantity : 0}</td>
                  <td>{this.state.jobSummary.phoneScreenQuantity ? this.state.jobSummary.phoneScreenQuantity : 0}</td>
                  <td>{this.state.jobSummary.uniqueAppQty ? this.state.jobSummary.uniqueAppQty : 0}</td>
                  <td>{this.state.jobSummary.offerPct ? (this.state.jobSummary.offerPct.toString() + '%') : '0%'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id = "application-list">
            <div id ="app-header-wrapper">
              <h1 id ="application-header">Applications</h1>
              <button id="add-app" onClick= {this.handleAddApp}>{this.state.showNewApp ? 'X' : '+'}</button>
            </div>
            {this.state.showNewApp ?
            <div id = 'new-entry'>
              <form onSubmit= {this.handleSubmit}>
                <label>
                  Company Name:
                  <input type="text" name="company_name" onChange={this.handleChange}/>
                </label>
                <br></br>
                <label>
                  Job Title:
                  <input type="text" name="job_name" onChange={this.handleChange}/>
                </label>
                <br></br>
                <label>
                  Job URL:
                  <input type="text" name="job_url" onChange={this.handleChange}/>
                </label>
                <br></br>
                <label>
                  Recruiter Name:
                  <input type="text" name="job_rep" onChange={this.handleChange}/>
                </label>
                <br></br>
                <label>
                  Job Posting Date:
                  <input type="date" name="job_posting_date" onChange={this.handleChange}/>
                </label>
                <label>
                  Date Applied:
                  <input type="date" name="date_applied" onChange={this.handleChange}/>
                </label>
                <br></br>
                <label>
                  Referral:
                  <select onChange={this.handleChange} name = "referral">
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </label>
                <br></br>
                <label>
                  How well does this position fit you? (out of 10):
                  <select onChange={this.handleChange} name ="desire_level">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </label>
                <br></br>
                <label>
                  Job Skills:
                  <input type="text" name="job_skills" onChange={this.handleChange}/>
                </label>
                <br></br>
                <label>
                  Notes:
                  <br></br>
                  <textarea name ="notes" rows = "4" cols="50" onChange= {this.handleChange}/>
                </label>
                <br></br>
                <button type ="submit" value="Submit" id = "appSubmission">Submit</button>
              </form>
            </div>
            :
            <div>
              {this.state.listOfJobs ?
                this.state.listOfJobs.map((item)=>{
                  return (<>
                            <JobAppInfo jobInfo = {item}/>
                            <button>Edit</button>
                          </>);
                }) : undefined
              }
            </div>
            }
          </div>
         </div>
       </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));