# Asociación Agroalimentaria de Colombia — Web

Landing estática de una sola página: HTML, CSS y JavaScript sin backend ni CMS.

## Vista previa local

Desde la raíz del proyecto:

```bash
python3 -m http.server 5173
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Verificación de estructura

```bash
./scripts/verify-structure.sh
```

El script comprueba que existan los archivos principales, los assets y los IDs de sección en `index.html`.

## Formulario de contacto (Formspree)

1. Crea un formulario en [Formspree](https://formspree.io) que envíe a `asociacionagroalimentaria79@gmail.com`.
2. Sustituye la URL de acción en `index.html`:

   `https://formspree.io/f/PLACEHOLDER` â†’ `https://formspree.io/f/<tu-form-id>`

3. Prueba el envío desde la sección **Contacto** (éxito y mensajes de estado).

## Despliegue

Sube estos archivos y carpetas a tu hosting estático (Netlify Drop, GitHub Pages, S3, etc.):

- `index.html`
- `styles.css`
- `script.js`
- `assets/` (completa)

No hace falta proceso de build.
