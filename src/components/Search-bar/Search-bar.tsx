import { Component } from 'react';
import { SearchProps } from '../../types/types';
import styles from './Search-bar.module.css';

export default class SearchBar extends Component<SearchProps> {
  public render() {
    return (
      <form className={styles.form} onSubmit={this.props.handleSubmit}>
        <h1 className={styles.form__title}>Search by name</h1>
        <div className={styles.form__wrapper}>
          <label htmlFor="name"></label>
          <input
            className={styles.form__input}
            type="text"
            id="name"
            placeholder="Search..."
            value={this.props.searchTerm}
            onChange={this.props.handleChange}
          />
          <button className={styles.form__button}>Search</button>
        </div>
      </form>
    );
  }
}
