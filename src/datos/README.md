# Base de información de productos

Fuente de la pestaña **Detalles** del cotizador y de la base que consultan
personas y asistentes (Claude, Codex, el futuro asistente de cuentas de
ecommerce).

## Dónde consultarla

- En línea, ya armada (catálogo + fichas, sin costos ni precios):
  `https://cotizado-comdtup.netlify.app/datos/base-productos.json`.
  Se genera en cada compilación con `scripts/generar-base-productos.mjs`.
- En el cotizador: pestaña **Detalles** → "Descargar base (JSON)".
- Para editarla: `src/datos/detallesProductos.json` (este folder).

## Cómo está organizada

- `productos`: una ficha por producto. La clave es
  `idDetalleProducto(marca, producto)` de `src/detallesProductos.js`
  (ej. `verde-santo--green-multipolish`). Todas las presentaciones del
  catálogo con la misma marca y el mismo `product` comparten la ficha.
- `marcas`: información general de la marca (ej. cómo se aplica cualquier
  retocador RetoKcar). Si el producto tiene el campo lleno, gana el producto.
- Campos: `descripcion`, `usos`, `superficies`, `noUsarEn`, `modoDeUso`,
  `dilucion` (lista de `{ uso, proporcion }`), `aplicacion`, `rendimiento`,
  `caracteristicas`, `beneficios`, `especificaciones` (pares propiedad:
  valor, ej. pH, densidad, viscosidad, color, olor), `ingredientes`,
  `recomendaciones`, `precauciones`, `manejoYAlmacenamiento`,
  `palabrasClave`, más `fuentes`, `notas` y `pendientes`.
- Estado (calculado): **completo** si tiene descripción, para qué sirve,
  modo de uso y precauciones; **parcial** si tiene algo; **pendiente** si
  no tiene nada.
- Margrey: el texto viene de las fichas técnicas del proveedor (folios
  FTPRO-xx, anotados en `fuentes`), copiado tal cual.

## Regla

No inventar datos técnicos (diluciones, tiempos, dosis). Solo se llena lo que
tiene fuente: etiqueta, ficha técnica, sitio de la marca o lo que diga Diego.
Cada ficha anota su fuente en `fuentes` (`tipo`: etiqueta, ficha, sitio o
diego; `referencia`: URL o descripción; `fecha`).

Si se agrega un producto nuevo al catálogo, su ficha aparece como pendiente
aunque no esté en el JSON; para llenarla, agregar la entrada con la clave de
`idDetalleProducto`.
