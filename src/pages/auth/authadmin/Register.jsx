import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import FormularioRegister from "../../../components/public/adminpubliclogin/FormularioRegister";

export default function Register() {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (username, password) => {
    setLoading(true);
    setMessage("");
    
    const result = register(username, password);
    
    setMessage(result.message);
    setLoading(false);
  };

  return (
    <div>
      <h2>Registro de Administrador</h2>
      
      {message && (
        <div>
          {message}
        </div>
      )}
      
      <FormularioRegister onSubmit={handleRegister} loading={loading} />
    </div>
  );
}