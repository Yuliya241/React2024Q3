import { ChangeEvent, Component, FormEvent } from 'react';
import './App.css';
import SearchBar from './components/Search-bar/Search-bar';
import ResultsList from './components/Results-list/Results-list';
import { LocalStorageKey } from './enums/enums';
import { SearchResultsState } from './types/types';

const localStorageKey = localStorage.getItem(LocalStorageKey.KEY);

export default class App extends Component {
  state: SearchResultsState = {
    searchValue: localStorageKey ? localStorageKey : '',
    searchResults: [],
    error: null,
  };

  private handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: event.target.value });
  };

  private handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.setState({ searchResults: this.getSearchResults() });
    localStorage.setItem(LocalStorageKey.KEY, this.state.searchValue || '');
  };

  private getSearchResults = async () => {
    try {
      const results = await fetch(
        `https://swapi.dev/api/people/?search=${this.state.searchValue?.trim()}&page=1
        `
      );
      const data = await results.json();
      this.setState({ searchResults: data.results });
    } catch (error) {
      this.setState({ error: error });
    }
  };

  public componentDidMount(): void {
    this.getSearchResults();
  }

  render() {
    return (
      <>
        <SearchBar
          handleChange={this.handleChange}
          searchTerm={this.state.searchValue || ''}
          handleSubmit={this.handleSubmit}
        />
        <ResultsList data={this.state.searchResults} />
      </>
    );
  }
}
