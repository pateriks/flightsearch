import React from 'react';
import FlightModel from './FlightModel'
import {render} from "react-dom";
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';

//const [model, setModel]= React.useState(new FlightModel());
import {firebaseSessionPromise, checkSessionId, updateFirbase, updateFirebaseFromModel, updateModelFromFirebase} from "./firebaseModel.js"

const App=require("./App.js").default;

function hours (nrHours){
  const twoHours = 1000 * 60 * 60 * nrHours;
}
var now = Date.now();
const thirtyMinutesAgo = now - 30 * 60 * 1000; //30 min

function ReactRoot(){
  const [model, setModel]= React.useState(new FlightModel());
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  updateFirebaseFromModel(model);
  React.useEffect(function onStartACB(){
    if(cookies.sessionId){
      checkSessionId(cookies.sessionId).once("value").then(
        response => {
          //console.log("Last time session was active: "+ response.val().timestamp +
          //            " - Time two hours ago: " + twoHoursAgo + " = " + (response.val().timestamp-twoHoursAgo));
          //timestamp is the time when session was active. twoHoursAgo is the timestamp as it was 2 hours ago.
          //if the timestamp of the session is lesser than that of two hours ago the session will no longer be valid.
          if(!response.exists() || response.val().timestamp < thirtyMinutesAgo){
            removeCookie('sessionId');
            let sessionId = uuidv4();
            setCookie('sessionId', sessionId, { maxAge: hours(2) })
            model.setSessionId(sessionId);
            updateModelFromFirebase(model);
            model.notifyNewSession();
            updateFirbase(); //cleans up firebase from inactive sessions
          }else{
            model.setSessionId(cookies.sessionId);
            updateModelFromFirebase(model);
            model.notifyContinueSession();
            updateFirbase(); //cleans up firebase from inactive sessions
          }})
    }else{
        var cookieConsentPromise = new Promise(function(resolve, reject) {
          // do a thing, possibly async, then…
          let ret = window.prompt("This website is using a cookie. Click OK to continue", "OK");
          if (ret != null) {
            resolve("User consented");
          }
          else {
            reject(Error("User did not consent"));
          }
        });
        cookieConsentPromise.then(response =>{
        //console.log("no previous cookie in browser, creates new cookie")
        let sessionId = uuidv4();
        setCookie('sessionId', sessionId, { maxAge: hours(10) })
        model.setSessionId(sessionId);
        updateModelFromFirebase(model);
        model.notifyNewSession();
      }).catch(response =>{
        console.log(response);
      })
    }
  }, []);

  return  <App model={model}/>;
}
render(
  <ReactRoot/>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
