import React from "react";

const UsuarioForm = ({ usuario, loading, onChange, onSubmit, styles }) => {
  const fields = [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "contraseña", label: "Contraseña", type: "password", required: true },
    { name: "direccion", label: "Dirección", type: "text", required: false },
    { 
      name: "rol", 
      label: "Rol", 
      type: "select", 
      required: true,
      options: [
        { value: "CLIENTE", label: "Cliente" },
        { value: "ADMINISTRADOR", label: "Administrador" }
      ]
    }
  ];

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        {fields.map((field) => (
          <div key={field.name}>
            <label className={styles.label}>
              {field.label}:
            </label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={usuario[field.name] || ""}
                required={field.required}
                onChange={onChange}
                className={styles.input}
              >
                <option value="">Seleccionar rol</option>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={usuario[field.name] || ""}
                required={field.required}
                onChange={onChange}
                className={styles.input}
                placeholder={`Ingrese ${field.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={loading ? styles.submitButtonDisabled : styles.submitButton}
      >
        {loading ? "Creando..." : "Crear Usuario"}
      </button>
    </form>
  );
};

export default UsuarioForm;