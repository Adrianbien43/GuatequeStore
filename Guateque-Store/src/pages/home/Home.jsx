import React, { useEffect, useRef } from "react";
import './Home.css';
import Homeletter from '../../components/maincomponents/homeletters/Homeletter';

export default function Home() {
  const contenedorRef = useRef(null);

  useEffect(() => {
    const cont = contenedorRef.current;
    if (!cont) return;

    let speed = 0;

    const onWheel = (e) => {
      e.preventDefault();
      // POWER SCROLL HORIZONTAL
      speed += e.deltaY * 50; // Ajusta velocidad (mayor número = más rápido)
    };

    const animate = () => {
      cont.scrollLeft += speed;
      speed *= 0.9; // fricción
      requestAnimationFrame(animate);
    };

    animate();

    cont.addEventListener("wheel", onWheel, { passive: false });

    return () => cont.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="home-container">
      <div ref={contenedorRef} className="horizontal-scroll">
        <section className="section section1"><Homeletter></Homeletter></section>
        <div style={{position: 'relative', height: '300px'}}>

</div>
        <section className="section section2">Pantalla 2</section>
        <section className="section section3">Pantalla 3</section>

      </div>
    
    </div>
  );
}
