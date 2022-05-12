function promiseNoData(promiseState){

  let loading_gif = "https://traveloptionsng.com/wp-content/uploads/2019/09/gogo-loader-plane-transparent.gif";

  function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  function render (promise, data, error){
    if(!promise){
      return <div></div>
    }else if( !data && !error){
      return(
            <div className="outsideBoxResults">
              <img height="200" src={loading_gif}></img>
            </div>
            )
    }else if(error){
      return (
                <div id="snackbar">Error: {error.message}</div>
            )
    }else{
      return false;
    }
  }
  return render(promiseState.promise, promiseState.data, promiseState.error);

}
export default promiseNoData;
