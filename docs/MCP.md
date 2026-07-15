# Servidores MCP

Este repositorio incluye un archivo `.mcp.json` con los servidores MCP usados
para el trabajo de SEO del blog.

## Servidores configurados

### `ubersuggest`
Servidor remoto (por URL). No requiere configuración local ni credenciales;
funciona en cualquier máquina.

```json
"ubersuggest": { "url": "https://ubersuggest-mcp.neilpatelapi.com/mcp" }
```

### `gscServer` (Google Search Console)
Servidor local que se ejecuta con `uv`. Usa rutas absolutas de Windows porque
el cliente (Claude Desktop) no expande variables `${VAR}`.

Requisitos en la máquina:

1. Instalar [`uv`](https://docs.astral.sh/uv/).
2. Clonar el servidor en la ruta indicada:
   `git clone https://github.com/AminForou/mcp-gsc "C:\Users\juanp\mcp-gsc"`
3. Colocar el `client_secrets.json` de OAuth (Google Cloud Console, con la
   Search Console API habilitada) en `C:\Users\juanp\Documents\`.

> El `client_secrets.json` **no** se versiona en el repo; solo se referencia
> por ruta a través de `GSC_OAUTH_CLIENT_SECRETS_FILE`.
>
> Nota: las rutas de `gscServer` son específicas del equipo de juanp. En otra
> máquina hay que ajustarlas en `.mcp.json`.
