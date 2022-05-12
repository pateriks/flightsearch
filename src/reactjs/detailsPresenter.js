import React from "react"
import FlightModel from "../FlightModel.js"
import DetailsView from "../views/detailsView.js";
import promiseNoData from "../promiseNoData"
//TODO: import utilities.js and add isFlightInFinalList to be used in DetailsView

export default function Details(props) {
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

  function addToFinalListACB(){
    props.model.addToFinalList(props.model.currentFlightPromiseState.data)
  }

  React.useEffect(wasCreatedACB, []);
  return (<div>{
            promiseNoData({
                promise: props.model.currentFlightPromiseState.promise,
                data: props.model.currentFlightPromiseState.data,
                error: props.model.currentFlightPromiseState.error
              }) ||
            <DetailsView
              flightData = {props.model.currentFlightPromiseState.data}
              onAddToFinalList={addToFinalListACB}
              isFlightInList = {props.model.isCurrentFlightInList()}
            />}
          </div>
          );
}
