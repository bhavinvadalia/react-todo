import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export const TodoForm = () => {
    const initialValues = {
        taskname: "",
        taskduedate: "",
        taskcolor: "",
        taskdesc: ""
    };
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
        


    const handleSubmit = (e) => {
        e.preventDefault();

       

        // Example POST method implementation:
        async function postData(url = "", data = {}) {
        // Default options are marked with *
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
            taskname : values.taskname,
            taskduedate: values.taskduedate,
            taskcolor: values.taskcolor,
            taskdesc: values.taskdesc
        }
        postData("https://flasky-server.azurewebsites.net/addTasks", { post_data }).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
        
        
    }

    
    return (
        <Form className="todo-form" onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label>TaskName</Form.Label>
                <InputGroup className="mb-3">                
                    <Form.Control
                        type="text"
                        id="new-todo-input"
                        name = "taskname"
                        autoComplete="off"
                        value={values.taskname}
                        onChange={handleChange}
                        placeholder="Enter a task"
                    /></InputGroup>
                    <Form.Label>Due By</Form.Label>
                <InputGroup className="mb-3">                
                    <Form.Control
                        type="date"
                        id="new-todo-input-duedate"
                        name="taskduedate"
                        autoComplete="off"
                        value={values.taskduedate}
                        onChange={handleChange}
                        placeholder="Enter a task"
                    /></InputGroup>
                    <Form.Label>Priority</Form.Label> 
                    <Form.Select size="md"
                            value={values.taskcolor}
                            name="taskcolor"
                            type="select"
                            id="exampleColorInput"
                            onChange={handleChange}
                            >
                    <option>Choose Priority</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </Form.Select>
                    
                   <Form.Label>Description</Form.Label> 
                   <InputGroup className="mb-3"><Form.Control as="textarea" rows={3}
                        id="new-todo-input-desc"
                        name="taskdesc"
                        
                        value={values.taskdesc}
                        onChange={handleChange}                        
                        placeholder="Enter a task description"
                    />
                    <Button variant="primary" type="submit">Add</Button>
                </InputGroup>
            </Form.Group>
        </Form>
    );
}
