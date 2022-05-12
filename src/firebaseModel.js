import FlightModel from "./FlightModel.js";
import firebaseConfig from "./firebaseConfig.js";
import firebase from "firebase/app";
import "firebase/database";
import {
  getFlightDetails
} from "./flightSearches.js";
firebase.initializeApp(firebaseConfig);
const REF="flightModel";

function checkSessionId(id){
  return firebase.database().ref(REF + "/sessions/" + id);

}

function updateFirbase(){
  var ref = firebase.database().ref(REF + '/sessions/');
  var now = Date.now();
  var cutoff = now - 30 * 60 * 1000; //30 min
  var old = ref.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
  var listener = old.on('child_added', function(snapshot) {
      snapshot.ref.remove();
  });
  return old;
}

function updateFirebaseFromModel(model){

  function observerACB(payload){
    if(payload){
      if(payload.addedFlight){
        if(model.sessionId){
          firebase.database().ref(REF + "/sessions/" + model.sessionId + "/flights/" + payload.addedFlight).set(payload.addedFlight);
        }
      }
      else if(payload.setSessionId){
        firebase.database().ref(REF + "/sessions/" + payload.setSessionId.id).set(payload.setSessionId);
      }
      else if(payload.continueSessionId){
        firebase.database().ref(REF + "/sessions/" + payload.continueSessionId.id + "/timestamp").set(payload.continueSessionId.timestamp);
      }
      else if(payload.removedFlight){
        if(model.sessionId){
          firebase.database().ref(REF + "/sessions/" + model.sessionId + "/flights/" + payload.removedFlight).set(null);
        }
      }
    }
  }
  model.addObserver(observerACB);

}

function updateModelFromFirebase(model){
  firebase.database().ref(REF + "/sessions/" + model.sessionId + "/flights").on("child_added",
         function flightsChangedInFirebaseACB(firebaseData){
           function hasSameIdCB(flight){
             return +firebaseData.key === flight.data.id
           }
           let hasDish = [];
           hasDish = model.flights.filter(hasSameIdCB);
           if(hasDish.length == 0){

             getFlightDetails(firebaseData.val()).then(function addFligthACB(val){model.addToFinalList(val)})
           }
         }
  );
  firebase.database().ref(REF + "/sessions/" + model.sessionId + "/flights").on("child_removed",
         function flightsChangedInFirebaseACB(firebaseData){
           model.removeFromFinalList(+firebaseData.key);
         }
  );
}
function firebaseSessionPromise(sessionId){

  function makeBigPromiseACB(firebaseData){
    function makeFlightsPromiseCB(id){
      return getFlightDetails(id);
    }
    if(firebaseData.val().flights){
      const flightPromiseArray= Object.keys(firebaseData.val().flights).map(makeFlightsPromiseCB);
      return Promise.all(flightPromiseArray);
    }else{
      return new Promise((res) => setTimeout(() => res("p2"), 1000));;
    }
  }
  return firebase.database().ref(REF+ "/sessions/" + sessionId).once("value").then(makeBigPromiseACB);
}
export {checkSessionId, updateFirbase, updateFirebaseFromModel, updateModelFromFirebase, firebaseSessionPromise};
