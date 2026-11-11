# Asociación Agroalimentaria de Colombia — Landing institucional

**Fecha:** 2026-11-10  
**Estado:** Aprobado en brainstorming; pendiente de plan de implementación

## Objetivo

Sitio web v1: landing de una sola página que presenta la asociación a **productores (afiliados)** e **instituciones/empresas (aliados)**, con navegación por anclas a las secciones del brochure y formulario de contacto por email (Formspree).

## Audiencia y CTAs

- Visitante primario: ambos perfiles por igual.
- Hero con dos CTAs:
  - **Únete** ? scroll a Contacto, preselecciona tipo “Afiliado”.
  - **Sé aliado** ? scroll a Contacto, preselecciona tipo “Aliado”.
- Header: CTA secundario “Contactar” ? scroll a Contacto.

## Alcance

### Incluye

- Landing HTML/CSS/JS estática (sin framework, sin build step).
- Secciones: Header, Hero, Quiénes somos, Nuestro compromiso, Qué hacemos, Capacidades, Por qué trabajar con nosotros, Contacto, Footer.
- Logos: horizontal en header; circular en hero/footer (`logo_horizontal_transparente.png`, `logo_asociacion_agroalimentaria_transparente.png`).
- Imágenes hero/secciones extraídas del brochure PDF.
- Formulario Formspree (endpoint configurable vía placeholder).
- SEO básico (title, meta description, Open Graph).
- Responsive (menú móvil).
- Motion ligero: fade-in al scroll, hover en CTAs, header compacto al scroll.
- README con instrucciones locales y Formspree.

### No incluye (v1)

- Backend propio, CMS, login de afiliados.
- Blog, noticias, multipágina.
- Mapa embebido.
- Multidioma.
- Panel de administración.

## Arquitectura de archivos

```
/
??? index.html
??? styles.css
??? script.js
??? assets/
?   ??? logo_horizontal_transparente.png
?   ??? logo_asociacion_agroalimentaria_transparente.png
?   ??? (fotos de hero y secciones desde el brochure)
??? README.md
```

Entrega: abrir `index.html` o desplegar la carpeta en hosting estático (Netlify, GitHub Pages, etc.).

## Estructura de contenido (orden)

1. **Header** — logo horizontal + anclas: Quiénes somos · Qué hacemos · Capacidades · Contacto + “Contactar”.
2. **Hero** — marca “Asociación Agroalimentaria de Colombia”, slogan “Impulsando el desarrollo agropecuario y agroalimentario de Colombia.”, NIT 902120877 discreto, CTAs Únete / Sé aliado. Foto full-bleed.
3. **Quiénes somos** — texto del brochure + resumen de objeto social.
4. **Nuestro compromiso** — 6 compromisos (economía campesina, desarrollo rural, bienestar asociativo, sostenibilidad, participación, fortalecimiento productivo).
5. **Qué hacemos** — Producción agropecuaria, Transformación agroindustrial, Comercialización, Asistencia técnica y capacitación, Gestión de proyectos, Alianzas y cooperación.
6. **Capacidades** — Contratación pública/privada, Comercialización integral, Gestión de proyectos, Cooperación institucional, Gestión de recursos, Articulación asociativa.
7. **Por qué trabajar con nosotros** — mensaje corto de articulación y resultados.
8. **Contacto** — datos + formulario.
9. **Footer** — logo circular, NIT, contacto, copyright.

Contenido en español, fiel al brochure. Sitio de referencia en brochure: `www.asociacionagroalimentaria.com`.

## Identidad visual

| Token | Valor |
|-------|--------|
| Verde primario | `#006837` |
| Verde lima / acento | `#8CC63F` |
| Texto | casi negro |
| Fondos | claros con atmósfera sutil (gradiente/textura verdosa suave; no blanco plano único) |
| Tipografía display | Fraunces (o equivalente con carácter) para títulos |
| Tipografía cuerpo | Source Sans 3 (o equivalente legible; no Inter/Roboto/Arial) |

### Principios de layout

- Hero: un plano visual full-bleed; marca dominante; un headline/slogan; un grupo de CTAs; sin badges flotantes ni stats en el primer viewport.
- Secciones con un propósito y un titular cada una.
- Evitar cards pesadas; listas/rejillas ligeras para compromisos y capacidades.
- Motion intencional (2–3 efectos), no ruido.

## Formulario de contacto

| Campo | Requerido | Notas |
|-------|-----------|--------|
| Nombre | Sí | |
| Email | Sí | |
| Teléfono | No | |
| Tipo | Sí | Afiliado / Aliado / Otro; preselección desde CTAs |
| Mensaje | Sí | |

- Envío: Formspree ? `asociacionagroalimentaria79@gmail.com`.
- Endpoint en HTML como placeholder documentado en README.
- Validación HTML5 + feedback éxito/error en página (sin recarga completa).
- Datos visibles: `+57 320-420-0954`, `asociacionagroalimentaria79@gmail.com`, web.

## Comportamiento (JS)

- Scroll suave a anclas.
- Menú móvil (abrir/cerrar).
- Header compacto al hacer scroll.
- Intersection Observer (o similar) para fade-in de secciones.
- CTAs Únete / Sé aliado: scroll + set del select “Tipo”.
- Submit del form vía `fetch` a Formspree; estados loading / success / error.

## Accesibilidad y SEO

- Labels asociados a inputs; focus visible; contraste adecuado sobre foto (overlay en hero).
- `<title>` y meta description orientados a la asociación.
- Open Graph con logo o imagen hero.
- `alt` descriptivo en logos e imágenes.

## Criterios de éxito

- Visitante entiende qué es la asociación en el primer viewport.
- Puede llegar a Quiénes somos, Qué hacemos, Capacidades y Contacto desde el nav.
- Puede identificarse como afiliado o aliado y enviar un mensaje.
- Se ve bien en móvil y escritorio.
- Carga sin herramientas de build.

## Notas de implementación

- Extraer 1–3 imágenes del PDF brochure para hero y fondos de sección (optimizar peso).
- Copiar logos transparentes a `assets/`.
- No commitear secretos; solo el form ID público de Formspree cuando exista.
