import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import './App.css';
import { ThemeProvider } from './providers/ThemeProvider';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
