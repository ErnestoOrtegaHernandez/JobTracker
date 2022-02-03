const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const conf = require('../pgConf.js');
const pgp = require('pg-promise')();
const db = pgp('postgres://' + conf.username + ':'+ conf.password + '@localhost/' + conf.database);
const months = ['January, February, March, April, May, June, July, August, September, October, November, December'];


let reqPath = path.join(__dirname, '../');

app.listen(port, () => {
   console.log(`The app server is running on port: ${port}`);
});
app.use(express.static(reqPath +'client/dist/'));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
   res.sendFile('/');
});
app.post("/addJob", (req, res) => {
   console.log(req.body, 'req.body' )
   let job_posting_date = req.body.job_posting_date ? "'" + req.body.job_posting_date + "'" : null;
   let job_contact_date = req.body.job_contact_date ? "'" + req.body.job_contact_date + "'" : null;
   let phone_screen_date = req.body.phone_screen_date ? "'" + req.body.phone_screen_date + "'" : null;
   let interview_dates = req.body.interview_dates ? "'" + req.body.interview_dates + "'" : null;
   let offer_date = req.body.offer_date ? "'" + req.body.offer_date + "'" : null;
   let denial_date = req.body.denial_date ? "'" + req.body.denial_date + "'" : null;
   let last_follow_up_date = req.body.last_follow_up_date ? "'" + req.body.last_follow_up_date + "'" : null;
   let date_applied = req.body.date_applied ? "'" + req.body.date_applied + "'" : null;

   db.any("INSERT INTO jobentries (user_id, job_name, company_name, job_url, job_rep, job_skills," +
      "job_posting_date, job_contact_date, phone_screen_date, interview_dates, offer_date,denial_date, desire_level, referral," +
      "salary, notes, app_status, last_follow_up_date, date_applied) VALUES (" + 1 + ", '" + req.body.job_name+"', '" + req.body.company_name+"', '" +
      req.body.job_url +"', '" + req.body.job_rep+"','" + req.body.job_skills+"'," + job_posting_date+"," + job_contact_date+ "," +
      phone_screen_date + ",'" + interview_dates+ "'," + offer_date+ "," + denial_date + "," + req.body.desire_level+ "," +
      req.body.referral + "," +req.body.salary + ", '" + req.body.notes+ "', '" + req.body.app_status + "'," + last_follow_up_date + "," +
      date_applied + ")")
      .then(results => {
         console.log('success');
         res.sendStatus(200);
      })
      .catch(err=>{
         console.log(err);
         res.sendStatus(500);
      })
});
/*
jobEntries(
   id INTEGER NOT NULL PRIMARY KEY,
   user_id INTEGER NOT NULL,
   job_name TEXT NOT NULL,
   company_name TEXT NOT NULL,
   job_url TEXT NOT NULL,
   job_rep TEXT DEFAULT NULL,
   job_skills JSON DEFAULT NULL,
   job_posting_date DATE DEFAULT NULL,
   job_contact_date Date DEFAULT NULL,
   phone_screen_date DATE DEFAULT NULL,
   interview_dates JSON DEFAULT NULL,
   offer_date DATE DEFAULT NULL,
   denial_date DATE DEFAULT NULL,
   desire_level INTEGER NOT NULL,
   referral BOOLEAN NOT NULL,
   salary TEXT DEFAULT NULL,
   notes TEXT DEFAULT NULL,
   app_status TEXT NOT NULL,
   last_follow_up_date DATE DEFAULT NULL,
   date_applied DATE NOT NULL);\
   INSERT INTO jobentries (id, user_id, job_name, company_name, job_url, job_rep, job_skills,job_posting_date,job_contact_date, phone_screen_date, interview_dates, offer_date,denial_date,desire_level,referral,salary,notes,app_status,last_follow_up_date,date_applied) VALUES (1, 1,'Software Development Engineer', 'Amazon', 'https://www.amazon.jobs/en/jobs/1503069/software-development-engineer-ec2-reserved-instance-savings-plans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6, FALSE, NULL, 'Possible relocation', 'pending', NULL, 'Dec 06, 2021');
*/
app.get("/jobInfo", (req, res) => { // need to figure out how to convert dates to month day, year format to send to front end
   db.any('SELECT * FROM jobentries WHERE user_id = 1')
   .then((results)=>{
      let totalRes = {};
      let summary = {};
      summary.appQuantity = results.length;
      summary.uniqueAppQty = summary.appQuantity;
      summary.phoneScreenQuantity = 0;
      summary.offerPct = 0;
      for(let i = 0; i< results.length; i++) {
         if(results[i].app_status === 'offered') {
            summary.offerPct++;
         }
         if(results[i].phone_screen_date !== null) {
            summary.phoneScreenQuantity++;
         }
      }
      summary.offerPct = (summary.offerPct/summary.uniqueAppQty) * 100;
      totalRes.appInfo = results;
      totalRes.summary = summary;

      res.send(JSON.stringify(totalRes));
   })
   .catch((err)=>{
      console.log(err, 'error');
      res.sendStatus(500);
   })
});