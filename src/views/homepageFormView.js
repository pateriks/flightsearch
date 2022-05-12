/* Functional JSX component. Name starts with capital letter */

function HomepageFormView(props) {

    function changeAmountPeopleACB(event) {
        props.onChangeAmountPeople(event.target.value)
    }

    function fromSelectTripTypeACB(event) {
        props.onSelectTripType(event.target.value)
    }

    //TODO Move or rewrite these logic checks if possible
    function fromTextInputACB(event) {
        if (event.target.value.length > 3) {
            let indexOfPar=event.target.value.indexOf("(");
            let airportCode = (event.target.value.substring(indexOfPar+1, indexOfPar+4));
            if (event.target.value.endsWith(")")) {
                props.onFromAirportSelect(airportCode);
            }
            return
        }
        props.onSearchForAirport(event.target.value)
    }

    function changeFromDateACB(event) {
        props.onSelectFromDate(event.target.value)
    }

    function changeReturnDateACB(event) {
        props.onSelectReturnDate(event.target.value)
    }

    //TODO Move or rewrite these logic checks if possible
    function toTextInputACB(event) {
        let indexOfPar=event.target.value.indexOf("(");
        let airportCode = (event.target.value.substring(indexOfPar+1, indexOfPar+4));
        if (event.target.value.length > 3) {
            if (event.target.value.endsWith(")")) {
                props.onToAirportSelect(airportCode);
            }
            return
        }
        props.onSearchForAirport(event.target.value)
    }

    function clickSearchACB() {
        props.onSearch();
    }

    //TODO move this (Date) to apropriate place(Most likely model)
    var date = new Date()
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    var twoYearsAfterToday = (parseInt(today.split("-")[0]) + 2) + today.slice(today.indexOf("-"), today.length)

    return (

        <div className="mainBackground">
            <div className="header">
            <h1 style={{ color: '#DA291CFF'}}>FlightSearch</h1>
            </div>
            <div className="search-form-container">
              <div className="search-params">
                <select className="dropbtn" onChange={fromSelectTripTypeACB}>
                    <option value="One">One-way</option>
                    <option value="Round">Round-trip</option>
                </select>
                <div className="dropdown">
                    <select className="dropbtn">
                        <option className="hidden">People</option>
                    </select>
                    <div className="dropdown-content">
                        <div>Adults 18+ :
                            <button disabled={props.amountAdults < 1} onClick={changeAmountPeopleACB} value="Adult -">-</button>
                            {props.amountAdults}
                            <button disabled={props.amountPeople >= 9} onClick={changeAmountPeopleACB} value="Adult +">+</button>
                        </div>
                        <div>Youths 1-18 :
                            <button disabled={props.amountYouths < 1} onClick={changeAmountPeopleACB} value="Youth -">-</button>
                            {props.amountYouths}
                            <button disabled={props.amountPeople >= 9} onClick={changeAmountPeopleACB} value="Youth +">+</button>
                        </div>
                    </div>
                </div>
              </div>
              <div className="search-input">
                <div className="input-flex-container">
                  <input className="center" type="search" list="listID" name="From" placeholder="From..." onChange={fromTextInputACB}></input>
                  <input className="center" type="search" list="listID" name="Destination" placeholder="Pick a destination..." onChange={toTextInputACB}></input>
                  <input className="center" placeholder="test" type="date" name="trip-start"
                      min={today} max={twoYearsAfterToday} onChange={changeFromDateACB}>
                  </input>
                  <input className={props.tripType === "One" ? "hidden" : "center"} type="date" name="returnDate"
                      min={today} max={twoYearsAfterToday} onChange={changeReturnDateACB}>
                  </input>
                </div>
              </div>
              <div className="search-submit">
                <button disabled={!props.isValidRequest()}className="searchButton" onClick={clickSearchACB}>
                Search
                <img className="landing-animation" src="https://icon-library.com/images/airplane-mode-icon/airplane-mode-icon-27.jpg" height="auto" alt="">
                </img>
                </button>
              </div>
            </div>
            <div className="animation">
            </div>
            {getAirportList(props.airportResults)}
        </div>

    );
}


function getAirportList(e) {
    if (e == undefined) {
        return <datalist id="listID"></datalist>
    }
    var k = Object.keys(e)[0]

    if (k == undefined) {
        return <datalist id="listID">
                <option id={"Stockholm Arlanda Airport"} value={"Stockholm Arlanda Airport (ARN)"} className="textOverflow"> {"Sweden, Stockholm (ARN)"} </option>
                <option id={"Barcelona–El Prat Airport"} value={"Barcelona–El Prat Airport (BCN)"} className="textOverflow"> {"Spain, Barcelona (BCN)"} </option>
                <option id={"John F. Kennedy International Airport"} value={"John F. Kennedy International Airport (JFK)"} className="textOverflow"> {"United States, New York City (JFK)"} </option>
                <option id={"Heathrow Airport"} value={"Heathrow Airport (LHR)"} className="textOverflow"> {"United Kingdom, London (LHR)"} </option>  
        </datalist>
    }

    e = e[k]

    if (k.length === 2) {
        return <datalist className="textOverflow" id="listID">
            {e.map(function (airport) {
                var key = Object.keys(airport)
                airport = airport[key]
                return <option key={key} id={airport.airportName} value={airport.airportName + " ("+key+")"} className="textOverflow">{airport.country + ", " + airport.region + " (" + key + ")"}</option>
            }
            )}
        </datalist>
    }
    return <datalist className="textOverflow" id="listID">
        <option id={e.airportName} value={e.airportName+ " ("+k+")"} className="textOverflow"> {e.country + ", " + e.region + " (" + k + ")"} </option>
    </datalist>
}

export default HomepageFormView;
