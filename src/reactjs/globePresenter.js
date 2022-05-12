import GlobeView from "../views/globeView.js";
import React from "react"
import promiseNoData from "../promiseNoData"
export default function Globe(props) {
  const [nrFlights, setFlights] = React.useState(null);
  const [, setPromiseData]=React.useState(null);
  const [, setPromise]=React.useState(null);
  const [, setError]=React.useState(null);
  function observerACB(payload){
    setFlights(props.model.nrCurrentFlights)
    setPromiseData(props.model.flightsPromiseState.data)
    setPromise(props.model.flightsPromiseState.promise)
    setPromise(props.model.flightsPromiseState.error)
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
  var render;
  if(props.model.sessionId != null && promiseNoData(props.model.flightsPromiseState)){
    render = <GlobeView  renderSunBasket={false} nrFlights={nrFlights}/>
  }else{
    render = <GlobeView  renderSunBasket={true} nrFlights={nrFlights}/>
  }
  return render;
}
