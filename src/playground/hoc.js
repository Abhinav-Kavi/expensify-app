import React from 'react';
import ReactDOM from 'react-dom';


/*hoc -- Higher Order Component
  -A component that renders other components
  Advantages
   -Code Reuse
   -Render Hijacking
   -Prop Manipulation
   -Abstract State
*/


const Info = (props)=>(
  <div>
   <h1>Info</h1>
   <p>The info is : {props.info}</p>
  </div>
);

//HOC
const withAdminWarning = (WrappedComponent)=>{
  
return (props)=>(
 <div>
  <p>{props.adminType}: This is confidentail. Please do not share!</p>
  <WrappedComponent {...props}/>
 </div>
)};


const requireAuthentication = (WrappedComponent)=>{  
  return (props)=>(
   <div>
    { props.isAuthenticated ?  <WrappedComponent {...props}/> : <p>You are not authorized to view the contents.</p> }
   </div>
  )};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);



// ReactDOM.render(<AdminInfo adminType="Manager"  info="this is some random info"/>, document.getElementById('app'));


ReactDOM.render(<AuthInfo isAuthenticated={true}  info="this is some random info"/>, document.getElementById('app'));