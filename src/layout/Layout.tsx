import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import NavigationBar from './NavigationBar';
import { tm } from '@/utils/tw-merge';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isNotNavPage = ['/sign-up', '/sign-in', '/good-bye', '/'].includes(
    location.pathname
  );
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className={tm(
          'flex-1 flex flex-col py-16 lg:pb-0',
          isNotNavPage ? 'bg-[var(--light-beige)]' : ''
        )}
      >
        {children}
        {!isNotNavPage && <NavigationBar />}
      </main>
      {isNotNavPage && <Footer />}
    </div>
  );
}

export default Layout;
