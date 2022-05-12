# Flightsearch
Basic web application to search, (book) and get information about schedule passenger flights.  
## Basic Layout planned  
This is the initially planned layout with features of the website. Some things might be subject to change.  
**HomePage:**  
Search : From, To , Dates , Amount people ,Search button  [Maybe: Return and connection flights]   
Background: Some Picture or colors  
**SummaryView**  
Search: Same as Homepage  
View:   
1.Flight Options in bars  
Buttons to: select inbound flight, select outbound flights  
props: flightCode, from, to, departureTime, arrivalTime, duration, price, airline 
We have started implementing duffel api to do flight searches. The code for searching available flight based on the user input is in [new-api-feat](https://gits-15.sys.kth.se/javierre/flightsearch/tree/new-api-feat) branch. In this branch the api code is kept in a file called flightSearches. A mock promise is resolved in [homepagePresenter.js](https://gits-15.sys.kth.se/javierre/flightsearch/blob/new-api-feat/src/reactjs/homepagePresenter.js) when the search button in homePage/summary is clicked. The results is as of now only printed to the console.

**DetailsView**  
Present chosen flight Details.  
From: Airline, AirPort, TimeStart , TimeLand, FlightDuration , Individual Price  
To: Airline, AirPort, TimeStart , TimeLand, FlightDuration , Individual Price  
Confirm Booking button  
**Booking user information**  
UserInfo: Name, Age , Mail , Phone  
Confirm Booking button  
**Confirmed Booking**  
SomeText  
Booking Number:  
MailConfirmation: JavaMail, smtp.gmail.com  
**See my Bookings**  
All saved flight in firebase  

## What we have done
### Homepage
We have created a homepage where the user can enter all the information needed to find a flight.  
This includes the model, view and presenter.  
Main feauters of this is a "Homemade API"(webscarper) to get the names and codes of all airports so a user can search for them.(Only through the codes atm).  
Some css ( example buttons within a dropdown menu).  
#### Files included
##### Branch homepage
flightsearch/src/data/airports.json (Airport data)  
flightsearch/scripts/getAirportsImproved.py (Getting info about airports and saving data)  
flightsearch/src/reactjs/homepagePresenter.js (Presenter)  
flightsearch/src/views/homepageView.js (View)  
flightsearch/src/FlightModel.js (Model)  

Files not included here but avaiable in the branch are nothing really worth mentioning or should be scraped and are not used.
## What has to be done
### Homepage
Some last checks for user input(example do we have all information needed for a search).  
Minor functionalities missing(example model does not support retruning flights yet).  

