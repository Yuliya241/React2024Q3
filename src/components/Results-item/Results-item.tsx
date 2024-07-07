import { Component } from 'react';
import { Item } from '../../interfaces/interfaces';
import styles from './Results-item.module.css';

export default class ResultsItem extends Component<{ item: Item }> {
  public render() {
    const { item } = this.props;
    return (
      <div className={styles.item}>
        {item.name}
        <p className={styles.item__property}>Birth year: {item.birth_year}</p>
        <p className={styles.item__property}>Height: {item.height}</p>
        <p className={styles.item__property}>Mass: {item.mass}</p>
        <p className={styles.item__property}>Hair color: {item.hair_color}</p>
      </div>
    );
  }
}
