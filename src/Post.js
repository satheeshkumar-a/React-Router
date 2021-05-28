import React from "react";
import "./style.css"; 
import { useHistory, useLocation, useRouteMatch, useParams } from 'react-router-dom';

export default function Post(){
    const history = useHistory();
    console.log(history);
    const location = useLocation();
    console.log(location);
    const routeMatch = useRouteMatch();
    console.log(routeMatch);
    const params = useParams();
    console.log(params)

return(
<div>
    <h1>PostID</h1>
</div>       
    );
}   
    


