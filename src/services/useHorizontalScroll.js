import { useRef, useEffect } from "react";

export default function useHorizontalScroll() {
  const contRef = useRef(null);
  const scrollTarget = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const cont = contRef.current;
    if (!cont) return;

    scrollTarget.current = cont.scrollLeft;

    const animate = () => {
      const maxScroll = cont.scrollWidth - cont.clientWidth;
      scrollTarget.current = Math.max(0, Math.min(scrollTarget.current, maxScroll));
      
      const diff = scrollTarget.current - cont.scrollLeft;
      
      if (Math.abs(diff) > 0.5) {
        cont.scrollLeft += diff * 0.3; // Suavizado rápido
        rafId.current = requestAnimationFrame(animate);
      } else {
        cont.scrollLeft = scrollTarget.current;
        rafId.current = null;
      }
    };

    const onWheel = (e) => {
      e.preventDefault();
      
      const maxScroll = cont.scrollWidth - cont.clientWidth;
      scrollTarget.current = Math.max(
        0,
        Math.min(scrollTarget.current + e.deltaY * 1.5, maxScroll)
      );

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      if (!rafId.current) {
        scrollTarget.current = cont.scrollLeft;
      }
    };

    cont.addEventListener("wheel", onWheel, { passive: false });
    cont.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cont.removeEventListener("wheel", onWheel);
      cont.removeEventListener("scroll", onScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return contRef;
}