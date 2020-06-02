import React, { Component } from "react";
import { Table, Pagination } from "react-bootstrap";
import PropTypes from "prop-types";

class RepoList extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      reposData: [],
      pageSizeOptions: [5, 10, 15, 20],
      currentPage: 1,
      reposPerPage: 5,
      sorDir: true,
      totalPages: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  sortAscending (key)  {
    let sortedRepository = this.props.repos.sort((a, b) => a[key] - b[key]);
    this.setState({ reposData: sortedRepository });
    this.setState({
      reposData: sortedRepository
    });
  }

  sortDescending (key) {
    let sortedRepository = this.props.repos.sort((a, b) => (a[key] - b[key])).reverse();
    this.setState({
      reposData: sortedRepository
    });
  }

  onSort(key) {
    if (!this.state.sorDir) return this.sortAscending(key);
    else
      return this.sortDescending(key);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  changePageSize(e) {
    this.setState({
      reposPerPage: e.target.value,
      currentPage: 1
    });
  }

  render() {

    const { currentPage, reposPerPage } = this.state;
    const reposData = [...this.props.repos];
    const indexOfLastRepo = currentPage * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    const currentRepos = reposData.slice(indexOfFirstRepo, indexOfLastRepo);

    let repoData;
    if (Object.keys(currentRepos)) {
      repoData = currentRepos.map(repo => {
        return (
          <tr key={repo.id}>
            <td>{repo.id}</td>
            <td>{repo.name}</td>
            <td>{repo.owner.login}</td>
            <td>{repo.stargazers_count}</td>
            <td>{repo.created_at}</td>
          </tr>
        );
      });
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reposData.length / reposPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={String(number)} >
          <button key={number}
            id={String(number)} className={`btn mx-1
            ${number === this.state.currentPage
                ? "btn-primary" : "btn-secondary"}`}
            onClick={this.handleClick} >
            {number}
          </button>
        </li>
      );
    });

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th onClick={() => this.sortDescending("id")}>Id</th>
              <th onClick={() => this.sortDescending("name")}>Repo Title</th>
              <th onClick={() => this.sortDescending("owner.login")}>Owner</th>
              <th onClick={() => this.sortDescending("stargazers_count")}>Stars</th>
              <th onClick={() => this.sortDescending("created_at")}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {repoData}
          </tbody>
        </Table>
        <div className="form-inline justify-content-center">
          <select className="form-control"
            onChange={this.changePageSize}
            value={this.state.reposPerPage}>
            {this.state.pageSizeOptions.map(s =>
              <option value={s} key={s}>{s} per page</option>
            )}
          </select>
        </div>
        <Pagination>
          {renderPageNumbers}
        </Pagination>
      </div>
    );
  }
}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default RepoList;
