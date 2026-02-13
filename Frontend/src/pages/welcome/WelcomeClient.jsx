import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function WelcomeClient() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Bienvenido {user?.nombre || "Cliente"} 🎉</h2>
      <p>Explora nuestras ofertas exclusivas y novedades de tu tienda favorita.</p>
    </div>
  );
}
