import React from 'react';
import './App.css';
import ExJsplumb5 from './ExJsplumb5';
// import {Sigma, LoadJSON,RelativeSize } from 'react-sigma'

class App extends React.Component{
  render() {
    
    //let myGraph = {nodes:[{id:"n1", label:"Alice"}, {id:"n2", label:"Rabbit"}], edges:[{id:"e1",source:"n1",target:"n2",label:"SEES"}]};
   
    return (
       <>
{/*      <Sigma style={{width:"200px", height:"200px"}}>
   <LoadJSON path="/data.json" >
  <RelativeSize initialSize={8}/>
  </LoadJSON>
 </Sigma> */}
    <ExJsplumb5 />
      
      </>
      );

  }

} 



export default App;
