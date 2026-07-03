import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

function loadEnv() {
  const envPath = join(dirname(fileURLToPath(import.meta.url)), "..", ".env");
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv();

const { WP_SITE_URL, WP_USERNAME, WP_APP_PASSWORD } = process.env;

if (!WP_SITE_URL || !WP_USERNAME || !WP_APP_PASSWORD) {
  console.error("Faltan variables de entorno: WP_SITE_URL, WP_USERNAME, WP_APP_PASSWORD");
  process.exit(1);
}

const auth = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString("base64");
const apiBase = new URL("/wp-json/wp/v2", WP_SITE_URL).toString();

async function verifyConnection() {
  const res = await fetch(`${apiBase}/users/me`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  if (!res.ok) {
    throw new Error(`Fallo la autenticacion (${res.status}): ${await res.text()}`);
  }
  const user = await res.json();
  console.log(`Conectado como: ${user.name} (id ${user.id})`);
}

async function createTestPost() {
  const status = process.argv[2] === "--publish" ? "publish" : "draft";
  const res = await fetch(`${apiBase}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Prueba de conexion Blog-IA",
      content:
        "<p>Esta es una entrada de prueba generada automaticamente para verificar la conexion via contrasena de aplicacion.</p>",
      status,
    }),
  });
  if (!res.ok) {
    throw new Error(`Fallo al crear la entrada (${res.status}): ${await res.text()}`);
  }
  const post = await res.json();
  console.log(`Entrada creada (status=${post.status}): ${post.link ?? post.guid?.rendered}`);
  console.log(`Editar en: ${new URL(`/wp-admin/post.php?post=${post.id}&action=edit`, WP_SITE_URL)}`);
}

await verifyConnection();
await createTestPost();
