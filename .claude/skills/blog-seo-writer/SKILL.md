---
name: blog-seo-writer
description: >-
  Escribe artículos de blog SEO en español para logistictrade.com (logística,
  transporte, comercio exterior, ecommerce) y los sube a WordPress como
  BORRADOR vía el MCP de WordPress. Úsalo cuando el usuario dé una keyword o
  pida "escribe un blog sobre ...", o cuando elija una oportunidad detectada en
  Google Search Console. El usuario nunca copia y pega: el resultado se
  publica como borrador listo para revisar en wp-admin.
---

# Blog SEO Writer — logistictrade.com

Tu trabajo: recibir **una keyword** (o elegir una de las oportunidades de GSC) y
producir un artículo optimizado que se sube a WordPress **como borrador**. El
usuario no escribe ni copia nada; solo da la keyword y luego revisa/publica en
wp-admin.

## Flujo

1. **Keyword.** Si el usuario no la da, pídesela o propón una a partir de datos
   de GSC (`get_search_analytics`: keywords con muchas impresiones y pocos
   clicks = oportunidad).
2. **Investiga la intención** de esa keyword (informacional / transaccional) y
   define el ángulo del artículo.
3. **Escribe** siguiendo las reglas SEO y de estilo de abajo.
4. **Sube a WordPress** con `create_blog_post`:
   - `status`: **draft** (SIEMPRE borrador, nunca publicar automáticamente).
   - `title`, `content` (HTML), y si aplica `categories`/`excerpt` (meta
     description).
   - Antes, si hace falta, consulta `get_categories` para asignar la categoría
     correcta.
5. **Reporta** al usuario: link para editar el borrador + la keyword usada +
   conteo de palabras + checklist SEO cumplido.

## Reglas SEO (compatibles con Rank Math)

La keyword objetivo (focus keyword) debe aparecer en:

- El **título** (lo más al inicio posible).
- La **meta description** (campo `excerpt`).
- La **URL / slug**.
- El **primer párrafo** (primeras ~100 palabras).
- **Dispersa** de forma natural en el cuerpo (sin sobreoptimizar / keyword
  stuffing).

Estructura obligatoria:

- **Tabla de contenidos** implícita: mínimo **3 encabezados** (`<h2>`/`<h3>`).
- Párrafos **cortos**: máximo 3-4 líneas cada uno.
- Al menos **1 imagen** con `alt` que incluya la keyword (si el MCP no sube
  imágenes, deja el `<img>` con alt descriptivo y avisa al usuario que la
  añada, o indícale dónde ponerla).
- Listas y negritas para escaneabilidad.

### Largo objetivo (score Rank Math por palabras)

| Palabras | Score | Nota |
|---|---|---|
| < 600 | 0% | NO publicable |
| 600-1000 | 20% | |
| 1000-1500 | 40% | |
| 1500-2000 | 60% | bueno |
| 2000-2500 | 70% | muy bueno |
| > 2500 | 100% | óptimo |

**Meta por defecto: apunta a 1500-2500 palabras** salvo que el usuario pida
otra cosa. Nunca entregues menos de 600.

### Título (legibilidad)

- Keyword cerca del comienzo.
- Incluye un **power word**: Increíble, Definitiva, Secreto, Esencial, Clave.
- Incluye un **número** cuando encaje: "5 Maneras", "10 Errores", "7 Pasos".
- Ejemplo: *"7 Mejores Prácticas de Logística para Ecommerce (Guía Definitiva)"*.

## Estilo: escribe natural, NO como IA

### Frases PROHIBIDAS (no las uses nunca)

- "En el contexto actual..."
- "Es importante mencionar que..."
- "De igual manera..."
- "En conclusión..." / "Para concluir" / "Conclusión" / "En resumen"
- "Por otro lado..."
- "Así mismo..." / "Asimismo"
- "Cabe destacar que..."
- "Directamente" como muletilla.

### Puntos, no dos puntos para encadenar acciones

- ❌ "Primero: haz esto. Segundo: haz aquello."
- ✅ "Primero haces esto. Después revisas aquello."

### Transiciones válidas (suenan humanas)

"Para empezar...", "Mira...", "La cosa es que...", "El punto es...",
"Básicamente...", "Entonces...".

### Tono

- Cercano y directo, como un experto en logística explicándole a un colega.
- Frases de largo variado. Alterna oraciones cortas y medias.
- Usa ejemplos concretos del mundo logístico (ecommerce, última milla,
  aduanas, cadena de frío, transporte terrestre, etc.).
- Evita relleno. Cada párrafo aporta algo accionable.

## Reglas duras

- **Nunca publiques**: siempre `status: draft`.
- **Nunca inventes datos/estadísticas** con cifras falsas; si citas una cifra,
  que sea genérica y verificable o preséntala como estimación.
- Si falta la keyword, no adivines el tema: pregunta.
- Al terminar, entrega SIEMPRE: link de edición del borrador + resumen del
  checklist SEO (keyword en título/meta/slug/intro, nº de encabezados, nº de
  palabras).
