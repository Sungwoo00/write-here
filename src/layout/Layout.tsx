import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <main className="flex-1 w-full max-w-screen-xl mx-auto">{children}</main>
      <Footer></Footer>
    </div>
  );
}
export default Layout;
