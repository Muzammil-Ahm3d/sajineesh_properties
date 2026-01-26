import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-green-dark text-white">
      <div className="container-wide section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Building2 className="w-7 h-7 text-green-dark" />
              </div>
              <div>
                <p className="font-bold text-lg">Sajineesh Bikkina</p>
                <p className="text-sm text-white/70">Construction Pvt. Ltd.</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              A-Class Government Contractor with 13+ years of experience in delivering 
              critical infrastructure across Odisha and beyond.
            </p>
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-2xl font-bold text-white">₹100+ Cr</span>
              <span className="text-sm">Projects Executed</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'Projects', path: '/projects' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Bridge Construction',
                'Road Infrastructure',
                'Building Construction',
                'Irrigation Works',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-white/70 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  Tata Ariana, Kalinganagar, Tower-9,<br />
                  Bhubaneswar – 751029, Odisha
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/70" />
                <span className="text-white/80 text-sm">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/70" />
                <span className="text-white/80 text-sm">info@sbconstruction.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Sajineesh Bikkina Construction Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            A-Class Licensed Government Contractor
          </p>
        </div>
      </div>
    </footer>
  );
};
