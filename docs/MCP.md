# Servidores MCP

Este repositorio incluye un archivo `.mcp.json` con los servidores MCP usados
para el trabajo de SEO del blog. Claude Code lo carga automáticamente al abrir
el proyecto y expande las variables `${VAR}` desde tu entorno (`.env`).

## Servidores configurados

### `ubersuggest`
Servidor remoto (por URL). No requiere configuración local ni credenciales en
el repo; funciona en cualquier máquina.

```json
"ubersuggest": { "url": "https://ubersuggest-mcp.neilpatelapi.com/mcp" }
```

### `gscServer` (Google Search Console)
Servidor local que se ejecuta con `uv`. Como depende de rutas específicas de
tu máquina, esas rutas se leen de variables de entorno en lugar de estar
hardcodeadas. Así el `.mcp.json` es portable y no filtra credenciales.

Requisitos en tu máquina:

1. Instalar [`uv`](https://docs.astral.sh/uv/).
2. Clonar el servidor: `git clone https://github.com/AminForou/mcp-gsc`.
3. Obtener el `client_secrets.json` de OAuth desde Google Cloud Console
   (Search Console API habilitada).
4. Definir las variables (copia `.env.example` a `.env` y ajústalas):

   ```env
   MCP_GSC_DIR=/ruta/a/mcp-gsc
   GSC_OAUTH_CLIENT_SECRETS_FILE=/ruta/a/client_secrets.json
   ```

   En Windows las rutas serían del estilo `C:\Users\juanp\mcp-gsc` y
   `C:\Users\juanp\Documents\client_secrets.json`.

> El `client_secrets.json` **no** se versiona en el repo. Solo se referencia
> por ruta a través de `GSC_OAUTH_CLIENT_SECRETS_FILE`.
