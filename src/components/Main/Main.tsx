import { ChangeEvent, Component, FormEvent } from 'react';
import SearchBar from '../Search-bar/Search-bar';
import ResultsList from '../Results-list/Results-list';
import { Api, LocalStorageKey } from '../../enums/enums';
import { SearchResultsState } from '../../types/types';
import Spinner from '../Spinner/Spinner';
import ErrorBoundaryButton from '../ErrorBoundaryButton/ErrorBoundaryButton';
import styles from './Main.module.css';

const localStorageKey = localStorage.getItem(LocalStorageKey.KEY);

export default class Main extends Component {
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
        `${Api.url}?search=${this.state.searchValue?.trim()}&page=1
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
      <main className={styles.main}>
        <ErrorBoundaryButton />
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
      </main>
    );
  }
}
