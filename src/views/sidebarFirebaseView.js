//sidebarFIrebaseView.js React file

function sidebarFirebaseView(props){

    return(
            <div>
                <h3> Chosen flights </h3>
                <table>
                  <thead>
                    <tr>
                        <th>
                        </th>
                        <th>
                          Flightname
                        </th>
                        <th>
                          Hops
                        </th>
                        <th>
                          Departure time
                        </th>
                        <th>
                          Price
                        </th>
                    </tr>
                  </thead>
                {renderFlights(props.onCurrentFlight, props.onRemove, props.flights)}
                </table>
            </div>
    );
}

function renderFlights(onCurrentFlight, onRemove, flights){
    function flightsTableRowCB(flight){
        return (
                <tr key={flight.data.id}>
                    <td>
                        <button onClick={function clickButtonACB(event){onRemove(flight);}}>x</button>
                    </td>

                    <td>
                        <a onClick={function clickButtonACB(event){onCurrentFlight(flight);}} href='#details'>{flight.orgin}
                        {flight.data.slices[0].segments[0].operating_carrier.iata_code + " " + flight.data.slices[0].segments[0].operating_carrier_flight_number}</a>
                    </td>
                    <td>
                        <a onClick={function clickButtonACB(event){onCurrentFlight(flight);}} href='#details'>{flight.orgin}
                        {flight.data.slices[0].segments.length}</a>
                    </td>
                    <td>
                        <a onClick={function clickButtonACB(event){onCurrentFlight(flight);}} href='#details'>{flight.orgin}
                        {flight.data.slices[0].segments[0].departing_at}</a>
                    </td>
                    <td>
                        <a onClick={function clickButtonACB(event){onCurrentFlight(flight);}} href='#details'>{flight.orgin}
                        {flight.data.total_amount + " " + flight.data.total_currency}</a>
                    </td>
                </tr>
        );
    }
    return(
                <tbody>
                    {flights.map(flightsTableRowCB)}
                </tbody>
    );
}

export default sidebarFirebaseView;
