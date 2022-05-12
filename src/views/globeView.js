import Globe from 'react-globe.gl';
import ReactDOM from 'react-dom';
import {Helmet} from "react-helmet";
import { SizeMe } from 'react-sizeme'

function GlobeView(props) {
  let sunBasket;
  if(props.renderSunBasket){
    sunBasket=(<a onClick={function acb(evente) {evente.preventDefault(); var elem = document.getElementById("sidebar"); elem.classList.toggle("show");}} href="" className="float">
    {props.nrFlights}
    </a>)
  }else{
    sunBasket=(<a className="glowing-float">
    </a>)
  }
  return (

  <div>
    <Helmet>
    </ Helmet>

    <div id="globeViz" >
    <SizeMe>{({ size: { width } }) => (
      <Globe  width={width} height={100}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        arcsData={[...Array(20).keys()].map(() => ({
                    startLat: (Math.random() - 0.5) * 180,
                    startLng: (Math.random() - 0.5) * 360,
                    endLat: (Math.random() - 0.5) * 180,
                    endLng: (Math.random() - 0.5) * 360,
                    color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
                  }))}
        arcColor={[['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]}
        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => Math.random() * 4000 + 500}
        />
        )}</SizeMe>
    </div>
    {sunBasket}
  </div>
  );
}
export default GlobeView;
