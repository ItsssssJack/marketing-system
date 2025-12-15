import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-8">
      <Link to="/" className="hover:text-brand-black transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={item.url}>
          <ChevronRight size={16} className="text-gray-300" />
          {index === items.length - 1 ? (
            <span className="text-brand-black font-medium">{item.name}</span>
          ) : (
            <Link to={item.url} className="hover:text-brand-black transition-colors">
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
