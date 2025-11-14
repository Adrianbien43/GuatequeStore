import { useEffect, useRef } from "react";
import styles from "./Pompa.module.css";

export default function Pompa() {
  const numPompas = 5;
  const pompasRef = useRef([]);
  const contenedorRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const cont = contenedorRef.current;
    sizeRef.current = {
      w: cont.clientWidth,
      h: cont.clientHeight
    };

    // Observa cambios del tamaño
    const resizeObs = new ResizeObserver(() => {
      sizeRef.current = {
        w: cont.clientWidth,
        h: cont.clientHeight
      };
    });

    resizeObs.observe(cont);

    const posiciones = Array(numPompas)
      .fill(0)
      .map(() => ({
        x: Math.random(),
        y: Math.random(),
        velX: (Math.random() * 0.01 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
        velY: (Math.random() * 0.01 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
      }));

    const mover = () => {
      const { w, h } = sizeRef.current;

      pompasRef.current.forEach((pompa, i) => {
        if (!pompa) return;

        const pompaW = pompa.clientWidth;
        const pompaH = pompa.clientHeight;

        posiciones[i].x += posiciones[i].velX;
        posiciones[i].y += posiciones[i].velY;

        if (posiciones[i].x < 0 || posiciones[i].x > 1) posiciones[i].velX *= -1;
        if (posiciones[i].y < 0 || posiciones[i].y > 1) posiciones[i].velY *= -1;

        // Convertir a px correctamente sin saltos
        const pxX = posiciones[i].x * (w - pompaW);
        const pxY = posiciones[i].y * (h - pompaH);

        pompa.style.transform = `translate(${pxX}px, ${pxY}px)`;
      });

      requestAnimationFrame(mover);
    };

    mover();

    return () => resizeObs.disconnect();
  }, []);

  return (
    <div className={styles.contenedor} ref={contenedorRef}>
      {Array(numPompas)
        .fill(0)
        .map((_, i) => {
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
