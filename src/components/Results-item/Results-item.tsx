import { Component } from 'react';
import { Item } from '../../interfaces/interfaces';
import styles from './Results-item.module.css';

export default class ResultsItem extends Component<{ item: Item }> {
  render() {
    const { item } = this.props;
    return (
      <ul className={styles.item}>
        {item.name}
        <li className={styles.item__property}>Birth year: {item.birth_year}</li>
        <li className={styles.item__property}>Height: {item.height}</li>
        <li className={styles.item__property}>Mass: {item.mass}</li>
        <li className={styles.item__property}>Hair color: {item.hair_color}</li>
      </ul>
    );
  }
}
