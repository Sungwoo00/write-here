import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import NavigationBar from './NavigationBar';

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
      <main className="flex-1 flex flex-col">{children}</main>
      {isNotNavPage ? <Footer /> : <NavigationBar />}
    </div>
  );
}

export default Layout;
