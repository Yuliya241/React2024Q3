import { Component } from 'react';
import { SearchProps } from '../../types/types';

export default class SearchBar extends Component<SearchProps> {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label htmlFor="name">Search by name</label>
        <input
          type="text"
          id="name"
          placeholder="Search..."
          value={this.props.searchTerm}
          onChange={this.props.handleChange}
        />
        <button>Search</button>
      </form>
    );
  }
}
