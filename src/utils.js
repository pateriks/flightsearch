function createPassenger (params){
  return {type: params.adult? "adult" : "child",
          given_name: params.name? params.name : "",
          family_name: params.family_name? params.familt_name : "",
  }
}
function createPassengers(numberOfPassengers, type){
  let passengers = [];
  for (var i = 0; i < numberOfPassengers; i++)
    passengers.push({type: type});
  return passengers;
}
export {createPassengers, createPassenger};
