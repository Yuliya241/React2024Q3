import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import './App.css';
import { ThemeProvider } from './context/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
