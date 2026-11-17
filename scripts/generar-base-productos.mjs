/*
 * Genera public/datos/base-productos.json (catálogo + fichas de detalles)
 * antes de compilar, para que cualquier persona o asistente lo consulte en
 * https://cotizado-comdtup.netlify.app/datos/base-productos.json
 *
 * Nunca detiene la compilación: si algo falla, avisa y sigue.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { construirBaseProductos } from "../src/detallesProductos.js";
import { imagenesZach } from "../src/zachImagenes.js";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

try {
  const fuente = fs.readFileSync(path.join(raiz, "src/PedidoTabla.jsx"), "utf8");
  const inicio = fuente.indexOf("const productCatalog = [");
  const fin = fuente.indexOf("\n];", inicio);
  if (inicio < 0 || fin < 0) throw new Error("no se encontró productCatalog");
  const literal = fuente.slice(inicio + "const productCatalog = ".length, fin + 2);
  const catalogo = new Function(`return ${literal};`)();
  const filas = catalogo
    .filter((p) => p.price || p.unitPrice)
    .map((p) => ({ ...p, ...imagenesZach(p) }));

  const datos = JSON.parse(
    fs.readFileSync(path.join(raiz, "src/datos/detallesProductos.json"), "utf8")
  );
  const base = construirBaseProductos(datos, filas);

  const destino = path.join(raiz, "public/datos/base-productos.json");
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, JSON.stringify(base, null, 2) + "\n");
  console.log(`base-productos.json: ${base.totalProductos} productos`);
} catch (error) {
  console.warn(`[base-productos] no se generó: ${error.message}`);
}
