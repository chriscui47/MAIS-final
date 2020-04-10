import React from 'react';
import './App.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import FormCheck from 'react-bootstrap/FormCheck'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import heart from './assets/heart.jpeg';
export default class Home extends React.Component{

    constructor(props){
            super(props);
            this.handleSubmit=this.handleSubmit.bind(this);
            this.handleChangeControl=this.handleChangeControl.bind(this);
            this.state={age:0,ST:0,sex:0,chest:0,BP:0,cholesterol:0,Bloodsugar:0,Thal:0,Slope:0,Vessels:0,Angina:0,Ec:0,HR:0,receivedData:0,loaded:false};
        this.fetchResults = this.fetchResults.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        }

    handleSubmit= () =>{
    }
        
    handleChangeControl = ({ target }) => {
        this.setState({ [target.id]: target.value });
    }

    handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
    }


    fetchResults(){
        var body = {
            "age": this.state.age,
            "ST": this.state.ST,
            "sex": this.state.sex,
            "chest": this.state.chest,
            "BP":this.state.BP,
            "cholesterol":this.state.cholesterol,
            "Bloodsugar":this.state.Bloodsugar,
            "Thal":this.state.Thal,
            "Slope":this.state.Slope,
            "Vessels":this.state.Vessels,
            "Angina":this.state.Angina,
            "Ec":this.state.Ec,
            "HR":this.state.HR
        }
            alert(body.age);
        fetch('/prediction/game', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
          }).then(res => res.json()).then(data => this.setState({receivedData: data, loaded: true}))

    }
    
    render(){
        
        return(
  <div className='App'>
    
           <center  style={{position:'absolute',height:'1px'}}>
          <h3>Heart Disease Predictor</h3>
          <p><img src={heart} height="30px" width="30px"/></p>
          </center>
  <div className='buttonWrapper'>
  <Form> 
    <Form.Row>
      <Form.Group as={Col} controlId="age">
    <Form.Control type="number" placeholder="Enter your age" onChange={this.handleChangeControl}/>
    </Form.Group>
    
    <Form.Group as={Col} controlId="ST">
       <Form.Control type="number" placeholder="OldPeak" onChange={this.handleChangeControl}/>           
       </Form.Group>

      <Form.Group as={Col} controlId="sex">
          <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
          < ToggleButton value={0}>Female</ToggleButton>
          <ToggleButton value={1}>Male</ToggleButton>
        </ToggleButtonGroup>
    </Form.Group>
  </Form.Row>


    <Form.Row>
      <Form.Group as={Col} controlId="chest" >
       <Form.Control type="number" placeholder="Chest Pain Type" onChange={this.handleChangeControl}/>
       </Form.Group>
       <Form.Group as={Col} controlId="BP">
       <Form.Control type="number" placeholder="Resting Blood Pressure" onChange={this.handleChangeControl}/>
       </Form.Group>
       <Form.Group as={Col} controlId="cholesterol">
       <Form.Control type="number" placeholder="Cholesterol" onChange={this.handleChangeControl}/>
       </Form.Group>
  </Form.Row>

    <Form.Row>
      

    <Form.Group as={Col} controlId="Bloodsugar">
          <Form.Label style={{...{fontFamily: 'Open Sans'},...{fontWeight: 'bold'}}}>Fasting Blood Sugar > 120</Form.Label>
          <Form.Control as="select" custom onChange={this.handleChangeControl}>
            <option>0</option>
            <option>1</option>
          </Form.Control>
        </Form.Group>


        <Form.Group as={Col} controlId="Thal">
          <Form.Label style={{...{fontFamily: 'Open Sans'},...{fontWeight: 'bold'}}}>Thal   </Form.Label>
          <Form.Control as="select" custom onChange={this.handleChangeControl}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Form.Control>
        </Form.Group>

        
        <Form.Group as={Col} controlId="Slope">
          <Form.Label style={{...{fontFamily: 'Open Sans'},...{fontWeight: 'bold'}}}>Slope of the peak exercise ST segment</Form.Label>
          <Form.Control as="select" custom onChange={this.handleChangeControl}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </Form.Control>
        </Form.Group>


        </Form.Row>

        <Form.Row>
        <Form.Group as={Col} controlId="Vessels">
          <Form.Label style={{...{fontFamily: 'Open Sans'},...{fontWeight: 'bold'}}}>Major vessels (0-3) flouroscopy</Form.Label>
          <Form.Control as="select" custom onChange={this.handleChangeControl}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>

        
        <Form.Group as={Col} controlId="Angina">
          <Form.Label style={{...{fontFamily: 'Open Sans'},...{fontWeight: 'bold'}}} >Exercise Induced Angina (1 = yes; 0 = no)</Form.Label>
          <Form.Control as="select" custom onChange={this.handleChangeControl}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>

       <Form.Group as={Col} controlId="Ec">
          <Form.Label style={{...{fontFamily: 'Open Sans'},...{fontWeight: 'bold'}}} >Resting electrocardiographic results</Form.Label>
          <Form.Control as="select" custom onChange={this.handleChangeControl}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </Form.Control>
        </Form.Group>
    </Form.Row>

    <Form.Row>
      
    <Form.Group as={Col} controlId="HR">
       <Form.Control type="number" placeholder="maximum heart rate achieved" onChange={this.handleChangeControl}/>
       </Form.Group>
    </Form.Row>
    <Button as="input" type="submit" value="Submit" onClick={this.fetchResults}/>
    </Form>
    {this.state.loaded&&(<div><h3>Result is:</h3>{this.state.receivedData?<b>No heart disease </b>:<b>Heart disease</b>}</div>)}
</div>
</div>
);
        }
    }