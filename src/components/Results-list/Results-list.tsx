import { Component } from 'react';
import { Item } from '../../interfaces/interfaces';
import ResultsItem from '../Results-item/Results-item';
import styles from './Results-list.module.css';

export default class ResultsList extends Component<{ data: Item[] }> {
  public render() {
    return (
      <>
        {this.props.data.length ? (
          <div className={styles.wrapper}>
            {this.props.data.map((item: Item) => (
              <ResultsItem item={item} key={item.url} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Nothing Found...</p>
        )}
      </>
    );
  }
}
