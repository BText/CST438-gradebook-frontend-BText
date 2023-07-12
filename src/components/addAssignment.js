import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js'
import { Link  } from 'react-router-dom';


class addAssignment extends React.Component {

    constructor(props) {
        super(props);
        console.log("Gradebook.cnstr "+ JSON.stringify(props.location));
        this.state = {
            assignmentName: '',
            dueDate: '',
            courseId: '',
            
        };
    }

    handleSubmit = (event ) => {
      console.log("addAssignment.handleSubmit");
      const token = Cookies.get('XSRF-TOKEN');
      
      fetch(`${SERVER_URL}/assignment?name=${this.state.assignmentName}&dueDate=${this.state.dueDate}&courseID=${this.state.courseId}`, 
          {  
            method: 'POST', 
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': token }

          } )
      .then(res => {
          if (res.ok) {
            toast.success("Assignment successfully added", {
            position: toast.POSITION.BOTTOM_LEFT
            });
          } else {
            toast.error("Assignment add failed", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Add http status =' + res.status);
      }})
        .catch(err => {
          toast.error("Assignment add failed", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        });
   };        
   
     assignmentChange = (event) => {
        this.setState({assignmentName: event.target.value});
    }

    dueDateChange = (event) => {
        this.setState({dueDate: event.target.value});
    }

    courseIdChange = (event) => {
        this.setState({courseId: event.target.value});
    }

    render() {
        
         return (
             <div>
            <div className="App">
             <h4>Create Assignment </h4>
             
             <div className="appForm">
             <form onSubmit={this.handleSubmit}>
             <div className="fieldTitles">
                <p>Assignment Name</p> <p>Due Date</p><p>Existing Course ID</p>
                </div>
                  <div className="fieldBoxes">
                <input name='assignmentName' onChange={this.assignmentChange} />
          
               
                <input type="date" name='dueDate' onChange={this.dueDateChange}  />
   
                
                <input variant="outlined" type="number" name='courseId' onChange={this.courseIdChange}/>

             </div>
             
                         <Button component={Link} to={{pathname:'/add-assignment', 
                         							   assignmentName:this.state.assignmentName,
                         							   dueDate:this.state.dueDate,
                         							   coursName:this.state.courseName
                         							   }} style={{margin: 50}}
                        variant="outlined" color="primary" onClick={this.handleSubmit}>
                  Add Assignment
                </Button>
            </form>
            </div>
                           <div style={{width:'100%'}}>
                For DEBUG:  display state.
                {JSON.stringify(this.state)}
              </div>

             <ToastContainer autoClose={1500} /> 
             </div>
             </div>
             
         )
     }
    
 }
export default addAssignment;