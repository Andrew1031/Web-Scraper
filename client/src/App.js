import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "", value: "123"};
    this.onSubmit = this.onSubmit.bind(this);
  }

  callAPI() {
    fetch("http://localhost:9000/server")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res, value: this.state.value}));
  }

  componentWillMount() {
      this.callAPI();
  }

  onSubmit(event) {
    alert("Value was entered: " + this.state.value); 
    
    fetch("http://localhost:9000/server", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: this.state.value
      })
      
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }
  
  
  myChangeHandler = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">OP.GG webscraper</h1>
          <form id="submit_job" onSubmit={this.onSubmit}>
            <label>
              Search: {" "}
              <input id="searchVal" type="text" value={this.state.value} name="searchValue" onChange={this.myChangeHandler}/>
              <br></br>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </header>
        <p className="App-intro">{this.state.apiResponse}</p>
        </div>
    );
  }
}

export default App;