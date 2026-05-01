# GuatequeStore - IMPLEMENTACIÓN BACKEND REQUERIDA

## 🔴 PROBLEMAS ACTUALES

1. ❌ Error 403 al intentar eliminar cuenta
   - Frontend llama a: `PUT /api/usuarios/{id}/desactivar`
   - Necesita validar que el usuario solo puede desactivar su propia cuenta

2. ❌ Navegación por roles no funciona correctamente
   - ADMIN debe ver "Panel" en lugar de "Inicio"
   - CLIENTE debe ver "Inicio | Hombre | Mujer"

## ✅ ENDPOINTS CORRECTOS A IMPLEMENTAR

### 1. GET /api/usuarios/{id}
**Acceso**: Autenticado (el usuario puede obtener sus propios datos, admin obtiene cualquiera)

```java
@GetMapping("/{id}")
@PreAuthorize("@usuarioService.esPropio(#id) or hasRole('ADMIN')")
public UsuarioDTO getUsuario(@PathVariable Long id) {
    return usuarioService.obtenerPorId(id);
}
```

**Respuesta**:
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "rol": "CLIENTE",
  "activo": true,
  "fechaRegistro": "2026-05-01T10:00:00"
}
```

---

### 2. PUT /api/usuarios/{id}
**Acceso**: Autenticado (solo sus datos o admin)

```java
@PutMapping("/{id}")
@PreAuthorize("@usuarioService.esPropio(#id) or hasRole('ADMIN')")
public UsuarioDTO updateUsuario(
    @PathVariable Long id,
    @RequestBody UsuarioUpdateDTO updateDTO) {
    return usuarioService.actualizar(id, updateDTO);
}
```

**Cuerpo**:
```json
{
  "nombre": "Juan Pablo Pérez",
  "email": "juanpablo@email.com"
}
```

---

### 3. PUT /api/usuarios/{id}/desactivar ⭐ CRÍTICO
**Acceso**: Autenticado (solo puede desactivar su propia cuenta)

```java
@PutMapping("/{id}/desactivar")
@PreAuthorize("@usuarioService.esPropio(#id)")
public ResponseEntity<Void> desactivarCuenta(@PathVariable Long id) {
    usuarioService.desactivarCuenta(id);
    return ResponseEntity.noContent().build();  // 204
}
```

**Lógica en servicio**:
```java
public void desactivarCuenta(Long id) {
    Usuario usuario = usuarioRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
    usuario.setActivo(false);
    usuarioRepository.save(usuario);
}
```

**Validación importante**:
- Solo puede ser llamado por el usuario autenticado para su propia cuenta
- Usar `@PreAuthorize("@usuarioService.esPropio(#id)")` para validar
- Marca `activo = false` (SOFT DELETE)
- Responde con 204 No Content

---

### 4. GET /api/usuarios/{id}/pedidos
**Acceso**: Autenticado (solo sus pedidos o admin)

```java
@GetMapping("/{id}/pedidos")
@PreAuthorize("@usuarioService.esPropio(#id) or hasRole('ADMIN')")
public List<PedidoDTO> obtenerPedidosUsuario(@PathVariable Long id) {
    return pedidoService.obtenerPorUsuario(id);
}
```

---

### 5. POST /api/auth/login
**IMPORTANTE**: Debe devolver el campo `id` en la respuesta

```java
@PostMapping("/login")
public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
    // ... validación ...
    
    LoginResponse response = new LoginResponse();
    response.setToken(jwtToken);
    response.setId(usuario.getId());        // ← REQUERIDO
    response.setNombre(usuario.getNombre());
    response.setEmail(usuario.getEmail());
    response.setRol(usuario.getRol().name());
    
    return ResponseEntity.ok(response);
}
```

**Respuesta esperada**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "rol": "CLIENTE"
}
```

---

## 🔒 SEGURIDAD - BEAN PERSONALIZADO REQUERIDO

Para validar que un usuario solo puede acceder/modificar sus propios datos, crear este bean:

```java
// archivo: com/guatequestore/backend/security/UsuarioPermissionEvaluator.java

@Component("usuarioService")
@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public boolean esPropio(Long usuarioId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }
        
        // Si es admin, puede acceder a todo
        if (auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMINISTRADOR"))) {
            return true;
        }
        
        // Si es cliente, solo puede acceder a su propia cuenta
        String emailDelToken = auth.getName();
        Usuario usuario = usuarioRepository.findByEmail(emailDelToken);
        
        return usuario != null && usuario.getId().equals(usuarioId);
    }
}
```

---

## 📋 MODELO DE DATOS - CAMPOS REQUERIDOS

**Tabla: usuarios**
```sql
id              BIGINT PRIMARY KEY
nombre          VARCHAR(255) NOT NULL
email           VARCHAR(255) UNIQUE NOT NULL
password        VARCHAR(255) NOT NULL
rol             VARCHAR(20) NOT NULL -- 'CLIENTE' o 'ADMINISTRADOR'
activo          BOOLEAN DEFAULT true -- Para soft delete
fecha_registro  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

**Importante**: El campo `activo` es usado para soft delete, no eliminar registros.

---

## 🧪 TESTING - CURL COMMANDS

### Obtener usuario (debe ser autenticado)
```bash
curl -X GET http://localhost:8080/api/usuarios/1 \
  -H "Authorization: Bearer {token}"
```

### Actualizar usuario
```bash
curl -X PUT http://localhost:8080/api/usuarios/1 \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Nuevo Nombre", "email": "nuevo@email.com"}'
```

### Desactivar cuenta (CRITICAL TEST)
```bash
curl -X PUT http://localhost:8080/api/usuarios/1/desactivar \
  -H "Authorization: Bearer {token}"
```
**Respuesta esperada**: 204 No Content

### Obtener pedidos del usuario
```bash
curl -X GET http://localhost:8080/api/usuarios/1/pedidos \
  -H "Authorization: Bearer {token}"
```

---

## ❌ ERRORES ESPERADOS

| Situación | Respuesta |
|-----------|-----------|
| Usuario sin autenticar | 401 Unauthorized |
| Usuario intentando acceder datos de otro | 403 Forbidden |
| Usuario/endpoint no encontrado | 404 Not Found |
| Error en servidor | 500 Internal Server Error |

---

## ✅ CHECKLIST

- [ ] `PUT /api/usuarios/{id}` implementado
- [ ] `PUT /api/usuarios/{id}/desactivar` implementado
- [ ] `GET /api/usuarios/{id}/pedidos` implementado (o filtrar con GET /api/pedidos)
- [ ] `/api/auth/login` devuelve `id` en respuesta
- [ ] Bean `UsuarioService.esPropio()` implementado para seguridad
- [ ] Validaciones de rol funcionan
- [ ] Soft delete funciona (activo = false)
- [ ] Tests unitarios para nuevos endpoints
- [ ] CORs configurado (ya existe)

---

## 📞 PROBLEMAS COMUNES

### Error 403 al desactivar cuenta
- ✅ Verificar que `/api/usuarios/{id}/desactivar` esté mapeado como PUT
- ✅ Verificar que `@PreAuthorize("@usuarioService.esPropio(#id)")` esté presente
- ✅ Verificar que el usuario autenticado coincida con el `{id}` en la URL

### El usuario ve error "No tienes permisos"
- ✅ Probablemente el endpoint no tiene la anotación `@PreAuthorize` correcta
- ✅ Verificar que el JWT token es válido
- ✅ Revisar logs del servidor para ver el error exacto

### Falta el `id` en respuesta de login
- ✅ Agregar `response.setId(usuario.getId())` en LoginResponse
- ✅ Verificar que LoginResponse tiene getter/setter para `id`

