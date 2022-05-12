import Homepage from "./reactjs/homepagePresenter.js";
import Details from "./reactjs/detailsPresenter.js";
import Booking from "./reactjs/bookingPresenter.js";
import Confirmation from "./reactjs/confirmationPresenter.js";
import Globe from "./reactjs/globePresenter.js";
import SidebarFirebase from "./reactjs/sidebarFirebasePresenter.js";
//import Sidebar from "./reactjs/sidebarPresenter.js";

const Show=require("./show.js").default;
require("./navigation.js")
require("./utils.js")

function App(props) {
  return (
    <div>
      <div>
        <Globe model={props.model}/>
        {/*<Show hash="#sidebar"><SidebarFirebase model={props.model}/></Show>*/}
      </div>
      <div>
        <div className="flexParent">
          <div className="mainContent">
          <Show hash="#homepage">{<Homepage model={props.model}/>}</Show>
          <Show hash="#details"><Details model={props.model}/></Show>
          <Show hash="#booking"><Booking model={props.model}/></Show>
          {/*<Show hash="#summary"><Summary model={props.model}/></Show>*/}
          <Show hash="#confirmation"><Confirmation model={props.model}/></Show>
          </div>
          <div className="sideContent">
            <div className="sidebar" id="sidebar"><SidebarFirebase model={props.model}/></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
