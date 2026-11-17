import { useMemo, useRef, useState } from "react";
import detallesProductos from "./datos/detallesProductos.json";
import {
  agruparPorProducto,
  CAMPOS_DETALLE,
  construirBaseProductos,
  fichaCompleta,
  tieneValor,
} from "./detallesProductos";

const ESTADOS = {
  completo: { texto: "Completo", clase: "bg-green-100 text-green-800" },
  parcial: { texto: "Parcial", clase: "bg-amber-100 text-amber-800" },
  pendiente: { texto: "Pendiente", clase: "bg-gray-100 text-gray-600" },
};

const FILTROS = [
  { valor: "todos", texto: "Todos" },
  { valor: "con-info", texto: "Con información" },
  { valor: "pendiente", texto: "Pendientes" },
];

function etiquetaPar(clave) {
  const texto = clave.replace(/([A-Z])/g, " $1").toLowerCase();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function ValorCampo({ campo, valor }) {
  if (!tieneValor(valor)) {
    return <p className="text-sm italic text-gray-400">Pendiente</p>;
  }

  if (campo.tipo === "texto") {
    return <p className="text-sm text-gray-800 whitespace-pre-line">{valor}</p>;
  }

  if (campo.tipo === "lista") {
    const Lista = campo.clave === "modoDeUso" ? "ol" : "ul";
    return (
      <Lista
        className={`text-sm text-gray-800 space-y-1 pl-5 ${
          Lista === "ol" ? "list-decimal" : "list-disc"
        }`}
      >
        {valor.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </Lista>
    );
  }

  if (campo.tipo === "dilucion") {
    return (
      <div className="overflow-x-auto">
        <table className="text-sm text-gray-800 w-full">
          <tbody>
            {valor.map((fila, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="py-1 pr-3 font-medium align-top">{fila.uso}</td>
                <td className="py-1 align-top">{fila.proporcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (campo.tipo === "pares") {
    return (
      <dl className="text-sm text-gray-800 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
        {Object.entries(valor)
          .filter(([, v]) => tieneValor(v))
          .map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-medium text-gray-600">{etiquetaPar(k)}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>
    );
  }

  return null;
}

function fichaComoTexto(grupo, info) {
  const lineas = [`${grupo.producto} · ${grupo.marca}`];
  lineas.push(
    `Presentaciones: ${grupo.presentaciones
      .map((p) => p.descripcion)
      .filter(Boolean)
      .join(", ")}`
  );
  for (const campo of CAMPOS_DETALLE) {
    const valor = info.ficha[campo.clave];
    if (!tieneValor(valor)) continue;
    lineas.push("", `${campo.etiqueta}:`);
    if (campo.tipo === "texto") lineas.push(valor);
    if (campo.tipo === "lista") valor.forEach((v) => lineas.push(`- ${v}`));
    if (campo.tipo === "dilucion")
      valor.forEach((v) => lineas.push(`- ${v.uso}: ${v.proporcion}`));
    if (campo.tipo === "pares")
      Object.entries(valor).forEach(([k, v]) => lineas.push(`- ${etiquetaPar(k)}: ${v}`));
  }
  return lineas.join("\n");
}

function TarjetaDetalle({ grupo, abierta, onToggle, avisar }) {
  const info = useMemo(
    () => fichaCompleta(detallesProductos, grupo.marca, grupo.producto),
    [grupo.marca, grupo.producto]
  );
  const estado = ESTADOS[info.estado];
  const imagen = grupo.presentaciones.find((p) => p.imagen)?.imagen;

  async function copiar() {
    try {
      await navigator.clipboard.writeText(fichaComoTexto(grupo, info));
      avisar("Ficha copiada.");
    } catch {
      avisar("No se pudo copiar la ficha en este navegador.");
    }
  }

  return (
    <article className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={abierta}
        className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50"
      >
        <div className="w-16 h-16 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
          {imagen ? (
            <img
              src={imagen}
              alt={grupo.producto}
              loading="lazy"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <i className="fas fa-image text-gray-300 text-xl" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-500">{grupo.marca}</p>
          <p className="font-semibold text-gray-900 leading-tight">{grupo.producto}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {grupo.presentaciones.length}{" "}
            {grupo.presentaciones.length === 1 ? "presentación" : "presentaciones"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${estado.clase}`}>
            {estado.texto}
          </span>
          <span className="text-[11px] text-gray-400">
            {info.avance.llenos}/{info.avance.total} básicos
          </span>
          <i className={`fas fa-chevron-${abierta ? "up" : "down"} text-gray-400 text-xs`} />
        </div>
      </button>

      {abierta && (
        <div className="border-t border-gray-100 p-4 space-y-4">
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
              Presentaciones
            </h4>
            <ul className="text-sm text-gray-800 space-y-1">
              {grupo.presentaciones.map((p, i) => (
                <li key={i} className="flex flex-wrap gap-x-3">
                  <span className="font-medium">{p.descripcion || "—"}</span>
                  {p.empaque && <span className="text-gray-500">{p.empaque}</span>}
                  {p.sku && <span className="text-gray-500">SKU {p.sku}</span>}
                  {p.codigoBarras && (
                    <span className="text-gray-500">Código {p.codigoBarras}</span>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#FF1419] hover:underline"
                    >
                      Ver en tienda
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            {CAMPOS_DETALLE.map((campo) => (
              <section key={campo.clave}>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                  {campo.etiqueta}
                </h4>
                <ValorCampo campo={campo} valor={info.ficha[campo.clave]} />
              </section>
            ))}
          </div>

          {(info.notas || info.pendientes.length > 0) && (
            <section className="rounded-xl bg-amber-50 p-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-800 mb-1">
                Falta confirmar
              </h4>
              {info.notas && <p className="text-sm text-amber-900">{info.notas}</p>}
              <ul className="text-sm text-amber-900 list-disc pl-5">
                {info.pendientes.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
              Fuentes
            </h4>
            {info.fuentes.length === 0 ? (
              <p className="text-sm italic text-gray-400">Sin fuente todavía</p>
            ) : (
              <ul className="text-sm text-gray-700 space-y-1">
                {info.fuentes.map((f, i) => (
                  <li key={i}>
                    <span className="capitalize">{f.tipo}</span>
                    {f.fecha && <span className="text-gray-400"> · {f.fecha}</span>}
                    {" · "}
                    {/^https?:\/\//.test(f.referencia || "") ? (
                      <a
                        href={f.referencia}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#FF1419] hover:underline break-all"
                      >
                        {f.referencia}
                      </a>
                    ) : (
                      f.referencia
                    )}
                    {f.nota && <span className="text-gray-500"> ({f.nota})</span>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={copiar}
              disabled={info.estado === "pendiente"}
              className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-40"
            >
              <i className="fas fa-copy mr-2" />
              Copiar ficha
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default function VistaDetalles({ filtered, todosLosProductos }) {
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [abierta, setAbierta] = useState(null);
  const [aviso, setAviso] = useState("");
  const avisoTimer = useRef(null);

  const grupos = useMemo(() => {
    return agruparPorProducto(filtered).map((g) => ({
      ...g,
      estado: fichaCompleta(detallesProductos, g.marca, g.producto).estado,
    }));
  }, [filtered]);

  const conteo = useMemo(() => {
    const conInfo = grupos.filter((g) => g.estado !== "pendiente").length;
    return { total: grupos.length, conInfo, pendientes: grupos.length - conInfo };
  }, [grupos]);

  const visibles = grupos.filter((g) => {
    if (filtroEstado === "con-info") return g.estado !== "pendiente";
    if (filtroEstado === "pendiente") return g.estado === "pendiente";
    return true;
  });

  const porMarca = useMemo(() => {
    const mapa = new Map();
    for (const g of visibles) {
      if (!mapa.has(g.marca)) mapa.set(g.marca, []);
      mapa.get(g.marca).push(g);
    }
    return [...mapa.entries()];
  }, [visibles]);

  function avisar(texto) {
    setAviso(texto);
    window.clearTimeout(avisoTimer.current);
    avisoTimer.current = window.setTimeout(() => setAviso(""), 3500);
  }

  function descargarBase() {
    const base = construirBaseProductos(detallesProductos, todosLosProductos);
    const blob = new Blob([JSON.stringify(base, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "base-productos.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-5 pb-24 space-y-4">
      <div className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Detalles de productos</h2>
            <p className="text-sm text-gray-600">
              Uso, dilución, aplicación y precauciones de cada producto. Lo que no tiene
              fuente todavía aparece como pendiente.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={descargarBase}
              className="rounded-xl bg-[#FF1419] text-white px-3 py-2 text-sm font-medium hover:bg-red-700"
            >
              <i className="fas fa-download mr-2" />
              Descargar base (JSON)
            </button>
            <a
              href="/datos/base-productos.json"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
            >
              Ver JSON en línea
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {FILTROS.map((f) => (
            <button
              key={f.valor}
              type="button"
              onClick={() => setFiltroEstado(f.valor)}
              className={`rounded-full px-3 py-1 text-sm border transition ${
                filtroEstado === f.valor
                  ? "bg-[#FF1419] text-white border-[#FF1419]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {f.texto}
              <span className="ml-1 opacity-75">
                {f.valor === "todos"
                  ? conteo.total
                  : f.valor === "con-info"
                  ? conteo.conInfo
                  : conteo.pendientes}
              </span>
            </button>
          ))}
        </div>
      </div>

      {porMarca.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No hay productos con estos filtros.
        </p>
      )}

      {porMarca.map(([marca, lista]) => (
        <section key={marca} className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 px-1">
            {marca} <span className="font-normal">· {lista.length}</span>
          </h3>
          <div className="grid gap-2 lg:grid-cols-2 items-start">
            {lista.map((g) => (
              <TarjetaDetalle
                key={g.id}
                grupo={g}
                abierta={abierta === g.id}
                onToggle={() => setAbierta(abierta === g.id ? null : g.id)}
                avisar={avisar}
              />
            ))}
          </div>
        </section>
      ))}

      {aviso && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-gray-900 text-white text-sm px-4 py-2 shadow-lg flex items-center gap-3"
        >
          {aviso}
          <button
            type="button"
            onClick={() => setAviso("")}
            aria-label="Cerrar aviso"
            className="text-white/70 hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
