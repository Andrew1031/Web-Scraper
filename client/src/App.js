import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "", value: "yassuo", URL: "http://localhost:9000/server/"};
    this.onSubmit = this.onSubmit.bind(this);
  }

  callAPI() {
    fetch("http://localhost:9000/server/" + this.state.value)
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res, value: this.state.value}));
  }

  componentWillMount() {
      this.callAPI();
  }

  //how does the backend route data? how does the frontend communicate with the backend 
  //how does the backend know what to do when you call /scrape/username? 
  onSubmit(event) {
    event.preventDefault();
    this.state.URL = "http://localhost:9000/server/" + this.state.value;
    console.log(this.state.URL);
    alert("Value was entered: " + this.state.value); 
    fetch("http://localhost:9000/server/" + this.state.value, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(data => console.log(data))
    .then(res => this.setState({ apiResponse: res, value: this.state.value, URL: this.state.URL}));
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
        <p className="App-intro"><a href={this.state.URL}>{this.state.value}</a></p>
        </div>
    );
  }
}

export default App;