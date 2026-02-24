// Valida exclusivamente el formulario de registro
export const validateRegistro = ({nombre, email, password, confirm}) => {
    const errors = {};

    if (!nombre?.trim())
        errors.nombre = "El nombre es obligatorio";

    if (!/\S+@\S+\.\S+/.test(email || ""))
        errors.email = "Email inválido";

    if ((password || "").length < 6)
        errors.password = "La contraseña debe tener al menos 6 caracteres";

    if (password !== confirm)
        errors.confirm = "Las contraseñas no coinciden";

    return errors;
}