import React from 'react';
import useHorizontalScroll from '../../services/useHorizontalScroll';
import './PageContainer.css';

const PageContainer = ({ children, className = '' }) => {
  const scrollRef = useHorizontalScroll();

  return (
    <div className={`page-container ${className}`}>
      <div ref={scrollRef} className="page-horizontal-scroll">
        {React.Children.map(children, (child, index) => {
          const childClass = React.isValidElement(child)
            ? child.props.className || ''
            : '';

          const isScrollable =
            React.isValidElement(child) &&
            (child.props['data-scrollable'] === true ||
              child.props['data-scrollable'] === 'true');

          const wrapperClass = [
            'page-section',
            childClass,
            isScrollable ? 'scrollable-content' : ''
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={index} className={wrapperClass}>
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PageContainer;
