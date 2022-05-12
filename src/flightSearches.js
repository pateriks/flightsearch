import {API_URL, API_TOKEN, API_MARKER, API_ACCESS_TOKEN, API_KEY} from "./apiConfig"

const proxyURL = 'https://marco-projects.com:3000/CORS'


function treatHTTPResponseACB(response){
  console.log(response)
   /*TODO throw if the HTTP response is not 200, otherwise return response.json()*/
   if(response.status !== 200){
     throw new Error (response.status);
   }else{
     return response.json();
   }

}

function transformResultsACB(data){
  function extractACB(item){
    return item.AirportCode;
  }
  data = data.results.map(extractACB);
  return data;
}

function getAirportsInCity(params) {
  const options = {
  	method: 'GET',
  	headers: {
  		'X-RapidAPI-Host': 'world-airports-directory.p.rapidapi.com',
  		'X-RapidAPI-Key': '2c4bab0a8dmsh1f856fcfaecad74p194cb8jsnb0bb179161a5'
  	}
  };
  return fetch('https://world-airports-directory.p.rapidapi.com/v1/airports/'+ params.keyword + '?page=1&limit=20&sortBy=AirportName%3Aasc', options)
    .then(treatHTTPResponseACB)
    .then(transformResultsACB)
}/* end of second fetch parameter, object */

function getAirlineLogo(iataCode){
  let url = 'https://content.r9cdn.net/rimg/provider-logos/airlines/v/'+iataCode+'.png?crop=false&width=100&height=90&fallback=default1.png'
  let method = 'GET'
  return fetch(url,{
    method: method
  })
  .then(response => response.blob())
  .then(imageBlob => {
    return URL.createObjectURL(imageBlob)
  })
}

function getFlightDetails(id){ //taken from GET Get Recipe Information
  let duffel_url = "https://api.duffel.com/air/offers/" + id;
  let headers = {
    "Api-Url" : "https://api.duffel.com/air/offers/" + id, // +"+?return_available_services=true"
    "Accept" : "application/json",
    "Accept-Encoding": "gzip",
    "Duffel-Version": "beta",
    "Authorization": "Bearer " + API_ACCESS_TOKEN
  };
  let method = 'GET'
  let compress = true;
	return fetch(proxyURL, {
      method : method,
      headers : headers,
      compress : compress,
    })
    .then(response => {if(response.status === 200 || response.status === 201) return response.json(); throw new Error (response.status)});
}

function getOffers(data) {
  let headers = {
    "Api-Url" : "https://api.duffel.com/air/offer_requests?return_offers=true",
    "Content-Type": "application/json",
    "Accept" : "application/json",
    "Accept-Encoding": "gzip",
    "Duffel-Version": "beta",
    "Authorization": "Bearer " + API_ACCESS_TOKEN
  };

  let body = JSON.stringify({
          data: {
            ...data,
          },
        });
  let method = 'POST'
  let compress = true;
  return fetch(proxyURL,{
      method : method,
      headers : headers,
      body : body,
      compress : compress,
    })
    .then(response => {if(response.status === 200 || response.status === 201) return response.json(); throw new Error (response.status)});
}


export {getAirportsInCity, getOffers, getFlightDetails, getAirlineLogo};
