import React from "react";
import ConfirmationView from "../views/confirmationView.js";
import resolvePromise from "../resolvePromise";
import promiseNoData from "../promiseNoData";

  const SES_CONFIG = {
      accessKeyId: 'AKIAZVSTRFKVAQYAJVIY',
      secretAccessKey: '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',
      region: 'us-east-1',
  };
  const AWS = require('aws-sdk');
  const AWS_SES = new AWS.SES(SES_CONFIG);
  export default function Confirmation (props){

  const [, setPromiseData]=React.useState(null);
  const [, setPromise]=React.useState(null);
  const [, setError]=React.useState(null);


  function observerACB() {
    setPromiseData(props.model.currentFlightPromiseState.data)
    setPromise(props.model.currentFlightPromiseState.promise)
    setPromise(props.model.currentFlightPromiseState.error)
  }

  function wasCreatedACB() {
    //var airports = require('../data/airports.json')
    //setData(airports)

    observerACB();
    props.model.addObserver(observerACB);
    return function isTakenDownACB() {
      props.model.removeObserver(observerACB);
    }
  }


function sendMailACB(recipientEmail, name){
    let params = {
      Source: 'phimusic21@gmail.com',//needs to be validated by amazon
      Destination: {
        ToAddresses: [
          props.model.billing_user.email //wait for production access and this can "whatever"
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: document.getElementById('booking-confirmation').innerHTML,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${props.model.billing_user.name}!`,
        }
      },
    };
    function myFunction() {
      // Get the snackbar DIV
      var x = document.getElementById("snackbar");

      // Add the "show" class to DIV
      x.className = "show";

      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    AWS_SES.sendEmail(params, function(err, data) {
       if (err) {console.log(err, err.stack);} // an error occurred
       else     {console.log(data); myFunction()}        // successful response
    });
  }

  //console.log("Loading confirmation");

  React.useEffect(wasCreatedACB, []);
  return (<div>{
          promiseNoData({
              promise: props.model.currentFlightPromiseState.promise,
              data: props.model.currentFlightPromiseState.data,
              error: props.model.currentFlightPromiseState.error
            }) ||
          <ConfirmationView
          flightData = {props.model.currentFlightPromiseState.data}
          sendEmail = {sendMailACB}



          />}
          </div>
        );

}
