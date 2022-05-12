import React from "react"
import HomepageFormView from "../views/homepageFormView";
import HomepageResultsView from "../views/homepageResultsView";
import resolvePromise from "../resolvePromise"
import promiseNoData from "../promiseNoData"
import {
  getAirportsInCity,
  getOffers,
  getFlightDetails
} from "../flightSearches.js";
//import sendMail from "../testFIle";

export default

function Homepage(props) {
  const [, setFrom] = React.useState(null);
  const [, setTo] = React.useState(null);
  const [, setDeptDate] = React.useState(null);
  const [, setReturnDate] = React.useState(null);
  const [, setAdults] = React.useState(null);
  const [, setYouths] = React.useState(null);
  const [, setTripType] = React.useState(null);
  const [, setSortingType] = React.useState(null);
  const [choosenAirport, setAirport] = React.useState([]);
  const [airportsPromiseState] = React.useState({});
  const [flightPromiseState] = React.useState({});
  const [, reRender] = React.useState();
  const [displayAmount, setDisplayAmount] = React.useState(null)

  const data = require('../data/airports.json')

  var scrollEnd = false;
  var scrollTypeAuto =  false;
  const [sortType,setSortType] = React.useState(null)


  //TODO add return airports functionality
  function resolveAirports(promise) {
    resolvePromise(promise, airportsPromiseState,
      function promiseStateChangedACB() {
        reRender(new Object());
      })
  }

  function resolveFlight(promise) {
    resolvePromise(promise, flightPromiseState,
      function promiseStateChangedACB() {
        reRender(new Object());
      })
  }

  function observerACB() {
    setFrom(props.model.fromAirport);
    setTo(props.model.toAirport)
    setDeptDate(props.model.deptDate)
    setReturnDate(props.model.returnDate)
    setAdults(props.model.amountAdults);
    setYouths(props.model.amountYouths);
    setTripType(props.model.tripType);
    setDisplayAmount(props.model.displayAmount)
    setSortType(props.model.sortType)
  }

  function searchAirportACB(searchText) {

    function isValidAirportCB(airport, search) {
      return (airport[search] != undefined)
    }

    //TODO cleanup/make more efficent
    if (searchText.length > 1) {
      var search = searchText.substring(0, 2).toLocaleUpperCase()
      var airports = data.filter(airport => isValidAirportCB(airport, search))
      if (searchText.length > 2 && airports != undefined) {
        airports = airports[0][search].filter(airport => isValidAirportCB(airport, searchText.substring(0, 3).toLocaleUpperCase()))
        search = searchText.substring(0, 3).toLocaleUpperCase()
      }
      setAirport(airports[0])
    } else {
      setAirport([])
    }
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
  React.useEffect(wasCreatedACB, []);

  function onFromAirportSelectACB(from) {
    props.model.setFromAirport(from);
  }

  function onToAirportSelectACB(to) {
    props.model.setToAirport(to)
  }

  function onChangeAmountPeopleACB(params) {
    switch (params) {
      case 'Adult +':
        props.model.setAmountAdults(props.model.amountAdults + 1)
        break;
      case 'Adult -':
        props.model.setAmountAdults(props.model.amountAdults - 1)
        break;
      case 'Youth +':
        props.model.setAmountYouths(props.model.amountYouths + 1)
        break;
      case 'Youth -':
        props.model.setAmountYouths(props.model.amountYouths - 1)
        break;
      default:
        break;
    }
  }

  function compareDates(date1, date2) {
    var date1Split = date1.split("-")
    var date2Split = date2.split("-")
    if (parseInt(date1Split[0]) > parseInt(date2Split[0])) {
      return false
    }
    if (parseInt(date1Split[1]) > parseInt(date2Split[1])) {
      return false

    }
    if (parseInt(date1Split[2]) > parseInt(date2Split[2])) {
      return false
    }
    return true
  }

  function onSelectFromDateACB(date) {
    /*if (compareDates(date, props.model.deptDate) || props.model.tripType === props.model.oneWay) {
        //console.log(date);
    }
    */
    props.model.setDeptDate(date)
  }

  function onSelectReturnDateACB(date) {
    /*if (compareDates(props.model.returnDate, date)) {
      console.log(date);
    }
    */

    props.model.setReturnDate(date)

  }

  function onSelectTripTypeACB(type) {
    props.model.setTripType(type)
  }

  function onSelectSortingTypeACB(type){
    props.model.setSortingType(type)
  }


  //TODO
  function isReadyForSearchACB() {
    var correctDateLength = 10

    function checkRest() {
      if (props.model.amountAdults + props.model.amountYouths > 0) {
        if (props.model.fromAirport !== '' && props.model.toAirport !== '') {
          if(props.model.fromAirport !== props.model.toAirport){
            return true
          }
        }
      }
      return false
    }
    
    if (props.model.tripType === props.model.oneWay) {
      return checkRest() && (props.model.deptDate.length === correctDateLength)
    } else if (props.model.tripType === props.model.roundTrip) {
      return checkRest()  && (props.model.deptDate.length === correctDateLength) && (props.model.returnDate.length === correctDateLength)
    } else {
      return false;
    }
  }

  function searchACB() {
    if (props.model.tripType === props.model.oneWay){
      try {
        let data = props.model.makeData();
        resolveFlight(getOffers(data));
      } catch (error) {
        console.log(error);
      }
    }
    else if (props.model.tripType === props.model.roundTrip){
      try {
        let data = props.model.makeRoundTripData();
        resolveFlight(getOffers(data));
      } catch (error) {
        console.log(error);
      }
    }
  }

  function changeFlightOnClickACB(flight) {
    //console.log(flight.id);
    props.model.setCurrentFlight(flight.id);
  }

  function setScrollEndACB(){
    if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight && !scrollEnd) {
        scrollEnd = true;
        if(scrollTypeAuto){
            setDisplayAmountACB('auto')
        }
    }else if((window.innerHeight + Math.ceil(window.pageYOffset)) <= document.body.offsetHeight -10 && scrollEnd){
        scrollEnd = false;

    }
 }
 function setDisplayAmountACB(amount){
  if(amount === 'auto' ){
      if(scrollEnd){
      props.model.setDisplayAmount(props.model.displayAmount + 10)
      }
  }
  else if(amount === 'autoEnable'){
    scrollTypeAuto = true
  }else{
      scrollTypeAuto = false
      props.model.setDisplayAmount(parseInt(amount))
  }
}

function setSortTypeACB(type){
  props.model.setSortType(type)
}
  return <div> < HomepageFormView
  onChangeAmountPeople = {
    onChangeAmountPeopleACB
  }
  onFromAirportSelect = {
    onFromAirportSelectACB
  }
  onToAirportSelect = {
    onToAirportSelectACB
  }
  onSelectTripType = {
    onSelectTripTypeACB
  }
  onSelectFromDate = {
    onSelectFromDateACB
  }
  onSelectReturnDate = {
    onSelectReturnDateACB
  }
  isValidRequest = {
    isReadyForSearchACB
  }
  onSearchForAirport = {
    searchAirportACB
  }
  onSearch = {
    searchACB
  }
  fromAirport = {
    props.model.fromAirport
  }
  amountOfPeople = {
    props.model.amountAdults + props.model.amountYouths
  }
  amountAdults = {
    props.model.amountAdults
  }
  amountYouths = {
    props.model.amountYouths
  }
  tripType = {
    props.model.tripType
  }
  airportResults = {
    choosenAirport
  }

  /> {
    promiseNoData({
        promise: flightPromiseState.promise,
        data: flightPromiseState.data,
        error: flightPromiseState.error
      }) ||
      < HomepageResultsView results = {
        flightPromiseState.data
      }
    onChooseFlight = {
      changeFlightOnClickACB
    }
    onScrollEnd= {
      setScrollEndACB
    }
    setDisplayAmount = {
      setDisplayAmountACB
    }
    setSortType = {
      setSortTypeACB
    }
    sortType = {
      props.model.sortType
    }
    displayAmount = {
      props.model.displayAmount
    }
    />
  }</div>

}
