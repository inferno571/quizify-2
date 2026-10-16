import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quizify 3 — AI Quiz Generator | Made by Saksham Sooden',
  description: 'Quizify 3 — AI-powered quiz generator created by Saksham Sooden. Upload study material to generate custom quizzes or upload existing question papers to practice instantly.',
};


import { NgrokHeaderInterceptor } from '../components/NgrokHeaderInterceptor';
import { ThemeProvider } from '../components/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2c3e50" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23f97316'/><circle cx='50' cy='50' r='20' fill='none' stroke='white' stroke-width='8'/></svg>" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('quizify_theme');
                  var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  var valid = ['light', 'dark', 'midnight', 'emerald', 'cyberpunk', 'larp', 'itsover'];
                  if (valid.indexOf(theme) === -1) theme = 'light';
                  var isDark = ['dark', 'midnight', 'emerald', 'cyberpunk', 'larp'].indexOf(theme) !== -1;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col font-sans bg-white dark:bg-black text-[#2c3e50] dark:text-white transition-colors duration-200`}>
        <ThemeProvider>
          <NgrokHeaderInterceptor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
