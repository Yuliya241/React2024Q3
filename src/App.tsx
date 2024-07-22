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
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
