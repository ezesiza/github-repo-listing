import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
class RepoSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
    this.props.onChange(this.state.value);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    history.push('/');
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <Form.Group>
          <Form.Control
            size="lg"
            type="text"
            value={this.state.value}
            placeholder="Search by repository username, github by default"
            onChange={this.onChange.bind(this)}
          />
          <br />
        </Form.Group>
        <input type="submit" className="btn btn-info btn-block mt-4" />
      </Form>


    );
  }
}

RepoSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RepoSearch;
