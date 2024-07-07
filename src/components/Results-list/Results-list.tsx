import { Component } from 'react';
import { Item } from '../../interfaces/interfaces';
import ResultsItem from '../Results-item/Results-item';
import styles from './Results-list.module.css';

export default class ResultsList extends Component<{ data: Item[] }> {
  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.data.map((item: Item) => {
          return <ResultsItem item={item} key={item.url} />;
        })}
      </div>
    );
  }
}
