# Desarrollo Seguro en React — Mejores Prácticas

## Regla Principal
Todo código generado debe seguir principios de seguridad por defecto. Nunca sacrificar seguridad por conveniencia.

---

## XSS (Cross-Site Scripting)

### Prohibido
- **Nunca** usar `dangerouslySetInnerHTML` salvo que el contenido haya sido sanitizado con una librería como DOMPurify.
- **Nunca** interpolar datos del usuario directamente en atributos `href`, `src`, o event handlers.
- **Nunca** construir HTML como strings para inyectar en el DOM.

### Obligatorio
- Confiar en el escape automático de JSX para renderizar texto dinámico.
- Si se requiere HTML dinámico, sanitizar con DOMPurify antes de renderizar:
  ```typescript
  import DOMPurify from "dompurify";
  
  const safeHTML = DOMPurify.sanitize(untrustedHTML);
  <div dangerouslySetInnerHTML={{ __html: safeHTML }} />;
  ```
- Validar URLs antes de asignarlas a `href` o `src`:
  ```typescript
  const isSafeUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return ["http:", "https:", "mailto:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  };
  ```

---

## Validación de Entrada

### En formularios (cliente)
- **Siempre** validar con Zod antes de enviar datos al servidor.
- Aplicar `.trim()` a strings para evitar espacios maliciosos.
- Limitar longitud máxima con `.max()` en todos los campos de texto.
- Sanitizar caracteres especiales en campos que no los requieran.

### Principio fundamental
- La validación del cliente es para UX; la del servidor es para seguridad.
- Nunca confiar en datos que vienen del cliente, incluso si fueron validados en frontend.

---

## Autenticación y Tokens

### Almacenamiento
- **Nunca** guardar tokens JWT en `localStorage` (vulnerable a XSS).
- Preferir `httpOnly` cookies manejadas por el backend.
- Si se usa Redux Persist para tokens, asegurar que el storage esté protegido y los tokens tengan expiración corta.

### Manejo de sesión
- Implementar refresh token rotation.
- Limpiar estado de autenticación al detectar token expirado (401).
- Redirigir a login al perder sesión, sin exponer información del estado previo.

### Headers
- Incluir token en headers via RTK Query `baseApi` con `prepareHeaders`, nunca manualmente en cada request.
- No loguear tokens en consola ni en errores.

---

## Autorización (Frontend)

### Principios
- El frontend **oculta** UI según permisos, pero **nunca** es la única barrera.
- Usar el hook `useHasPermission` para condicionar renderizado de acciones.
- Proteger rutas con `ProtectedRoute` verificando permisos antes de montar componentes.

### Errores comunes a evitar
- No confiar en ocultar un botón como mecanismo de seguridad — el endpoint debe validar permisos.
- No exponer IDs de recursos en URLs sin verificar acceso en el servidor.

---

## Comunicación con APIs

### HTTPS
- Todas las llamadas a API deben ser sobre HTTPS. Rechazar HTTP en producción.

### CORS
- No configurar `Access-Control-Allow-Origin: *` en producción.

### Datos sensibles
- No enviar datos sensibles como query params (quedan en logs del servidor y historial del navegador).
- Usar POST/PUT con body para datos confidenciales.

### Rate limiting
- Implementar debounce en búsquedas y acciones repetitivas para evitar abuso.
- Manejar respuestas 429 (Too Many Requests) con feedback al usuario.

---

## Manejo de Errores

### Prohibido
- **Nunca** mostrar stack traces, mensajes de error internos del servidor, o detalles técnicos al usuario final.
- **Nunca** loguear datos sensibles (passwords, tokens, PII) en `console.log`.

### Obligatorio
- Mostrar mensajes genéricos y amigables al usuario.
- Loguear errores técnicos solo en entornos de desarrollo.
- Usar Error Boundaries para capturar errores de renderizado sin crashear toda la app.
  ```typescript
  // Mensaje al usuario
  showError("Ocurrió un error. Intenta de nuevo.");
  
  // Log solo en desarrollo
  if (import.meta.env.DEV) {
    console.error("API Error:", error);
  }
  ```

---

## Dependencias y Supply Chain

### Reglas
- Usar versiones exactas en `package.json` (sin `^` ni `~` para dependencias críticas de seguridad).
- Ejecutar `npm audit` periódicamente y resolver vulnerabilidades críticas/altas.
- No instalar paquetes con nombres sospechosos o sin mantenimiento activo (último commit > 1 año).
- Preferir paquetes con tipado TypeScript nativo sobre `@types/` de terceros cuando sea posible.

---

## Variables de Entorno

### Reglas
- **Nunca** commitear `.env` con secretos al repositorio.
- Solo exponer variables con prefijo `VITE_` que sean seguras para el cliente.
- No incluir API keys privadas, secrets de OAuth, o credenciales de BD en variables `VITE_`.
- Documentar qué variables son requeridas en `.env.example` sin valores reales.

---

## Renderizado Condicional Seguro

### Evitar exposición de datos
```typescript
// ❌ Malo — el componente se monta y puede filtrar datos antes del check
{user && <AdminPanel data={sensitiveData} />}

// ✅ Mejor — verificar permisos explícitamente
{hasPermission("admin:read") && <AdminPanel data={sensitiveData} />}
```

### Lazy loading de rutas protegidas
- No cargar código de módulos administrativos si el usuario no tiene permisos.
- Usar `React.lazy()` con verificación de permisos previa al import dinámico.

---

## Protección contra CSRF

- Si se usan cookies para autenticación, implementar tokens CSRF.
- Incluir header `X-Requested-With` en peticiones AJAX para diferenciar de requests del navegador.
- Usar `SameSite=Strict` o `SameSite=Lax` en cookies de sesión.

---

## Content Security Policy (CSP)

- Configurar headers CSP en el servidor/CDN para restringir fuentes de scripts, estilos e imágenes.
- Evitar `unsafe-inline` y `unsafe-eval` en producción.
- Si se usa Styled Components, configurar nonce para CSP.

---

## Checklist de Seguridad al Crear un Componente

- [ ] ¿Renderiza datos del usuario? → Verificar que JSX escapa correctamente (no usar `dangerouslySetInnerHTML`)
- [ ] ¿Acepta URLs externas? → Validar protocolo antes de renderizar en `href`/`src`
- [ ] ¿Maneja formularios? → Validar con Zod, limitar longitud, sanitizar
- [ ] ¿Muestra errores? → Solo mensajes genéricos al usuario, detalles técnicos solo en DEV
- [ ] ¿Requiere permisos? → Usar `useHasPermission` y `ProtectedRoute`
- [ ] ¿Almacena datos sensibles? → No en localStorage, no en estado global persistido sin protección
- [ ] ¿Hace llamadas a API? → HTTPS, sin datos sensibles en query params, manejo de 401/403
