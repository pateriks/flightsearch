function HomepageResultsView(props){

  var searchType = 'Price'
  function listResultsCB(flight){

    let flightTime = flight.slices[0].duration
    if(flightTime.startsWith("PT")){
      flightTime = flightTime.substring(2)
    }
    else{
      flightTime = flightTime.substring(1).replace("T","")
    }

    return (
      <span className="flightResults" key={flight.id} onClick={function (event){window.location.hash="#details"; props.onChooseFlight(flight)}}>
        <div>
          <img src={"https://content.r9cdn.net/rimg/provider-logos/airlines/v/"+flight.slices[0].segments[0].operating_carrier.iata_code+".png?crop=false&width=100&height=90&fallback=default1.png"} alt=""></img>
        </div>
        <div>
          {flight.owner.name + "    " }
        </div>

        <div>
          {flight.slices[0].segments[0].departing_at + "    " }
        </div>
        <div>
          {flight.slices[0].segments[0].arriving_at + "    " }
        </div>

        <div>
          {flight.slices[0].origin.name  + "    " }
        </div>
        <div>
          {flight.slices[0].destination.name + "    " }
        </div>

        <div>
          {"Duration " + flightTime}
        </div>

        <div>
          {"Flight " + flight.slices[0].segments[0].operating_carrier.iata_code + flight.slices[0].segments[0].operating_carrier_flight_number}
        </div>

        <div>
          {flight.slices[0].fare_brand_name + " fare    " }
        </div>

        <div>
          {flight.total_amount + " " + flight.total_currency + "    "}
        </div>
        <div>
          {"Hops " + flight.slices[0].segments.length}
        </div>
      </span>
    );
  }

  function sortACB(flight1,flight2){
    function compareCB(x,y){
      if(x<y){
        return -1
      }
      if(x===y){
        return 0
      }
      return 1
    }

    function compareTimeCB(x,y){
      function timeSizeCB(time){
        let day = "D"
        let hour = "H"
        let min = "M"
        let size = ""
        if(time.indexOf(day) !== -1){
          return 3
        }
        if(time.indexOf(hour) !== -1){
          return 2
        }
        if(time.indexOf(min) !== -1){
          return 1
        }

        return parseInt(size)
      }
      timeSizeCB(x)
      const re = /[^0-9]/g
      var xSize=timeSizeCB(x)
      var ySize=timeSizeCB(y)
      x =x.replace(re, " ").trim().split(" ").map(e => parseInt(e))
      y =y.replace(re, " ").trim().split(" ").map(e => parseInt(e))
      
      if( x.length === y.length){
        for(var i=0;i<x.length;i++){
          if(x[i]<y[i]){
             return -1
          }
          if(x[i] === y[i]){
            if(i!==x.length-1){
              continue
            }
            else{
              return 0
            }
          }
          return 1
        }
      }else{
        if(xSize === ySize){
          return compareCB(x[0],y[0])
        }else{
          return compareCB(xSize,ySize)
        }
      }
    }

    switch(props.sortType){
      case 'Price':
        return compareCB(parseFloat(flight1.total_amount), parseFloat(flight2.total_amount))
      case 'Hops':
        return compareCB(flight1.slices[0].segments.length, flight2.slices[0].segments.length)
      case 'Duration':
        var i = compareTimeCB(flight1.slices[0].duration, flight2.slices[0].duration)
        return i
      default:
        break;
    }
  }

function onScrollACB(){
  props.onScrollEnd()
 }

 function onSelectDisplayAmountACB(event){
  props.setDisplayAmount(event.target.value)
 }

 function onSelectSortTypeACB(event){
   props.setSortType(event.target.value)
 }

  return (
          <div>
            {window.addEventListener('scroll',onScrollACB)}
            Display:
            <select onInput={onSelectDisplayAmountACB}>
              <option value={10}> 10 </option>
              <option value={20}> 20 </option>
              <option value={50}> 50 </option>
              <option value="autoEnable"> auto </option>
            </select>
            Sort by:
            <select onInput={onSelectSortTypeACB}>
              <option value='Price'> Price </option>
              <option value='Hops'> Hops </option>
              <option value='Duration'> Duration </option>
            </select>
            {props.results.data.offers.sort(sortACB).slice(0,(props.displayAmount > props.results.data.offers.length ? props.results.data.offers.length : props.displayAmount)).map(listResultsCB)}
          </div>
  );
}
export default HomepageResultsView;
