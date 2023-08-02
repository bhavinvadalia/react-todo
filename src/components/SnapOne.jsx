import React, { useEffect, useState } from "react";
   

export const SnapOne = (props) => {
    const [user, setUser] = useState([]);

    const fetchData =() => {
        
        fetch("https://flasky-server.azurewebsites.net/getTasksAll")
        .then((response) => response.json())
        .then((data) => {
            setUser(data.message);
            /*console.log(data)*/})
        
    }
  
  
    useEffect(() => {
        
      },[])
    
  
    return (
      <main>
        
        <h1>Create a New Task📝</h1>
        <ul>
          {user}
        </ul>
      </main>
    );
    


}

