import React from "react";
import './Men.css';
import MenProducts from '../../components/maincomponents/menproducts/MenProducts';
import useHorizontalScroll from "../../services/useHorizontalScroll";

const Men = () => {
  const scrollRef = useHorizontalScroll();

  return (
    <div className="men-container">
      <div ref={scrollRef} className="horizontal-scroll">
        <section className="section products-section">
          <div className="section-content">
            <MenProducts />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Men;