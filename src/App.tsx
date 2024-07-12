import { Component } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <RouterProvider router={router}></RouterProvider>
      </ErrorBoundary>
    );
  }
}
