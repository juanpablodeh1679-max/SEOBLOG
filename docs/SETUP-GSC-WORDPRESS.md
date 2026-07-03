# Configuración: GSC + WordPress MCP + skill de blogs

Guía para dejar funcionando, **en tu PC (Windows)**, el flujo:
**Google Search Console → escribir blog SEO → subir a WordPress como borrador.**

> ⚠️ Todo esto se configura y se ejecuta en tu **Claude Code local** (Windows),
> no en las sesiones de la nube (claude.ai/code). Las rutas `C:\Users\PC\...`
> solo existen en tu máquina.

---

## 0. Requisitos previos

- **Claude Code** instalado (verifica versión: `claude --version`).
- **uv** (gestor de Python de Astral). Instálalo en PowerShell:
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```
- Los dos repos MCP descargados:
  - GSC: `C:\Users\PC\Downloads\mcp-gsc-5\mcp-gsc`
  - WordPress: `C:\Users\PC\Downloads\wordpress-mcp`

---

## 1. Credenciales OAuth de Google (client_secrets.json)

1. [console.cloud.google.com](https://console.cloud.google.com) → crea/selecciona proyecto.
2. **APIs y servicios → Biblioteca** → habilita **Google Search Console API**.
3. **Pantalla de consentimiento OAuth** → tipo **Externo** → rellena nombre y correos.
4. En **Usuarios de prueba**, agrega tu correo de Google (el que administra GSC). *(Sin esto el login falla.)*
5. **Credenciales → Crear credenciales → ID de cliente OAuth → Aplicación de escritorio** → **Descargar JSON**.
6. Renómbralo a `client_secrets.json` y cópialo a:
   ```
   C:\Users\PC\Downloads\mcp-gsc-5\mcp-gsc\config\client_secrets.json
   ```

El primer uso del MCP abrirá el navegador para autorizar; se genera un
`token.json` que guarda la sesión (no hay que repetir el login).

---

## 2. Registrar los MCP en Claude Code

> **Importante:** en las versiones actuales de Claude Code los servidores MCP
> **no** van dentro de `settings.json`. Van en un archivo **`.mcp.json`**
> (scope de proyecto) o se agregan con **`claude mcp add`** (scope de usuario).
> Usa una de estas dos formas.

### Opción A — comandos (recomendada, scope usuario)

Desde PowerShell:

```powershell
claude mcp add gsc -s user `
  --env GSC_CREDENTIALS_PATH="C:\Users\PC\Downloads\mcp-gsc-5\mcp-gsc\config\client_secrets.json" `
  -- uv --directory "C:\Users\PC\Downloads\mcp-gsc-5\mcp-gsc" run python src/gsc_server.py

claude mcp add wordpress -s user `
  --env WP_URL="https://logistictrade.com" `
  --env WP_USERNAME="logistica_wtm3ry" `
  --env WP_APP_PASSWORD="TU_APP_PASSWORD_AQUI" `
  -- uv --directory "C:\Users\PC\Downloads\wordpress-mcp" run python wordpress_server.py
```

Verifica con `claude mcp list`.

### Opción B — archivo `.mcp.json`

Copia `.mcp.json.example` (en este repo) a `.mcp.json` en la carpeta del
proyecto que abras con Claude Code, y ajusta las rutas. Ver el ejemplo para el
formato exacto.

> **Nunca** subas la App Password al repo. En `.mcp.json` usa
> `"WP_APP_PASSWORD": "${WP_APP_PASSWORD}"` y define la variable en tu sistema,
> o mantén el `.mcp.json` real fuera de git (ya está en `.gitignore`).

Tras registrar los MCP, **reinicia Claude Code**.

---

## 3. Skill de blogs

El skill vive en `.claude/skills/blog-seo-writer/SKILL.md` (incluido en este
repo). Cópialo a `C:\Users\PC\.claude\skills\blog-seo-writer\SKILL.md` en tu PC,
o mantenlo dentro del proyecto. Contiene todas las reglas SEO y de estilo.

---

## 4. Flujo de trabajo

1. **Oportunidades en GSC:** "Ejecuta `get_search_analytics` para
   logistictrade.com, 90 días, dimensiones query y page. Dame keywords con
   muchas impresiones y pocos clicks."
2. **Elige tema:** una keyword de la lista o la tuya.
3. **Genera:** "Escribe un blog con la keyword «mejores prácticas de logística
   para ecommerce»." → El skill escribe y sube el **borrador** a WordPress.
4. **Revisa** en https://logistictrade.com/wp-admin → Entradas → Borradores.
5. **Rank Math:** abajo del editor, pon la keyword en *Focus Keyword* y ajusta
   según las recomendaciones.
6. **Publica** cuando estés conforme.
7. **Mide** a las 1-2 semanas comparando métricas en GSC.

---

## 5. Herramientas de los MCP

**GSC:** `list_properties`, `get_search_analytics`, `get_performance_overview`,
`inspect_url_enhanced`.

**WordPress:** `create_blog_post`, `get_categories`, `list_posts`,
`update_blog_post`.

---

## Preguntas frecuentes

- **¿Tengo que escribir algo?** No, solo das la keyword.
- **¿Se publica solo?** No, se sube como **borrador**.
- **¿Cómo elijo keyword?** Pregúntale a GSC por oportunidades.
- **¿Dónde está Rank Math?** Abajo del editor en WordPress.
