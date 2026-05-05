import React, { useRef, useEffect, useState, useCallback } from "react";
import styles from "./Inicio.module.css";

export default function Inicio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused,    setIsPaused]    = useState(false);
  const resumeTimer = useRef(null);
  const intervalRef = useRef(null);

  const cards = [
    { id: 1, title: "Moda asiática en Canarias",   className: styles.card1, img: "co2.webp",
      text: "Nuestras fronteras no tienen límites. Presentamos una colección exclusiva de moda asiática para mujeres. Muy pronto estrenaremos también nuestra línea para caballeros." },
    { id: 2, title: "Ropa VIP para caballeros",    className: styles.card2, img: "co3.webp",
      text: "Complementos oscuros y elegantes diseñados para destacar en fiestas y eventos. Estilo con carácter, ideal para marcar presencia." },
    { id: 3, title: "Calzado personalizable",      className: styles.card3, img: "co1.webp",
      text: "El calzado es uno de los elementos más importantes para un caballero. Ahora puedes personalizar tus diseños para que encajen perfectamente con tu estilo." },
    { id: 4, title: "Sombreros Bip para damas",    className: styles.card4, img: "co4.webp",
      text: "Nuestra diseñadora Marta Morales presenta una colección de sombreros exclusivos, perfectos para combinar con nuestros vestidos más elegantes." },
    { id: 5, title: "Moda joven",                  className: styles.card5, img: "co5.webp",
      text: "Presentamos nuestra nueva sección juvenil con descuentos del 25%. Porque ustedes también merecen lucir increíbles cada día." },
    { id: 6, title: "Complementos para caballero", className: styles.card6, img: "co6.webp",
      text: "Descubre accesorios exclusivos para complementar tus trajes favoritos. Y si buscas algo único, también podrás diseñar tu propio accesorio totalmente personalizado." },
  ];

  const TOTAL    = cards.length;
  const AUTO_MS  = 3500;
  const PAUSE_MS = 6000;

  const startAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % TOTAL);
    }, AUTO_MS);
  }, [TOTAL]);

  useEffect(() => {
    if (!isPaused) startAutoPlay();
    else           clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, startAutoPlay]);

  useEffect(() => () => {
    clearTimeout(resumeTimer.current);
    clearInterval(intervalRef.current);
  }, []);

  const goTo = useCallback((index) => {
    setActiveIndex(index);
    setIsPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), PAUSE_MS);
  }, []);

  const touchX = useRef(null);
  const onTouchStart = e => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = e => {
    if (touchX.current === null) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50)
      goTo(diff > 0 ? (activeIndex + 1) % TOTAL : (activeIndex - 1 + TOTAL) % TOTAL);
    touchX.current = null;
  };

  return (
    <div className={styles.inicio}>
      <span className={styles.pre1}><h1>BIENVENIDOS</h1></span>
      <span className={styles.pre2}><h6>Viste bien todos los días</h6></span>

      <section className={styles.seccion1}>
        <div className={styles.contenedor_i_1}>
          <div className={styles.info_container_1}>
            <h2>Moda que Respira</h2>
            <p>Por unos mares más limpios y un planeta más sano.</p>
            <p>Guateque es una tienda de ropa comprometida con la sostenibilidad, creando prendas que respetan la naturaleza y realzan tu estilo con armonía.</p>
          </div>
        </div>
      </section>

      <div
        className={styles.carouselWrapper}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={`${styles.carouselAuto} ${isPaused ? styles.hidden : ""}`}
          aria-hidden={isPaused}
        >
          {[...cards, ...cards].map((card, i) => (
            <div key={`auto-${i}`} className={`${styles.autoSlide} ${card.className}`}>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <div className={styles.cardTitleWrap}>
                  <h3>{card.title}</h3>
                </div>
                <div className={styles.cardTextWrap}>
                  <p>{card.text}</p>
                </div>
                <div className={styles.cardBtnWrap}>
                  <button className={styles.cardBtn}>Ver más</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${styles.carouselManual} ${isPaused ? styles.visible : ""}`}
          aria-hidden={!isPaused}
        >
          <div className={`${styles.manualSlide} ${cards[activeIndex].className}`}>
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <div className={styles.cardTitleWrap}>
                <h3>{cards[activeIndex].title}</h3>
              </div>
              <div className={styles.cardTextWrap}>
                <p>{cards[activeIndex].text}</p>
              </div>
              <div className={styles.cardBtnWrap}>
                <button className={styles.cardBtn}>Ver más</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.navSection}>
        <div className={styles.navBar}>
          {cards.map((card, index) => (
            <button
              key={card.id}
              className={`${styles.navItem} ${activeIndex === index ? styles.navItemActive : ""}`}
              onClick={() => goTo(index)}
              title={card.title}
              aria-label={`Ir a ${card.title}`}
            >
              <div className={styles.navInner}>
                <div
                  className={styles.navThumb}
                  style={{ backgroundImage: `url('../../src/assets/${card.img}')` }}
                />
                <span className={styles.navDot} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <section className={styles.seccion2}>
        <div className={styles.container_seccion2}>
          <div className={styles.seccion2_info}>
            <h2>Vestido Dama</h2><h4>Ropa del momento</h4>
            <p>Guateque viste tus días de encanto y elegancia, con diseños que fluyen contigo y elevan tu presencia.</p>
            <p>Cada prenda está pensada para realzar tu figura con telas ligeras y patrones exclusivos que combinan lo clásico con lo contemporáneo.</p>
            <p>Porque vestirse bien es también una forma de cuidarte y expresar quién eres cada día.</p>
          </div>
          <div className={styles.card1_sec2}></div>
        </div>
        <div className={styles.container1_seccion2}>
          <div className={styles.seccion2_info}>
            <h2>Lorenzo Piedra</h2><h4>Diseñador estrella</h4>
            <p>Aquí presentamos los nuevos modelos para que luzcas como una reina.</p>
            <p>De la mano de Lorenzo Piedra, los mejores complementos para despedir el año y celebrar todo tipo de fiestas con un estilo inconfundible.</p>
            <p>Diseños que fusionan elegancia y atrevimiento, pensados para mujeres que no pasan desapercibidas.</p>
          </div>
          <div className={styles.card2_sec2}></div>
        </div>
      </section>

      <section className={styles.seccion2}>
        <div className={styles.container_seccion2}>
          <div className={styles.seccion2_info}>
            <h2>Traje Caballero</h2><h4>Ropa del momento</h4>
            <p>Descubre trajes que inspiran confianza. Viste tu éxito y destaca en cada ocasión.</p>
            <p>Confeccionados con tejidos de primera calidad, nuestros trajes combinan corte moderno y comodidad para que te sientas impecable de la mañana a la noche.</p>
            <p>Desde reuniones de negocios hasta celebraciones especiales, siempre tendrás el look perfecto.</p>
          </div>
          <div className={styles.card3_sec2}></div>
        </div>
        <div className={styles.container1_seccion2}>
          <div className={styles.seccion2_info}>
            <h2>Martín Jesús</h2><h4>Diseñador estrella</h4>
            <p>Los mejores trajes para sentirte bien y cómodo en fiestas y cenas.</p>
            <p>"Luce bien y cómodo", comenta nuestro diseñador Martín Jesús. Ropa capaz de conquistar corazones con cada detalle cuidado al milímetro.</p>
            <p>Una colección que demuestra que la elegancia masculina no está reñida con la comodidad.</p>
          </div>
          <div className={styles.card4_sec2}></div>
        </div>
      </section>
    </div>
  );
}