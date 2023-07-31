import { useEffect, useState } from 'react';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { loginRequest, protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import CardGroup from 'react-bootstrap/CardGroup';
import Alert from 'react-bootstrap/Alert';



const TodoListContent = () => {
    const [todolistdata, setTodolistdata] = useState([]);

    const fetchData =() => {
        
        fetch("https://react-client-app2.azurewebsites.net:5000/getTasksAll")
        .then((response) => response.json())
        .then((data) => {
            setTodolistdata(data);
            console.log(data)})
        
    }
  
    const handleClick = (event) => {
        const cid = event.currentTarget.dataset.id;
        console.log(cid);
        async function postData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
            });
            
            return response.json(); // parses JSON response into native JavaScript objects
        }
        
        const post_data = {
            id: cid
        }
        postData("https://flasky-server.azurewebsites.net:5000/deleteTask", { post_data }).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            fetchData();
        });

      }
    useEffect(() => {
        fetchData();
      },[])
    
    

    if(todolistdata.length > 0)
    
    return (
        <>
       <div className='container'>
    {todolistdata.map ((i, j) => {
      return(
        <div key={j}>
         
          <Card 
          bg={i.color}style={{ width: '18rem' }} className="mb-4">
      
      <Card.Body>
      <Card.Header>#{j+1}</Card.Header>
        <Card.Title>{i.name}</Card.Title>
        <Card.Text>
         {i.desc}
        </Card.Text>
        <Button variant="dark" onClick={handleClick} data-id={i._id.$oid}>Mark Complete</Button>
      </Card.Body>
    </Card>
        </div>
      
    );
    })} 
    
   </div>
    
        </>

    );

    else return (
        <div className='container'>
        <Alert variant = 'info'>You're all caught up!</Alert>
        </div>
    )
   
};

/**
 * The `MsalAuthenticationTemplate` component will render its children if a user is authenticated
 * or attempt to sign a user in. Just provide it with the interaction type you would like to use
 * (redirect or popup) and optionally a request object to be passed to the login API, a component to display while
 * authentication is in progress or a component to display if an error occurs. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const TodoList = () => {
    const authRequest = {
        ...loginRequest,
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect} 
            authenticationRequest={authRequest}
        >
            <TodoListContent />
        </MsalAuthenticationTemplate>
    );
};
