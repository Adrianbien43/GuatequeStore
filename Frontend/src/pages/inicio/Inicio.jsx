import React from "react";
import styles from "./Inicio.module.css";

/**
 * Adrián Bienvenido Morales Perdomo.
 * 
 * Esta sera la primera vista para los usarios
 */
export default function Inicio() {
  return (
    <div className={styles.inicio}>
      <span className={styles.pre1}><h1>BIENVENIDOS</h1></span>
      <span className={styles.pre2}><h6>Viste bien todos los días</h6></span>

      <section className={styles.seccion1}>
        <div className={styles.contenedor_i_1}>
          <div className={styles.info_container_1}>
            <h2>Moda que Respira</h2>
            <p>
              Por unos mares más limpios y un planeta más sano.
            </p>
            <p>
              Guateque es una tienda de ropa comprometida con la sostenibilidad,
              creando prendas que respetan la naturaleza y realzan tu estilo con armonía.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.carousel}>

        <div className={styles.group}>

          <div className={`${styles.card} ${styles.card1}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Moda asiática en Canarias</h3>
              <p>
                Nuestras fronteras no tienen límites. Presentamos una colección exclusiva de moda asiática para mujeres.
                Muy pronto estrenaremos también nuestra línea para caballeros.
              </p>
              <button>Ver más</button>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card2}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Ropa VIP para caballeros</h3>
              <p>
                Complementos oscuros y elegantes diseñados para destacar en fiestas y eventos. Estilo con carácter,
                ideal para marcar presencia.
              </p>
              <button>Ver más</button>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card3}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Calzado personalizable</h3>
              <p>
                El calzado es uno de los elementos más importantes para un caballero. Ahora puedes personalizar tus
                diseños para que encajen perfectamente con tu estilo.
              </p>
              <button>Ver más</button>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card4}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Sombreros Bip para damas</h3>
              <p>
                Nuestra diseñadora Marta Morales presenta una colección de sombreros exclusivos, perfectos para combinar
                con nuestros vestidos más elegantes.
              </p>
              <button>Ver más</button>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card5}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Moda joven</h3>
              <p>
                Presentamos nuestra nueva sección juvenil con descuentos del 25%. Porque ustedes también merecen lucir
                increíbles cada día.
              </p>
              <button>Ver más</button>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card6}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Complementos para caballero</h3>
              <p>
                Descubre accesorios exclusivos para complementar tus trajes favoritos. Y si buscas algo único,
                también podrás diseñar tu propio accesorio totalmente personalizado.
              </p>
              <button>Ver más</button>
            </div>
          </div>

        </div>

        {/* Segundo grupo para el loop del carrusel */}
        <div aria-hidden className={styles.group}>

          <div className={`${styles.card} ${styles.card1}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Moda asiática en Canarias</h3>
              <p>
                Nuestras fronteras no tienen límites. Presentamos una colección exclusiva de moda asiática para mujeres.
                Muy pronto estrenaremos también nuestra línea para caballeros.
              </p>
              <button>Ver más</button>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card2}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Ropa VIP para caballeros</h3>
              <p>
                Complementos oscuros y elegantes diseñados para destacar en fiestas y eventos. Estilo con carácter,
                ideal para marcar presencia.
              </p>
              <button>Ver más</button>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card3}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Calzado personalizable</h3>
              <p>
                El calzado es uno de los elementos más importantes para un caballero. Ahora puedes personalizar tus
                diseños para que encajen perfectamente con tu estilo.
              </p>
              <button>Ver más</button>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card4}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Sombreros Bip para damas</h3>
              <p>
                Nuestra diseñadora Marta Morales presenta una colección de sombreros exclusivos, perfectos para combinar
                con nuestros vestidos más elegantes.
              </p>
              <button>Ver más</button>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card5}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Moda joven</h3>
              <p>
                Presentamos nuestra nueva sección juvenil con descuentos del 25%. Porque ustedes también merecen lucir
                increíbles cada día.
              </p>
              <button>Ver más</button>
            </div>
          </div>

          <div className={`${styles.card} ${styles.card6}`}>
            <div className={`${styles.card_Info} ${styles.card1_Info}`}>
              <h3>Complementos para caballero</h3>
              <p>
                Descubre accesorios exclusivos para complementar tus trajes favoritos. Y si buscas algo único
                también podrás diseñar tu propio accesorio totalmente personalizado.
              </p>
              <button>Ver más</button>
            </div>
          </div>

        </div>
      </div>

      <section className={styles.seccion2}>
        <div className={styles.container_seccion2}>
          <div className={styles.seccion2_info}>
            <h2>Vestido Dama</h2>
            <h4>Ropa del momento</h4>
            <p>
              Guateque viste tus días de encanto y elegancia,
              con vestidos que susurran estilo y celebran tu esencia.
            </p>
          </div>
          <div className={styles.card1_sec2}></div>
        </div>
        <div className={styles.container1_seccion2}>
          <div className={styles.seccion2_info}>
            <h2>Lorenzo Piedra</h2>
            <h4>Diseñador estrella</h4>
            <p>Aquí presentamos los nuevos modelos para que luzcas como una reina.</p>
            <p>De la mano de Lorenzo Piedra, los mejores complementos para despedir el año y celebrar todo tipo de fiestas.</p>
          </div>
          <div className={styles.card2_sec2}></div>
        </div>
      </section>


      <section className={styles.seccion2}>
        <div className={styles.container_seccion2}>
          <div className={styles.seccion2_info}>
            <h2>Traje Caballero</h2>
            <h4>Ropa del momento</h4>
            <p>
              Descubre trajes que inspiran confianza.
              Viste tu éxito y destaca en cada ocasión.
              Porque la elegancia también se siente.
            </p>
          </div>
          <div className={styles.card3_sec2}></div>
        </div>
        <div className={styles.container1_seccion2}>
          <div className={styles.seccion2_info}>
            <h2>Martín Jesús</h2>
            <h4>Diseñador estrella</h4>
            <p>Los mejores trajes para sentirte bien y cómodo en fiestas y cenas.</p>
            <p>“Luce bien y cómodo”, comenta nuestro diseñador Martín Jesús. Ropa capaz de conquistar corazones.</p>
          </div>
          <div className={styles.card4_sec2}></div>
        </div>
      </section>

    </div>
  );
}
