// Valida exclusivamente el formulario de registro (alineado con backend)
export const validateRegistro = ({nombre, email, password, confirm}) => {
    const errors = {};

    // Validar nombre: 2-100 caracteres (como backend)
    const nombreTrimmed = nombre?.trim() || "";
    if (!nombreTrimmed) {
        errors.nombre = "El nombre es obligatorio";
    } else if (nombreTrimmed.length < 2) {
        errors.nombre = "El nombre debe tener al menos 2 caracteres";
    } else if (nombreTrimmed.length > 100) {
        errors.nombre = "El nombre no puede exceder 100 caracteres";
    }

    // Validar email: formato válido (como backend)
    if (!email?.trim()) {
        errors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Por favor ingresa un email válido (ej: usuario@ejemplo.com)";
    }

    // Validar contraseña: mínimo 8 caracteres (como backend)
    if (!password) {
        errors.password = "La contraseña es obligatoria";
    } else if (password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    // Validar confirmación de contraseña
    if (!confirm) {
        errors.confirm = "Debes confirmar tu contraseña";
    } else if (password !== confirm) {
        errors.confirm = "Las contraseñas no coinciden";
    }

    return errors;
};

// Validaciones adicionales para mejor UX (warnings, no errors)
export const getRegistroWarnings = ({nombre, email, password}) => {
    const warnings = {};

    // Advertencia si email parece spam/temporal
    if (email && (
        email.includes("+") && 
        !email.includes("@gmail") && 
        !email.includes("@outlook")
    )) {
        warnings.email = "Asegúrate de usar un email que puedas recuperar";
    }

    // Advertencia si contraseña es débil (solo letras o solo números)
    if (password && (
        /^[a-zA-Z]+$/.test(password) || 
        /^\d+$/.test(password)
    )) {
        warnings.password = "Incluye números y letras para mayor seguridad";
    }

    return warnings;
};

// Obtener sugerencias/requisitos para cada campo
export const getFieldRequirements = (field) => {
    const requirements = {
        nombre: "Entre 2 y 100 caracteres. Usa tu nombre real para mejor experiencia.",
        email: "Usa un email válido que puedas acceder. Lo usarás para iniciar sesión.",
        password: "Mínimo 8 caracteres. Combina letras y números para mayor seguridad.",
        confirm: "Repite exactamente la misma contraseña que escribiste arriba."
    };
    return requirements[field] || "";
};