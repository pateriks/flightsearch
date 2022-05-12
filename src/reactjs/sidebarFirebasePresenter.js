import React from "react";
import SidebarFirebaseView from "../views/sidebarFirebaseView.js"

export default
function SidebarFirebase(props){

    const [, setFlights] = React.useState(null); //allows functional components to have state, like this.state in class components

    function observerACB(){
        setFlights(props.model.flights);
    }

    function observerItWasCreatedACB(){
        observerACB();
        props.model.addObserver(observerACB); //add the observer to the model

        return function isPutDownACB(){
            props.model.removeObserver(observerACB);
        }
    }
    React.useEffect(observerItWasCreatedACB, []);

    function setCurrentFlightACB(flight){
        props.model.setCurrentFlight(flight.data.id);
    }

    function removeFlightACB(flight){
      console.log("removed");
        props.model.removeFromFinalList(flight.data.id);
    }

    return <SidebarFirebaseView flights={props.model.flights} onCurrentFlight={setCurrentFlightACB} onRemove={removeFlightACB}/>;
}
