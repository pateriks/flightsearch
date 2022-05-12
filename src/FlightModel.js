import resolvePromise from "./resolvePromise.js";
import {
  createPassenger,
  createPassengers
} from "./utils.js"
import {
  getAirportsInCity,
  getOffers,
  getFlightDetails
} from "./flightSearches.js";
import {firebaseSessionPromise, updateModelFromFirebase} from "./firebaseModel.js"
//import {getFlightDetails} from "./flightSearches"
/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/

function isValid(id) {
  return (typeof(id) == "number")
}

class FlightModel {
  constructor(flights) {
    this.billing_user = {name: "nothing", lastname: "nothing", email: "paeri015@gmail.com"};
    this.sessionId = null;
    if(flights){
      this.flights = flights;
    }else{
      this.flights = [];
    }
    this.flightsPromiseState = {data: {}};
    this.nrCurrentFlights = 0;
    //Not sure why these were added
    this.oneWay = "One";
    this.roundTrip = "Round";
    this.passengers = [];
    this.cabin_class = "economy";
    this.fromAirport = "";
    this.toAirport = "";

    this.currentFlight = "";
    this.currentFlightPromiseState = {};

    this.amountAdults = 1
    this.amountYouths = 0

    this.tripType = "One"

    this.sortType = "Price"

    this.searchResultsPromiseState = {};
    this.observers = [];
    this.searchParams = {
      query: "",
      type: ""
    };

    this.displayAmount = 10;

    var date = new Date()
    this.deptDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    this.returnDate = (parseInt(this.deptDate.split("-")[0]) + 2) + this.deptDate.slice(this.deptDate.indexOf("-"), this.deptDate.length)


    this.data = {
      slices: [{
        origin: this.fromAirport,
        destination: this.toAirport,
        departure_date: this.deptDate
      }, ],
      passengers: this.passengers,
      cabin_class: this.cabin_class,
    };
    this.roundTripData = {
      slices: [{
          origin: this.fromAirport,
          destination: this.toAirport,
          departure_date: this.deptDate
        },

      ],
      slices2:[
        {
          origin: this.toAirport,
          destination: this.fromAirport,
          departure_date: this.returnDate
        },
      ],
      passengers: this.passengers,
      cabin_class: this.cabin_class,
    }
  }
  nrFlights(){
    return this.flights.length;
  }
  isCurrentFlightInList(){
    let currentFlight = this.currentFlight;
    function checkIfExistsCB(dataToCompare){
      if (dataToCompare.data.id == currentFlight){
        return true;
      }else{
        return false;
      }
    }
    let filteredList = this.flights.filter(checkIfExistsCB);
    return filteredList.length == 0? false : true
  }
  addToFinalList(data){
    function checkIfExistsCB(dataToCompare){
      return dataToCompare.data.id === data.data.id? true : false;
    }
    if(this.flights.filter(checkIfExistsCB).length > 0){
      //it is already in list
    }else{
      //add to list
      this.flights = [...this.flights, data]
      let payload = {addedFlight: data.data.id}
      this.nrCurrentFlights = this.flights.length;
      this.notifyObservers(payload);
    }
  }
  removeFromFinalList(id){
    function checkIfExistsCB(dataToCompare){
      return dataToCompare.data.id === id? false : true;
    }
    let previousLength = this.flights.length;
    let newFlights = this.flights.filter(checkIfExistsCB);
    if(newFlights.length < previousLength){
      this.flights = newFlights;
      let payload = {removedFlight: id}
      this.nrCurrentFlights = this.flights.length;
      this.notifyObservers(payload);
    }
  }

  setSessionId(id){
    this.sessionId = id;
  }
  removeSessionId(id){
    if(id == this.sessionId){
      this.sessionId = null;
    }
  }
  //TODO: the data from the promise should be used in sidebar
  notifyNewSession(){
    const theModel = this;
    function notifyACB() {theModel.notifyObservers(null);};
    resolvePromise(firebaseSessionPromise(this.sessionId), this.flightsPromiseState, notifyACB);
    console.log("welcome new session")
    let payload = {setSessionId: {id: this.sessionId, status: "active", timestamp: Date.now()}}
    this.notifyObservers(payload);
  }
  notifyContinueSession(){
    const theModel = this;
    function notifyACB() {theModel.notifyObservers(null);};
    resolvePromise(firebaseSessionPromise(this.sessionId), this.flightsPromiseState, notifyACB);
    console.log("welcome back")
    let payload = {continueSessionId: {id: this.sessionId, status: "active", timestamp: Date.now()}}
    this.notifyObservers(payload);
  }
  //Not sure if this functionality is still needed but keep it for now
  setCurrentFlight(id){
    if(!id || id == this.currentFlight){
        //nothing to do here yet
    }else{
      const theModel = this;
      function notifyACB() {theModel.notifyObservers(null);};
      console.log("setting current flight");
      this.currentFlight = id;
      console.log(this.currentFlight);
      resolvePromise(getFlightDetails(id), this.currentFlightPromiseState, notifyACB);
      var payload = {
        setCurrentFlight: id
      }
      this.notifyObservers(payload)
    }
  }

  setDeptDate(date) {
    this.deptDate = date
    var payload = {
      deptDate: date
    }
    this.notifyObservers(payload)
  }

  setReturnDate(date) {
    this.returnDate = date
    var payload = {
      returnDate: date
    }
    this.notifyObservers(payload)
  }


  setTripType(type) {
    this.tripType = type
    var payload = {
      tripType: type
    }
    this.notifyObservers(payload)
  }

  setFromAirport(airport) {
    this.fromAirport = airport
    var payload = {
      fromAirport: airport
    }
    this.notifyObservers(payload)
  }

  setToAirport(airport) {
    this.toAirport = airport
    var payload = {
      toAirport: airport
    }
    this.notifyObservers(payload)
  }

  setAmountAdults(nr) {
    this.amountAdults = nr
    var payload = {
      amountAdults: nr
    }
    this.notifyObservers(payload)

  }
  setAmountYouths(nr) {
    this.amountYouths = nr
    var payload = {
      amountYouths: nr
    }
    this.notifyObservers(payload)
  }

  setDisplayAmount(amount){
    this.displayAmount = amount;
    var payload = {
      displayAmount: amount
    }
    this.notifyObservers(payload)
  }

  setSearchQuery(q) {
    this.searchParams.query = q;
    this.notifyObservers();
  }

  setSearchType(t) {
    this.searchParams.type = t;
    this.notifyObservers();
  }

  setSortType(t) {
    this.sortType = t
    var payload = {
      sortType : t
    }
    this.notifyObservers(payload)
  }

  doSearch(params) {
    const theModel = this;

    function notifyACB() {
      theModel.notifyObservers(null);
    };
    if (params) {
      resolvePromise(null, this.searchResultsPromiseState, notifyACB);
    } else {
      resolvePromise(null, this.searchResultsPromiseState, notifyACB);
    }
  }
  addPassenger(passenger) {
    this.passengers = this.passengers.push(passenger) //TODO: check passenger structure
  }

  addPassengers(passengers) {
    this.passengers = this.passengers.concat(passengers); //TODO: check passenger structure
  }
  makeDataPassengers() {
    let childPassengers = createPassengers(this.amountYouths, "child");
    let adultPassengers = createPassengers(this.amountAdults, "adult");
    this.addPassengers(childPassengers);
    this.addPassengers(adultPassengers);
    this.data.passengers = this.passengers;
    this.roundTripData.passengers = this.passengers;
  }

  setDataDates() {
    this.data.slices[0].departure_date = this.deptDate;

    this.roundTripData.slices[0].departure_date = this.returnDate;
    this.roundTripData.slices2[0].departure_date = this.returnDate;
  }

  //TODO set return data
  setDataAirports(){
    this.data.slices[0].origin = this.fromAirport
    this.data.slices[0].destination = this.toAirport

    this.roundTripData.slices[0].origin = this.fromAirport
    this.roundTripData.slices[0].destination = this.toAirport

    this.roundTripData.slices2[0].origin = this.toAirport
    this.roundTripData.slices2[0].destination = this.fromAirport
  }

  addChildToData(amount) {
    let childPassengers = createPassengers((amount ? amount : 1), "child");
    this.addPassengers(childPassengers);
  }

  addAdultToData(amount) {
    let adultPassengers = createPassengers((amount ? amount : 1), "adult");
    this.addPassengers(adultPassengers);
  }

  //Not sure this is conventional but this reads data from model properties and
  //formats it in the data property. Data propery could then be used for API requests
  makeData() {
    if (this.amountOfAdults < 1 && this.amountOfYouths < 1) {
      throw new Error('number of people is zero');
    }
    this.makeDataPassengers();
    this.setDataDates();
    this.setDataAirports()
    let ret={...this.data};
    this.clearData();
    return ret;
  }

  makeRoundTripData(){
    if (this.amountOfAdults < 1 && this.amountOfYouths < 1) {
      throw new Error('number of people is zero');
    }
    this.makeDataPassengers();
    this.setDataDates();
    this.setDataAirports()
    let ret={...this.data};
    this.clearData();
    return this.roundTripData;
  }
  //Clears fields present in the data propery that might be invalid
  clearData() {
    this.passengers = [];
    this.data.passengers = this.passengers;
  }

  addObserver(callback) {
    this.observers.push(callback);
  }
  removeObserver(callback) {
    this.observers = this.observers.filter(function(x) {
      if (x === callback) {
        return false
      }
      return true;
    })
  }
  notifyObservers(payload) {
    function invokeObserverCB(obs) {
      try {
        obs(payload);
      } catch (err) {
        console.log(err);
      }
    }
    this.observers.forEach(invokeObserverCB);
  }

}

export default FlightModel;
