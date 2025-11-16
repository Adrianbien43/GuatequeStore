import { useEffect, useRef } from "react";
import styles from "./Pompa.module.css";

export default function Pompa() {
  const numPompas = 5;
  const pompasRef = useRef([]);
  const contenedorRef = useRef(null);
  const posicionesRef = useRef([]);
  const rafRef = useRef();

  useEffect(() => {
    const cont = contenedorRef.current;
    if (!cont) return;

    const getSize = () => {
      return { w: cont.clientWidth, h: cont.clientHeight };
    };

    const { w, h } = getSize();

    // posiciones iniciales
    posicionesRef.current = Array(numPompas).fill(0).map(() => ({
      x: Math.random(),
      y: Math.random(),
      velX: (Math.random() * 0.01 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
      velY: (Math.random() * 0.01 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
    }));

    const mover = () => {
      const { w, h } = getSize();

      pompasRef.current.forEach((pompa, i) => {
        if (!pompa) return;

        const pos = posicionesRef.current[i];
        const pompaW = pompa.offsetWidth;
        const pompaH = pompa.offsetHeight;

        pos.x += pos.velX;
        pos.y += pos.velY;

        if (pos.x < 0) { pos.x = 0; pos.velX *= -1; }
        if (pos.x > 1) { pos.x = 1; pos.velX *= -1; }
        if (pos.y < 0) { pos.y = 0; pos.velY *= -1; }
        if (pos.y > 1) { pos.y = 1; pos.velY *= -1; }

        pompa.style.transform = `translate(${pos.x * (w - pompaW)}px, ${pos.y * (h - pompaH)}px)`;
      });

      rafRef.current = requestAnimationFrame(mover);
    };

    mover();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className={styles.contenedor} ref={contenedorRef}>
      {Array(numPompas).fill(0).map((_, i) => {
        const widthPercent = 8 + Math.random() * 18;
        return (
          <img
            key={i}
            ref={(el) => (pompasRef.current[i] = el)}
            src="../../src/assets/icons/ponpa.png"
            alt={`pompa-${i}`}
            className={styles.pompa}
            style={{ width: `${widthPercent}%`, height: "auto" }}
          />
        );
      })}
    </div>
  );
}
