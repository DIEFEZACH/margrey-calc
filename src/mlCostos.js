// src/mlCostos.js
// Motor de costos de Mercado Libre México — verificado contra el simulador
// oficial y contra publicaciones reales el 23 de agosto de 2026.
//
// Reemplaza a ML_COMISION_PORCENTAJE, ML_RETENCIONES_PORCENTAJE y
// calcularCostoEnvioML de PedidoTabla.jsx.

/* ============================================================
 *  1. CARGO POR VENTA — depende de la CATEGORÍA, no es fijo
 * ============================================================
 * Antes: ML_COMISION_PORCENTAJE = 12 para todo.
 * Real: dentro de Cuidado Automotriz va de 9% a 15%.
 * Premium = Clásica + 3 puntos (verificado en dos categorías
 * independientes: 9→12 y 12→15).
 */
export const COMISION_CLASICA = {
  abrillantadores:   9,    // Auto Brillo A y S, Silicrem, Brillo Platinum, Gel Azul, Plasti Magic
  desengrasantes:    9,    // Desgramot, Fingras, Gras Fin, Prelavador, Limpiador de Rines
  ceras:            12,    // Cera Express, Cera Líquida W, Cera Acrílica
  shampoos:         12,    // Car Wash, Shampoo con Cera, Bubble Wash, Pum
  aromatizantes:    12,    // Cool Grey, Fragancia Vainilla
  rayones:          12,    // Pulimentos, 3 en 1, Super Corte, Faros
  tratamientos:     12,    // Quita Gotas, Repelente, Quita Goma, Alumbra, Aluminox
  limpiaparabrisas: 12,    // Wiper Clean
  aditivos:         12,    // Oil Restorer
  jabones:          14.9,  // Mano Clean (Belleza y Cuidado Personal, no automotriz)
  limpiadores:      15,    // Leather Clean
  lubricantes:      15,    // Afloja Fácil
};

export const PUNTOS_PREMIUM = 3;

export function comision(categoria, tipo = 'clasica') {
  const base = COMISION_CLASICA[categoria];
  if (base == null) throw new Error(`Categoría sin comisión: ${categoria}`);
  return tipo === 'premium' ? base + PUNTOS_PREMIUM : base;
}

/* ============================================================
 *  2. RETENCIONES — derivadas, ya no un número mágico
 * ============================================================
 * Antes: (30.32 / 335) * 100 = 9.051%, sacado de una venta real.
 * Resulta que ese número no era casualidad: ML retiene ISR 2.5% e
 * IVA 8% sobre el precio SIN IVA, o sea precio / 1.16.
 *      10.5% / 1.16 = 9.0517%
 * Comprobado al centavo: a $313 → ISR $6.75 e IVA $21.59.
 */
export const ISR = 0.025;
export const IVA_RET = 0.08;

export function retenciones(precio) {
  const sinIva = precio / 1.16;
  return {
    isr: +(sinIva * ISR).toFixed(2),
    iva: +(sinIva * IVA_RET).toFixed(2),
    total: +(sinIva * (ISR + IVA_RET)).toFixed(2),
  };
}

/* ============================================================
 *  3. COSTO DE ENVÍO — con el piso del envío gratis
 * ============================================================
 * Hallazgo: si ofreces envío gratis con el producto por debajo de
 * $299, ML igual te cobra la tarifa del rango $299–498.99.
 * Verificado: mismo producto a $280 cuesta $39.00 sin envío gratis
 * y $59.60 con envío gratis.
 * Tarifas ya con el 50% de descuento por reputación Verde /
 * MercadoLíder / Tienda Oficial.
 */
const RANGOS_PRECIO = [98.99, 198.99, 298.99, 498.99, 998.99, Infinity];
const IDX_ENVIO_GRATIS = 3; // columna $299–498.99: piso del envío gratis

const TABLA_ENVIO = [
  [0.3,  [25, 32, 35, 52.4, 65.5, 65.5]],
  [0.5,  [28.5, 34, 38, 56, 70, 70]],
  [1,    [33, 38, 39, 59.6, 74.5, 74.5]],
  [2,    [35, 40, 41, 67.6, 84.5, 84.5]],
  [3,    [37, 46, 48, 76, 88.5, 95]],
  [4,    [39, 50, 54, 82.4, 95.5, 103]],
  [5,    [40, 53, 59, 88, 102.5, 110]],
  [7,    [45, 59, 70, 98, 122.5, 122.5]],
  [9,    [51, 67, 81, 111.6, 139.5, 139.5]],
  [12,   [59, 78, 96, 129.2, 161.5, 161.5]],
  [15,   [69, 92, 113, 152, 190, 190]],
  [20,   [81, 108, 140, 178, 222.5, 222.5]],
  [30,   [102, 137, 195, 225.2, 281.5, 281.5]],
  [40,   [126, 170, 250, 279.2, 349, 349]],
  [50,   [163, 220, 305, 361.2, 451.5, 451.5]],
  [Infinity, [183, 247, 334, 405.6, 507, 507]],
];

export function costoEnvio(pesoFacturableKg, precio, ofreceEnvioGratis) {
  const fila = TABLA_ENVIO.find((f) => pesoFacturableKg <= f[0]);
  let i = RANGOS_PRECIO.findIndex((r) => precio <= r);
  if (i < 0) i = RANGOS_PRECIO.length - 1;
  if (ofreceEnvioGratis) i = Math.max(i, IDX_ENVIO_GRATIS);
  return fila[1][i];
}

/* ============================================================
 *  4. PESO FACTURABLE — físico vs volumétrico
 * ============================================================
 * Tu regla: declarar +0.5 kg y +2 cm sobre lo real, para no comer
 * penalización por medidas mal declaradas.
 * ML cobra sobre el MAYOR entre el peso físico y el volumétrico.
 * Divisor 5000 (con 4000 el Silicrem habría costado $76; costó $67.60).
 *
 * Nota práctica: en los 58 productos Margrey el volumétrico NUNCA
 * manda — son líquidos, mucho más densos de lo que castiga el
 * divisor. Se deja igual porque en un producto ligero y voluminoso
 * (aerosoles, blísters, kits sueltos) sí va a morder.
 */
export const PAD_CM = 2;
export const SOBREPESO_KG = 0.5;
export const DIVISOR_VOLUMETRICO = 5000;

// Acomoda q piezas en la caja más compacta posible.
export function caja(dimProducto, q = 1) {
  const [l, w, h] = dimProducto;
  let mejor = null;
  for (let nx = 1; nx <= q; nx++) {
    for (let ny = 1; ny <= q; ny++) {
      const nz = Math.ceil(q / (nx * ny));
      if (nx * ny * nz < q) continue;
      const L = nx * l + PAD_CM, W = ny * w + PAD_CM, H = nz * h + PAD_CM;
      const v = L * W * H;
      if (!mejor || v < mejor.v) mejor = { L: +L.toFixed(1), W: +W.toFixed(1), H: +H.toFixed(1), v };
    }
  }
  return { dim: [mejor.L, mejor.W, mejor.H], volumetrico: +(mejor.v / DIVISOR_VOLUMETRICO).toFixed(2) };
}

export function pesoFacturable(dimProducto, pesoUnitarioKg, q = 1) {
  const fisico = +(q * pesoUnitarioKg + 0.15 + SOBREPESO_KG).toFixed(2); // 150 g de caja + tu colchón
  const c = caja(dimProducto, q);
  return {
    fisico,
    caja: c.dim,
    volumetrico: c.volumetrico,
    kg: Math.max(fisico, c.volumetrico),
    manda: c.volumetrico > fisico ? 'volumen' : 'peso',
  };
}

/* ============================================================
 *  5. DESGLOSE Y PRECIO OBJETIVO
 * ============================================================ */
export function desglose(precio, { categoria, tipo = 'clasica', pesoKg, envioGratis }) {
  const pct = comision(categoria, tipo);
  const cargo = +(precio * pct / 100).toFixed(2);
  const envio = costoEnvio(pesoKg, precio, envioGratis);
  const ret = retenciones(precio);
  return {
    precio, comisionPct: pct, cargoPorVenta: cargo, costoEnvio: envio,
    isr: ret.isr, ivaRetenido: ret.iva, impuestos: ret.total,
    recibes: +(precio - cargo - envio - ret.total).toFixed(2),
  };
}

// Precio mínimo (entero) cuyo neto alcanza el objetivo.
export function precioParaRecibir(netoObjetivo, opts) {
  for (let p = 35; p <= 200000; p++) {
    const d = desglose(p, opts);
    if (d.recibes >= netoObjetivo) return d;
  }
  return null;
}

/* ============================================================
 *  6. LAS 4 VARIANTES Y LA ESCALERA MAYORISTA
 * ============================================================ */
export const VARIANTES = [
  { id: 'A', tipo: 'clasica', envioGratis: true },
  { id: 'B', tipo: 'clasica', envioGratis: false },
  { id: 'C', tipo: 'premium', envioGratis: true },
  { id: 'D', tipo: 'premium', envioGratis: false },
];

// netoUnitario = costo * 1.5 (tu 50% sobre costo)
export function escaleraMayorista(
  { categoria, tipo, envioGratis, dimProducto, pesoUnitarioKg, netoUnitario },
  maxPiezas = 15,
) {
  const req = [];
  for (let q = 1; q <= maxPiezas; q++) {
    const f = pesoFacturable(dimProducto, pesoUnitarioKg, q);
    const d = precioParaRecibir(netoUnitario * q, { categoria, tipo, pesoKg: f.kg, envioGratis });
    req.push({ q, unit: Math.ceil(d.precio / q), caja: f.caja, pesoKg: f.kg, manda: f.manda });
  }
  // La escalera nunca puede subir: cada escalón toma el máximo de los que siguen.
  for (let i = req.length - 2; i >= 0; i--) req[i].unit = Math.max(req[i].unit, req[i + 1].unit);
  return req.map((r) => ({ ...r, total: r.unit * r.q }));
}
