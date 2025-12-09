import React from "react";

const CustomerForm = ({ customer, loading, onChange, onSubmit, styles }) => {
  const fields = [
    { name: "nombre", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "password", type: "password", required: true },
    { name: "direccion", type: "text", required: false },
  ];

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        {fields.map((f) => (
          <div key={f.name}>
            <label className={styles.label}>
              {f.name.charAt(0).toUpperCase() + f.name.slice(1)}:
            </label>
            <input
              type={f.type}
              name={f.name}
              value={customer[f.name]}
              required={f.required}
              onChange={onChange}
              className={styles.input}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={loading ? styles.submitButtonDisabled : styles.submitButton}
      >
        {loading ? "Creando..." : "Crear Cliente"}
      </button>
    </form>
  );
};

export default CustomerForm;
