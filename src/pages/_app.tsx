import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '../context/ThemeProvider';
import { wrapper } from '../redux/store/store';
import Head from 'next/head';
import '../index.css';

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <Head>
            <title>Next app</title>
            <link rel="icon" href="favicon.ico" />
          </Head>
          <Component {...props.pageProps} />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
