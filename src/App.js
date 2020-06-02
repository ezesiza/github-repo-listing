// @ts-nocheck
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header";
import RepoSearch from "./components/RepoSearch";
import RepoListView from "./components/RepoListView";
import { getRepoList } from "./request";


class App extends Component {

  constructor( prop ) {
    super( prop );
    this.state = {
      repos: [],
      usernameQuery: "",
      reposData: [],
    };
  }

  async componentDidMount () {
    this.setState( {
      usernameQuery: ( this.state.usernameQuery === "" ) ? "github" : this.state.usernameQuery
    } );
  }

  handleChange ( query ) {
    this.setState( { usernameQuery: query } );
  }

  async handleSubmit () {
    const reposData = await getRepoList( ( this.state.usernameQuery ).toString() );
    this.setState( { reposData: reposData } );
  }

  render () {
    return (
      <Router >
        <Header />
        <Container>
          <RepoSearch
            onChange={this.handleChange.bind( this )}
            onSubmit={this.handleSubmit.bind( this )}
            value={this.state.usernameQuery}
            path="/"
          />
          <Route exact path="/" render={( props ) =>
            <RepoListView {...props} userQuery={this.state.usernameQuery} repos={this.state.reposData} />} />
        </Container>
      </Router>
    );
  }
}

export default App;