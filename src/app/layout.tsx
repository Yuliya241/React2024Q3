import './styles.module.css';
import './global.css';
import { Metadata } from 'next';
import ReduxProvider from '../redux/redux-provider';
import { ThemeProvider } from '../context/ThemeProvider';

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
        <ThemeProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
