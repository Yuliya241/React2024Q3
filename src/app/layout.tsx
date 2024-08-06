import './styles.module.css';
import './global.css';
import { Metadata } from 'next';
import ReduxProvider from '../redux/redux-provider';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '../context/ThemeProvider';
// import { Inter } from 'next/font/google';
// import { Suspense } from 'react';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next app',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
