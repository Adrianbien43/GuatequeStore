import React from 'react';
import './SplineScene.css';
import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <div className="overlay-dark">
      <Spline scene="https://prod.spline.design/nwLNaU8BKbBlmydh/scene.splinecode" />
    </div>
  );
}

