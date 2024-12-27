import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from "@mui/icons-material"; // تغییر ایمپورت آیکون

const AotuBreadcrumbs = ({ extraItems = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const toReadableText = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    ...pathnames.map((name, index) => ({
      label: toReadableText(name),
      path: `/${pathnames.slice(0, index + 1).join('/')}`
    })),
    ...extraItems
  ];

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-10 font-inter">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 mx-1" />
          )}
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-blue-400 font-medium">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-gray-900 hover:underline transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default AotuBreadcrumbs;