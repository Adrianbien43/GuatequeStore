import React from 'react';
import PageContainer from '../modelpage/PageContainer';
import WomenProducts from '../../components/maincomponents/womenproducts/WomenProducts';

const Women = () => {
  return (
    <PageContainer>
      <section className="women-section">
        <WomenProducts />
      </section>
    </PageContainer>
  );
};

export default Women;