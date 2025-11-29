import React from "react";
import './Home.css';
import Homeletter from '../../components/maincomponents/homeletters/Homeletter';
import SplineScene from "../../components/backgraund3D/SplineScene";
import useHorizontalScroll from "../../services/useHorizontalScroll";

export default function Home() {
  const scrollRef = useHorizontalScroll();

  return (
    <div className="home-container">
      <SplineScene />
      <div ref={scrollRef} className="horizontal-scroll">
        <section className="section section1"><Homeletter /></section>
        <div className="spacer" aria-hidden="true"></div>
        <section className="section section2">Pantalla 2</section>
        <section className="section section3">Pantalla 3</section>
      </div>
    </div>
  );
}