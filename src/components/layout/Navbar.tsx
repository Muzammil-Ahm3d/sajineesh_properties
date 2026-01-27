import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[999] transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container-wide px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/src/assets/logo.png"
              alt="Sajineesh Construction"
              className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-110"
            />
            <div className="flex flex-col max-w-[200px] sm:max-w-none">
              <span className={cn(
                "font-bold text-sm md:text-lg leading-tight uppercase tracking-tight truncate",
                isScrolled ? "text-primary" : "text-white"
              )}>
                Sajineesh
              </span>
              <span className={cn(
                "font-medium text-xs md:text-sm tracking-wide truncate",
                isScrolled ? "text-foreground" : "text-white/90"
              )}>
                Construction Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative font-medium transition-colors duration-300',
                  location.pathname === link.path
                    ? isScrolled ? 'text-primary' : 'text-white'
                    : isScrolled ? 'text-foreground/70 hover:text-primary' : 'text-white/80 hover:text-white',
                  'after:absolute after:left-0 after:bottom-[-4px] after:h-0.5 after:transition-all after:duration-300',
                  location.pathname === link.path
                    ? isScrolled ? 'after:w-full after:bg-primary' : 'after:w-full after:bg-white'
                    : 'after:w-0 after:bg-current hover:after:w-full'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className={cn(
                'px-6 py-2.5 rounded-lg font-semibold transition-all duration-300',
                isScrolled
                  ? 'bg-primary text-white hover:bg-green-medium'
                  : 'bg-white text-green-dark hover:bg-white/90'
              )}
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors flex-shrink-0',
              isScrolled ? 'text-foreground hover:bg-black/5' : 'text-white hover:bg-white/10',
              'bg-white/5 backdrop-blur-sm border border-white/10'
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-96 mt-4' : 'max-h-0'
          )}
        >
          <div className="bg-white rounded-xl shadow-lg p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'block px-4 py-3 rounded-lg font-medium transition-colors',
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block px-4 py-3 bg-primary text-white text-center rounded-lg font-semibold mt-4"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
