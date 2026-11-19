# Aborígenes Ethan

Web estática para primer grado sobre los pueblos originarios de Venezuela. Incluye tres lecciones, seis juegos y una guía docente.

## Vercel

Importar este repositorio desde **Add New → Project** y elegir el preset **Other**. El archivo `vercel.json` indica que el sitio está en `public/`. No requiere comando de compilación, variables de entorno ni base de datos.

## Desarrollo

Servir `public/` con un servidor HTTP estático, por ejemplo `python3 -m http.server --directory public 8000`. Las lecciones y preguntas están en `public/content.js`. Las escenas de fondo tienen animación sin sonido y respetan la preferencia de movimiento reducido. El progreso se guarda únicamente en el navegador.

Las ilustraciones son recreaciones educativas. La guía docente enlaza las fuentes que respaldan los ejemplos.
