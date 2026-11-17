/*
 * Base de información de productos ("Modo detalles").
 *
 * La información vive en src/datos/detallesProductos.json:
 *   - "marcas": información general que aplica a todos los productos de una
 *     marca (por ejemplo, todos los retocadores RetoKcar se aplican igual).
 *   - "productos": una ficha por producto (familia), con la clave
 *     idDetalleProducto(marca, producto). Todas las presentaciones del
 *     catálogo con la misma marca y nombre de producto comparten la ficha.
 *
 * Regla: solo se llena lo que tiene fuente (etiqueta, sitio de la marca,
 * Diego). Lo que falta se deja vacío y la vista lo marca como "Pendiente".
 * Cada ficha guarda sus fuentes en "fuentes".
 */

export const MARCA_PREDETERMINADA = "Margrey";

export function slugDetalle(texto = "") {
  return String(texto)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function idDetalleProducto(marca, producto) {
  return `${slugDetalle(marca || MARCA_PREDETERMINADA)}--${slugDetalle(producto)}`;
}

/* Campos de una ficha, en el orden en que se muestran. */
export const CAMPOS_DETALLE = [
  { clave: "descripcion", etiqueta: "Descripción", tipo: "texto", basico: true },
  { clave: "usos", etiqueta: "Para qué sirve", tipo: "lista", basico: true },
  { clave: "superficies", etiqueta: "Superficies / dónde se usa", tipo: "lista" },
  { clave: "noUsarEn", etiqueta: "No usar en", tipo: "lista" },
  { clave: "modoDeUso", etiqueta: "Modo de uso", tipo: "lista", basico: true },
  { clave: "dilucion", etiqueta: "Dilución / dosis", tipo: "dilucion", basico: true },
  { clave: "aplicacion", etiqueta: "Aplicación (herramienta o método)", tipo: "texto" },
  { clave: "rendimiento", etiqueta: "Rendimiento", tipo: "texto" },
  { clave: "beneficios", etiqueta: "Beneficios", tipo: "lista" },
  { clave: "ingredientes", etiqueta: "Ingredientes / componentes", tipo: "lista" },
  { clave: "caracteristicas", etiqueta: "Características", tipo: "pares" },
  { clave: "precauciones", etiqueta: "Precauciones", tipo: "lista", basico: true },
  { clave: "palabrasClave", etiqueta: "Palabras clave (ecommerce)", tipo: "lista" },
];

export function tieneValor(valor) {
  if (valor == null) return false;
  if (Array.isArray(valor)) return valor.length > 0;
  if (typeof valor === "object") return Object.values(valor).some(tieneValor);
  return String(valor).trim() !== "";
}

/*
 * Junta la ficha de la marca con la del producto (lo del producto gana).
 * Devuelve { ficha, fuentes, avance: {llenos, total}, estado }.
 */
export function fichaCompleta(datos, marca, producto) {
  const marcaReal = marca || MARCA_PREDETERMINADA;
  const deMarca = datos?.marcas?.[marcaReal] || {};
  const deProducto = datos?.productos?.[idDetalleProducto(marcaReal, producto)] || {};

  const ficha = {};
  for (const { clave } of CAMPOS_DETALLE) {
    if (tieneValor(deProducto[clave])) ficha[clave] = deProducto[clave];
    else if (tieneValor(deMarca[clave])) ficha[clave] = deMarca[clave];
  }

  const fuentes = [...(deProducto.fuentes || []), ...(deMarca.fuentes || [])];
  const basicos = CAMPOS_DETALLE.filter((c) => c.basico);
  const llenos = basicos.filter((c) => tieneValor(ficha[c.clave])).length;
  const estado =
    llenos === 0 ? "pendiente" : llenos === basicos.length ? "completo" : "parcial";

  return {
    ficha,
    fuentes,
    notas: deProducto.notas || "",
    pendientes: deProducto.pendientes || [],
    avance: { llenos, total: basicos.length },
    estado,
  };
}

/*
 * Agrupa filas del catálogo (presentaciones) por marca + producto.
 * Solo usa datos públicos: no incluye costos ni precios.
 */
export function agruparPorProducto(filas = []) {
  const grupos = new Map();
  for (const p of filas) {
    const marca = p.brand || MARCA_PREDETERMINADA;
    const id = idDetalleProducto(marca, p.product);
    if (!grupos.has(id)) {
      grupos.set(id, { id, marca, producto: p.product, presentaciones: [] });
    }
    grupos.get(id).presentaciones.push({
      descripcion: p.unitDescription || p.description || "",
      empaque: p.unitDescription ? p.description || "" : "",
      sku: p.sku || "",
      codigoBarras: p.code && p.code !== "-" ? p.code : "",
      imagen: p.image || "",
      link: (p.link || "").replace("comercializadoradtpu", "comercializadoradtup"),
    });
  }
  return [...grupos.values()];
}

/* Base completa (catálogo + fichas) para descargar o consultar. */
export function construirBaseProductos(datos, filas, generado = new Date()) {
  const productos = agruparPorProducto(filas).map((g) => {
    const { ficha, fuentes, notas, pendientes, avance, estado } = fichaCompleta(
      datos,
      g.marca,
      g.producto
    );
    const campos = Object.fromEntries(
      CAMPOS_DETALLE.map(({ clave, tipo }) => [
        clave,
        ficha[clave] ?? (tipo === "texto" ? "" : tipo === "pares" ? {} : []),
      ])
    );
    return { ...g, estado, avance, ...campos, fuentes, notas, pendientes };
  });

  return {
    nombre: "Base de información de productos · Cotizador DTUP ZACH",
    generado: generado.toISOString(),
    nota:
      "Fichas por producto (marca + nombre). Campos vacíos = información pendiente, no inventar. No incluye costos ni precios; los precios están en el cotizador.",
    campos: CAMPOS_DETALLE.map(({ clave, etiqueta }) => ({ clave, etiqueta })),
    totalProductos: productos.length,
    productos,
  };
}
