import React from 'react';
import useHorizontalScroll from '../../services/useHorizontalScroll';
import './PageContainer.css';

const PageContainer = ({ children, className = '' }) => {
  const scrollRef = useHorizontalScroll();

  return (
    <div className={`page-container ${className}`}>
      <div ref={scrollRef} className="page-horizontal-scroll">
        {React.Children.map(children, (child, index) => (
          <div key={index} className="page-section">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageContainer;