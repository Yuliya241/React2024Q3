import { ChangeEvent, Component, FormEvent } from 'react';
import './App.css';
import SearchBar from './components/Search-bar/Search-bar';
import ResultsList from './components/Results-list/Results-list';
import { LocalStorageKey } from './enums/enums';
import { SearchResultsState } from './types/types';
import Spinner from './components/Spinner/Spinner';

const localStorageKey = localStorage.getItem(LocalStorageKey.KEY);

export default class App extends Component {
  state: SearchResultsState = {
    searchValue: localStorageKey ? localStorageKey : '',
    searchResults: [],
    error: null,
    isLoading: false,
  };

  private handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: event.target.value });
  };

  private handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    localStorage.setItem(LocalStorageKey.KEY, this.state.searchValue || '');
    this.getSearchResults();
  };

  private getSearchResults = async () => {
    try {
      this.setState({ isLoading: true });
      const results = await fetch(
        `https://swapi.dev/api/people/?search=${this.state.searchValue?.trim()}&page=1
        `,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await results.json();
      this.setState({ searchResults: data.results, isLoading: false });
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
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ResultsList data={this.state.searchResults} />
        )}
      </>
    );
  }
}
