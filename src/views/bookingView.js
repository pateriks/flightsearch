/*
	The css for bookingView was inspired from here: https://codepen.io/arefeh_htmi/pen/mdPYZKJ
*/

function bookingView(props) {

	//Workaround as we chose to not have any React logic in views.
	let inpName = false;
	let inpEmail = false;
	let inpCard = false;
	let inpCVC = false;
	let valEmail = false;



	function handleCancelACB(event) {
        window.location.hash = "#homepage";
  }

	function handleBookingACB(event) {
				//props.onAddBooking();
				//console.log(inpName +" "+ inpEmail +" " + inpCard + " " + inpCVC);
				//console.log(isDisabled());

				if (isDisabled()===true) {
        	window.location.hash = "#confirmation";
				}

				else {
					alert("Please fill in the mandatory fields to continue.");
				}
  }


	function keyPressACB(event) {
		//console.log(event.charCode>=48 && event.charCode<=57);
		return event.charCode>=48 && event.charCode<=57;
	}

	function checkLength(L, maxL) {
		if(L==maxL) return false;
	}

	function ValidateEmail(event) {
		//console.log("Validate email " + event.target.value);
	 	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
			//console.log(true);
			valEmail = true;
	    return (true);
	  }
		//console.log(false);
		valEmail = false;
	  return (false);
	}


	function isDisabled() {
		//console.log(inpName && inpEmail &&inpCard);
		return (inpName && inpEmail && inpCard && inpCVC && valEmail);
	}

// Would be better with React, but we are keeping the views dumb, so using React only for presenters
	function keyPressUpACB(event) {
		//console.log(event.target.id);
		//console.log(inpName + " " +inpEmail);

		if (event.target.value == "") {
			if(event.target.id==="inptName") {
				inpName = false;
			}
			if(event.target.id==="inptEmail") {
				inpEmail = false;
			}
			if(event.target.id==="inptCard") {
				inpCard = false;
			}
			if(event.target.id==="inptCVC") {
				inpCVC = false;
			}

			/*if(!inpName || !inpEmail || !inpCard)
				//document.getElementById('btnFinish').disabled = true;
				this.setState({ disabled: true });*/
  	}
	  else {
			//console.log(inpName + " " +inpEmail);
				if(event.target.id==="inptName") {
					inpName = true;
				}
				if(event.target.id==="inptEmail") {
					inpEmail = true;
				}
				if(event.target.id==="inptCard") {
					inpCard = true;
				}

				if(event.target.id==="inptCVC") {
					inpCVC = true;
				}
			/*if(inpName && inpEmail && inpCard)
	    	//document.getElementById('btnFinish').disabled = false;
				document.getElementById('btnFinish').removeAttribute('disabled');*/
			//	this.setState({ disabled: false })
	  }
}


	return (
      <div className="container">
			<div>
						<h4 className="header4"> Flight Information </h4>

						<div className="div-row confDate"> Company: <i>{props.flightData.data.owner.name}</i></div>
						<div className="div-row confDate"> Departure date: <i>{props.flightData.data.slices[0].segments[0].departing_at.replace("T", " ")}</i></div>
	          <div className="div-row confDate"> Arrival date: <i>{props.flightData.data.slices[0].segments[props.flightData.data.slices[0].segments.length-1].arriving_at.replace("T", " ")}</i></div>
						<div className="div-row confRoute"> From: <i>{props.flightData.data.slices[0].origin.city_name + " " + props.flightData.data.slices[0].origin.iata_code}</i></div>
	          <div className="div-row confRoute"> To: <i>{props.flightData.data.slices[0].destination.city_name + " " + props.flightData.data.slices[0].destination.iata_code}</i></div>
						<div className="div-row confRoute"> Number of stops: <i>{props.flightData.data.slices[0].segments.length}</i></div>
						<div className="div-row confRoute"> Passengers: <i>{props.flightData.data.passengers.length}</i></div>
						<div className="div-row confRoute"> Total amount: <i>{props.flightData.data.total_amount + " " + props.flightData.data.total_currency}</i></div>


			</div>



			    <div className="row">
			      <h4 className="header4">Personal Information*</h4>
			      <div className="input-group input-group-icon">
			        <input type="text" placeholder="Full Name" className="inpt" id="inptName" onKeyUp={keyPressUpACB}/>
			        <div className="input-icon"><i className="fa fa-user"></i></div>
			      </div>
			      <div className="input-group input-group-icon">
			        <input type="email" placeholder="Email Adress" className="inpt" id="inptEmail" onKeyUp={keyPressUpACB} onChange={ValidateEmail}/>
			        <div className="input-icon"><i className="fa fa-envelope"></i></div>
			      </div>

			    </div>
			    <div className="row">
			      <div className="col-half">
			        <h4 className="header4">Date of Birth</h4>
			        <div className="input-group">
			          <div className="col-third">
			            <input type="number" placeholder="DD" className="inpt" maxLength="2" max="31" min="1" onInput={(e) => e.target.value = e.target.value.slice(0, 2)}/>
			          </div>
			          <div className="col-third">
			            <input type="number" placeholder="MM" className="inpt" maxLength="2" max="12" min="1" onInput={(e) => e.target.value = e.target.value.slice(0, 2)}/>
			          </div>
			          <div className="col-third">
			            <input type="number" placeholder="YYYY" className="inpt" maxLength="4" max="2022" min="1900" onInput={(e) => e.target.value = e.target.value.slice(0, 4)}/>
			          </div>
			        </div>
			      </div>
			      <div className="col-half">
			        <h4 className="header4">Gender</h4>
			        <div className="input-group">
			          <input id="gender-male" type="radio" name="gender" value="male" className="rad inpt"/>
			          <label htmlFor="gender-male">Male</label>
			          <input id="gender-female" type="radio" name="gender" value="female" className="rad inpt"/>
			          <label htmlFor="gender-female">Female</label>
			        </div>
			      </div>
			    </div>
			    <div className="row">
			      <h4 className="header4">Payment Details*</h4>
			      <div className="input-group">
			        <input id="payment-method-card" type="radio" name="payment-method" value="card" className="rad inpt" defaultChecked/>
			        <label htmlFor="payment-method-card"><span><i className="fa fa-cc-visa"></i>Credit Card</span></label>
			        <input id="payment-method-paypal" type="radio" name="payment-method" value="paypal" className="rad inpt" disabled={true}/>
			        <label htmlFor="payment-method-paypal"> <span><i className="fa fa-cc-paypal" ></i>Paypal<small>*</small></span></label>

			      </div>
			      <div className="input-group input-group-icon">
			        <input type="number" placeholder="Card Number" className="inpt" id="inptCard" maxLength="16" onInput={(e) => e.target.value = e.target.value.slice(0, 16)} onKeyUp={keyPressUpACB}/>
			        <div className="input-icon"><i className="fa fa-credit-card"></i></div>
			      </div>
			      <div className="col-half">
			        <div className="input-group input-group-icon">
			          <input type="number" placeholder="Card CVC" className="inpt" id="inptCVC" maxLength="3" max="999" min="000" onInput={(e) => e.target.value = e.target.value.slice(0, 3)} onKeyUp={keyPressUpACB}/>
			          <div className="input-icon"><i className="fa fa-user"></i></div>
			        </div>
			      </div>

			      <div className="col-half">
			        <div className="input-group">
			          <select className="dropbtn2">
								<option value="jan">01 Jan</option>
									<option value="feb">02 Feb</option>
									<option value="mar">03 Mar</option>
									<option value="apr">04 Apr</option>
									<option value="may">05 May</option>
									<option value="jun">06 Jun</option>
									<option value="jul">07 Jul</option>
									<option value="aug">08 Aug</option>
									<option value="sept">09 Sept</option>
									<option value="oct">10 Oct</option>
									<option value="nov">11 Nov</option>
									<option value="dec">12 Dec</option>
			          </select>
			          <select className="dropbtn2">
									<option value="2022">2022</option>
									<option value="2023">2023</option>
									<option value="2024">2024</option>
									<option value="2025">2025</option>
									<option value="2026">2026</option>
									<option value="2027">2027</option>
									<option value="2028">2028</option>
									<option value="2029">2029</option>
									<option value="2030">2030</option>
			          </select>
			        </div>
			      </div>

			    </div>

			    <div className="row">
			      <h4>Terms and Conditions</h4>
			      <div className="input-group">
			        <input id="terms" type="checkbox" className="check inpt" defaultChecked disabled={true}/>
			        <label htmlFor="terms">By clicking Finish, I accept the terms and conditions for signing up to this service, and hereby confirm I have read the privacy policy.</label>
			      </div>
			    </div>
					<div className="row">
						<div className="input-group">
								<div className="div-row confButton">
									<button className="inpt col-half btnBk" onClick={handleBookingACB} id="btnFinish">Finish</button>
									<button className="inpt col-half btnBk" onClick={handleCancelACB}>Cancel</button>
								</div>
						</div>
					</div>
					<p><small>*PayPal payment is currently disabled. We are sorry for the inconvenicence.</small></p>
			</div>
    );
}

export default bookingView;
