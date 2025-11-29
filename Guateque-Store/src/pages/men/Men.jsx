import React from 'react';
import PageContainer from '../modelpage/PageContainer';
import MenProducts from '../../components/maincomponents/menproducts/MenProducts';

const Men = () => {
  return (
    <PageContainer>
      <section className="men-section">
        <MenProducts />
      </section>
    </PageContainer>
  );
};

export default Men;
