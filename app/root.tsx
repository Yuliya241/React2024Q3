import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Props } from './types/types';
import { ThemeProvider } from './context/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { LinksFunction, MetaFunction } from '@remix-run/node';
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import PageNotFound from './routes/$';
import { ErrorBoundaryFallback } from './components/ErrorBoundary/ErrorBoundary';

export const meta: MetaFunction = () => {
  return [{ title: 'Remix app | Star Wars' }];
};

export const links: LinksFunction = () => {
  return [{ rel: 'icon', href: '/favicon.ico', type: 'image/ico' }];
};

export function Layout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <PageNotFound />;
  }

  return <ErrorBoundaryFallback />;
}
