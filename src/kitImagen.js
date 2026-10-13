/*
 * Generador de la imagen automática del kit.
 *
 * Acomodo:
 * - La cubeta 19 L con tapa siempre va atrás, al centro.
 * - 1 producto ocupa casi toda la imagen.
 * - 2 o 3 productos van uno al lado del otro.
 * - Con más productos se arman filas en capas:
 *   lo más alto atrás, lo más chico adelante y
 *   los adicionales (microfibras y esponjas) hasta el frente.
 *   El atomizador va parado entre los productos.
 * - Cada presentación se dibuja con un tamaño
 *   proporcional a su tamaño real, suavizado para
 *   que lo chico (130 ml, cremas) se siga viendo.
 */

export const KIT_SIZE = 1200;

// Máximo de productos dibujados.
// Los adicionales y la cubeta no cuentan aquí.
export const MAX_KIT_PRODUCTS = 30;

// Máximo de adicionales dibujados
// (microfibras, microfibras grandes, esponjas y atomizadores).
export const MAX_KIT_ACCESSORIES = 10;

const ADICIONALES_KIT = {
  cubeta: {
    nombre: "Cubeta 19 L con tapa",
    image: "/assets/margrey/accesorios/cubeta-19l.png",
    volumenMl: 19000,
  },
  microfibraGrande: {
    nombre: "Microfibra grande 55×90",
    image: "/assets/margrey/accesorios/microfibra-grande.png",
    alturaCm: 15,
  },
  microfibra: {
    nombre: "Microfibra",
    image: "/assets/margrey/accesorios/microfibra.png",
    alturaCm: 9,
  },
  esponja: {
    nombre: "Esponja",
    image: "/assets/margrey/accesorios/esponja-blanca.png",
    alturaCm: 8,
  },
  // Va parado entre los productos, no en la fila
  // de adicionales: al frente taparía las etiquetas.
  atomizador: {
    nombre: "Atomizador",
    image: "/assets/margrey/accesorios/atomizador.png",
    alturaCm: 26,
    conProductos: true,
  },
};

/*
 * Altura fija (cm) por SKU cuando la foto engaña
 * al cálculo de tamaño.
 */
const ALTURA_FIJA_KIT_CM = {
  "1415-21-300": 18, // Blister crema y repelente: empaque plano.
};

// Tiempo máximo para cargar todas las imágenes del kit.
const LIMITE_CARGA_MS = 60000;

// Altura para productos sin presentación (aromatizantes, piezas).
const ALTURA_SIN_PRESENTACION_CM = 16;

/*
 * Parámetros visuales del acomodo.
 */
const DISENO_KIT = {
  // Margen alrededor de la composición (proporción del lienzo).
  margen: 0.06,
  // Suaviza la diferencia de tamaños: 1 = tamaño real,
  // menos de 1 = lo chico se ve un poco más grande.
  suavizado: 0.8,
  // Traslape entre productos distintos de la misma fila.
  traslape: 0.06,
  // Traslape entre adicionales iguales seguidos.
  traslapeIguales: 0.22,
  // Traslape entre productos iguales seguidos
  // (menos, para que se lea la etiqueta).
  traslapeIgualesProducto: 0.12,
  // Cuánto tapa una fila a la de atrás:
  // como máximo esta parte de la fila de atrás...
  ocultaFondo: 0.3,
  // ...y como máximo esta parte de su propia altura.
  ocultaFrente: 0.4,
  // Una fila de puros adicionales tapa la mitad de eso.
  ocultaAdicionales: 0.5,
  // Si sobra alto, las filas se separan hasta tapar
  // solo esta parte de lo normal.
  separacionMinima: 0.4,
  // Partir un grupo de piezas iguales entre filas
  // cuenta como una fila 25% más ancha.
  castigoPartirGrupo: 1.25,
  // La cubeta se acomoda un poco más atrás que la primera fila.
  cubetaAtras: 0.05,
  // Parte de la cubeta que siempre se ve arriba de la fila de atrás.
  cubetaVisible: 0.2,
  // Máximo de filas.
  maxFilas: 6,
};

function limpiarSkuArchivo(valor = "") {
  return String(valor)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9_.-]/g, "");
}

export function getKitProductImage(item = {}) {
  if (item.kitImage) {
    return item.kitImage;
  }

  const identificador =
    limpiarSkuArchivo(
      item.id ||
        item.sku ||
        item.code ||
        ""
    );

  if (!identificador) {
    return "";
  }

  return `/assets/margrey/productos/${identificador}.png`;
}

function recortarTransparenciaImagen(image) {
  const canvasOriginal = document.createElement("canvas");

  canvasOriginal.width =
    image.naturalWidth || image.width;

  canvasOriginal.height =
    image.naturalHeight || image.height;

  const ctxOriginal = canvasOriginal.getContext("2d", {
    willReadFrequently: true,
  });

  if (!ctxOriginal) {
    return image;
  }

  ctxOriginal.drawImage(image, 0, 0);

  const imageData = ctxOriginal.getImageData(
    0,
    0,
    canvasOriginal.width,
    canvasOriginal.height
  );

  const { data, width, height } = imageData;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];

      if (alpha > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return image;
  }

  const padding = 4;

  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(width - 1, maxX + padding);
  maxY = Math.min(height - 1, maxY + padding);

  const croppedWidth = maxX - minX + 1;
  const croppedHeight = maxY - minY + 1;

  const canvasRecortado =
    document.createElement("canvas");

  canvasRecortado.width = croppedWidth;
  canvasRecortado.height = croppedHeight;

  const ctxRecortado =
    canvasRecortado.getContext("2d");

  if (!ctxRecortado) {
    return image;
  }

  ctxRecortado.drawImage(
    canvasOriginal,
    minX,
    minY,
    croppedWidth,
    croppedHeight,
    0,
    0,
    croppedWidth,
    croppedHeight
  );

  return canvasRecortado;
}

function cargarImagenCanvas(src) {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(
        new Error(
          "El producto no tiene una imagen asignada."
        )
      );

      return;
    }

    const image = new Image();

    image.onload = () => {
      try {
        resolve(recortarTransparenciaImagen(image));
      } catch (error) {
        console.warn(
          "No se pudo recortar automáticamente:",
          src,
          error
        );

        resolve(image);
      }
    };

    image.onerror = () => {
      reject(
        new Error(
          `No se pudo cargar la imagen: ${src}`
        )
      );
    };

    image.src = src;
  });
}

/*
 * Contenido de la presentación en mililitros
 * (los gramos se toman como mililitros).
 * Regresa 0 si la descripción no trae medida.
 */
export function getVolumenPresentacionMl(item = {}) {
  // Para envases cuyo contenido no corresponde a su
  // tamaño (p. ej. miel de 1.370 kg en botella de 1 L).
  if (item.kitVolumenMl > 0) return item.kitVolumenMl;

  const textos = [
    item.unitDescription,
    item.description,
    item.name,
  ]
    .filter(Boolean)
    .map((texto) => String(texto).toUpperCase());

  const numero = (valor) =>
    Number(String(valor).replace(",", "."));

  for (const texto of textos) {
    const ml = texto.match(/(\d+(?:[.,]\d+)?)\s*ML\b/);
    if (ml) return numero(ml[1]);

    const litros = texto.match(
      /(\d+(?:[.,]\d+)?)\s*(?:LT|LTS|L|LITRO|LITROS)\b/
    );
    if (litros) return numero(litros[1]) * 1000;

    const kg = texto.match(/(\d+(?:[.,]\d+)?)\s*(?:KG|KGS)\b/);
    if (kg) return numero(kg[1]) * 1000;

    const gramos = texto.match(
      /(\d+(?:[.,]\d+)?)\s*(?:G|GR|GRS)\b/
    );
    if (gramos) return numero(gramos[1]);

    if (/GAL[OÓ]N/.test(texto)) return 3785;
  }

  return 0;
}

/*
 * Altura real aproximada (cm) a partir del contenido
 * y de la forma de la foto (ancho / alto).
 *
 * Supone que el envase es casi tan profundo como ancho:
 * volumen ≈ ancho² × alto. Así un frasco chato (crema)
 * sale bajito y una botella delgada sale alta con el
 * mismo contenido. Calibrado para que una botella de
 * 1 L mida unos 28 cm y un galón unos 30 cm.
 */
export function estimarAlturaRealCm(volumenMl, proporcion) {
  if (!(volumenMl > 0) || !(proporcion > 0)) {
    return ALTURA_SIN_PRESENTACION_CM;
  }

  const forma = Math.min(3, Math.max(0.15, proporcion));
  const altura =
    1.3 * Math.cbrt(volumenMl / (forma * forma));

  // Galones, porrones y cubetas nunca salen más
  // chicos que una botella de 1 L.
  const minimo =
    volumenMl >= 10000
      ? 38
      : volumenMl >= 4500
        ? 33
        : volumenMl >= 3000
          ? 31
          : 5;

  return Math.min(48, Math.max(minimo, altura));
}

/*
 * Ancho de una fila ya ordenada (en unidades de dibujo).
 */
function medirFila(fila) {
  let ancho = 0;

  fila.forEach((elemento, indice) => {
    ancho += elemento.ancho;

    if (indice > 0) {
      ancho -= traslapeEntre(fila[indice - 1], elemento);
    }
  });

  return ancho;
}

/*
 * Adicionales que van en la fila del frente
 * (microfibras y esponjas). El atomizador va
 * con los productos.
 */
function esAdicionalDeFrente(elemento) {
  return elemento.capa === "adicional" && !elemento.conProductos;
}

function traslapeEntre(anterior, siguiente) {
  const iguales = anterior.grupo === siguiente.grupo;
  const factor = !iguales
    ? DISENO_KIT.traslape
    : esAdicionalDeFrente(anterior)
      ? DISENO_KIT.traslapeIguales
      : DISENO_KIT.traslapeIgualesProducto;

  return Math.min(anterior.ancho, siguiente.ancho) * factor;
}

/*
 * Ordena una fila: piezas iguales juntas y
 * lo más alto al centro, bajando hacia las orillas.
 */
function ordenarFila(elementos) {
  const grupos = new Map();

  elementos.forEach((elemento) => {
    if (!grupos.has(elemento.grupo)) {
      grupos.set(elemento.grupo, []);
    }

    grupos.get(elemento.grupo).push(elemento);
  });

  const bloques = [...grupos.values()].sort(
    (a, b) =>
      b[0].alto - a[0].alto ||
      String(a[0].grupo).localeCompare(String(b[0].grupo))
  );

  if (!bloques.length) {
    return [];
  }

  const ordenados = [];

  bloques.forEach((bloque, indice) => {
    if (indice % 2 === 0) {
      ordenados.push(bloque);
    } else {
      ordenados.unshift(bloque);
    }
  });

  return ordenados.flat();
}

/*
 * Reparte la lista (ya ordenada de atrás hacia adelante)
 * en `cantidadFilas` filas seguidas, buscando que la fila
 * más ancha sea lo más angosta posible. Partir un grupo
 * de piezas iguales entre dos filas cuesta un poco más.
 *
 * Con `limiteUltimaFila`, solo la última fila puede
 * llevar elementos a partir de esa posición.
 */
function repartirEnFilas(
  lista,
  cantidadFilas,
  limiteUltimaFila = null
) {
  const n = lista.length;
  const anchoTramo = new Map();

  const medirTramo = (inicio, fin) => {
    const clave = `${inicio}-${fin}`;

    if (!anchoTramo.has(clave)) {
      anchoTramo.set(
        clave,
        medirFila(ordenarFila(lista.slice(inicio, fin)))
      );
    }

    return anchoTramo.get(clave);
  };

  // mejor[k][i]: menor ancho máximo usando k filas
  // para los primeros i elementos.
  const mejor = Array.from({ length: cantidadFilas + 1 }, () =>
    new Array(n + 1).fill(Infinity)
  );
  const corte = Array.from({ length: cantidadFilas + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  mejor[0][0] = 0;

  for (let k = 1; k <= cantidadFilas; k += 1) {
    for (let i = k; i <= n; i += 1) {
      if (
        limiteUltimaFila !== null &&
        k < cantidadFilas &&
        i > limiteUltimaFila
      ) {
        continue;
      }

      for (let j = k - 1; j < i; j += 1) {
        const cortaGrupo =
          j > 0 && lista[j - 1].grupo === lista[j].grupo;

        const valor =
          Math.max(mejor[k - 1][j], medirTramo(j, i)) *
          (cortaGrupo ? DISENO_KIT.castigoPartirGrupo : 1);

        if (valor < mejor[k][i]) {
          mejor[k][i] = valor;
          corte[k][i] = j;
        }
      }
    }
  }

  if (!Number.isFinite(mejor[cantidadFilas][n])) {
    return null;
  }

  const filas = [];
  let fin = n;

  for (let k = cantidadFilas; k >= 1; k -= 1) {
    const inicio = corte[k][fin];
    filas.unshift(ordenarFila(lista.slice(inicio, fin)));
    fin = inicio;
  }

  return filas;
}

/*
 * Arma la composición en unidades de dibujo y regresa
 * sus medidas totales. `factorOculta` menor a 1 separa
 * más las filas (se usa cuando sobra alto).
 */
function armarComposicion(filas, fondo, factorOculta = 1) {
  const colocaciones = [];
  const bases = [];

  const hayProductos = filas.some((fila) =>
    fila.some((elemento) => !esAdicionalDeFrente(elemento))
  );

  filas.forEach((fila, indiceFila) => {
    const altoFila = Math.max(...fila.map((e) => e.alto));

    let base = altoFila;

    if (indiceFila > 0) {
      const altoAnterior = Math.max(
        ...filas[indiceFila - 1].map((e) => e.alto)
      );

      // Una fila de puros adicionales apenas roza
      // a los productos de atrás.
      const soloAdicionales = fila.every(
        (elemento) => esAdicionalDeFrente(elemento)
      );
      const factorAdicionales =
        soloAdicionales && hayProductos
          ? DISENO_KIT.ocultaAdicionales
          : 1;

      const oculta =
        factorOculta *
        factorAdicionales *
        Math.min(
          DISENO_KIT.ocultaFondo * altoAnterior,
          DISENO_KIT.ocultaFrente * altoFila
        );

      base = bases[indiceFila - 1] + altoFila - oculta;
    }

    bases.push(base);

    const anchoFila = medirFila(fila);
    let x = -anchoFila / 2;

    fila.forEach((elemento, indice) => {
      if (indice > 0) {
        x -= traslapeEntre(fila[indice - 1], elemento);
      }

      colocaciones.push({
        elemento,
        fila: indiceFila,
        x,
        y: base - elemento.alto,
        ancho: elemento.ancho,
        alto: elemento.alto,
        // Lo del centro se dibuja encima de las orillas.
        distanciaCentro: Math.abs(x + elemento.ancho / 2),
      });

      x += elemento.ancho;
    });
  });

  if (fondo) {
    let base = fondo.alto;

    if (bases.length) {
      base = bases[0] - fondo.alto * DISENO_KIT.cubetaAtras;

      // Que siempre se vea la parte de arriba de la cubeta,
      // aunque atrás haya un porrón igual de alto.
      const topeFilaAtras =
        bases[0] - Math.max(...filas[0].map((e) => e.alto));

      base = Math.min(
        base,
        topeFilaAtras +
          fondo.alto * (1 - DISENO_KIT.cubetaVisible)
      );
    }

    colocaciones.unshift({
      elemento: fondo,
      fila: -1,
      x: -fondo.ancho / 2,
      y: base - fondo.alto,
      ancho: fondo.ancho,
      alto: fondo.alto,
      distanciaCentro: 0,
    });
  }

  const minX = Math.min(...colocaciones.map((c) => c.x));
  const maxX = Math.max(...colocaciones.map((c) => c.x + c.ancho));
  const minY = Math.min(...colocaciones.map((c) => c.y));
  const maxY = Math.max(...colocaciones.map((c) => c.y + c.alto));

  return { colocaciones, minX, maxX, minY, maxY };
}

/*
 * Calcula dónde va cada elemento.
 *
 * elementos: [{ grupo, proporcion, alturaCm, capa, conProductos }]
 *   capa: "fondo" (cubeta), "producto" o "adicional".
 *   conProductos: adicional que se acomoda con los productos.
 *
 * Regresa las colocaciones en el orden en que se
 * deben dibujar (atrás primero), en pixeles.
 */
export function planearComposicionKit(
  elementos = [],
  { ancho = KIT_SIZE, alto = KIT_SIZE } = {}
) {
  const aUnidades = (elemento, indice) => {
    const altoDibujo = Math.pow(
      Math.max(1, elemento.alturaCm),
      DISENO_KIT.suavizado
    );

    return {
      ...elemento,
      indice,
      alto: altoDibujo,
      ancho: altoDibujo * elemento.proporcion,
    };
  };

  const ordenarPorAltura = (a, b) =>
    b.alto - a.alto ||
    String(a.grupo).localeCompare(String(b.grupo));

  const todos = elementos.map(aUnidades);
  const fondo = todos.find((e) => e.capa === "fondo") || null;

  const productos = todos
    .filter((e) => e.capa === "producto" || e.conProductos)
    .sort(ordenarPorAltura);

  const adicionales = todos
    .filter(esAdicionalDeFrente)
    .sort(ordenarPorAltura);

  const frente = [...productos, ...adicionales];

  if (!frente.length && !fondo) {
    return [];
  }

  const anchoUtil = ancho * (1 - DISENO_KIT.margen * 2);
  const altoUtil = alto * (1 - DISENO_KIT.margen * 2);

  // Hasta 3 piezas siempre van lado a lado.
  const maxFilas = !frente.length
    ? 0
    : frente.length <= 3
      ? 1
      : Math.min(DISENO_KIT.maxFilas, frente.length);

  const hayMezcla = productos.length > 0 && adicionales.length > 0;

  /*
   * Repartos posibles para cierto número de filas.
   * Los adicionales siempre van al frente: comparten
   * solo la última fila con productos o van en
   * filas propias.
   */
  const opcionesDeFilas = (cantidadFilas) => {
    if (!cantidadFilas) {
      return [[]];
    }

    if (!hayMezcla || cantidadFilas === 1) {
      return [repartirEnFilas(frente, cantidadFilas)];
    }

    const opciones = [
      repartirEnFilas(frente, cantidadFilas, productos.length),
    ];

    for (
      let filasProductos = 1;
      filasProductos < cantidadFilas;
      filasProductos += 1
    ) {
      const filasAdicionales = cantidadFilas - filasProductos;

      if (
        filasProductos > productos.length ||
        filasAdicionales > adicionales.length
      ) {
        continue;
      }

      opciones.push([
        ...repartirEnFilas(productos, filasProductos),
        ...repartirEnFilas(adicionales, filasAdicionales),
      ]);
    }

    return opciones.filter(Boolean);
  };

  const medirEscala = (composicion) =>
    Math.min(
      anchoUtil / (composicion.maxX - composicion.minX),
      altoUtil / (composicion.maxY - composicion.minY)
    );

  let mejor = null;

  for (
    let cantidadFilas = maxFilas ? 1 : 0;
    cantidadFilas <= maxFilas;
    cantidadFilas += 1
  ) {
    for (const filas of opcionesDeFilas(cantidadFilas)) {
      const composicion = armarComposicion(filas, fondo);
      const escala = medirEscala(composicion);

      if (!Number.isFinite(escala) || escala <= 0) {
        continue;
      }

      // Con escala casi igual, se prefieren menos filas.
      if (!mejor || escala > mejor.escala * 1.03) {
        mejor = { ...composicion, escala, filas };
      }
    }
  }

  if (!mejor) {
    return [];
  }

  /*
   * Si lo que limita es el ancho, sobra alto:
   * se separan un poco las filas para que se
   * vean mejor las etiquetas, sin cambiar el tamaño.
   */
  if (mejor.filas.length > 1) {
    for (
      let factor = 0.95;
      factor >= DISENO_KIT.separacionMinima - 1e-9;
      factor -= 0.05
    ) {
      const prueba = armarComposicion(mejor.filas, fondo, factor);

      if ((prueba.maxY - prueba.minY) * mejor.escala > altoUtil) {
        break;
      }

      mejor = { ...prueba, escala: mejor.escala, filas: mejor.filas };
    }
  }

  const { colocaciones, minX, maxX, minY, maxY, escala } = mejor;

  const desplazamientoX =
    (ancho - (maxX - minX) * escala) / 2 - minX * escala;

  // La sombra cae hacia abajo: se sube un poco todo
  // para que los márgenes se vean parejos.
  const desplazamientoY =
    (alto - (maxY - minY) * escala) / 2 -
    minY * escala -
    alto * 0.006;

  const ordenDibujo = [...colocaciones].sort(
    (a, b) =>
      a.fila - b.fila ||
      b.distanciaCentro - a.distanciaCentro
  );

  return ordenDibujo.map((colocacion) => ({
    indice: colocacion.elemento.indice,
    capa: colocacion.elemento.capa,
    fila: colocacion.fila,
    x: desplazamientoX + colocacion.x * escala,
    y: desplazamientoY + colocacion.y * escala,
    ancho: colocacion.ancho * escala,
    alto: colocacion.alto * escala,
  }));
}

function getProporcion(image) {
  const anchoImagen = image.naturalWidth || image.width;
  const altoImagen = image.naturalHeight || image.height;

  return anchoImagen / Math.max(1, altoImagen);
}

/*
 * Toma hasta `maximo` piezas repartidas por ronda
 * (una de cada lista, luego otra...), para que el tope
 * no deje fuera un producto o un tipo de adicional.
 */
function tomarPorRondas(listas, maximo) {
  const resultado = [];

  for (let ronda = 0; resultado.length < maximo; ronda += 1) {
    let hubo = false;

    for (const lista of listas) {
      if (ronda < lista.length && resultado.length < maximo) {
        resultado.push(lista[ronda]);
        hubo = true;
      }
    }

    if (!hubo) break;
  }

  return resultado;
}

function obtenerPiezasKit({
  cart = [],
  microfibras = 0,
  esponjas = 0,
  microfibrasGrandes = 0,
  cubetas = 0,
  atomizadores = 0,
}) {
  // Una lista por línea del carrito.
  const productosPorLinea = cart.map((item) => {
    const piezas = [];
    const cantidad = Math.max(0, Number(item.qty || 0));
    const imagen = getKitProductImage(item);

    for (let i = 0; i < cantidad; i += 1) {
      piezas.push({
        capa: "producto",
        name: item.product,
        sku: item.sku || item.code || "",
        description: item.description || "",
        image: imagen,
        volumenMl: getVolumenPresentacionMl(item),
        alturaCm:
          ALTURA_FIJA_KIT_CM[
            String(item.sku || "").trim().toUpperCase()
          ],
        grupo:
          item.sku ||
          item.code ||
          imagen ||
          `${item.product}-${item.description}`,
      });
    }

    return piezas;
  });

  // Una lista por tipo de adicional.
  const crearAdicionales = (tipo, cantidad) => {
    const datos = ADICIONALES_KIT[tipo];
    const piezas = [];

    for (let i = 0; i < Math.max(0, Number(cantidad || 0)); i += 1) {
      piezas.push({
        capa: "adicional",
        type: tipo,
        name: datos.nombre,
        image: datos.image,
        alturaCm: datos.alturaCm,
        conProductos: Boolean(datos.conProductos),
        grupo: tipo,
      });
    }

    return piezas;
  };

  const adicionalesPorTipo = [
    crearAdicionales("microfibraGrande", microfibrasGrandes),
    crearAdicionales("microfibra", microfibras),
    crearAdicionales("esponja", esponjas),
    crearAdicionales("atomizador", atomizadores),
  ];

  const fondo =
    Number(cubetas || 0) > 0
      ? [
          {
            capa: "fondo",
            type: "cubeta",
            name: ADICIONALES_KIT.cubeta.nombre,
            image: ADICIONALES_KIT.cubeta.image,
            volumenMl: ADICIONALES_KIT.cubeta.volumenMl,
            grupo: "cubeta",
          },
        ]
      : [];

  return {
    piezas: [
      ...fondo,
      ...tomarPorRondas(productosPorLinea, MAX_KIT_PRODUCTS),
      ...tomarPorRondas(adicionalesPorTipo, MAX_KIT_ACCESSORIES),
    ],
    productosSolicitados: productosPorLinea.flat().length,
    adicionalesSolicitados: adicionalesPorTipo.flat().length,
  };
}

export async function generarImagenKitCanvas({
  cart,
  microfibras = 0,
  esponjas = 0,
  microfibrasGrandes = 0,
  cubetas = 0,
  atomizadores = 0,
}) {
  const datos = obtenerPiezasKit({
    cart,
    microfibras,
    esponjas,
    microfibrasGrandes,
    cubetas,
    atomizadores,
  });

  if (!datos.piezas.length) {
    throw new Error(
      "Agrega productos o adicionales antes de generar la imagen."
    );
  }

  const canvas = document.createElement("canvas");

  canvas.width = KIT_SIZE;
  canvas.height = KIT_SIZE;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No se pudo crear el canvas.");
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, KIT_SIZE, KIT_SIZE);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Cada archivo se carga y recorta una sola vez,
  // aunque el kit traiga varias piezas iguales.
  const cargas = new Map();

  const cargar = (src) => {
    if (!cargas.has(src)) {
      cargas.set(src, cargarImagenCanvas(src));
    }

    return cargas.get(src);
  };

  // Un solo plazo para todo el lote: si una imagen
  // no responde, el botón no se queda "generando".
  const VENCIDO = Symbol("vencido");
  let temporizador;
  const plazo = new Promise((resolve) => {
    temporizador = setTimeout(
      () => resolve(VENCIDO),
      LIMITE_CARGA_MS
    );
  });

  const resultados = await Promise.all(
    datos.piezas.map((pieza) =>
      Promise.race([cargar(pieza.image), plazo]).then(
        (valor) =>
          valor === VENCIDO
            ? { status: "tiempo" }
            : { status: "fulfilled", value: valor },
        () => ({ status: "rejected" })
      )
    )
  );

  clearTimeout(temporizador);

  const cargadas = [];
  const faltantes = [];

  resultados.forEach((resultado, index) => {
    const pieza = datos.piezas[index];

    if (resultado.status === "fulfilled") {
      cargadas.push({ ...pieza, loadedImage: resultado.value });
    } else {
      faltantes.push({
        ...pieza,
        motivo:
          resultado.status === "tiempo" ? "tiempo" : "archivo",
      });
    }
  });

  if (!cargadas.length) {
    throw new Error(
      "No se pudo cargar ninguna imagen. Revisa las rutas de los PNG."
    );
  }

  const elementos = cargadas.map((pieza) => {
    const proporcion = getProporcion(pieza.loadedImage);
    const alturaCm =
      pieza.alturaCm ||
      estimarAlturaRealCm(pieza.volumenMl, proporcion);

    return {
      capa: pieza.capa,
      grupo: pieza.grupo,
      conProductos: pieza.conProductos,
      proporcion,
      alturaCm,
    };
  });

  const colocaciones = planearComposicionKit(elementos, {
    ancho: KIT_SIZE,
    alto: KIT_SIZE,
  });

  colocaciones.forEach((colocacion) => {
    const pieza = cargadas[colocacion.indice];

    // Sombra suave para separar las piezas encimadas.
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.18)";
    ctx.shadowBlur = Math.max(6, colocacion.alto * 0.035);
    ctx.shadowOffsetY = Math.max(2, colocacion.alto * 0.012);

    ctx.drawImage(
      pieza.loadedImage,
      colocacion.x,
      colocacion.y,
      colocacion.ancho,
      colocacion.alto
    );

    ctx.restore();
  });

  const productosMostrados = cargadas.filter(
    (pieza) => pieza.capa === "producto"
  ).length;

  const adicionalesMostrados = cargadas.filter(
    (pieza) => pieza.capa === "adicional"
  ).length;

  return {
    dataUrl: canvas.toDataURL("image/png", 1),
    faltantes,
    totalMostrado: productosMostrados,
    totalSolicitado: datos.productosSolicitados,
    accesoriosMostrados: adicionalesMostrados,
    accesoriosSolicitados: datos.adicionalesSolicitados,
  };
}
