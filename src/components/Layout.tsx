import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { path: '/', label: 'О проекте', icon: '🏠' },
  { path: '/discovery', label: 'Discovery', icon: '🔍' },
  { path: '/define', label: 'Define', icon: '🎯' },
  { path: '/develop', label: 'Develop', icon: '💡' },
  { path: '/deliver', label: 'Deliver', icon: '🚀' },
  { path: '/video-feature', label: 'Генерация видео', icon: '🎬' },
  { path: '/segmentation', label: 'Сегментация', icon: '👥' },
  { path: '/market-research', label: 'Исследование рынка', icon: '📊' },
  { path: '/hypothesis-task', label: 'Задача для команды', icon: '📋' },
];

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Закрыть мобильное меню при смене маршрута
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Scroll to top при смене страницы
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar для десктопа */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white shadow-lg">
          <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
            <h1 className="text-white text-lg font-bold">Jay Copilot Analysis</h1>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Мобильное меню */}
      <div className="lg:hidden">
        <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <h1 className="text-gray-900 text-lg font-bold">Jay Copilot Analysis</h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed inset-x-0 top-16 z-40 bg-white shadow-lg border-t"
            >
              <nav className="px-4 py-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Основной контент */}
      <main className="flex-1 lg:ml-64">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 right-0 p-4 text-sm text-gray-500 bg-white/80 backdrop-blur-sm rounded-tl-lg shadow-lg lg:ml-64">
        Автор: <a href="https://www.linkedin.com/in/shukhrat-nurmanov" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Шухрат Нурманов</a>
      </footer>
    </div>
  );
} 