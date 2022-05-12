import React from 'react'

export default
function Show(props){
  function noscroll(eh) {
    if(window.scrollY>100)
 window.scrollTo(0,100);

  }
  const [hashState, setHash]=React.useState(window.location.hash);
  function hashListenerACB(){ setHash(window.location.hash);}
  function wasCreatedACB(){
      window.addEventListener("hashchange", hashListenerACB);   // 1 subscribe
       //window.addEventListener("scroll", noscroll);
      function tearDownACB(){ window.removeEventListener("hashchange", hashListenerACB);  }//window.removeEventListener("scroll", noscroll);
      return tearDownACB;
  }
  React.useEffect(wasCreatedACB, []);
  let clas = (hashState === props.hash)? "" : "hidden";
  return <div className={clas}>{props.children}</div>
}
