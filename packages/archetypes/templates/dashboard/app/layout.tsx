import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ToastProvider } from '@venator-ui/ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Built with Venator',
  icons: {
    icon: 'https://www.venatorui.com/venator-logo-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              const stored = localStorage.getItem('venator-theme');
              const theme = stored || 'dark';
              const isDark = theme === 'dark';
              document.documentElement.classList.toggle('dark', isDark);
              document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
