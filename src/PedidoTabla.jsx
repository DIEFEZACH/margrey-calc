// src/PedidoMargrey.jsx
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  generarImagenKitCanvas,
  getKitProductImage,
  MAX_KIT_ACCESSORIES,
  MAX_KIT_PRODUCTS,
} from "./kitImagen";
import {
  comision,
  desglose,
  pesoFacturable,
  precioParaRecibir,
} from "./mlCostos";
import { imagenesZach } from "./zachImagenes";

/** =======================
 *  Base de productos
 *  ======================= */
const productCatalog = [
  { product: "AUTO BRILLO A", category: "AUTO BRILLO A", name: "auto brillo a" },
  { product: "AUTO BRILLO A", code: "7501716100013", sku: "0101-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 816.00, unitPrice: 68.00, link: "https://www.comercializadoradtup.com/products/autobrillo-a-margrey-500ml-abrillantador-tableros-llantas?variant=45042030673964", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/autobrillo_A_500_llciin.jpg"},
  { product: "AUTO BRILLO A", code: "7501716100020", sku: "0101-01-213", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 1200.00, unitPrice: 100.00, link: "https://www.comercializadoradtup.com/products/autobrillo-a-margrey-1-l-tablero-llantas?variant=45041173561388", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/autobrillo_A_1_mmxj1v.jpg"},
  { product: "AUTO BRILLO A", code: "7501716100037", sku: "0101-01-301", description: "PORRON 5 LT", price: 456.50, unitPrice: 91.30, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "AUTO BRILLO A", code: "7501716100044", sku: "0101-01-303", description: "PORRON 25 LT", price: 2149.00, unitPrice: 85.96, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "AUTO BRILLO A", code: "7501716100068", sku: "0101-01-307", description: "TAMBOR 208 LT", price: 15683.50, unitPrice: 75.40, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291911/9c5fb46b5743e810b326d588833f16c3984ae579f78009ca90032acdd62de431_tovtvj.png" },
  { product: "AUTO BRILLO S", category: "AUTO BRILLO S", name: "auto brillo s" },
  { product: "AUTO BRILLO S", code: "7501716107838", sku: "0102-01-211", description: "CAJA 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 828.00, unitPrice: 69.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/auto_brillo_s_500_xdunv8.jpg", link: "https://www.comercializadoradtup.com/products/autobrillo-s-margrey-500ml-abrillantador-hules-plasticos?variant=45042041258028" },
  { product: "AUTO BRILLO S", code: "7501716100082", sku: "0102-01-213", description: "CAJA 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 1428.00, unitPrice: 119.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/autobrillo_S_1_ikkfxl.jpg", link: "https://www.comercializadoradtup.com/products/autobrillo-s-original-margrey-1-l?variant=45041195024428" },
  { product: "AUTO BRILLO S", code: "7501716100099", sku: "0102-01-301", description: "PORRON 5 LT", price: 563.50, unitPrice: 112.70, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "AUTO BRILLO S", code: "7501716100105", sku: "0102-01-303", description: "PORRON 25 LT", price: 2606.00, unitPrice: 104.24, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "AUTO BRILLO S", code: "7501716108507", sku: "0102-01-240", description: "CAJA 12 AEROSOL 473 ML", unitDescription: "PIEZA INDIVIDUAL 473 ML", price: 858.00, unitPrice: 71.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/autobrillo_S_aerosol_dmxriw.jpg", link:"https://www.comercializadoradtup.com/products/autobrillo-s-aerosol-margrey-495-ml?variant=45041236869164" },
  { product: "SILICREM", category: "SILICREM", name: "silicrem" },
  { product: "SILICREM C/E", code: "7501716107647", sku: "0105-01-221", description: "CAJA 24 PIEZAS 300 ML", unitDescription: "PIEZA INDIVIDUAL 300 ML", price: 1188.00, unitPrice: 49.50, link: "https://www.comercializadoradtup.com/products/silicrem-margrey-300g-con-2-esponjas?_pos=2&_psq=SILICREM&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/silicrem_300_zfdupy.jpg"},
  { product: "SILICREM C/E", code: "7501716100143", sku: "0105-01-206", description: "CAJA 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 753.00, unitPrice: 125.50, link:"https://www.comercializadoradtup.com/products/silicrem-margrey-1kg-crema-silicones-llantas-vinil?variant=45203056197676", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/silicrem_1_wfmiz3.jpg"},
  { product: "SILICREM", code: "7501716100167", sku: "0105-01-402", description: "CUBETA 19 LT", price: 1732.50, unitPrice: 91.18, image:"https://res.cloudinary.com/diefezach/image/upload/v1726875085/IMG_0777_lopebl.jpg" },
  { product: "LEATHER CLEAN", category: "LEATHER CLEAN", name: "leather clean" },
  { product: "LEATHER CLEAN", code: "7501716103854", sku: "0107-01-235", description: "PAQUETE 12 PIEZAS 250 ML", unitDescription: "PIEZA INDIVIDUAL 250 ML", price: 714.00, unitPrice: 59.50,  link: "https://www.comercializadoradtup.com/products/leather-clean-margrey-250-ml?_pos=1&_psq=leath&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/leather_clean_ve45zc.jpg"},
  { product: "LEATHER CLEAN", code: "7501716102536", sku: "0107-01-401", description: "CUBETA 4 LT", price: 822.50, unitPrice: 205.63, image: "https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "OIL RESTORER", category: "OIL RESTORER", name: "oil restore" },
  { product: "OIL RESTORER", code: "7501716106138", sku: "0116-22-278", description: "CAJA 12 PIEZAS 50 ML", unitDescription: "PIEZA INDIVIDUAL 50 ML", price: 672.00, unitPrice: 56.00, link: "https://www.comercializadoradtup.com/products/black-oil-restorer-margrey-50-ml?_pos=1&_psq=oil&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/oil_restorer_tc8ode.jpg"},
  { product: "AUTOBRILLO ATOMIZABLE", category: "AUTOBRILLO ATOMIZABLE", name: "autobrillo atomizable" },
  { product: "AUTOBRILLO ATOMIZABLE", code: "7501716107739", sku: "0120-01-231", description: "CAJA 6 PIEZAS 600 ML CON ATOMIZADOR", unitDescription: "PIEZA INDIVIDUAL 600 ML", price: 276.00, unitPrice: 46.00, link:"https://www.comercializadoradtup.com/products/autobrillo-margrey-600-ml-llantas-plasticos?_pos=4&_psq=autobrillo&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/autobrillo_frxg6i.jpg"},
  { product: "ABRILLANTADOR QM", category: "ABRILLANTADOR QM", name: "abrillantador qm"},
  { product: "ABRILLANTADOR QM", code: "7501716100341", sku: "0401-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 1098.00, unitPrice: 91.50, link: "https://www.comercializadoradtup.com/products/abrillantador-qm-margrey-500-ml?_pos=1&_psq=qm&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/abrillantador_QM_vuejq5.jpg"},
  { product: "ABRILLANTADOR QM", code: "7501716100358", sku: "0401-01-301", description: "PORRON 5 LT", price: 682.00, unitPrice: 136.40, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "FINO TOUCH", category: "FINO TOUCH", name: "fino touch" },
  { product: "FINO TOUCH", code: "7501716100402", sku: "0402-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 990.00, unitPrice: 82.50, link: "https://www.comercializadoradtup.com/products/fino-touch-carnauba-margrey-500-ml?variant=45041413226540", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873365/fino_touch_qkbk51.jpg"},
  { product: "PRE-LAVADOR", category: "PRE-LAVADOR", name: "prelavador" },
  { product: "PRELAVADOR ALCALINO", code: "-", sku: "0412-01-201", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 1176.00, unitPrice: 98.00, link: "https://www.comercializadoradtup.com/products/pre-lavado-shampoo-alcalino-margrey-1-l-descontaminante-auto-elimina-grasa-e-insectos?_pos=1&_psq=pre&_ss=e&_v=1.0", image:"https://res.cloudinary.com/dl2s0vpwb/image/upload/v1768537787/prelavador_qp1grh.png"},
  { product: "PULIMENTO AZUL", category: "PULIMENTO AZUL", name: "pulimento azul" },
  { product: "PULIMENTO AZUL", code: "7501716100280", sku: "0403-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 1038.00, unitPrice: 86.50, link:"https://www.comercializadoradtup.com/products/pulimento-azul-margrey-500-ml?_pos=2&_psq=AZUL&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873370/pulimento_azul_sfrvbk.jpg"},
  { product: "PULIMENTO AZUL", code: "7501716100334", sku: "0403-01-402", description: "CUBETA 19 LT", price: 2344.50, unitPrice: 123.39, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "PULIMENTO BLANCO", category: "PULIMENTO BLANCO", name: "pulimento blanco" },
  { product: "PULIMENTO BLANCO", code: "7501716106671", sku: "0404-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 1038.00, unitPrice: 86.50, link:"https://www.comercializadoradtup.com/products/pulimento-blanco-margrey-500-ml?_pos=2&_psq=blanco&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873370/pulimento_blanco_lw0sar.jpg"},
  { product: "PULIMENTO BLANCO", code: "7501716100242", sku: "0404-01-402", description: "CUBETA 19 LT", price: 2344.50, unitPrice: 123.39, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "PULIMENTO ROSA", category: "PULIMENTO ROSA", name: "pulimento rosa" },
  { product: "PULIMENTO ROSA", code: "7501716100259", sku: "0406-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 1038.00, unitPrice: 86.50, link: "https://www.comercializadoradtup.com/products/pulimento-rosa-margrey-500-ml?_pos=2&_psq=rosa&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873372/pulimento_rosa_vhptwp.jpg"},
  { product: "PULIMENTO ROSA", code: "7501716100273", sku: "0406-01-402", description: "CUBETA 19 LT", price: 2344.50, unitPrice: 123.39, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "CERA EXPRESS", category: "CERA EXPRESS", name: "cera express" },
  { product: "CERA EXPRESS", code: "7501716100488", sku: "0416-01-231", description: "CAJA 6 PIEZAS 600 ML CON ATOMIZADOR", unitDescription: "PIEZA INDIVIDUAL 600 ML", price: 351.00, unitPrice: 58.50, link: "https://www.comercializadoradtup.com/products/cera-rapida-margrey-600-ml-spray?_pos=2&_psq=rapida&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cera_rapida_jh2lex.jpg"},
  { product: "CERA EXPRESS", code: "7501716102673", sku: "0416-01-303", description: "PORRON 25 LT", price: 1494.50, unitPrice: 59.78, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "PULIMENTO SUPER CORTE", category: "PULIMENTO SUPER CORTE", name: "pulimento super corte" },
  { product: "PULIMENTO SUPER CORTE", code: "7501716102277", sku: "0418-01-235", description: "PAQUETE 12 PIEZAS 250 ML", unitDescription: "PIEZA INDIVIDUAL 250 ML", price: 1062.00, unitPrice: 88.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1759292764/Margrey_2025_uorgiw.jpg"},
  { product: "PULIMENTO SUPER CORTE", code: "7501716103045", sku: "0418-01-201", description: "CAJA 4 PIEZAS DE 3.8 LT", price: 3232.00, unitPrice: 808.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "PULIMENTO RESTAURADOR DE FAROS", category: "PULIMENTO RESTAURADOR DE FAROS", name: "pulimento restaurador de faros" },
  { product: "PULIMENTO RESTAURADOR DE FAROS", code: "7501716105582", sku: "0422-01-253", description: "PAQUETE 6 PIEZAS 130 ML", unitDescription: "PIEZA INDIVIDUAL 130 ML", price: 372.00, unitPrice: 31.00, link: "https://www.comercializadoradtup.com/products/restaurador-de-faros-margrey-130-ml?_pos=2&_psq=faros&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873372/restaurador_faros_130_jfydce.jpg"},
  { product: "PULIMENTO RESTAURADOR DE FAROS", code: "7501716104813", sku: "0422-01-235", description: "PAQUETE 12 PIEZAS 250 ML", unitDescription: "PIEZA INDIVIDUAL 250 ML", price: 630.00, unitPrice: 52.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/restaurador_faros_250_bghu6v.jpg", link:"https://www.comercializadoradtup.com/products/restaurador-de-faros-margrey-250-ml?_pos=1&_psq=faros&_ss=e&_v=1.0"},
  { product: "PLASTI-MAGIC", category: "PLASTI-MAGIC", name: "plasti-magic" },
  { product: "PLASTI-MAGIC", code: "7501716108378", sku: "0423-01-247", description: "CAJA 12 PIEZAS 100 GR", unitDescription: "PIEZA INDIVIDUAL 100 GR", price: 696.00, unitPrice: 58.00, link:"https://www.comercializadoradtup.com/products/plasti-magic-margrey-100g-lubricante-60ml?_pos=1&_psq=plasti&_ss=e&_v=1.0", image:"https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1792387478/margrey/plasti-magic-100g-0423-01-247.png"},
  { product: "PLASTI-MAGIC", code: "7502275980207", sku: "0423-01-238", description: "CAJA 12 PIEZAS 200 GR", unitDescription: "PIEZA INDIVIDUAL 200 GR", price: 1248.00, unitPrice: 104.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/plasti_magic_200_wz2leq.jpg", tag: "promotion", link:"https://www.comercializadoradtup.com/products/plasti-magic-margrey-200g-lubricante-60ml?_pos=7&_psq=plas&_ss=e&_v=1.0" },
  { product: "3 EN 1 TOP POLISH", category: "3 EN 1 TOP POLISH", name: "3 en 1 top polish" },
  { product: "3 EN 1 TOP POLISH", code: "7501716105957", sku: "0429-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 1038.00, unitPrice: 86.50, link: "https://www.comercializadoradtup.com/products/pulimento-3-en-1-top-polish-margrey-500-ml?_pos=1&_psq=3+en+1&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873370/pulimento_3_en_1_nteocl.jpg"},
  { product: "ALUMBRA", category: "ALUMBRA", name: "alumbra" },
  { product: "ALUMBRA", code: "7501716100983", sku: "0501-01-213", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 768.00, unitPrice: 64.00, link:"https://www.comercializadoradtup.com/products/alumbra-margrey-1l-limpiador-aluminio-acero?_pos=1&_psq=alumbra&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/alumbra_1_ns4lrh.jpg"},
  { product: "ALUMBRA", code: "7501716100990", sku: "0501-01-301", description: "PORRON 5 LT", price: 275.50, unitPrice: 55.10, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "ALUMBRA", code: "7501716101003", sku: "0501-01-303", description: "PORRON 25 LT", price: 1208.00, unitPrice: 48.32, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "DESGRAMOT", category: "DESGRAMOT", name: "desgramot" },
  { product: "DESGRAMOT", code: "7501716101096", sku: "0502-01-213", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 1350.00, unitPrice: 112.50, link:"https://www.comercializadoradtup.com/products/desgramot-margrey-1l-desengrasante-motor?_pos=1&_psq=desgramot&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1731041571/desgramot_m5tzde.jpg"},
  { product: "DESGRAMOT", code: "7501716110119", sku: "0502-01-303", description: "PORRON 25 LT", price: 2150.50, unitPrice: 86.02, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "FINGRAS", category: "FINGRAS", name: "fingras" },
  { product: "FINGRAS", code: "7501716101041", sku: "0504-01-213", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 678.00, unitPrice: 56.50, link:"https://www.comercializadoradtup.com/products/fin-gras-margrey-1l-desengrasante-alcalino?_pos=2&_psq=fin+gra&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873366/fin_gras_c0ai1z.jpg"},
  { product: "FINGRAS", code: "7501716101058", sku: "0504-01-301", description: "PORRON 5 LT", price: 253.00, unitPrice: 50.60, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "FINGRAS", code: "7501716101065", sku: "0504-01-303", description: "PORRON 25 LT", price: 912.50, unitPrice: 36.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "FINGRAS", code: "7501716101089", sku: "0504-01-307", description: "TAMBOR 208 LT", price: 6758.50, unitPrice: 32.49, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291911/9c5fb46b5743e810b326d588833f16c3984ae579f78009ca90032acdd62de431_tovtvj.png" },
  { product: "QUITA GOMA", category: "QUITA GOMA", name: "quita goma" },
  { product: "QUITA GOMA", code: "7501716108811", sku: "0506-01-254", description: "CAJA 12 PIEZAS 130 ML", unitDescription: "PIEZA INDIVIDUAL 130 ML", price: 348.00, unitPrice: 29.00, link:"", image:"https://res.cloudinary.com/dl2s0vpwb/image/upload/v1791775423/quita_goma_margrey_130ml.png"},
  { product: "QUITA GOMA", code: "7501716108903", sku: "0506-01-201", description: "CAJA 4 PIEZAS 3.8 LT", unitDescription: "PIEZA INDIVIDUAL 3.8 LT", price: 2038.00, unitPrice: 509.50, link:"", image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png"},
  { product: "AFLOJA FÁCIL", category: "AFLOJA FÁCIL", name: "afloja fácil" },
  { product: "AFLOJA FACIL", code: "7501716108866", sku: "0506-01-242", description: "CAJA 12 PIEZAS 296 ML", unitDescription: "PIEZA INDIVIDUAL 296 ML", price: 564.00, unitPrice: 47.00, link:"https://www.comercializadoradtup.com/products/afloja-facil-margrey-296-ml?_pos=1&_psq=afloja&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1759291882/Margrey_2025_ep0qzh.jpg"},
  { product: "LIMPIADOR DE RINES Y MOTORES", category: "LIMPIADOR DE RINES Y MOTORES", name: "limpiador de rines y motores" },
  { product: "LIMPIADOR DE RINES Y MOTORES", code: "7501716107722", sku: "0532-01-231", description: "CAJA 6 PIEZAS 600 ML CON ATOMIZADOR", unitDescription: "PIEZA INDIVIDUAL 600 ML", price: 276.00, unitPrice: 46.00, link:"https://www.comercializadoradtup.com/products/limpiador-rines-motores-llantas-margrey-600-ml?_pos=7&_psq=limpi&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/rines_motores_llantas_y_rines_afizj0.jpg"},
  { product: "FRAGANCIA VAINILLA", category: "FRAGANCIA VAINILLA", name: "fragancia vainilla" },
  { product: "FRAGANCIA VAINILLA", code: "7501716101614", sku: "0706-01-213", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 1140.00, unitPrice: 95.00, link:"https://www.comercializadoradtup.com/products/fragancia-concentrada-vainilla-margrey-1l?_pos=1&_psq=vaini&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873365/fragancia_de_vainilla_ih09zj.jpg"},
  { product: "MANO CLEAN", category: "MANO CLEAN", name: "mano clean" },
  { product: "MANO CLEAN", code: "7501716101495", sku: "0901-01-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 465.00, unitPrice: 77.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293269/Margrey_2025_s1uhnx.jpg" },
  { product: "MANO CLEAN", code: "7501716100518", sku: "0901-01-402", description: "CUBETA 19 LT", price: 1179.00, unitPrice: 62.05, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "QUITA GOTAS", category: "QUITA GOTAS", name: "quita gotas" },
  { product: "QUITA GOTAS", code: "7501716105186", sku: "0901-01-250", description: "PAQUETE 24 PIEZAS 130 ML", unitDescription: "PIEZA INDIVIDUAL 130 ML", price: 612.00, unitPrice: 25.50, link:"https://www.comercializadoradtup.com/products/quita-gotas-margrey-130-ml?_pos=4&_psq=quita&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873372/quita_gotas_130_sr8f3w.jpg"},
  { product: "QUITA GOTAS", code: "7501716100914", sku: "0901-01-211", description: "PAQUETE 20 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 1720.00, unitPrice: 86.00, link:"https://www.comercializadoradtup.com/products/quita-gotas-margrey-500-ml?_pos=3&_psq=quita+g&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873372/quita_gotas_500_rfkxjj.jpg"},
  { product: "QUITA GOTAS", code: "7501716100938", sku: "0901-01-301", description: "PORRON 5 LT", price: 716.00, unitPrice: 143.20, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "QUITA GOTAS", code: "7501716100945", sku: "0901-01-303", description: "PORRON 25 LT", price: 3241.00, unitPrice: 129.64, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" }, 
  { product: "CREMA QUITAGOTAS", category: "CREMA QUITAGOTAS", name: "crema quitagotas" },
  { product: "CREMA QUITAGOTAS", code: "7501716107753", sku: "1006-01-232", description: "PAQUETE 6 PIEZAS 300 ML", unitDescription: "PIEZA INDIVIDUAL 300 ML", price: 201.00, unitPrice: 33.50, link:"https://www.comercializadoradtup.com/products/crema-quita-gotas-margrey-300-ml?_pos=1&_psq=crema&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873365/crema_quita_gotas_y8xoqw.jpg"},
  { product: "CREMA QUITAGOTAS", code: "-", sku: "1006-01-401", description: "CUBETA 4 LT", price: 350.00, unitPrice: 87.50, image: "https://res.cloudinary.com/diefezach/image/upload/v1726873365/cubeta_crema_quita_gotas_u8q97k.jpg", link:"https://www.comercializadoradtup.com/MLM-3350916446-crema-quita-gotas-vidrios-y-cristales-cubeta-4-lts-margrey-_JM"},
  { product: "CREMA QUITAGOTAS", code: "-", sku: "1006-01-402", description: "CUBETA 19 LT", price: 1406.00, unitPrice: 74.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg"},
  { product: "HOME CREMA QUITA GOTAS PREMIUM", category: "HOME CREMA QUITA GOTAS PREMIUM", name: "home crema quita gotas premium" },
  { product: "HOME CREMA QUITA GOTAS PREMIUM", code: "-", sku: "HOME-QG-500", description: "PIEZA INDIVIDUAL 500 ML MULTIUSOS", unitDescription: "PIEZA INDIVIDUAL 500 ML MULTIUSOS", unitPrice: 44.50, image:"https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1792395373/margrey/home-crema-quita-gotas-premium-500ml.png"},
  { product: "HOME LEATHER CLEAN PREMIUM", category: "HOME LEATHER CLEAN PREMIUM", name: "home leather clean premium" },
  { product: "HOME LEATHER CLEAN PREMIUM", code: "-", sku: "HOME-LEATHER-300", description: "PIEZA INDIVIDUAL 300 ML LIMPIADOR E HIDRATANTE DE PIELES", unitDescription: "PIEZA INDIVIDUAL 300 ML LIMPIADOR E HIDRATANTE DE PIELES", unitPrice: 51.50, image:"https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1792395376/margrey/home-leather-clean-premium-300ml.png"},
  { product: "HOME CREMA QUITA COCHAMBRE", category: "HOME CREMA QUITA COCHAMBRE", name: "home crema quita cochambre" },
  { product: "HOME CREMA QUITA COCHAMBRE", code: "-", sku: "HOME-COCHAMBRE-300", description: "PIEZA INDIVIDUAL 300 ML", unitDescription: "PIEZA INDIVIDUAL 300 ML", unitPrice: 39.00, image:"https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1792395379/margrey/home-crema-quita-cochambre-300ml.png"},
  { product: "HOME LUSTRADOR DE MADERA PREMIUM", category: "HOME LUSTRADOR DE MADERA PREMIUM", name: "home lustrador de madera premium" },
  { product: "HOME LUSTRADOR DE MADERA PREMIUM", code: "-", sku: "HOME-MADERA-300", description: "PIEZA INDIVIDUAL 300 ML CON CERA DE ABEJA", unitDescription: "PIEZA INDIVIDUAL 300 ML CON CERA DE ABEJA", unitPrice: 39.50, image:"https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1792395388/margrey/home-lustrador-madera-premium-300ml.png"},
  { product: "WIPER CLEANER", category: "WIPER CLEANER", name: "wiper cleaner" },
  { product: "WIPER CLEANER", code: "7501716108385", sku: "1007-01-206", description: "PAQUETE 6 PIEZAS 1 L", unitDescription: "PIEZA INDIVIDUAL 1 L", price: 138.00, unitPrice: 23.00,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873376/wiper_clean_1_ymecds.jpg", link:"https://www.comercializadoradtup.com/products/wiper-cleaner-margrey-1l-liquido-limpiaparabrisas?_pos=1&_psq=wiper&_ss=e&_v=1.0", tag: "new-presentation"},
  { product: "REPELENTE DE AGUA", category: "REPELENTE DE AGUA", name: "repelente de agua" },
  { product: "REPELENTE DE AGUA", code: "7501716100600", sku: "1008-01-254", description: "CAJA 12 PIEZAS 130 ML", unitDescription: "PIEZA INDIVIDUAL 130 ML", price: 354.00, unitPrice: 29.50, link:"https://www.comercializadoradtup.com/products/repelente-de-agua-margrey-130-ml?_pos=1&_psq=repe&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1759292724/Margrey_2025_jygtog.jpg"},
  { product: "SHAMPOO CON CERA", category: "SHAMPOO CON CERA", name: "shampoo con cera" },
  { product: "SHAMPOO CON CERA", code: "7501716137132", sku: "1401-01-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 255.00, unitPrice: 42.50, link:"https://www.comercializadoradtup.com/products/shampoo-con-cera-carnauba-margrey-1l?_pos=3&_psq=sham&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/shampoo_con_cera_g1awj6.jpg"},
  { product: "SHAMPOO CON CERA", code: "7501716100587", sku: "1401-01-303", description: "PORRON 25 LT", price: 876.50, unitPrice: 35.06, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "SHAMPOO CON CERA", code: "7501716100600", sku: "1401-01-307", description: "TAMBOR 208 LT", price: 6548.00, unitPrice: 31.48, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291911/9c5fb46b5743e810b326d588833f16c3984ae579f78009ca90032acdd62de431_tovtvj.png" },
  { product: "PUM SHAMPOO PARA TAPICERIAS", category: "PUM SHAMPOO PARA TAPICERIAS", name: "pum shampoo para tapicerias" },
  { product: "PUM SHAMPOO PARA TAPICERIAS", code: "7501716102253", sku: "1402-01-231", description: "CAJA 6 PIEZAS 600 ML CON ATOMIZADOR", unitDescription: "PIEZA INDIVIDUAL 600 ML", price: 255.00, unitPrice: 42.50, link:"https://www.comercializadoradtup.com/products/shampoo-pum-margrey-600-ml-telas-tapices?_pos=1&_psq=pum&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/shampoo_pum_pt9emp.jpg"},
  { product: "AROMATIZANTE COOL GREY", category: "AROMATIZANTE COOL GREY", name: "aromatizante cool grey" },
  { product: "AROMATIZANTE COOL GREY UVA", code: "7501716105223", sku: "2002-01-291", description: "UVA SILVESTRE CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873374/uva_cgycx1.jpg"},
  { product: "AROMATIZANTE COOL GREY UVA", code: "7501716105230", sku: "2002-01-291", description: "UVA SILVESTRE CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00, link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873374/uva_cgycx1.jpg"},
  { product: "AROMATIZANTE COOL GREY BANANA", code: "7501716105247", sku: "2003-01-294", description: "HAPPY BANANA CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/banana_gd6fup.jpg"},
  { product: "AROMATIZANTE COOL GREY BANANA", code: "7501716105247", sku: "2003-01-294", description: "HAPPY BANANA CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00, link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/banana_gd6fup.jpg"},
  { product: "AROMATIZANTE COOL GREY CARRO NUEVO", code: "7501716105209", sku: "2008-01-291", description: "CARRO NUEVO CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/carro_nuevo_h0fnat.jpg"},
  { product: "AROMATIZANTE COOL GREY CARRO NUEVO", code: "7501716105209", sku: "2008-01-291", description: "CARRO NUEVO CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00, link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/carro_nuevo_h0fnat.jpg"},
  { product: "AROMATIZANTE COOL GREY CEREZA", code: "7501716108453", sku: "2008-01-294", description: "CHERRY CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cereza_waymje.jpg"},
  { product: "AROMATIZANTE COOL GREY CEREZA", code: "7501716108453", sku: "2008-01-294", description: "CHERRY CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00,   link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cereza_waymje.jpg"},
  { product: "AROMATIZANTE COOL GREY FRESA", code: "7501716108521", sku: "2016-01-291", description: "STRAWBERRY-FRESA CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873366/fresa_aaobqq.jpg"},
  { product: "AROMATIZANTE COOL GREY FRESA", code: "7501716108521", sku: "2016-01-291", description: "STRAWBERRY-FRESA CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00,   link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873366/fresa_aaobqq.jpg"},
  { product: "AROMATIZANTE COOL GREY MORAS", code: "7501716108514", sku: "2017-01-291", description: "BERRIES CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/moras_dvmsnu.jpg"},
  { product: "AROMATIZANTE COOL GREY MORAS", code: "7501716108514", sku: "2017-01-291", description: "BERRIES CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00,   link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/moras_dvmsnu.jpg"},
  { product: "AROMATIZANTE COOL GREY MIXTO", code: "", sku: "2007-01-291", description: "MIXTO CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293970/.com.apple.Foundation.NSItemProvider.odsLeg_gtcbla.jpg"},
  { product: "AROMATIZANTE COOL GREY MIXTO", code: "", sku: "2007-01-294", description: "MIXTO CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293970/.com.apple.Foundation.NSItemProvider.odsLeg_gtcbla.jpg"},
  { product: "GEL AZUL W", category: "GEL AZUL W", name: "gel azul w" },
  { product: "GEL AZUL W", code: "7501716137118", sku: "0104-21-205", description: "PAQUETE 6 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 246.00, unitPrice: 41.00, link: "https://www.comercializadoradtup.com/products/gel-azul-margrey-500-ml-abrillantador-llantas?_pos=1&_psq=gel&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873368/gel_azul_ztpkhd.jpg"},
  { product: "GEL AZUL W", code: "-", sku: "0104-21-309", description: "PORRON 20 LT", price: 1070.50, unitPrice: 53.53, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "SILICREM W", category: "SILICREM W", name: "silicrem w" },
  { product: "SILICREM W S/E", code: "7501716100136", sku: "0105-95-232", description: "PAQUETE 6 PIEZAS 300 ML", unitDescription: "PIEZA INDIVIDUAL 300 ML", price: 198.00, unitPrice: 33.00, link:"https://www.comercializadoradtup.com/products/silicrem-margrey-300-g?variant=45041283858476", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/silicrem_W_m8a0fc.jpg"},
  { product: "BRILLO PLATINUM", category: "BRILLO PLATINUM", name: "brillo platinum" },
  { product: "BRILLO PLATINUM", code: "7501716106336", sku: "0118-21-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 258.00, unitPrice: 43.00, link: "https://www.comercializadoradtup.com/products/brillo-platinum-margrey-1l-abrillantador-tableros-llantas?_pos=1&_psq=brillo&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/brillo_platinum_mf6nkv.jpg"},
  { product: "CERA LIQUIDA W", category: "CERA LIQUIDA W", name: "cera liquida w" },
  { product: "CERA LIQUIDA W", code: "7501716106411", sku: "0402-21-205", description: "PAQUETE 6 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 294.00, unitPrice: 49.00, link: "https://www.comercializadoradtup.com/products/cera-liquida-margrey-500-ml?_pos=2&_psq=liquida&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cera_liquida_500_wtyreh.jpg"},
  { product: "CERA LIQUIDA W", code: "7501716107524", sku: "0402-21-301", description: "PORRON 5 LT", price: 376.50, unitPrice: 75.30, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "POLISH BLANCO", category: "POLISH BLANCO", name: "polish blanco" },
  { product: "POLISH BLANCO", code: "7501716100228", sku: "0404-95-290", description: "PAQUETE 12 PIEZAS 300 GR", unitDescription: "PIEZA INDIVIDUAL 300 GR", price: 282.00, unitPrice: 23.50, link: "https://www.comercializadoradtup.com/products/polish-blanco-margrey-300g-pulimento-rayones?variant=45041847369772", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/polish_blanco_vydeyp.jpg"},
  { product: "POLISH BLANCO", code: "-", sku: "0404-95-402", description: "CUBETA 19 LT", price: 1017.00, unitPrice: 53.53, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "POLISH ROJO", category: "POLISH ROJO", name: "polish rojo" },
  { product: "POLISH ROJO", code: "7501716100310", sku: "0405-21-290", description: "PAQUETE 12 PIEZAS 300 GR", unitDescription: "PIEZA INDIVIDUAL 300 GR", price: 282.00, unitPrice: 23.50, link: "https://www.comercializadoradtup.com/products/polish-rojo-margrey-300g-pulimento-corte?variant=45041849597996", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/polish_rojo_afcqyz.jpg"},
  { product: "POLISH ROJO", code: "-", sku: "0405-21-402", description: "CUBETA 19 LT", price: 1017.00, unitPrice: 53.53, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "POLISH ROSA", category: "POLISH ROSA", name: "polish rosa" },
  { product: "POLISH ROSA", code: "7501716106855", sku: "0406-21-290", description: "PAQUETE 12 PIEZAS 300 GR", unitDescription: "PIEZA INDIVIDUAL 300 GR", price: 282.00, unitPrice: 23.50, link: "https://www.comercializadoradtup.com/products/polish-rosa-margrey-300g-pulimento-medio?variant=45041858871340", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873370/polish_rosa_dkuqdu.jpg"},
  { product: "POLISH ROSA", code: "-", sku: "0406-21-402", description: "CUBETA 19 LT", price: 1017.00, unitPrice: 53.53, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "CERA ACRILICA", category: "CERA ACRILICA", name: "cera acrilica" },
  { product: "CERA ACRILICA", code: "7501716106886", sku: "0414-21-289", description: "PAQUETE 6 PIEZAS 355 ML", unitDescription: "PIEZA INDIVIDUAL 355 ML", price: 363.00, unitPrice: 60.50, link: "https://www.comercializadoradtup.com/products/cera-en-pasta-margrey-355-ml-carnauba?_pos=4&_psq=cera&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cera_en_pasta_p2mwwp.jpg"},
  { product: "ALUMINOX", category: "ALUMINOX", name: "aluminox" },
  { product: "ALUMINOX", code: "7502275980573", sku: "0501-21-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 486.00, unitPrice: 40.50, link:"https://www.comercializadoradtup.com/products/aluminox-margrey-1l-limpiador-aluminio-inoxidable?_pos=1&_psq=aluminox&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/aluminox_jbfta5.jpg"},
  { product: "ALUMINOX", code: "-", sku: "0501-21-309", description: "PORRON 20 LT", price: 659.50, unitPrice: 32.98, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "GRAS-FIN", category: "GRAS-FIN", name: "gras-fin" },
  { product: "GRAS-FIN", code: "7502275980559", sku: "0509-21-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 456.00, unitPrice: 38.00, link:"https://www.comercializadoradtup.com/products/gras-fin-margrey-1l-desengrasante-alcalino?_pos=2&_psq=gras+fin&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/gras_fin_ux38kr.jpg"},
  { product: "GRAS-FIN", code: "-", sku: "0509-21-307", description: "PORRON 20 LT", price: 487.00, unitPrice: 24.35, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "GRAS-FIN", code: "-", sku: "0509-21-307", description: "TAMBOR 208 LT", price: 4108.50, unitPrice: 19.75, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291911/9c5fb46b5743e810b326d588833f16c3984ae579f78009ca90032acdd62de431_tovtvj.png" },
  { product: "SHAMPOO CON CERA PLATINUM", category: "SHAMPOO CON CERA PLATINUM", name: "shampoo con cera platinum" },
  { product: "SHAMPOO CON CERA PLATINUM", code: "7501716106442", sku: "1401-21-206", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 384.00, unitPrice: 32.00, link:"https://www.comercializadoradtup.com/products/shampoo-con-cera-platinum-margrey-1l?_pos=2&_psq=plat&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/shampoo_con_cera_platinum_kzd6zr.jpg"},
  { product: "SHAMPOO AUTO CAR WASH", category: "SHAMPOO AUTO CAR WASH", name: "shampoo auto car wash" },
  { product: "SHAMPOO AUTO CAR WASH", code: "7502275980771", sku: "1405-95-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 162.00, unitPrice: 27.00, link:"https://www.comercializadoradtup.com/products/shampoo-car-wash-margrey-1l-cera-carnauba?variant=45042022350892", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873372/shampoo_car_wash_p2y0o2.jpg"},
  { product: "SHAMPOO AUTO CAR WASH", code: "7501716107326", sku: "1405-95-402", description: "PAQUETE 4 PIEZAS 3.8 LT", unitDescription: "PIEZA INDIVIDUAL 3.8 LT", price: 258.00, unitPrice: 64.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/car_wash_3-8_leb5j8.jpg", link:"https://www.comercializadoradtup.com/products/shampoo-car-wash-margrey-3-8l-cera-carnauba?variant=45042023301164"},
  { product: "SHAMPOO AUTO CAR WASH", code: "-", sku: "1405-95-309", description: "PORRON 20 LT", price: 352.00, unitPrice: 17.60, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "BUBBLE WASH", category: "BUBBLE WASH", name: "shampoo bubble wash" },
  { product: "SHAMPOO BUBBLE WASH", code: "7502275980771", sku: "1414-21-299", description: "PAQUETE 4 PIEZAS 1.89 LT", unitDescription: "PIEZA INDIVIDUAL 1.89 LT", price: 182.00, tag: "new", unitPrice: 45.50, link:"https://www.comercializadoradtup.com/products/shampoo-auto-bubble-wash-margrey-1-89-l?_pos=1&_psq=bubble&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1731041824/bubble_wash_bbzfb1.jpg"},
  { product: "BLISTER", category: "BLISTER", name: "blister crema y repelente" },
  { product: "BLISTER CREMA Y REPELENTE", code: "-", sku: "1415-21-300", description: "PAQUETE 2 PIEZAS 130 ML", unitDescription: "PIEZA BLISTER DUO", price: 182.00, tag: "new", unitPrice: 45.50, link:"https://www.comercializadoradtup.com/products/shampoo-auto-bubble-wash-margrey-1-89-l?_pos=1&_psq=bubble&_ss=e&_v=1.0", image:"https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784880395/blister-crema-y-repelente_ubwxup.webp"},

  { id: "zach-rompe-grasas-1l", brand: "Zach Chemical", product: "ROMPE GRASAS", category: "Zach Chemical", description: "1 LT", price: 53.00, unitPrice: 53.00, mayoreo: 106.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-rompe-grasas-4l", brand: "Zach Chemical", product: "ROMPE GRASAS", category: "Zach Chemical", description: "4 LT", price: 160.00, unitPrice: 160.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-rompe-grasas-20l", brand: "Zach Chemical", product: "ROMPE GRASAS", category: "Zach Chemical", description: "20 LT", price: 580.00, unitPrice: 580.00, mayoreo: 809.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-apc-orange-neutro-1l", brand: "Zach Chemical", product: "APC ORANGE NEUTRO", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-apc-orange-neutro-4l", brand: "Zach Chemical", product: "APC ORANGE NEUTRO", category: "Zach Chemical", description: "4 LT", price: 113.00, unitPrice: 113.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-apc-orange-neutro-20l", brand: "Zach Chemical", product: "APC ORANGE NEUTRO", category: "Zach Chemical", description: "20 LT", price: 533.00, unitPrice: 533.00, mayoreo: 1066.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-detergente-alcalino-1l", brand: "Zach Chemical", product: "DETERGENTE ALCALINO", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-detergente-alcalino-4l", brand: "Zach Chemical", product: "DETERGENTE ALCALINO", category: "Zach Chemical", description: "4 LT", price: 113.00, unitPrice: 113.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-detergente-alcalino-20l", brand: "Zach Chemical", product: "DETERGENTE ALCALINO", category: "Zach Chemical", description: "20 LT", price: 533.00, unitPrice: 533.00, mayoreo: 1066.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-lavagarrafones-1l", brand: "Zach Chemical", product: "LAVAGARRAFONES", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-lavagarrafones-4l", brand: "Zach Chemical", product: "LAVAGARRAFONES", category: "Zach Chemical", description: "4 LT", price: 113.00, unitPrice: 113.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-lavagarrafones-20l", brand: "Zach Chemical", product: "LAVAGARRAFONES", category: "Zach Chemical", description: "20 LT", price: 533.00, unitPrice: 533.00, mayoreo: 1066.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-solvex-n6-1l", brand: "Zach Chemical", product: "SOLVEX N6", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 90.00, mostrador: 150.00, digital: 150.00, image: "" },
  { id: "zach-solvex-n6-4l", brand: "Zach Chemical", product: "SOLVEX N6", category: "Zach Chemical", description: "4 LT", price: 133.00, unitPrice: 133.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-solvex-n6-20l", brand: "Zach Chemical", product: "SOLVEX N6", category: "Zach Chemical", description: "20 LT", price: 630.00, unitPrice: 630.00, mayoreo: 950.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-shampoo-neutro-limpiador-1l", brand: "Zach Chemical", product: "SHAMPOO NEUTRO LIMPIADOR", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-shampoo-neutro-limpiador-4l", brand: "Zach Chemical", product: "SHAMPOO NEUTRO LIMPIADOR", category: "Zach Chemical", description: "4 LT", price: 113.00, unitPrice: 113.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-shampoo-neutro-limpiador-20l", brand: "Zach Chemical", product: "SHAMPOO NEUTRO LIMPIADOR", category: "Zach Chemical", description: "20 LT", price: 533.00, unitPrice: 533.00, mayoreo: 1066.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-detergente-acaros-1l", brand: "Zach Chemical", product: "DETERGENTE PARA ACAROS", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-detergente-acaros-4l", brand: "Zach Chemical", product: "DETERGENTE PARA ACAROS", category: "Zach Chemical", description: "4 LT", price: 113.00, unitPrice: 113.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-detergente-acaros-20l", brand: "Zach Chemical", product: "DETERGENTE PARA ACAROS", category: "Zach Chemical", description: "20 LT", price: 533.00, unitPrice: 533.00, mayoreo: 1066.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-rompe-manchas-organicas-1l", brand: "Zach Chemical", product: "ROMPE MANCHAS ORGANICAS", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 110.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-rompe-manchas-organicas-4l", brand: "Zach Chemical", product: "ROMPE MANCHAS ORGANICAS", category: "Zach Chemical", description: "4 LT", price: 165.00, unitPrice: 165.00, mayoreo: 330.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-rompe-manchas-organicas-20l", brand: "Zach Chemical", product: "ROMPE MANCHAS ORGANICAS", category: "Zach Chemical", description: "20 LT", price: 832.00, unitPrice: 832.00, mayoreo: 1090.00, mostrador: 1699.00, digital: 1699.00, image: "" },
  { id: "zach-detergente-limpiador-colchones-1l", brand: "Zach Chemical", product: "DETERGENTE LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 110.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-detergente-limpiador-colchones-4l", brand: "Zach Chemical", product: "DETERGENTE LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "4 LT", price: 165.00, unitPrice: 165.00, mayoreo: 330.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-detergente-limpiador-colchones-20l", brand: "Zach Chemical", product: "DETERGENTE LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "20 LT", price: 832.00, unitPrice: 832.00, mayoreo: 1090.00, mostrador: 1699.00, digital: 1699.00, image: "" },
  { id: "zach-vinagre-limpieza-8-1l", brand: "Zach Chemical", product: "VINAGRE DE LIMPIEZA 8%", category: "Zach Chemical", description: "1 LT", price: 36.00, unitPrice: 36.00, mayoreo: 70.00, mostrador: 140.00, digital: 140.00, image: "" },
  { id: "zach-vinagre-limpieza-8-4l", brand: "Zach Chemical", product: "VINAGRE DE LIMPIEZA 8%", category: "Zach Chemical", description: "4 LT", price: 130.00, unitPrice: 130.00, mayoreo: 170.00, mostrador: 220.00, digital: 220.00, image: "" },
  { id: "zach-vinagre-limpieza-8-20l", brand: "Zach Chemical", product: "VINAGRE DE LIMPIEZA 8%", category: "Zach Chemical", description: "20 LT", price: 476.00, unitPrice: 476.00, mayoreo: 620.00, mostrador: 899.00, digital: 899.00, image: "" },
  { id: "zach-black-revive-500ml", brand: "Zach Chemical", product: "BLACK REVIVE", category: "Zach Chemical", description: "500 ML", price: 65.00, unitPrice: 65.00, mayoreo: 0.00, mostrador: 299.00, digital: 299.00, image: "" },
  { id: "zach-plancha-facil-1l", brand: "Zach Chemical", product: "PLANCHA FACIL", category: "Zach Chemical", description: "1 LT", price: 42.00, unitPrice: 42.00, mayoreo: 80.00, mostrador: 110.00, digital: 110.00, image: "" },
  { id: "zach-plancha-facil-4l", brand: "Zach Chemical", product: "PLANCHA FACIL", category: "Zach Chemical", description: "4 LT", price: 115.00, unitPrice: 115.00, mayoreo: 160.00, mostrador: 250.00, digital: 250.00, image: "" },
  { id: "zach-plancha-facil-20l", brand: "Zach Chemical", product: "PLANCHA FACIL", category: "Zach Chemical", description: "20 LT", price: 530.00, unitPrice: 530.00, mayoreo: 690.00, mostrador: 999.00, digital: 999.00, image: "" },
  { id: "zach-biotechx-1l", brand: "Zach Chemical", product: "BIOTECHX", category: "Zach Chemical", description: "1 LT", price: 46.00, unitPrice: 46.00, mayoreo: 92.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-biotechx-4l", brand: "Zach Chemical", product: "BIOTECHX", category: "Zach Chemical", description: "4 LT", price: 130.00, unitPrice: 130.00, mayoreo: 185.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-biotechx-20l", brand: "Zach Chemical", product: "BIOTECHX", category: "Zach Chemical", description: "20 LT", price: 660.00, unitPrice: 660.00, mayoreo: 860.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  // Aromas Kiwi y Cereza (Diego, 2026-10-16): la hoja no los separa por
  // aroma, así que llevan el costo y el Mayoreo del BIOTECHX de su tamaño.
  { id: "zach-biotechx-kiwi-1l", brand: "Zach Chemical", product: "BIOTECHX KIWI", category: "Zach Chemical", description: "1 LT", price: 46.00, unitPrice: 46.00, mayoreo: 92.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-biotechx-kiwi-4l", brand: "Zach Chemical", product: "BIOTECHX KIWI", category: "Zach Chemical", description: "4 LT", price: 130.00, unitPrice: 130.00, mayoreo: 185.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-biotechx-cereza-1l", brand: "Zach Chemical", product: "BIOTECHX CEREZA", category: "Zach Chemical", description: "1 LT", price: 46.00, unitPrice: 46.00, mayoreo: 92.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-biotechx-cereza-4l", brand: "Zach Chemical", product: "BIOTECHX CEREZA", category: "Zach Chemical", description: "4 LT", price: 130.00, unitPrice: 130.00, mayoreo: 185.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-gel-limpiador-colchones-1l", brand: "Zach Chemical", product: "GEL LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "1 LT", price: 49.00, unitPrice: 49.00, mayoreo: 70.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-gel-limpiador-colchones-4l", brand: "Zach Chemical", product: "GEL LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "4 LT", price: 147.00, unitPrice: 147.00, mayoreo: 205.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-gel-limpiador-colchones-20l", brand: "Zach Chemical", product: "GEL LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "20 LT", price: 728.00, unitPrice: 728.00, mayoreo: 990.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-eliminador-olores-mascota-enzimatico-1l", brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO", category: "Zach Chemical", description: "1 LT", price: 46.00, unitPrice: 46.00, mayoreo: 92.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-eliminador-olores-mascota-enzimatico-4l", brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO", category: "Zach Chemical", description: "4 LT", price: 130.00, unitPrice: 130.00, mayoreo: 185.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-eliminador-olores-mascota-enzimatico-20l", brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO", category: "Zach Chemical", description: "20 LT", price: 660.00, unitPrice: 660.00, mayoreo: 860.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  // Aromas Kiwi y Cereza (Diego, 2026-10-16): costo y Mayoreo del de su tamaño.
  { id: "zach-eliminador-olores-mascota-enzimatico-kiwi-1l", brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO KIWI", category: "Zach Chemical", description: "1 LT", price: 46.00, unitPrice: 46.00, mayoreo: 92.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-eliminador-olores-mascota-enzimatico-kiwi-4l", brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO KIWI", category: "Zach Chemical", description: "4 LT", price: 130.00, unitPrice: 130.00, mayoreo: 185.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-eliminador-olores-mascota-enzimatico-cereza-1l", brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO CEREZA", category: "Zach Chemical", description: "1 LT", price: 46.00, unitPrice: 46.00, mayoreo: 92.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-eliminador-olores-mascota-enzimatico-cereza-4l", brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO CEREZA", category: "Zach Chemical", description: "4 LT", price: 130.00, unitPrice: 130.00, mayoreo: 185.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-canela-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO CANELA", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-menta-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO MENTA", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-cherry-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO CHERRY", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-drakar-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO DRAKAR", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-fresh-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO FRESH", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-hugo-magno-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO HUGO MAGNO", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-ferra-magno-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO FERRA MAGNO", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-vainilla-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO VAINILLA", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-eterno-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO ETERNO", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-ralph-magno-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO RALPH MAGNO", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-petalos-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO PETALOS", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-canela-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO CANELA", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-menta-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO MENTA", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-cherry-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO CHERRY", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-drakar-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO DRAKAR", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-fresh-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO FRESH", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-hugo-magno-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO HUGO MAGNO", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-ferra-magno-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO FERRA MAGNO", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-vainilla-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO VAINILLA", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-eterno-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO ETERNO", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-petalos-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO PETALOS", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-ralph-magno-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO RALPH MAGNO", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 250.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-canela-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO CANELA", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-aroma-finalizador-menta-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO MENTA", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-aroma-finalizador-cherry-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO CHERRY", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-aroma-finalizador-drakar-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO DRAKAR", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-aroma-finalizador-fresh-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO FRESH", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-aroma-finalizador-hugo-magno-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO HUGO MAGNO", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-aroma-finalizador-ferra-magno-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO FERRA MAGNO", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-aroma-finalizador-vainilla-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO VAINILLA", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-aroma-finalizador-eterno-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO ETERNO", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-aroma-finalizador-petalos-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO PETALOS", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-aroma-finalizador-ralph-magno-20l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO RALPH MAGNO", category: "Zach Chemical", description: "20 LT", price: 1100.00, unitPrice: 1100.00, mayoreo: 1250.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-shampoo-con-cera-1l", brand: "Zach Chemical", product: "SHAMPOO CON CERA", category: "Zach Chemical", description: "1 LT", price: 55.00, unitPrice: 55.00, mayoreo: 75.00, mostrador: 99.00, digital: 99.00, image: "" },
  { id: "zach-prelavador-neutro-1l", brand: "Zach Chemical", product: "PRELAVADOR NEUTRO", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-prelavador-neutro-4l", brand: "Zach Chemical", product: "PRELAVADOR NEUTRO", category: "Zach Chemical", description: "4 LT", price: 113.00, unitPrice: 113.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-prelavador-neutro-20l", brand: "Zach Chemical", product: "PRELAVADOR NEUTRO", category: "Zach Chemical", description: "20 LT", price: 533.00, unitPrice: 533.00, mayoreo: 1066.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-prelavador-desmanchador-ph12-1l", brand: "Zach Chemical", product: "PRELAVADOR DESMANCHADOR PH 12", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 90.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-prelavador-desmanchador-ph12-4l", brand: "Zach Chemical", product: "PRELAVADOR DESMANCHADOR PH 12", category: "Zach Chemical", description: "4 LT", price: 133.00, unitPrice: 133.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-prelavador-desmanchador-ph12-20l", brand: "Zach Chemical", product: "PRELAVADOR DESMANCHADOR PH 12", category: "Zach Chemical", description: "20 LT", price: 630.00, unitPrice: 630.00, mayoreo: 950.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-shampoo-tapicerias-negras-1l", brand: "Zach Chemical", product: "SHAMPOO PARA TAPICERIAS NEGRAS", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 99.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-shampoo-tapicerias-negras-4l", brand: "Zach Chemical", product: "SHAMPOO PARA TAPICERIAS NEGRAS", category: "Zach Chemical", description: "4 LT", price: 135.00, unitPrice: 135.00, mayoreo: 189.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-shampoo-tapicerias-negras-20l", brand: "Zach Chemical", product: "SHAMPOO PARA TAPICERIAS NEGRAS", category: "Zach Chemical", description: "20 LT", price: 620.00, unitPrice: 620.00, mayoreo: 870.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-enjuague-final-citrus-1l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CITRUS", category: "Zach Chemical", description: "1 LT", price: 58.00, unitPrice: 58.00, mayoreo: 120.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-enjuague-final-cereza-1l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CEREZA", category: "Zach Chemical", description: "1 LT", price: 58.00, unitPrice: 58.00, mayoreo: 120.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-enjuague-final-carro-nuevo-1l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CARRO NUEVO", category: "Zach Chemical", description: "1 LT", price: 58.00, unitPrice: 58.00, mayoreo: 120.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-enjuague-final-coco-1l", brand: "Zach Chemical", product: "ENJUAGUE FINAL COCO", category: "Zach Chemical", description: "1 LT", price: 58.00, unitPrice: 58.00, mayoreo: 120.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-enjuague-final-menta-1l", brand: "Zach Chemical", product: "ENJUAGUE FINAL MENTA", category: "Zach Chemical", description: "1 LT", price: 58.00, unitPrice: 58.00, mayoreo: 120.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-enjuague-final-citricos-4l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CITRICOS", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 290.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-enjuague-final-cereza-4l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CEREZA", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 290.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-enjuague-final-carro-nuevo-4l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CARRO NUEVO", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 290.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-enjuague-final-coco-4l", brand: "Zach Chemical", product: "ENJUAGUE FINAL COCO", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 290.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-enjuague-final-menta-4l", brand: "Zach Chemical", product: "ENJUAGUE FINAL MENTA", category: "Zach Chemical", description: "4 LT", price: 180.00, unitPrice: 180.00, mayoreo: 290.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-desodorante-calzado-1l", brand: "Zach Chemical", product: "DESODORANTE PARA CALZADO", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-desodorante-calzado-4l", brand: "Zach Chemical", product: "DESODORANTE PARA CALZADO", category: "Zach Chemical", description: "4 LT", price: 123.00, unitPrice: 123.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-talco-liquido-1l", brand: "Zach Chemical", product: "TALCO LIQUIDO", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-talco-liquido-4l", brand: "Zach Chemical", product: "TALCO LIQUIDO", category: "Zach Chemical", description: "4 LT", price: 123.00, unitPrice: 123.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-shampoo-tenis-1l", brand: "Zach Chemical", product: "SHAMPOO PARA TENIS", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-shampoo-tenis-4l", brand: "Zach Chemical", product: "SHAMPOO PARA TENIS", category: "Zach Chemical", description: "4 LT", price: 123.00, unitPrice: 123.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-limpiador-gamuza-1l", brand: "Zach Chemical", product: "LIMPIADOR DE GAMUZA", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-limpiador-gamuza-4l", brand: "Zach Chemical", product: "LIMPIADOR DE GAMUZA", category: "Zach Chemical", description: "4 LT", price: 123.00, unitPrice: 123.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-limpiador-gorras-1l", brand: "Zach Chemical", product: "LIMPIADOR PARA GORRAS", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 100.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-limpiador-gorras-4l", brand: "Zach Chemical", product: "LIMPIADOR PARA GORRAS", category: "Zach Chemical", description: "4 LT", price: 123.00, unitPrice: 123.00, mayoreo: 320.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-paneles-solares-1l", brand: "Zach Chemical", product: "PANELES SOLARES", category: "Zach Chemical", description: "1 LT", price: 35.00, unitPrice: 35.00, mayoreo: 70.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-paneles-solares-4l", brand: "Zach Chemical", product: "PANELES SOLARES", category: "Zach Chemical", description: "4 LT", price: 93.00, unitPrice: 93.00, mayoreo: 230.00, mostrador: 399.00, digital: 399.00, image: "" },
  // Repelente: Diego lo dio a $89 (2026-10-13); no está en la hoja de costos.
  // Costo y Mayoreo van iguales al Digital hasta que Diego dé el costo.
  { id: "zach-repelente-mosquitos-130ml", brand: "Zach Chemical", product: "REPELENTE DE MOSQUITOS CUIDADO FAMILIAR", category: "Zach Chemical", description: "SPRAY 130 ML", price: 89.00, unitPrice: 89.00, mayoreo: 89.00, mostrador: 71.20, digital: 89.00, image: "" },
  { id: "aqua-zach-agua-alcalina-1l", brand: "Aqua Zach", product: "AGUA ALCALINA", category: "Aqua Zach", description: "1 LITRO", price: 7.50, unitPrice: 7.50, mayoreo: 7.50, mostrador: 20.00, digital: 20.00, image: "" },
  { id: "aqua-zach-agua-alcalina-500ml", brand: "Aqua Zach", product: "AGUA ALCALINA", category: "Aqua Zach", description: "500 ML", price: 6.50, unitPrice: 6.50, mayoreo: 6.50, mostrador: 15.00, digital: 15.00, image: "" },
  { id: "zach-food-vinagre-arroz-350ml", brand: "Zach Food", product: "VINAGRE DE ARROZ", category: "Zach Food", description: "350 ML", price: 13.50, unitPrice: 13.50, mayoreo: 13.50, mostrador: 35.00, digital: 35.00, image: "" },
  { brand: "Magno Clean", product: "CITRICAL", category: "Magno", code: "PLCT1", description: "1 KG", price: 179.92, unitPrice: 179.92, mayoreo: 239.90, mostrador: 299.87, digital: 299.87, image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785509/leb4kir7flzokbmrxejf_f77ggo.webp" },
  { brand: "Magno Clean", product: "CITRICAL", category: "Magno", code: "PLCT2", description: "2 KG", price: 343.19, unitPrice: 343.19, mayoreo: 457.58, mostrador: 571.98, digital: 571.98, image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785510/nlobiiil9vdxjyghgkk6_vgtcoy.webp"},
  { brand: "Magno Clean", product: "CITRICAL", category: "Magno", code: "PLCT3", description: "3 KG", price: 466.84, unitPrice: 466.84, mayoreo: 622.45, mostrador: 778.06, digital: 778.06, image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785508/ypk0sr8oowjqua51qio3_olbjdx.webp"},
  { brand: "Magno Clean", product: "CHAZAM", category: "Magno", code: "PLCZ1", description: "1 KG", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785513/lw3ky8vr4zaum5jsxaab_rfkups.webp"},
  { brand: "Magno Clean", product: "CHAZAM", category: "Magno", code: "PLCZ2", description: "2 KG", price: 359.40, unitPrice: 359.40, mayoreo: 479.20, mostrador: 599.00, digital: 599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785513/lw3ky8vr4zaum5jsxaab_rfkups.webp"},
  { brand: "Magno Clean", product: "CHAZAM", category: "Magno", code: "PLCZ3", description: "3 KG", price: 539.40, unitPrice: 539.40, mayoreo: 719.20, mostrador: 899.00, digital: 899.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785515/uizdnigljvgccn3ejpmf_dpthlr.webp"},
  { brand: "Magno Clean", product: "BIO WASH KIWI", category: "Magno", code: "PLBW2_1", description: "2 KG", price: 515.26, unitPrice: 515.26, mayoreo: 687.01, mostrador: 858.76, digital: 858.76 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785506/49_su6q1f.webp"},
  { brand: "Magno Clean", product: "BIO WASH MENTA", category: "Magno", code: "PLBW2_1", description: "2 KG", price: 515.26, unitPrice: 515.26, mayoreo: 687.01, mostrador: 858.76, digital: 858.76 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785506/49_su6q1f.webp"},
  { brand: "Magno Clean", product: "BIO WASH NARANJA", category: "Magno", code: "PLBW2_1", description: "2 KG", price: 515.26, unitPrice: 515.26, mayoreo: 687.01, mostrador: 858.76, digital: 858.76 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785506/49_su6q1f.webp"},
  { brand: "Magno Clean", product: "LYPTUS LIQUID", category: "Magno", code: "PLLL1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785521/mrlva6c8thc45bsekbby_vws2e3.webp"},
  { brand: "Magno Clean", product: "LYPTUS LIQUID", category: "Magno", code: "PLLL5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785519/uuitauh2rbngl8l0u3kc_mvp0tb.webp"},
  { brand: "Magno Clean", product: "LYPTUS LIQUID", category: "Magno", code: "PLLL20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785518/iqm2ulcclotueyitb5ty_vlu4cc.webp"},
  { brand: "Magno Clean", product: "ORANGE LIQUID", category: "Magno", code: "PLOL1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785522/hid10sssiunmt1tdkqfk_olinh1.webp"},
  { brand: "Magno Clean", product: "ORANGE LIQUID", category: "Magno", code: "PLOLG", description: "3.78 L", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869394/25c5e5b307d791c8f7e2397fed88b1ec58b8a424e879d7f8333c7ca0f7772bea_stqfsc.webp"},
  { brand: "Magno Clean", product: "ORANGE LIQUID", category: "Magno", code: "PLOL5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785524/jkwmsgx0fe9bsf7pyqtc_wiiszr.webp"},
  { brand: "Magno Clean", product: "ORANGE LIQUID", category: "Magno", code: "PLOL20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785525/rmjoon5jru9wf4f9cqei_aaftjl.webp"},
  { brand: "Magno Clean", product: "SEVEN NEUTRO", category: "Magno", code: "PLSN1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785530/fjl3xqu6izomkaw5fa64_rzyvnj.webp"},
  { brand: "Magno Clean", product: "SEVEN NEUTRO", category: "Magno", code: "PLSN5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785528/q6lnw89zsefpq5vxryep_ic9obi.webp"},
  { brand: "Magno Clean", product: "SEVEN NEUTRO", category: "Magno", code: "PLSN20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785527/kud7qyqhr2spytybdz0v_uk7sww.webp"},
  { brand: "Magno Clean", product: "FINE CLEANNER", category: "Magno", code: "PLFC1_5", description: "1.5 KG", price: 329.34, unitPrice: 329.34, mayoreo: 439.12, mostrador: 548.90, digital: 548.90 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785516/l8ocngsjbiwx8xob4qtj_e12mfr.webp"},
  { brand: "Magno Clean", product: "MULTIFIBRAS", category: "Magno", code: "EMLF1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785502/pt0vwjikljjjmsgrtbsw_adlx0q.webp"},
  { brand: "Magno Clean", product: "MULTIFIBRAS", category: "Magno", code: "EMLFG", description: "3.78 L", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869377/d206d91dd60a10e717e86c01d77a460b1d1769c80281d311c9339aa00d73019f_bqumep.webp"},
  { brand: "Magno Clean", product: "MULTIFIBRAS", category: "Magno", code: "EMLF5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785499/qmlgz3ralxeh3swlmjqk_x6excq.webp"},
  { brand: "Magno Clean", product: "MULTIFIBRAS", category: "Magno", code: "EMLF20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785500/mh45krswvx8xcukz4uxm_oefeeo.webp"},
  { brand: "Magno Clean", product: "MULTIFIBRAS ORANGE", category: "Magno", code: "EMLFO1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785493/tbqtypn8csm5eeluogtz_ndj0vt.webp"},
  { brand: "Magno Clean", product: "MULTIFIBRAS ORANGE", category: "Magno", code: "EMLFO5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785492/crhe6ybny8fxecil91de_cubuyh.webp"},
  { brand: "Magno Clean", product: "MULTIFIBRAS ORANGE", category: "Magno", code: "EMLFO20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785490/nufw0ourncssbtqs7e4l_rikfkn.webp"},
  { brand: "Magno Clean", product: "MULTIFIBRAS LYPTUS", category: "Magno", code: "EMLFL1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785494/srggs66wsxull7qz1oeo_kzngvd.webp"},
  { brand: "Magno Clean", product: "MULTIFIBRAS LYPTUS", category: "Magno", code: "EMLFL5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785496/nwr9yaujrlw6biqfe2c9_trjlko.webp"},
  { brand: "Magno Clean", product: "MULTIFIBRAS LYPTUS", category: "Magno", code: "EMLFL20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784793439/40_xhtx0v.webp"},
  { brand: "Magno Clean", product: "BIO WASH ENJUAGUE KIWI", category: "Magno", code: "EBW1_5_1", description: "1.5 KG", price: 332.97, unitPrice: 332.97, mayoreo: 443.96, mostrador: 554.95, digital: 554.95 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785487/34_z0nux1.webp"},
  { brand: "Magno Clean", product: "BIO WASH ENJUAGUE MENTA", category: "Magno", code: "EBW1_5_1", description: "1.5 KG", price: 332.97, unitPrice: 332.97, mayoreo: 443.96, mostrador: 554.95, digital: 554.95 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785487/34_z0nux1.webp"},
  { brand: "Magno Clean", product: "BIO WASH ENJUAGUE NARANJA", category: "Magno", code: "EBW1_5_1", description: "1.5 KG", price: 332.97, unitPrice: 332.97, mayoreo: 443.96, mostrador: 554.95, digital: 554.95 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785487/34_z0nux1.webp"},
  { brand: "Magno Clean", product: "FINE ENJUAGUE", category: "Magno", code: "EFN1_5", description: "1.5 KG", price: 475.06, unitPrice: 475.06, mayoreo: 633.41, mostrador: 791.76, digital: 791.76 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784793468/87_ywb1ta.webp"},
  { brand: "Magno Clean", product: "BLANCOLCHON FORTE", category: "Magno", code: "DBCF1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785470/vhdhv5xmmatafp6eqmce_zmtkwx.webp"},
  { brand: "Magno Clean", product: "BLANCOLCHON FORTE", category: "Magno", code: "DBCFG", description: "3.78 L", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869273/093e45fa9709561f1e1687fcbcc48910f56d2f7fda00d13c984abeb3b945a36d_zaxy8i.webp"},
  { brand: "Magno Clean", product: "BLANCOLCHON FORTE", category: "Magno", code: "DBCF5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785472/apjqs4s2itvczprywsjt_ctpl8l.webp"},
  { brand: "Magno Clean", product: "BLANCOLCHON FORTE", category: "Magno", code: "DBCF20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785469/jk8satqgjzjqynpqktsb_pziztg.webp"},
  { brand: "Magno Clean", product: "CITRIMAG", category: "Magno", code: "DCM2", description: "500 ML", price: 236.69, unitPrice: 236.69, mayoreo: 315.58, mostrador: 394.48, digital: 394.48 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785477/ipr1vhedijxeurtl5akv_ynhwyn.webp"},
  { brand: "Magno Clean", product: "PERMAG", category: "Magno", code: "DPM2", description: "500 ML", price: 142.12, unitPrice: 142.12, mayoreo: 189.50, mostrador: 236.87, digital: 236.87 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785480/25_fdrzxy.webp"},
  { brand: "Magno Clean", product: "PROTEMAG", category: "Magno", code: "DPT2", description: "500 ML", price: 311.41, unitPrice: 311.41, mayoreo: 415.21, mostrador: 519.01, digital: 519.01 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785482/27_d4lfqs.webp"},
  { brand: "Magno Clean", product: "OXIMAG", category: "Magno", code: "DOX2", description: "500 ML", price: 139.27, unitPrice: 139.27, mayoreo: 185.70, mostrador: 232.12, digital: 232.12 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785479/23_csoj16.webp"},
  { brand: "Magno Clean", product: "PEXIDIL", category: "Magno", code: "DPX1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785483/tl69mqn7vgs9td7dkxjl_kzc7b0.webp"},
  { brand: "Magno Clean", product: "PEXIDIL", category: "Magno", code: "DPX5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785485/nfqgzlizbumge9xynqlv_vz7bh2.webp"},
  { brand: "Magno Clean", product: "PEXIDIL", category: "Magno", code: "DPX20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785486/pynmqszx7iu7xmtawj6j_xnoac9.webp"},
  { brand: "Magno Clean", product: "BLUE GEL", category: "Magno", code: "DBG1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785476/tn1uhxd7bdn8obdmnxlk_l66yzs.webp"},
  { brand: "Magno Clean", product: "BLUE GEL", category: "Magno", code: "DBGG", description: "3.78 L", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784879672/d93cbd6429b6c8d3cac0d206461e9fa28286b270f77470c5e7079407853c542e_xqwufm.webp"},
  { brand: "Magno Clean", product: "BLUE GEL", category: "Magno", code: "DBG5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785473/aygnhaw3svamit0ndss7_bw1ahb.webp"},
  { brand: "Magno Clean", product: "BLUE GEL", category: "Magno", code: "DBG20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785474/j82vm91thfdujstup8ck_fk0wwt.webp"},
  { brand: "Magno Clean", product: "APC TNT", category: "Magno", code: "APC1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785460/2_b5uqsn.webp"},
  { brand: "Magno Clean", product: "APC TNT", category: "Magno", code: "APCG", description: "3.78 L", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869321/c2b03f6113da13e6c2baadd75823b71701b81978384ea416f34d0c2331ee524c_globs6.webp"},
  { brand: "Magno Clean", product: "APC TNT", category: "Magno", code: "APC5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785459/3_zk33yb.webp"},
  { brand: "Magno Clean", product: "APC TNT", category: "Magno", code: "APC20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785458/4_yds38o.webp"},
  { brand: "Magno Clean", product: "MAGNIFICO MAGNIFICO", category: "Magno", code: "APCMA1", description: "1 LT", price: 88.15, unitPrice: 88.15, mayoreo: 117.54, mostrador: 146.92, digital: 146.92 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785463/8_irlq87.webp"},
  { brand: "Magno Clean", product: "AMOXI ULTRA", category: "Magno", code: "APCAMU1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785453/5_jmpqmj.webp"},
  { brand: "Magno Clean", product: "AMOXI ULTRA", category: "Magno", code: "APCAMUG", description: "3.78 L", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869209/b97cb75145ac0fbe1e516e8c73389d36548ec627d8f84e0391ee66c3c4630f1f_u59tff.webp"},
  { brand: "Magno Clean", product: "AMOXI ULTRA", category: "Magno", code: "APCAMU5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785457/6_ob8odc.webp"},
  { brand: "Magno Clean", product: "AMOXI ULTRA", category: "Magno", code: "APCAM20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785455/7_sqxulc.webp"},
  { brand: "Magno Clean", product: "APC CITRUS NEUTRO", category: "Magno", code: "APCCN1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869244/487a0916d56527e2c9c5522c78df6ecf428f4743c6c041f28de1be93d65c831d_iquhox.webp"},
  { brand: "Magno Clean", product: "APC CITRUS NEUTRO", category: "Magno", code: "APCCNG", description: "3.78 L", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869248/34d48e02a079835d5d261080e6beb12b4a4adc6aeb4a845d859eadd1a932a17e_xwigne.webp"},
  { brand: "Magno Clean", product: "APC CITRUS NEUTRO", category: "Magno", code: "APCCN5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869241/42e74e7e28ece09162144da627b7deb365a5c3db1da79b2fe66963cea89f832b_w7xi4d.webp"},
  { brand: "Magno Clean", product: "APC CITRUS NEUTRO", category: "Magno", code: "APCCN20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869251/69c5aef7c61bc67b4dc30c4f8321c6399ac78681cb402e5aad6337d14388faa2_sdsuxt.webp"},
  { brand: "Magno Clean", product: "MAGBOOSTER", category: "Magno", code: "ABS2", description: "2 KG", price: 411.46, unitPrice: 411.46, mayoreo: 548.62, mostrador: 685.77, digital: 685.77 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785462/1_gzcc5o.webp"},
  { brand: "Magno Clean", product: "MATA OLORES ENZIMATICO", category: "Magno", code: "COME1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785449/lrxqzfvp46wncww6r9vo_id6rwz.webp"},
  { brand: "Magno Clean", product: "MATA OLORES ENZIMATICO", category: "Magno", code: "COMEG", description: "3.78 L", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869307/c534750d2a95ed861f0368f5f44ab82aa70d7cc414652af9e09987e7a67425a8_oanxvo.webp"},
  { brand: "Magno Clean", product: "MATA OLORES ENZIMATICO", category: "Magno", code: "COME5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785452/kv4trnwtjohmafavjg8v_xbrtnt.webp"},
  { brand: "Magno Clean", product: "MATA OLORES ENZIMATICO", category: "Magno", code: "COME20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785450/t4lxhxiqjxqmp9icu8ws_oqmmuc.webp"},
  { brand: "Magno Clean", product: "SHAMPOO ALFOMBRAS", category: "Magno", code: "SAN1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785539/fvvewf9gku02sgzu1s3d_wwrmsm.webp"},
  { brand: "Magno Clean", product: "SHAMPOO ALFOMBRAS", category: "Magno", code: "SANG", description: "3.78 L", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784869291/8b5620a09cf33b9d4350b81b015cd64fa7c88f3d177b8546aee5cd927304bc86_b7adg7.webp"},
  { brand: "Magno Clean", product: "SHAMPOO ALFOMBRAS", category: "Magno", code: "SAN5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785537/pcm7crlyufsv2nbroouk_ltcl2l.webp"},
  { brand: "Magno Clean", product: "SHAMPOO ALFOMBRAS", category: "Magno", code: "SAN20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785540/mdc4ozfkvna88lmtddhr_bbieud.webp"},
  { brand: "Magno Clean", product: "ULTRA BLACK", category: "Magno", code: "SUB1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785552/w6ncpqxjcm1iemd885ev_vctxzz.webp"},
  { brand: "Magno Clean", product: "ULTRA BLACK", category: "Magno", code: "SUB5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785554/enszpklvzanhzzog4egf_fjwip8.webp"},
  { brand: "Magno Clean", product: "ULTRA BLACK", category: "Magno", code: "SUB20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785555/usuvvkctxzq2xgewlk8l_iwxy2o.webp"},
  { brand: "Magno Clean", product: "SHAMPOO GERMICIDA", category: "Magno", code: "SGA1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785548/ypkuefklvyhudk1hgd4w_novhqv.webp"},
  { brand: "Magno Clean", product: "SHAMPOO GERMICIDA", category: "Magno", code: "SGA5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785551/eelem9o7jcrttumrvb5t_chkrme.webp"},
  { brand: "Magno Clean", product: "SHAMPOO GERMICIDA", category: "Magno", code: "SGA20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785549/s9am33argn2sy8iwvltr_fpv6an.webp"},
  { brand: "Magno Clean", product: "HIDRATADOR DE CUERO", category: "Magno", code: "TCPH1", description: "1 KG", price: 210.46, unitPrice: 210.46, mayoreo: 280.61, mostrador: 350.76, digital: 350.76 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785557/l0enxgjkjyjp2yhevnit_l6wzig.webp"},
  { brand: "Magno Clean", product: "HIDRATADOR DE CUERO", category: "Magno", code: "TCPH4", description: "4 KG", price: 619.13, unitPrice: 619.13, mayoreo: 825.51, mostrador: 1031.89, digital: 1031.89 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785558/xryrkgpt7xyln2qvwde7_ujmjwq.webp"},
  { brand: "Magno Clean", product: "LIMPIADOR DE CUERO", category: "Magno", code: "TCPL1", description: "1 KG", price: 245.11, unitPrice: 245.11, mayoreo: 326.81, mostrador: 408.51, digital: 408.51 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785558/xryrkgpt7xyln2qvwde7_ujmjwq.webp"},
  { brand: "Magno Clean", product: "LIMPIADOR DE CUERO", category: "Magno", code: "TCPL4", description: "4 KG", price: 747.87, unitPrice: 747.87, mayoreo: 997.16, mostrador: 1246.45, digital: 1246.45 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785561/kj6wlcc9rfxwnoyihlzh_jrb7ih.webp"},
  { brand: "Magno Clean", product: "REPEL", category: "Magno", code: "PTR1", description: "1 LT", price: 289.53, unitPrice: 289.53, mayoreo: 386.04, mostrador: 482.55, digital: 482.55 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785533/zw21ceq8tn4pgyumqyhl_hgdelo.webp"},
  { brand: "Magno Clean", product: "REPEL", category: "Magno", code: "PTR4", description: "4 LTS", price: 786.05, unitPrice: 786.05, mayoreo: 1048.07, mostrador: 1310.09, digital: 1310.09 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785531/r6wdpja6t2qaqnmfi8ma_xntj45.webp"},
  { brand: "Magno Clean", product: "REPEL APPLY WET", category: "Magno", code: "PTRW1", description: "1 LT", price: 324.51, unitPrice: 324.51, mayoreo: 432.68, mostrador: 540.85, digital: 540.85 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785534/njgyrsksdimk5gpirrlk_blu6if.webp"},
  { brand: "Magno Clean", product: "REPEL APPLY WET", category: "Magno", code: "PTRW4", description: "4 LTS", price: 856.01, unitPrice: 856.01, mayoreo: 1141.35, mostrador: 1426.69, digital: 1426.69 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785536/mpjgorqh3neppsv63sxr_tpzozj.webp"},
  { brand: "Magno Clean", product: "CRISTALIZADOR DON REMIGIO H.", category: "Magno", code: "PICD1", description: "1 LT", price: 253.22, unitPrice: 253.22, mayoreo: 337.62, mostrador: 422.03, digital: 422.03 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785503/zfs8sezpopaupj5t24k0_tajmtp.webp"},
  { brand: "Magno Clean", product: "CRISTALIZADOR DON REMIGIO H.", category: "Magno", code: "PICD4", description: "4 LTS", price: 807.30, unitPrice: 807.30, mayoreo: 1076.40, mostrador: 1345.50, digital: 1345.50 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785505/sxk1s7yyorjhjs3qr3od_cwhxrn.webp"},
  { brand: "Magno Clean", product: "ACABA-ÁCAROS", category: "Magno", code: "DAA1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785465/ynewbtkjogmc0ulrktmz_cwij7y.webp"},
  { brand: "Magno Clean", product: "ACABA-ÁCAROS", category: "Magno", code: "DAA5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785467/yr41h7xrdf9utofb6fk2_cgf5h3.webp"},
  { brand: "Magno Clean", product: "ACABA-ÁCAROS", category: "Magno", code: "DAA20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785466/l3w3ryxy0y1bkdzkyavo_ryodmu.webp"},
  { brand: "Magno Clean", product: "PLANCHA FACIL", category: "Magno", code: "LPF5", description: "5 LTS", price: 139.22, unitPrice: 139.22, mayoreo: 185.62, mostrador: 232.03, digital: 232.03 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785489/44_lb0hmx.webp"},
  { brand: "Magno Clean", product: "SILICREMA", category: "Magno", code: "SIL1", description: "1 LT", price: 93.02, unitPrice: 93.02, mayoreo: 124.02, mostrador: 155.03, digital: 155.03 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785542/73_uj1rq6.webp"},
  { brand: "Magno Clean", product: "NEUTRO CAR", category: "Magno", code: "SCN1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785545/aku56vga3hzza20uaanq_psxb6g.webp"},
  { brand: "Magno Clean", product: "NEUTRO CAR", category: "Magno", code: "SCN5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785546/zunhjxjs1of5htnjnsaa_djsi9k.webp"},
  { brand: "Magno Clean", product: "NEUTRO CAR", category: "Magno", code: "SCN20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 , image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/v1784785543/qsxq7zhgttgtn0hbviqe_zmi5jf.webp"},

  {
    id: "vs-jugo-pet-puro-1l",
    sku: "VS001-PURO",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY PURO",
    category: "Jugo de Maguey",
    subcategory: "Jugo Pet",
    description: "100% PURO · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Puro",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 85.00,
    macro: 46.50,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1791959668/verde-santo/vs-jugo-pet-puro-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-pet-puro-1l.png",
  },

  {
    id: "vs-jugo-pet-10-plantas-1l",
    sku: "VS001-10PLANTAS",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY 10 PLANTAS",
    category: "Jugo de Maguey",
    subcategory: "Jugo Pet",
    description: "10 PLANTAS · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "10 Plantas",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 85.00,
    macro: 46.50,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1791959679/verde-santo/vs-jugo-pet-10-plantas-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-pet-10-plantas-1l.png",
  },

  {
    id: "vs-jugo-pet-granada-1l",
    sku: "VS001-GRANADA",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON GRANADA",
    category: "Jugo de Maguey",
    subcategory: "Jugo Pet",
    description: "GRANADA · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Granada",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 85.00,
    macro: 46.50,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1791959682/verde-santo/vs-jugo-pet-granada-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-pet-granada-1l.png",
  },

  {
    id: "vs-jugo-pet-muerdago-1l",
    sku: "VS001-MUERDAGO",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON MUÉRDAGO",
    category: "Jugo de Maguey",
    subcategory: "Jugo Pet",
    description: "MUÉRDAGO · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Muérdago",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 85.00,
    macro: 46.50,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1792092074/verde-santo/vs-jugo-pet-muerdago-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-pet-muerdago-1l.png",
  },

  {
    id: "vs-jugo-pet-cardo-mariano-1l",
    sku: "VS001-CARDOMARIANO",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON CARDO MARIANO",
    category: "Jugo de Maguey",
    subcategory: "Jugo Pet",
    description: "CARDO MARIANO · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Cardo Mariano",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 85.00,
    macro: 46.50,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1791959677/verde-santo/vs-jugo-pet-cardo-mariano-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-pet-cardo-mariano-1l.png",
  },

  {
    id: "vs-jugo-pet-curcuma-1l",
    sku: "VS001-CURCUMA",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON CÚRCUMA",
    category: "Jugo de Maguey",
    subcategory: "Jugo Pet",
    description: "CÚRCUMA · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Cúrcuma",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 85.00,
    macro: 46.50,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1791959665/verde-santo/vs-jugo-pet-curcuma-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-pet-curcuma-1l.png",
  },

  {
    id: "vs-jugo-pet-clorofila-1l",
    sku: "VS001-CLOROFILA",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON CLOROFILA",
    category: "Jugo de Maguey",
    subcategory: "Jugo Pet",
    description: "CLOROFILA · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Clorofila",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 85.00,
    macro: 46.50,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1792092077/verde-santo/vs-jugo-pet-clorofila-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-pet-clorofila-1l.png",
  },

  {
    id: "vs-jugo-pet-nopal-1l",
    sku: "VS001-NOPAL",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON NOPAL",
    category: "Jugo de Maguey",
    subcategory: "Jugo Pet",
    description: "NOPAL · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Nopal",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 85.00,
    macro: 46.50,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1791959671/verde-santo/vs-jugo-pet-nopal-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-pet-nopal-1l.png",
  },

  {
    id: "vs-jugo-pet-aloe-vera-1l",
    sku: "VS001-ALOEVERA",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON ALOE VERA",
    category: "Jugo de Maguey",
    subcategory: "Jugo Pet",
    description: "ALOE VERA · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Aloe Vera",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 85.00,
    macro: 46.50,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1791959674/verde-santo/vs-jugo-pet-aloe-vera-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-pet-aloe-vera-1l.png",
  },

  {
    id: "vs-jugo-pet-arandano-1l",
    sku: "VS001-ARANDANO",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON ARÁNDANO",
    category: "Jugo de Maguey",
    subcategory: "Jugo Pet",
    description: "ARÁNDANO · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Arándano",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 85.00,
    macro: 46.50,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1791959660/verde-santo/vs-jugo-pet-arandano-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-pet-arandano-1l.png",
  },

  // =========================================================
  // VERDE SANTO · JUGO DE MAGUEY CRISTAL 1 L
  // =========================================================

  {
    id: "vs-jugo-cristal-puro-1l",
    sku: "VS002-PURO",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY PURO",
    category: "Jugo de Maguey",
    subcategory: "Jugo Cristal",
    description: "100% PURO · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Puro",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 120.00,
    macro: 65.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042220/myyd4aovnjmukqug8rdi_lv2dyt.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-cristal-puro-1l.png",
  },

  {
    id: "vs-jugo-cristal-10-plantas-1l",
    sku: "VS002-10PLANTAS",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY 10 PLANTAS",
    category: "Jugo de Maguey",
    subcategory: "Jugo Cristal",
    description: "10 PLANTAS · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "10 Plantas",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 120.00,
    macro: 65.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042234/i4bxjalokkhkdg03xxru_jggodc.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-cristal-10-plantas-1l.png",
  },

  {
    id: "vs-jugo-cristal-granada-1l",
    sku: "VS002-GRANADA",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON GRANADA",
    category: "Jugo de Maguey",
    subcategory: "Jugo Cristal",
    description: "GRANADA · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Granada",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 120.00,
    macro: 65.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042258/ilg956vezqaoylot1gq8_xhutgy.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-cristal-granada-1l.png",
  },

  {
    id: "vs-jugo-cristal-muerdago-1l",
    sku: "VS002-MUERDAGO",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON MUÉRDAGO",
    category: "Jugo de Maguey",
    subcategory: "Jugo Cristal",
    description: "MUÉRDAGO · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Muérdago",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 120.00,
    macro: 65.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042205/hn4bk9egahm5qvbl6xdq_bdetcc.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-cristal-muerdago-1l.png",
  },

  {
    id: "vs-jugo-cristal-cardo-mariano-1l",
    sku: "VS002-CARDOMARIANO",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON CARDO MARIANO",
    category: "Jugo de Maguey",
    subcategory: "Jugo Cristal",
    description: "CARDO MARIANO · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Cardo Mariano",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 120.00,
    macro: 65.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042257/hncphkgij865hownh2o6_klfxwx.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-cristal-cardo-mariano-1l.png",
  },

  {
    id: "vs-jugo-cristal-curcuma-1l",
    sku: "VS002-CURCUMA",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON CÚRCUMA",
    category: "Jugo de Maguey",
    subcategory: "Jugo Cristal",
    description: "CÚRCUMA · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Cúrcuma",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 120.00,
    macro: 65.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042221/cysnieaddubeziwugybd_cixcwy.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-cristal-curcuma-1l.png",
  },

  {
    id: "vs-jugo-cristal-clorofila-1l",
    sku: "VS002-CLOROFILA",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON CLOROFILA",
    category: "Jugo de Maguey",
    subcategory: "Jugo Cristal",
    description: "CLOROFILA · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Clorofila",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 120.00,
    macro: 65.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042255/u2dsearu3vpi5cactnyv_l9d3fd.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-cristal-clorofila-1l.png",
  },

  {
    id: "vs-jugo-cristal-nopal-1l",
    sku: "VS002-NOPAL",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON NOPAL",
    category: "Jugo de Maguey",
    subcategory: "Jugo Cristal",
    description: "NOPAL · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Nopal",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 120.00,
    macro: 65.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042253/re9z23wcrccekordldvc_hq7xh6.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-cristal-nopal-1l.png",
  },

  {
    id: "vs-jugo-cristal-aloe-vera-1l",
    sku: "VS002-ALOEVERA",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON ALOE VERA",
    category: "Jugo de Maguey",
    subcategory: "Jugo Cristal",
    description: "ALOE VERA · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Aloe Vera",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 120.00,
    macro: 65.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042239/yotlvuhzhqsokupvmycp_r7wqeq.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-cristal-aloe-vera-1l.png",
  },

  {
    id: "vs-jugo-cristal-arandano-1l",
    sku: "VS002-ARANDANO",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY CON ARÁNDANO",
    category: "Jugo de Maguey",
    subcategory: "Jugo Cristal",
    description: "ARÁNDANO · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Arándano",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 120.00,
    macro: 65.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042169/rzq1pfosy8bebvwprqee_hytyvf.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-cristal-arandano-1l.png",
  },
  {
    id: "vs-jugo-monares-original-1l",
    sku: "VS-MONARES-ORIGINAL-1L",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY MONARES ORIGINAL",
    category: "Jugo de Maguey",
    subcategory: "Jugo Monares",
    description: "ORIGINAL · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Original",
    price: 0,
    unitPrice: 0,
    mayoreo: 0,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746136375/rpyojnbuw0qqkpaj4ya6_clrkk9.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-monares-original-1l.png",
  },
  {
    id: "vs-jugo-monares-11-plantas-1l",
    sku: "VS-MONARES-11-PLANTAS-1L",
    brand: "Verde Santo",
    product: "JUGO DE MAGUEY MONARES 11 PLANTAS",
    category: "Jugo de Maguey",
    subcategory: "Jugo Monares",
    description: "11 PLANTAS · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "11 Plantas",
    price: 0,
    unitPrice: 0,
    mayoreo: 0,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746136385/mp9rvzbfn1efz6b95o4d_x5pozb.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-monares-11-plantas-1l.png",
  },

  // GOLDEN MILK
  {
    id: "vs010-golden-milk-500g",
    sku: "VS010",
    brand: "Verde Santo",
    product: "GOLDEN MILK",
    category: "Golden Milk",
    subcategory: "Golden Milk",
    description: "LECHE DORADA EN POLVO · 500 GR",
    presentation: "500 GR",
    variant: "500 g",
    price: 169.00,
    unitPrice: 169.00,
    mayoreo: 225.00,
    mostrador: 297.00,
    digital: 297.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042176/lgoysigfr3jncufuawxp_scbb0t.webp",
    kitImage:
      "/assets/verde-santo/productos/vs010-golden-milk-500g.png",
  },
  {
    id: "vs011-golden-milk-1kg",
    sku: "VS011",
    brand: "Verde Santo",
    product: "GOLDEN MILK",
    category: "Golden Milk",
    subcategory: "Golden Milk",
    description: "LECHE DORADA EN POLVO · 1 KG",
    presentation: "1 KG",
    variant: "1 kg",
    price: 254.00,
    unitPrice: 254.00,
    mayoreo: 310.00,
    mostrador: 399.00,
    digital: 399.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042182/ancxtbclwqi4vfa2vmfe_hopyvk.webp",
    kitImage:
      "/assets/verde-santo/productos/vs011-golden-milk-1kg.png",
  },

  // GREEN MULTIPOLISH
  {
    id: "vs006-green-multipolish-250ml",
    sku: "VS006",
    brand: "Verde Santo",
    product: "GREEN MULTIPOLISH",
    category: "Green Multipolish",
    subcategory: "Green Multipolish",
    description: "LIMPIADOR MULTISUPERFICIES · 250 ML",
    presentation: "250 ML",
    variant: "250 ml",
    price: 58.00,
    unitPrice: 58.00,
    mayoreo: 80.00,
    mostrador: 120.00,
    digital: 120.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042149/efha53inlwjrkwzv5lem_xxtobk.webp",
    kitImage:
      "/assets/verde-santo/productos/vs006-green-multipolish-250ml.png",
  },
  {
    id: "vs007-green-multipolish-500ml",
    sku: "VS007",
    brand: "Verde Santo",
    product: "GREEN MULTIPOLISH",
    category: "Green Multipolish",
    subcategory: "Green Multipolish",
    description: "LIMPIADOR MULTISUPERFICIES · 500 ML",
    presentation: "500 ML",
    variant: "500 ml",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 120.00,
    mostrador: 180.00,
    digital: 180.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042151/tkzyhibrdlskqv61ejod_o8ebwb.webp",
    kitImage:
      "/assets/verde-santo/productos/vs007-green-multipolish-500ml.png",
  },
  {
    id: "vs008-green-multipolish-1l",
    sku: "VS008",
    brand: "Verde Santo",
    product: "GREEN MULTIPOLISH",
    category: "Green Multipolish",
    subcategory: "Green Multipolish",
    description: "LIMPIADOR MULTISUPERFICIES · 1 LT",
    presentation: "1 LT",
    variant: "1 L",
    price: 138.00,
    unitPrice: 138.00,
    mayoreo: 200.00,
    mostrador: 299.00,
    digital: 299.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042163/q1tftcwmafsc9o4xinay_a2fq0c.webp",
    kitImage:
      "/assets/verde-santo/productos/vs008-green-multipolish-1l.png",
  },
  {
    id: "vs009-green-multipolish-4l",
    sku: "VS009",
    brand: "Verde Santo",
    product: "GREEN MULTIPOLISH",
    category: "Green Multipolish",
    subcategory: "Green Multipolish",
    description: "LIMPIADOR MULTISUPERFICIES · 4 LT",
    presentation: "4 LT",
    variant: "4 L",
    price: 475.00,
    unitPrice: 475.00,
    mayoreo: 680.00,
    mostrador: 997.00,
    digital: 997.00,
    image: "",
    kitImage:
      "/assets/verde-santo/productos/vs009-green-multipolish-4l.png",
  },

  // VINAGRE DE MANZANA
  {
    id: "vs003-vinagre-manzana-pet-1l",
    sku: "VS003",
    brand: "Verde Santo",
    product: "VINAGRE DE MANZANA",
    category: "Vinagre de Manzana",
    subcategory: "Vinagre Pet",
    description: "CON MADRE · BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Pet 1 L",
    price: 53.00,
    unitPrice: 53.00,
    mayoreo: 95.00,
    mostrador: 150.00,
    digital: 150.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1762466951/base_ezlxen.jpg",
    kitImage:
      "/assets/verde-santo/productos/vs003-vinagre-manzana-pet-1l.png",
  },
  {
    id: "vs004-vinagre-manzana-cristal-1l",
    sku: "VS004",
    brand: "Verde Santo",
    product: "VINAGRE DE MANZANA",
    category: "Vinagre de Manzana",
    subcategory: "Vinagre Cristal",
    description: "CON MADRE · BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Cristal 1 L",
    price: 65.00,
    unitPrice: 65.00,
    mayoreo: 120.00,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1762466432/ec6e8842b12960986f38165be75c9d3e0b48be5b9a6a340079da23f019e3fd25_xcxlvx.png",
    kitImage:
      "/assets/verde-santo/productos/vs004-vinagre-manzana-cristal-1l.png",
  },
  {
    id: "vs-vinagre-manzana-pet-2l",
    sku: "VS-VINAGRE-2L",
    brand: "Verde Santo",
    product: "VINAGRE DE MANZANA",
    category: "Vinagre de Manzana",
    subcategory: "Vinagre 2L",
    description: "CON MADRE · BOTELLA PET 2 LT",
    presentation: "PET",
    variant: "Pet 2 L",
    price: 0,
    unitPrice: 0,
    mayoreo: 0,
    mostrador: 199.00,
    digital: 199.00,
    image:
      "https://res.cloudinary.com/diefezach/image/upload/f_auto,q_auto,w_400/v1749501816/V2L_z8hzvh.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-vinagre-manzana-pet-2l.png",
  },

  // MIEL DE AGAVE
  {
    id: "vs005-miel-agave-cristal-1370kg",
    sku: "VS005",
    brand: "Verde Santo",
    product: "MIEL DE AGAVE",
    category: "Miel de Agave",
    subcategory: "Miel de Agave",
    description: "MIEL ORGÁNICA · BOTELLA DE CRISTAL 1.370 KG",
    presentation: "Cristal",
    variant: "1.370 kg",
    price: 148.00,
    unitPrice: 148.00,
    mayoreo: 220.00,
    mostrador: 299.00,
    digital: 299.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042175/sgosvhk1dlpojh3fmbbp_w8go48.webp",
    // 1.370 kg de miel caben en una botella de 1 L.
    kitVolumenMl: 1000,
    kitImage:
      "/assets/verde-santo/productos/vs005-miel-agave-cristal-1370kg.png",
  },

  // INULINA DE AGAVE
  {
    id: "vs012-inulina-agave-250g",
    sku: "VS012",
    brand: "Verde Santo",
    product: "INULINA DE AGAVE",
    category: "Inulina de Agave",
    subcategory: "Inulina de Agave",
    description: "PREBIÓTICO EN POLVO · 250 GR",
    presentation: "250 GR",
    variant: "250 g",
    price: 138.00,
    unitPrice: 138.00,
    mayoreo: 200.00,
    mostrador: 299.00,
    digital: 299.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042156/jhahox1kdmnhtf3nbcqf_fvwjjn.webp",
    kitImage:
      "/assets/verde-santo/productos/vs012-inulina-agave-250g.png",
  },

  // ACEITE DE ORÉGANO
  {
    id: "vs013-aceite-oregano-30ml",
    sku: "VS013",
    brand: "Verde Santo",
    product: "ACEITE DE ORÉGANO",
    category: "Aceite de Orégano",
    subcategory: "Aceite de Orégano",
    description: "ACEITE NATURAL · 30 ML",
    presentation: "30 ML",
    variant: "30 ml",
    price: 79.50,
    unitPrice: 79.50,
    mayoreo: 170.00,
    mostrador: 299.00,
    digital: 299.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042137/hfllchkcgvnhnzeyvfpv_clwjrf.webp",
    kitImage:
      "/assets/verde-santo/productos/vs013-aceite-oregano-30ml.png",
  },
  {
    id: "vs014-aceite-oregano-250ml",
    sku: "VS014",
    brand: "Verde Santo",
    product: "ACEITE DE ORÉGANO",
    category: "Aceite de Orégano",
    subcategory: "Aceite de Orégano",
    description: "ACEITE NATURAL · 250 ML",
    presentation: "250 ML",
    variant: "250 ml",
    price: 210.00,
    unitPrice: 210.00,
    mayoreo: 450.00,
    mostrador: 999.00,
    digital: 999.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042122/thvq3hnjpidgqblsmlvt_trc4j6.webp",
    kitImage:
      "/assets/verde-santo/productos/vs014-aceite-oregano-250ml.png",
  },
  {
    id: "vs015-aceite-oregano-500ml",
    sku: "VS015",
    brand: "Verde Santo",
    product: "ACEITE DE ORÉGANO",
    category: "Aceite de Orégano",
    subcategory: "Aceite de Orégano",
    description: "ACEITE NATURAL · 500 ML",
    presentation: "500 ML",
    variant: "500 ml",
    price: 420.00,
    unitPrice: 420.00,
    mayoreo: 950.00,
    mostrador: 1799.00,
    digital: 1799.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042133/qrdkyzbnpksjinqjou2e_xfims3.webp",
    kitImage:
      "/assets/verde-santo/productos/vs015-aceite-oregano-500ml.png",
  },
  {
    id: "vs016-aceite-oregano-1l",
    sku: "VS016",
    brand: "Verde Santo",
    product: "ACEITE DE ORÉGANO",
    category: "Aceite de Orégano",
    subcategory: "Aceite de Orégano",
    description: "ACEITE NATURAL · 1 LT",
    presentation: "1 LT",
    variant: "1 L",
    price: 790.00,
    unitPrice: 790.00,
    mayoreo: 1690.00,
    mostrador: 3199.00,
    digital: 3199.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1746042114/ikglq5tvakkzzthl0hpk_womiqx.webp",
    kitImage:
      "/assets/verde-santo/productos/vs016-aceite-oregano-1l.png",
  },

  // JUGOS ORGÁNICOS
  {
    id: "vs021-jugo-arandano-organico-cristal-1l",
    sku: "VS021",
    brand: "Verde Santo",
    product: "JUGO DE ARÁNDANO ORGÁNICO",
    category: "Jugo Orgánico",
    subcategory: "Jugo de Arándano",
    description: "BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Arándano",
    price: 140.00,
    unitPrice: 140.00,
    mayoreo: 195.00,
    mostrador: 299.00,
    digital: 299.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1748914950/kftglr5dlor9fku7z2ji_k2ooxe.webp",
    kitImage:
      "/assets/verde-santo/productos/vs021-jugo-arandano-organico-cristal-1l.png",
  },
  {
    id: "vs022-jugo-arandano-organico-pet-1l",
    sku: "VS022",
    brand: "Verde Santo",
    product: "JUGO DE ARÁNDANO ORGÁNICO",
    category: "Jugo Orgánico",
    subcategory: "Jugo de Arándano",
    description: "BOTELLA PET 1 LT",
    presentation: "PET",
    variant: "Arándano",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 175.00,
    mostrador: 275.00,
    digital: 275.00,
    image: "",
    kitImage:
      "/assets/verde-santo/productos/vs022-jugo-arandano-organico-pet-1l.png",
  },
  {
    id: "vs025-jugo-noni-organico-cristal-1l",
    sku: "VS025",
    brand: "Verde Santo",
    product: "JUGO DE NONI ORGÁNICO",
    category: "Jugo Orgánico",
    subcategory: "Jugo de Noni",
    description: "BOTELLA DE CRISTAL 1 LT",
    presentation: "Cristal",
    variant: "Noni",
    price: 210.00,
    unitPrice: 210.00,
    mayoreo: 210.00,
    mostrador: 299.00,
    digital: 299.00,
    image:
      "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1792186487/verde-santo/vs025-jugo-noni-organico-cristal-1l.png",
    kitImage:
      "/assets/verde-santo/productos/vs025-jugo-noni-organico-cristal-1l.png",
  },
  {
    id: "vs-jugo-guanabana-organico-1l",
    sku: "VS-GUANABANA-1L",
    brand: "Verde Santo",
    product: "JUGO DE GUANÁBANA ORGÁNICO",
    category: "Jugo Orgánico",
    subcategory: "Jugo de Guanábana",
    description: "BOTELLA 1 LT",
    presentation: "1 LT",
    variant: "Guanábana",
    price: 0,
    unitPrice: 0,
    mayoreo: 0,
    mostrador: 299.00,
    digital: 299.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1748914951/qivwtf6ivjskutsywteo_srjnpt.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-jugo-guanabana-organico-1l.png",
  },

  // ALIMENTO PARA COLIBRÍ
  {
    id: "vs-nectar-colibri-1l",
    sku: "VS-COLIBRI-1L",
    brand: "Verde Santo",
    product: "NÉCTAR PARA COLIBRÍ",
    category: "Alimento Mascotas",
    subcategory: "Colibrí",
    description: "ALIMENTO LÍQUIDO · 1 LT",
    presentation: "1 LT",
    variant: "1 L",
    price: 0,
    unitPrice: 0,
    mayoreo: 0,
    mostrador: 65.00,
    digital: 65.00,
    image:
      "https://res.cloudinary.com/diefezach/image/upload/f_auto,q_auto,w_400/v1756932692/gmy4mm5wa9se8qkh9i7f_o4q9qf.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-nectar-colibri-1l.png",
  },
  {
    id: "vs-nectar-colibri-4l",
    sku: "VS-COLIBRI-4L",
    brand: "Verde Santo",
    product: "NÉCTAR PARA COLIBRÍ",
    category: "Alimento Mascotas",
    subcategory: "Colibrí",
    description: "ALIMENTO LÍQUIDO · 4 LT",
    presentation: "4 LT",
    variant: "4 L",
    price: 0,
    unitPrice: 0,
    mayoreo: 0,
    mostrador: 169.00,
    digital: 169.00,
    image:
      "https://res.cloudinary.com/diefezach/image/upload/f_auto,q_auto,w_400/v1756932691/ur3gpgugdgo3heurt8tb_cxnruo.webp",
    kitImage:
      "/assets/verde-santo/productos/vs-nectar-colibri-4l.png",
  },

  // BEBIDAS EN GARRAFA
  {
    id: "vs-bebida-sabila-1l",
    sku: "VS-SABILA-1L",
    brand: "Verde Santo",
    product: "JUGO DE SÁBILA",
    category: "Bebida Garrafa",
    subcategory: "Sábila",
    description: "BEBIDA EN GARRAFA · 1 LT",
    presentation: "1 LT",
    variant: "Sábila",
    price: 0,
    unitPrice: 0,
    mayoreo: 0,
    mostrador: 89.00,
    digital: 89.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1760036988/sabila_eqvwn3.jpg",
    kitImage:
      "/assets/verde-santo/productos/vs-bebida-sabila-1l.png",
  },
  {
    id: "vs-bebida-sabila-nopal-1l",
    sku: "VS-SABILA-NOPAL-1L",
    brand: "Verde Santo",
    product: "JUGO DE SÁBILA Y NOPAL",
    category: "Bebida Garrafa",
    subcategory: "Sábila y Nopal",
    description: "BEBIDA EN GARRAFA · 1 LT",
    presentation: "1 LT",
    variant: "Sábila y Nopal",
    price: 0,
    unitPrice: 0,
    mayoreo: 0,
    mostrador: 89.00,
    digital: 89.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1760036988/sabnop_vocqdn.jpg",
    kitImage:
      "/assets/verde-santo/productos/vs-bebida-sabila-nopal-1l.png",
  },
  {
    id: "vs-bebida-sabila-nopal-cuachalalate-1l",
    sku: "VS-SABILA-NOPAL-CUACHALALATE-1L",
    brand: "Verde Santo",
    product: "JUGO DE SÁBILA, NOPAL Y CUACHALALATE",
    category: "Bebida Garrafa",
    subcategory: "Sábila, Nopal y Cuachalalate",
    description: "BEBIDA EN GARRAFA · 1 LT",
    presentation: "1 LT",
    variant: "Sábila, Nopal y Cuachalalate",
    price: 0,
    unitPrice: 0,
    mayoreo: 0,
    mostrador: 89.00,
    digital: 89.00,
    image:
      "https://res.cloudinary.com/dhldooapx/image/upload/f_auto,q_auto,w_400/v1760036988/sabnocua_zxdvyn.jpg",
    kitImage:
      "/assets/verde-santo/productos/vs-bebida-sabila-nopal-cuachalalate-1l.png",
  },

  // RETOKCAR · Esmalte retocador automotriz 15 ml.
  // price = costo; Mayoreo por pieza; Digital = Mostrador = precio público.
  // Nombre del color como sale en la página de colores de RetoKcar
  // (dtup-retocadores-zach.netlify.app) y código de color del inventario
  // de Diego; los códigos que no se encontraron en esa página conservan el
  // nombre en español.
  {
    id: "retokcar-honda-plata-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR HONDA URBAN GRAY",
    category: "RetoKcar",
    description: "COLOR PLATA · CÓDIGO NH912P · REF. VS5 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-honda-plata-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-honda-plata-15ml.png",
  },
  {
    id: "retokcar-honda-rojo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR HONDA MILANO RED",
    category: "RetoKcar",
    description: "COLOR ROJO · CÓDIGO R81 · REF. VS3 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-honda-rojo-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-honda-rojo-15ml.png",
  },
  {
    id: "retokcar-honda-blanco-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR HONDA WHITE ORCHID",
    category: "RetoKcar",
    description: "COLOR BLANCO · CÓDIGO NH788 · REF. VS2 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-honda-blanco-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-honda-blanco-15ml.png",
  },
  {
    id: "retokcar-honda-azul-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR HONDA SPORTY BLUE",
    category: "RetoKcar",
    description: "COLOR AZUL · CÓDIGO B593M · REF. VS6 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-honda-azul-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-honda-azul-15ml.png",
  },
  {
    id: "retokcar-honda-gris-oxford-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR HONDA MODERN STEEL",
    category: "RetoKcar",
    description: "COLOR GRIS OXFORD · CÓDIGO NH797M · REF. VS7 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-honda-gris-oxford-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-honda-gris-oxford-15ml.png",
  },
  {
    id: "retokcar-nissan-naranja-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR NISSAN NARANJA",
    category: "RetoKcar",
    description: "COLOR NARANJA · CÓDIGO EBL · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-nissan-naranja-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-nissan-naranja-15ml.png",
  },
  {
    id: "retokcar-nissan-plata-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR NISSAN BRILLIANT SILVER",
    category: "RetoKcar",
    description: "COLOR PLATA · CÓDIGO K23 · REF. VS4 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-nissan-plata-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-nissan-plata-15ml.png",
  },
  {
    id: "retokcar-nissan-rojo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR NISSAN FORCE RED",
    category: "RetoKcar",
    description: "COLOR ROJO · CÓDIGO NAH · REF. VS5 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-nissan-rojo-15ml",
    // La foto sale un poco más angosta que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 14.6,
    kitImage: "/assets/retokcar/productos/retokcar-nissan-rojo-15ml.png",
  },
  {
    id: "retokcar-nissan-gris-oxford-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR NISSAN GREY",
    category: "RetoKcar",
    description: "COLOR GRIS OXFORD · CÓDIGO KAD · REF. VS6 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-nissan-gris-oxford-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-nissan-gris-oxford-15ml.png",
  },
  {
    id: "retokcar-chevrolet-rojo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR CHEVROLET JINX",
    category: "RetoKcar",
    description: "COLOR ROJO · CÓDIGO GEJ · REF. VS5 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-chevrolet-rojo-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-chevrolet-rojo-15ml.png",
  },
  {
    id: "retokcar-chevrolet-blanco-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR CHEVROLET WHITE DIAMOND",
    category: "RetoKcar",
    description: "COLOR BLANCO · CÓDIGO GBN · REF. VS2 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-chevrolet-blanco-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-chevrolet-blanco-15ml.png",
  },
  {
    id: "retokcar-chevrolet-plata-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR CHEVROLET SWITCHBLADE SILVER",
    category: "RetoKcar",
    description: "COLOR PLATA · CÓDIGO 636R · REF. VS4 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-chevrolet-plata-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-chevrolet-plata-15ml.png",
  },
  {
    id: "retokcar-hyundai-plata-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR HYUNDAI TYPHOON SILVER",
    category: "RetoKcar",
    description: "COLOR PLATA · CÓDIGO T2X · REF. VS3 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-hyundai-plata-15ml",
    // La foto sale un poco más angosta que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 14.2,
    kitImage: "/assets/retokcar/productos/retokcar-hyundai-plata-15ml.png",
  },
  {
    id: "retokcar-hyundai-gris-oxford-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR HYUNDAI GRIS OXFORD",
    category: "RetoKcar",
    description: "COLOR GRIS OXFORD · CÓDIGO R4J · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-hyundai-gris-oxford-15ml",
    // La foto sale un poco más ancha que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 16.6,
    kitImage: "/assets/retokcar/productos/retokcar-hyundai-gris-oxford-15ml.png",
  },
  {
    id: "retokcar-hyundai-rojo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR HYUNDAI FIERY RED",
    category: "RetoKcar",
    description: "COLOR ROJO · CÓDIGO R4R · REF. VS4 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-hyundai-rojo-15ml",
    // La foto sale un poco más angosta que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 14.4,
    kitImage: "/assets/retokcar/productos/retokcar-hyundai-rojo-15ml.png",
  },
  {
    id: "retokcar-bmw-gris-nardo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR BMW GRIS NARDO",
    category: "RetoKcar",
    description: "COLOR GRIS NARDO · CÓDIGO C3N · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-bmw-gris-nardo-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-bmw-gris-nardo-15ml.png",
  },
  {
    id: "retokcar-mg-gris-oxford-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR MG CYBER GREY",
    category: "RetoKcar",
    description: "COLOR GRIS OXFORD · CÓDIGO LME · REF. VS6 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-mg-gris-oxford-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-mg-gris-oxford-15ml.png",
  },
  {
    id: "retokcar-mg-plata-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR MG WESTMINSTER SILVER",
    category: "RetoKcar",
    description: "COLOR PLATA · CÓDIGO LMB · REF. VS5 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-mg-plata-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-mg-plata-15ml.png",
  },
  {
    id: "retokcar-toyota-gris-nardo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR TOYOTA GRIS NARDO",
    category: "RetoKcar",
    description: "COLOR GRIS NARDO · CÓDIGO 1H5 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-toyota-gris-nardo-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-toyota-gris-nardo-15ml.png",
  },
  {
    id: "retokcar-toyota-gris-oxford-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR TOYOTA GRIS OXFORD",
    category: "RetoKcar",
    description: "COLOR GRIS OXFORD · CÓDIGO 1J3 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-toyota-gris-oxford-15ml",
    // La foto sale un poco más angosta que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 14.5,
    kitImage: "/assets/retokcar/productos/retokcar-toyota-gris-oxford-15ml.png",
  },
  {
    id: "retokcar-kia-azul-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR KIA DEEP SEA BLUE",
    category: "RetoKcar",
    description: "COLOR AZUL · CÓDIGO B2R · REF. VS7 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-kia-azul-15ml",
    // La foto sale un poco más angosta que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 14.3,
    kitImage: "/assets/retokcar/productos/retokcar-kia-azul-15ml.png",
  },
  {
    id: "retokcar-kia-rojo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR KIA CURRANT RED",
    category: "RetoKcar",
    description: "COLOR ROJO · CÓDIGO R4R · REF. VS4 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-kia-rojo-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-kia-rojo-15ml.png",
  },
  {
    id: "retokcar-mazda-gris-oxford-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR MAZDA MACHINE GRAY",
    category: "RetoKcar",
    description: "COLOR GRIS OXFORD · CÓDIGO 46G · REF. VS7 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-mazda-gris-oxford-15ml",
    // La foto sale un poco más ancha que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 15.8,
    kitImage: "/assets/retokcar/productos/retokcar-mazda-gris-oxford-15ml.png",
  },
  {
    id: "retokcar-mazda-gris-nardo-polymetal-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR MAZDA GRIS NARDO POLYMETAL",
    category: "RetoKcar",
    description: "COLOR GRIS NARDO POLYMETAL · CÓDIGO 47C · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-mazda-gris-nardo-polymetal-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-mazda-gris-nardo-polymetal-15ml.png",
  },
  // Sin código: el de su renglón del inventario (2Z2Z) sale en la página
  // como Oro Shakir, no como Gris Nardo. Falta que Diego lo confirme.
  {
    id: "retokcar-audi-gris-nardo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR AUDI GRIS NARDO",
    category: "RetoKcar",
    description: "FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-audi-gris-nardo-15ml",
    // La foto sale un poco más ancha que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 16.0,
    kitImage: "/assets/retokcar/productos/retokcar-audi-gris-nardo-15ml.png",
  },
  {
    id: "retokcar-volkswagen-negro-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR VOLKSWAGEN DEEP BLACK PEARL",
    category: "RetoKcar",
    description: "COLOR NEGRO · CÓDIGO 2T2T · REF. VS7 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-volkswagen-negro-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-volkswagen-negro-15ml.png",
  },
  {
    id: "retokcar-volkswagen-plata-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR VOLKSWAGEN PLATINUM GREY",
    category: "RetoKcar",
    description: "COLOR PLATA · CÓDIGO LD7X · REF. VS7 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-volkswagen-plata-15ml",
    // La foto sale un poco más ancha que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 16.0,
    kitImage: "/assets/retokcar/productos/retokcar-volkswagen-plata-15ml.png",
  },
  {
    id: "retokcar-volkswagen-gris-oxford-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR VOLKSWAGEN PLATINUM GREY METALLIC",
    category: "RetoKcar",
    description: "COLOR GRIS OXFORD · CÓDIGO 2R2R · REF. VS7 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-volkswagen-gris-oxford-15ml",
    // La foto sale un poco más ancha que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 16.8,
    kitImage: "/assets/retokcar/productos/retokcar-volkswagen-gris-oxford-15ml.png",
  },
  {
    id: "retokcar-volkswagen-rojo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR VOLKSWAGEN MISANOROT PRL",
    category: "RetoKcar",
    description: "COLOR ROJO · CÓDIGO LZ3M · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-volkswagen-rojo-15ml",
    // La foto sale un poco más ancha que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 16.5,
    kitImage: "/assets/retokcar/productos/retokcar-volkswagen-rojo-15ml.png",
  },
  {
    id: "retokcar-toyota-rojo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR TOYOTA EMOTIONAL RED",
    category: "RetoKcar",
    description: "COLOR ROJO · CÓDIGO 3U5 · REF. VS4 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-toyota-rojo-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-toyota-rojo-15ml.png",
  },
  {
    id: "retokcar-toyota-plata-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR TOYOTA ULTRA SILVER",
    category: "RetoKcar",
    description: "COLOR PLATA · CÓDIGO 1F7 · REF. VS3 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-toyota-plata-15ml",
    // La foto sale un poco más angosta que la de los demás
    // retoques; con esto el kit lo dibuja de la misma altura.
    kitVolumenMl: 14.6,
    kitImage: "/assets/retokcar/productos/retokcar-toyota-plata-15ml.png",
  },
  {
    id: "retokcar-kia-gris-oxford-perla-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR KIA GRAVITY GRAY",
    category: "RetoKcar",
    description: "COLOR GRIS OXFORD PERLA · CÓDIGO KDG · REF. VS7 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-kia-gris-oxford-perla-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-kia-gris-oxford-perla-15ml.png",
  },
  {
    id: "retokcar-byd-mercury-blue-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR BYD MERCURY BLUE",
    category: "RetoKcar",
    description: "COLOR MERCURY BLUE · CÓDIGO LAT · REF. VS4 · FRASCO 15 ML CON PINCEL",
    price: 56.00,
    unitPrice: 56.00,
    mayoreo: 102.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-byd-mercury-blue-15ml",
    kitImage: "/assets/retokcar/productos/retokcar-byd-mercury-blue-15ml.png",
  },
  // Dúos: dos retocadores del mismo color (base y perla) que se venden
  // juntos. Costo y Mayoreo son el doble de los de un retocador. La foto
  // trae los dos frascos; con kitVolumenMl el kit los dibuja de la misma
  // altura que los retoques sueltos.
  {
    id: "retokcar-nissan-blanco-perla-duo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR NISSAN VISUAL PEARL (DÚO)",
    category: "RetoKcar",
    description: "COLOR BLANCO PERLA · CÓDIGO QAC · REF. VS2 · DÚO BASE + PERLA · 2 FRASCOS DE 15 ML CON PINCEL",
    price: 112.00,
    unitPrice: 112.00,
    mayoreo: 204.00,
    mostrador: 399.00,
    digital: 399.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-nissan-blanco-perla-duo-15ml",
    kitVolumenMl: 65.2,
    kitImage: "/assets/retokcar/productos/retokcar-nissan-blanco-perla-duo-15ml.png",
  },
  {
    id: "retokcar-kia-blanco-perla-duo-15ml",
    brand: "RetoKcar",
    product: "ESMALTE RETOCADOR KIA SNOW WHITE PEARL (DÚO)",
    category: "RetoKcar",
    description: "COLOR BLANCO PERLA · CÓDIGO SWP · REF. VS1 · DÚO BASE + PERLA · 2 FRASCOS DE 15 ML CON PINCEL",
    price: 112.00,
    unitPrice: 112.00,
    mayoreo: 204.00,
    mostrador: 399.00,
    digital: 399.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/retokcar/retokcar-kia-blanco-perla-duo-15ml-v2",
    kitVolumenMl: 59.9,
    kitImage: "/assets/retokcar/productos/retokcar-kia-blanco-perla-duo-15ml.png",
  },
  // SORELLA · Cremas para peinar.
  {
    id: "sorella-curly-crema-peinar-rizos",
    brand: "Sorella",
    product: "CURLY CREMA PARA PEINAR RIZOS",
    category: "Sorella",
    description: "BOTELLA CON DOSIFICADOR 500 ML",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 180.00,
    mostrador: 249.00,
    digital: 249.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/sorella/sorella-curly-crema-peinar-rizos",
    kitImage: "/assets/sorella/productos/sorella-curly-crema-peinar-rizos.png",
  },
  {
    id: "sorella-nutry-crema-peinar-acido-hialuronico",
    brand: "Sorella",
    product: "NUTRY CREMA PARA PEINAR ÁCIDO HIALURÓNICO",
    category: "Sorella",
    description: "BOTELLA CON DOSIFICADOR 500 ML",
    price: 120.00,
    unitPrice: 120.00,
    mayoreo: 180.00,
    mostrador: 249.00,
    digital: 249.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/sorella/sorella-nutry-crema-peinar-acido-hialuronico",
    kitImage: "/assets/sorella/productos/sorella-nutry-crema-peinar-acido-hialuronico.png",
  },
  // FRATELO · Cuidado capilar. Digital = precio de publicación en ML.
  {
    id: "fratelo-raiz-forte-tonico-120ml",
    brand: "Fratelo",
    product: "RAÍZ FORTE LOCIÓN TÓNICA CAPILAR",
    category: "Fratelo",
    description: "SPRAY 120 ML",
    price: 110.00,
    unitPrice: 110.00,
    mayoreo: 165.00,
    mostrador: 299.00,
    digital: 299.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1793045916/fratelo/fratelo-raiz-forte-tonico-120ml-v2.png",
    kitImage: "/assets/fratelo/productos/fratelo-raiz-forte-tonico-120ml.png",
  },
  {
    id: "fratelo-raiz-vital-shampoo-1l",
    brand: "Fratelo",
    product: "RAÍZ VITAL SHAMPOO ANTICAÍDA",
    category: "Fratelo",
    description: "BOTELLA CON DOSIFICADOR 1 LT",
    price: 85.00,
    unitPrice: 85.00,
    mayoreo: 130.00,
    mostrador: 299.00,
    digital: 299.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/v1793045917/fratelo/fratelo-raiz-vital-shampoo-1l-v2.png",
    kitImage: "/assets/fratelo/productos/fratelo-raiz-vital-shampoo-1l.png",
  },

  // MAGNÍFICOS DE LA LIMPIEZA
  // Costo y Mayoreo pendientes de Diego: mientras tanto
  // van iguales al precio Digital.
  {
    id: "magnificos-clarificante-alberca-5l",
    brand: "Magníficos de la Limpieza",
    product: "CLARIFICANTE PARA ALBERCA",
    category: "Magníficos de la Limpieza",
    description: "GARRAFA 5 LT",
    price: 499.00,
    unitPrice: 499.00,
    mayoreo: 499.00,
    mostrador: 499.00,
    digital: 499.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-clarificante-alberca-5l-v2",
    kitImage: "/assets/magnificos/productos/magnificos-clarificante-alberca-5l.png",
  },
  {
    id: "magnificos-clarificante-alberca-20l",
    brand: "Magníficos de la Limpieza",
    product: "CLARIFICANTE PARA ALBERCA",
    category: "Magníficos de la Limpieza",
    description: "GARRAFA 20 LT",
    price: 1299.00,
    unitPrice: 1299.00,
    mayoreo: 1299.00,
    mostrador: 1299.00,
    digital: 1299.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-clarificante-alberca-20l",
    kitImage: "/assets/magnificos/productos/magnificos-clarificante-alberca-20l.png",
  },
  {
    id: "magnificos-alguicida-alberca-5l",
    brand: "Magníficos de la Limpieza",
    product: "ALGUICIDA PARA ALBERCA",
    category: "Magníficos de la Limpieza",
    description: "GARRAFA 5 LT",
    price: 499.00,
    unitPrice: 499.00,
    mayoreo: 499.00,
    mostrador: 499.00,
    digital: 499.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-alguicida-alberca-5l",
    kitImage: "/assets/magnificos/productos/magnificos-alguicida-alberca-5l.png",
  },
  {
    id: "magnificos-floculante-alberca-5l",
    brand: "Magníficos de la Limpieza",
    product: "FLOCULANTE PARA ALBERCA",
    category: "Magníficos de la Limpieza",
    description: "GARRAFA 5 LT",
    price: 499.00,
    unitPrice: 499.00,
    mayoreo: 499.00,
    mostrador: 499.00,
    digital: 499.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-floculante-alberca-5l",
    kitImage: "/assets/magnificos/productos/magnificos-floculante-alberca-5l.png",
  },
  {
    id: "magnificos-floculante-alberca-20l",
    brand: "Magníficos de la Limpieza",
    product: "FLOCULANTE PARA ALBERCA",
    category: "Magníficos de la Limpieza",
    description: "GARRAFA 20 LT",
    price: 1199.00,
    unitPrice: 1199.00,
    mayoreo: 1199.00,
    mostrador: 1199.00,
    digital: 1199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-floculante-alberca-20l",
    kitImage: "/assets/magnificos/productos/magnificos-floculante-alberca-20l.png",
  },
  {
    id: "magnificos-pastillas-tricloro-1kg",
    brand: "Magníficos de la Limpieza",
    product: "PASTILLAS DE TRICLORO",
    category: "Magníficos de la Limpieza",
    description: "BOTE 1 KG · 65 PASTILLAS DE 1 PULGADA",
    price: 299.00,
    unitPrice: 299.00,
    mayoreo: 299.00,
    mostrador: 299.00,
    digital: 299.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-pastillas-tricloro-1kg",
    kitImage: "/assets/magnificos/productos/magnificos-pastillas-tricloro-1kg.png",
  },
  {
    id: "magnificos-acox-acido-oxalico-1kg",
    brand: "Magníficos de la Limpieza",
    product: "ACOX ÁCIDO OXÁLICO PULIMENTO DE PISOS",
    category: "Magníficos de la Limpieza",
    description: "BOTE 1 KG",
    price: 299.00,
    unitPrice: 299.00,
    mayoreo: 299.00,
    mostrador: 299.00,
    digital: 299.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-acox-acido-oxalico-1kg",
    kitImage: "/assets/magnificos/productos/magnificos-acox-acido-oxalico-1kg.png",
  },
  {
    id: "magnificos-vinagre-limpieza-3-78l",
    brand: "Magníficos de la Limpieza",
    product: "VINAGRE DE LIMPIEZA 8%",
    category: "Magníficos de la Limpieza",
    description: "GALÓN 3.78 LT",
    price: 199.00,
    unitPrice: 199.00,
    mayoreo: 199.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-vinagre-limpieza-3-78l",
    kitImage: "/assets/magnificos/productos/magnificos-vinagre-limpieza-3-78l.png",
  },
  {
    id: "magnificos-quita-olores-menta-500ml",
    brand: "Magníficos de la Limpieza",
    product: "QUITA OLORES ENZIMÁTICO AROMA MENTA",
    category: "Magníficos de la Limpieza",
    description: "ATOMIZADOR 500 ML",
    price: 129.00,
    unitPrice: 129.00,
    mayoreo: 129.00,
    mostrador: 129.00,
    digital: 129.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-quita-olores-menta-500ml",
    kitImage: "/assets/magnificos/productos/magnificos-quita-olores-menta-500ml.png",
  },
  {
    id: "magnificos-quita-olores-cereza-500ml",
    brand: "Magníficos de la Limpieza",
    product: "QUITA OLORES ENZIMÁTICO AROMA CEREZA",
    category: "Magníficos de la Limpieza",
    description: "ATOMIZADOR 500 ML",
    price: 129.00,
    unitPrice: 129.00,
    mayoreo: 129.00,
    mostrador: 129.00,
    digital: 129.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-quita-olores-cereza-500ml",
    kitImage: "/assets/magnificos/productos/magnificos-quita-olores-cereza-500ml.png",
  },
  {
    id: "magnificos-quita-olores-golden-essence-500ml",
    brand: "Magníficos de la Limpieza",
    product: "QUITA OLORES ENZIMÁTICO GOLDEN ESSENCE",
    category: "Magníficos de la Limpieza",
    description: "ATOMIZADOR 500 ML",
    price: 129.00,
    unitPrice: 129.00,
    mayoreo: 129.00,
    mostrador: 129.00,
    digital: 129.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-quita-olores-golden-essence-500ml",
    kitImage: "/assets/magnificos/productos/magnificos-quita-olores-golden-essence-500ml.png",
  },

  // Cero Olor Enzimático en galón. Costo y Mayoreo pendientes de Diego:
  // mientras tanto van iguales al precio público. Sus fotos salen más
  // angostas que la del Vinagre de Limpieza en galón; con kitVolumenMl
  // el kit dibuja los tres galones de la misma altura.
  {
    id: "magnificos-cero-olor-naranja-3-78l",
    brand: "Magníficos de la Limpieza",
    product: "CERO OLOR ENZIMÁTICO NARANJA",
    category: "Magníficos de la Limpieza",
    description: "GALÓN 3.78 LT · NEUTRALIZADOR DE OLORES",
    price: 399.00,
    unitPrice: 399.00,
    mayoreo: 399.00,
    mostrador: 399.00,
    digital: 399.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-cero-olor-naranja-3-78l",
    kitVolumenMl: 3520,
    kitImage: "/assets/magnificos/productos/magnificos-cero-olor-naranja-3-78l.png",
  },
  {
    id: "magnificos-cero-olor-lavanda-3-78l",
    brand: "Magníficos de la Limpieza",
    product: "CERO OLOR ENZIMÁTICO LAVANDA",
    category: "Magníficos de la Limpieza",
    description: "GALÓN 3.78 LT · NEUTRALIZADOR DE OLORES",
    price: 399.00,
    unitPrice: 399.00,
    mayoreo: 399.00,
    mostrador: 399.00,
    digital: 399.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-cero-olor-lavanda-3-78l",
    kitVolumenMl: 3840,
    kitImage: "/assets/magnificos/productos/magnificos-cero-olor-lavanda-3-78l.png",
  },

  // Atrapa Líquidos. Costo y Mayoreo pendientes de Diego: mientras
  // tanto van iguales al precio público.
  {
    id: "magnificos-atrapa-liquidos-330g",
    brand: "Magníficos de la Limpieza",
    product: "ATRAPA LÍQUIDOS POLVO ABSORBENTE",
    category: "Magníficos de la Limpieza",
    description: "BOTE 330 GR",
    price: 299.00,
    unitPrice: 299.00,
    mayoreo: 299.00,
    mostrador: 299.00,
    digital: 299.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-atrapa-liquidos-330g",
    kitImage: "/assets/magnificos/productos/magnificos-atrapa-liquidos-330g.png",
  },

  // Titan Bio Pet y Ácaro Fin estaban como Zach Chemical. Conservan los
  // precios de la hoja de costos; su Mayoreo venía en $0 y se deja en
  // costo × 1.5, que es lo que el cotizador ya mostraba.
  {
    id: "magnificos-titan-bio-pet-500ml",
    brand: "Magníficos de la Limpieza",
    product: "TITAN BIO PET",
    category: "Magníficos de la Limpieza",
    description: "500 ML",
    price: 75.00,
    unitPrice: 75.00,
    mayoreo: 112.50,
    mostrador: 299.00,
    digital: 299.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-titan-bio-pet-500ml",
    kitImage: "/assets/magnificos/productos/magnificos-titan-bio-pet-500ml.png",
  },
  {
    id: "magnificos-acaro-fin-500ml",
    brand: "Magníficos de la Limpieza",
    product: "ACARO FIN",
    category: "Magníficos de la Limpieza",
    description: "500 ML",
    price: 75.00,
    unitPrice: 75.00,
    mayoreo: 112.50,
    mostrador: 299.00,
    digital: 299.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/magnificos/magnificos-acaro-fin-500ml",
    kitImage: "/assets/magnificos/productos/magnificos-acaro-fin-500ml.png",
  },

  // DTUP · ACOX con etiqueta DTUP (aparte del ACOX de Magníficos).
  // Costo y Mayoreo pendientes de Diego: mientras tanto van iguales
  // al precio Digital.
  {
    id: "dtup-acox-acido-oxalico-1kg",
    brand: "DTUP",
    product: "ACOX ÁCIDO OXÁLICO PULIMENTO DE PISOS",
    category: "DTUP",
    description: "BOTE 1 KG",
    price: 199.00,
    unitPrice: 199.00,
    mayoreo: 199.00,
    mostrador: 199.00,
    digital: 199.00,
    image: "https://res.cloudinary.com/dl2s0vpwb/image/upload/f_auto,q_auto,w_400/dtup/dtup-acox-acido-oxalico-1kg",
    kitImage: "/assets/dtup/productos/dtup-acox-acido-oxalico-1kg.png",
  },
];

const ML_PRODUCTOS = {
  "0429-01-211": ["rayones", [7, 7, 21], 0.58],
  "0401-01-211": ["abrillantadores", [7, 7, 21], 0.58],
  "0102-01-240": ["abrillantadores", [6.5, 6.5, 22], 0.55],
  "0506-01-242": ["lubricantes", [6.5, 6.5, 19], 0.38],
  "0501-01-213": ["tratamientos", [9, 9, 26], 1.15],
  "0501-21-206": ["tratamientos", [9, 9, 26], 1.15],
  "0120-01-231": ["abrillantadores", [8, 8, 25], 0.68],
  "0101-01-213": ["abrillantadores", [9, 9, 26], 1.15],
  "0101-01-211": ["abrillantadores", [7, 7, 21], 0.58],
  "0102-01-213": ["abrillantadores", [9, 9, 26], 1.15],
  "0102-01-211": ["abrillantadores", [7, 7, 21], 0.58],
  "1415-21-300": ["tratamientos", [12, 5, 20], 0.38],
  "0118-21-206": ["abrillantadores", [9, 9, 26], 1.15],
  "1414-21-299": ["shampoos", [11, 11, 30], 2.04],
  "1405-95-206": ["shampoos", [9, 9, 26], 1.15],
  "1405-95-402": ["shampoos", [16, 16, 30], 4.1],
  "0416-01-231": ["ceras", [8, 8, 25], 0.68],
  "0402-21-205": ["ceras", [7, 7, 21], 0.58],
  "0414-21-289": ["ceras", [9, 9, 10], 0.43],
  "2003-01-294": ["aromatizantes", [5, 5, 12], 0.38],
  "2008-01-291": ["aromatizantes", [5, 5, 12], 0.38],
  "2008-01-294": ["aromatizantes", [5, 5, 12], 0.38],
  "2016-01-291": ["aromatizantes", [5, 5, 12], 0.38],
  "2017-01-291": ["aromatizantes", [5, 5, 12], 0.38],
  "2002-01-291": ["aromatizantes", [5, 5, 12], 0.38],
  "1006-01-232": ["tratamientos", [8, 8, 10], 0.38],
  "0502-01-213": ["desengrasantes", [9, 9, 26], 1.15],
  "0422-01-253": ["rayones", [5, 5, 14], 0.21],
  "0422-01-235": ["rayones", [6, 6, 17], 0.33],
  "0504-01-213": ["desengrasantes", [9, 9, 26], 1.15],
  "0402-01-211": ["rayones", [7, 7, 21], 0.58],
  "0706-01-213": ["aromatizantes", [9, 9, 26], 1.15],
  "0104-21-205": ["abrillantadores", [7, 7, 21], 0.58],
  "0509-21-206": ["desengrasantes", [9, 9, 26], 1.15],
  "0107-01-235": ["limpiadores", [6, 6, 17], 0.33],
  "0532-01-231": ["desengrasantes", [8, 8, 25], 0.68],
  "0901-01-206": ["jabones", [12, 12, 14], 1.15],
  "0116-22-278": ["aditivos", [4, 4, 10], 0.13],
  "0423-01-247": ["abrillantadores", [7, 7, 6], 0.18],
  "0423-01-238": ["abrillantadores", [8.5, 8.5, 7], 0.28],
  "0404-95-290": ["rayones", [9, 9, 9], 0.38],
  "0405-21-290": ["rayones", [9, 9, 9], 0.38],
  "0406-21-290": ["rayones", [9, 9, 9], 0.38],
  "0412-01-201": ["desengrasantes", [9, 9, 26], 1.15],
  "0403-01-211": ["rayones", [7, 7, 21], 0.58],
  "0404-01-211": ["rayones", [7, 7, 21], 0.58],
  "0406-01-211": ["rayones", [7, 7, 21], 0.58],
  "0506-01-254": ["tratamientos", [5, 5, 14], 0.21],
  "0901-01-250": ["tratamientos", [5, 5, 14], 0.21],
  "0901-01-211": ["tratamientos", [7, 7, 21], 0.58],
  "1008-01-254": ["tratamientos", [5, 5, 14], 0.21],
  "1401-01-206": ["shampoos", [9, 9, 26], 1.15],
  "1401-21-206": ["shampoos", [9, 9, 26], 1.15],
  "1402-01-231": ["shampoos", [8, 8, 25], 0.68],
  "0105-01-206": ["abrillantadores", [13, 13, 14], 1.15],
  "0105-95-232": ["abrillantadores", [8, 8, 10], 0.38],
  "0418-01-235": ["rayones", [6, 6, 17], 0.33],
  "1007-01-206": ["limpiaparabrisas", [9, 9, 26], 1.15],
};

const products = productCatalog.map((catalogProduct) => {
  const product = {
    ...catalogProduct,
    ...imagenesZach(catalogProduct),
  };
  const datosML = ML_PRODUCTOS[product.sku];
  if (!datosML) return product;
  return {
    ...product,
    categoria: datosML[0],
    dim: datosML[1],
    pesoUnitarioKg: datosML[2],
  };
});

const peso = (n) =>
  Number(n || 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

const DEFAULT_BRAND = "Margrey";

// Por debajo de lg (1024 px) la tabla no cabe y se usan las vistas de celular.
const MEDIA_PANTALLA_CHICA = "(max-width: 1023.98px)";

// Publicaciones está en desarrollo: oculta el selector y el botón de guardar combo.
// Cambiar a true para volver a mostrarla.
const PUBLICACIONES_HABILITADAS = false;
const PUBLICACIONES_STORAGE_KEY =
  "pedidoMargrey_publicaciones_multiplataforma";

const PUBLICACIONES_LEGACY_STORAGE_KEY =
  "pedidoMargrey_publicacionesML";

const PLATAFORMAS_SUGERIDAS = [
  "Mercado Libre",
  "Amazon",
  "TikTok Shop",
  "Facebook Marketplace",
  "Shopify",
  "Walmart",
  "Otra",
];

function crearIdPlataforma() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `plataforma-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function crearPlataforma(nombre = "Mercado Libre") {
  return {
    id: crearIdPlataforma(),
    nombre,
    link: "",
    estado: "Pendiente",
    notas: "",
    fecha: "",
    publicado: false,
  };
}

function normalizarPlataformasRegistro(data = {}) {
  /*
   * Si ya existe el arreglo plataformas,
   * se respeta incluso cuando está vacío.
   */
  if (Array.isArray(data.plataformas)) {
    return data.plataformas.map((plataforma) => ({
      id:
        plataforma.id ||
        crearIdPlataforma(),

      /*
       * Usamos ?? en lugar de ||.
       *
       * Esto permite conservar nombre: ""
       * cuando el usuario selecciona "Otra".
       */
      nombre:
        plataforma.nombre ??
        plataforma.plataforma ??
        "Mercado Libre",

      link:
        plataforma.link ??
        plataforma.linkML ??
        "",

      estado:
        plataforma.estado ??
        "Pendiente",

      notas:
        plataforma.notas ??
        "",

      fecha:
        plataforma.fecha ??
        "",

      publicado:
        typeof plataforma.publicado === "boolean"
          ? plataforma.publicado
          : plataforma.estado === "Publicado",
    }));
  }

  /*
   * Migración de registros anteriores
   * de Mercado Libre.
   */
  const tieneDatosLegacy =
    data.linkML ||
    data.estado ||
    data.notas ||
    data.fecha ||
    data.publicado;

  if (tieneDatosLegacy) {
    return [
      {
        id: crearIdPlataforma(),
        nombre: "Mercado Libre",
        link: data.linkML || "",
        estado:
          data.estado ||
          (data.publicado
            ? "Publicado"
            : "Pendiente"),
        notas: data.notas || "",
        fecha: data.fecha || "",
        publicado:
          Boolean(data.publicado) ||
          data.estado === "Publicado",
      },
    ];
  }

  return [];
}

function normalizarPublicacionesGuardadas(data = {}) {
  return Object.fromEntries(
    Object.entries(data).map(([key, registro]) => [
      key,
      {
        ...registro,
        plataformas:
          normalizarPlataformasRegistro(registro),
      },
    ])
  );
}

/*
 * Caché para no comprobar repetidamente
 * los mismos archivos PNG.
 */
const KIT_IMAGE_EXISTENCE_CACHE = new Map();

/*
 * Comprueba si una imagen realmente existe
 * dentro de la carpeta public.
 */
function existeImagenKit(src = "") {
  if (!src) {
    return Promise.resolve(false);
  }

  if (KIT_IMAGE_EXISTENCE_CACHE.has(src)) {
    return Promise.resolve(
      KIT_IMAGE_EXISTENCE_CACHE.get(src)
    );
  }

  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      KIT_IMAGE_EXISTENCE_CACHE.set(
        src,
        true
      );

      resolve(true);
    };

    image.onerror = () => {
      KIT_IMAGE_EXISTENCE_CACHE.set(
        src,
        false
      );

      resolve(false);
    };

    image.src = src;
  });
}

/*
 * Normaliza el nombre para evitar que
 * entren dos presentaciones del mismo producto.
 *
 * Ejemplo:
 * AUTO BRILLO A 500 ML
 * AUTO BRILLO A 1 LT
 *
 * Ambos pertenecen al mismo grupo:
 * auto brillo a
 */
function getGrupoComboAleatorio(item = {}) {
  return String(
    item.product ||
      item.category ||
      item.name ||
      item.sku ||
      item.code ||
      ""
  )
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(/\s+/g, " ");
}

/*
 * Mezcla aleatoriamente un arreglo
 * sin modificar el arreglo original.
 */
function mezclarAleatoriamente(lista = []) {
  const resultado = [...lista];

  for (
    let i = resultado.length - 1;
    i > 0;
    i -= 1
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [
      resultado[i],
      resultado[j],
    ] = [
      resultado[j],
      resultado[i],
    ];
  }

  return resultado;
}

function descargarDataUrl(
  dataUrl,
  filename
) {
  const link =
    document.createElement("a");

  link.href = dataUrl;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getBrand(p = {}) {
  return p.brand || DEFAULT_BRAND;
}

function getTipoPrecioLabel(tipoPrecio) {
  if (tipoPrecio === "mayoreo") return "Mayoreo";
  if (tipoPrecio === "mostrador") return "Mostrador";
  if (tipoPrecio === "digital") return "Digital";
  return "Digital";
}

/*
 * Marcas con precio fijo por pieza: Mayoreo, Mostrador y Digital
 * se toman tal cual del catálogo y se venden solo por pieza.
 */
const MARCAS_PRECIO_FIJO = [
  "retokcar",
  "sorella",
  "fratelo",
  "magníficos de la limpieza",
  "dtup",
];

function esMarcaPrecioFijo(brand = "") {
  return MARCAS_PRECIO_FIJO.includes(
    String(brand || "")
      .trim()
      .toLowerCase()
  );
}

function precioPublico(
  valor,
  item = {},
  tipoPrecio = "digital"
) {
  const brandNormalizada = String(
    getBrand(item) || ""
  )
    .trim()
    .toLowerCase();

  const usaPreciosZach =
    brandNormalizada === "zach chemical" ||
    brandNormalizada === "aqua zach" ||
    brandNormalizada === "zach food" ||
    brandNormalizada === "magno clean";

    if (
      brandNormalizada === "verde santo" ||
      esMarcaPrecioFijo(brandNormalizada)
    ) {
  const precioInterno = Number(
    item.unitPrice ??
      item.price ??
      valor ??
      0
  );

  const precioMayoreo = Number(
    item.mayoreo ??
      precioInterno
  );

  const precioMostrador = Number(
    item.mostrador ??
      item.digital ??
      precioMayoreo
  );

  const precioDigital = Number(
    item.digital ??
      item.mostrador ??
      precioMostrador
  );

  if (tipoPrecio === "mayoreo") {
    return Number(
      precioMayoreo.toFixed(2)
    );
  }

  if (tipoPrecio === "mostrador") {
    return Number(
      precioMostrador.toFixed(2)
    );
  }

  return Number(
    precioDigital.toFixed(2)
  );
}

  if (usaPreciosZach) {
    /*
     * Costo distribuidor:
     * solamente se utiliza para calcular.
     * No se muestra como opción pública.
     */
    const precioDistribuidor = Number(
      item.unitPrice ??
        item.price ??
        valor ??
        0
    );

    /*
     * Digital:
     * se toma directamente de la lista nueva.
     */
    const precioDigital = Number(
      item.digital ?? 0
    );

    /*
     * Mayoreo:
     * Zach Chemical usa la columna Mayoreo de su lista
     * de costos. Si viene vacía, costo distribuidor + 50%.
     *
     * Las demás marcas no toman item.mayoreo porque
     * sus registros pueden conservar precios viejos.
     */
    const mayoreoLista = Number(item.mayoreo || 0);

    const precioMayoreo =
      brandNormalizada === "zach chemical" &&
      mayoreoLista > 0
        ? mayoreoLista
        : precioDistribuidor * 1.5;

    /*
     * Mostrador:
     * 20% de descuento sobre el precio digital.
     *
     * No toma item.mostrador porque los registros
     * anteriores pueden conservar precios viejos.
     */
    const precioMostrador =
      precioDigital * 0.8;

    if (tipoPrecio === "mayoreo") {
      return Number(
        precioMayoreo.toFixed(2)
      );
    }

    if (tipoPrecio === "mostrador") {
      return Number(
        precioMostrador.toFixed(2)
      );
    }

    if (tipoPrecio === "digital") {
      return Number(
        precioDigital.toFixed(2)
      );
    }

    return Number(
      precioDigital.toFixed(2)
    );
  }

  /*
   * Funcionamiento original para Margrey
   * y las demás marcas.
   */
  const precioBase =
    Number(valor || 0) * 2;

  if (tipoPrecio === "mayoreo") {
    return Number(
      (precioBase * 0.75).toFixed(2)
    );
  }

  if (tipoPrecio === "mostrador") {
    return Number(
      precioBase.toFixed(2)
    );
  }

  if (tipoPrecio === "digital") {
    return Number(
      precioBase.toFixed(2)
    );
  }

  return Number(
    precioBase.toFixed(2)
  );
}

/*
 * Marcas cuyo precio Digital es el que se publica en ML.
 * Para ellas no se calcula un precio a partir de un neto.
 */
const MARCAS_PUBLICAN_DIGITAL_EN_ML = [
  "zach chemical",
  "aqua zach",
  "zach food",
  "retokcar",
  "sorella",
  "fratelo",
  "magníficos de la limpieza",
  "dtup",
];

function publicaDigitalEnML(item = {}) {
  return MARCAS_PUBLICAN_DIGITAL_EN_ML.includes(
    String(getBrand(item) || "")
      .trim()
      .toLowerCase()
  );
}

function Qty({ value, onChange, min = 1 }) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
        onClick={() => onChange(Math.max(min, Number(value || min) - 1))}
      >
        −
      </button>

      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => {
          const next = parseInt(e.target.value, 10);

          if (Number.isNaN(next)) {
            onChange(min);
            return;
          }

          onChange(Math.max(min, next));
        }}
        className="w-16 text-center border rounded-lg py-1"
      />

      <button
        type="button"
        className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
        onClick={() => onChange(Number(value || 0) + 1)}
      >
        +
      </button>
    </div>
  );
}

// Los retocadores llevan su código de color en la descripción
// ("CÓDIGO 46G"); no es una medida, así que se quita antes de leer
// pesos y volúmenes.
function quitarCodigoColor(texto = "") {
  return String(texto).replace(/C[ÓO]DIGO\s+\S+/g, "");
}

function getTextoPresentacion(p = {}) {
  return quitarCodigoColor(
    `${p.description || ""} ${p.unitDescription || ""}`.toUpperCase()
  );
}

function getUnidadMedida(p = {}) {
  const t = getTextoPresentacion(p);

  if (/\b(KG|KGS|KILO|KILOS)\b/.test(t)) return "kilos";
  if (/\b(GR|GRS|GRAMO|GRAMOS)\b/.test(t)) return "gramos";
  if (/\b(ML|MILILITRO|MILILITROS)\b/.test(t)) return "mililitros";
  if (/\b(LT|LTS|L)\b/.test(t)) return "litros";

  return "otros";
}

function getUnidadLabel(unidad) {
  if (unidad === "litros") return "Litros";
  if (unidad === "mililitros") return "Mililitros";
  if (unidad === "gramos") return "Gramos";
  if (unidad === "kilos") return "Kilos";
  return "Otros";
}

function getProductKey(p = {}) {
  const raw = [
    getBrand(p),
    p.sku || "",
    p.code || "",
    p.product || "",
    p.description || "",
  ]
    .filter(Boolean)
    .join("-");

  return raw
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w.-]/g, "");
}

function getAromaCoolGrey(item = {}) {
  const product = String(item.product || "").toUpperCase();
  const description = String(item.description || "").toUpperCase();

  if (!product.includes("COOL GREY")) return "";

  const aromas = [
    "UVA SILVESTRE",
    "HAPPY BANANA",
    "CARRO NUEVO",
    "CHERRY",
    "STRAWBERRY-FRESA",
    "BERRIES",
    "MIXTO",
  ];

  return aromas.find((aroma) => description.includes(aroma)) || "";
}

function getLitros(p) {
  const t = getTextoPresentacion(p);
  const m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:LT|LTS|L)\b/);
  return m ? parseFloat(m[1].replace(",", ".")) : null;
}

/*
 * Piezas que trae una caja o paquete, leídas de la descripción.
 * "PAQUETE 12 PIEZAS 500 ML" -> 12
 * "CAJA 3 TIRAS CON 12 PIEZAS" -> 36
 * "PORRON 5 LT" -> 1
 */
function getPiezasPorPaquete(item = {}) {
  const t = String(item.description || "").toUpperCase();

  const tiras = t.match(/(\d+)\s*TIRAS?\s+CON\s+(\d+)\s*PIEZAS?/);
  if (tiras) return Number(tiras[1]) * Number(tiras[2]);

  const caja = t.match(
    /(?:CAJA|PAQUETE)\s+(\d+)\s*(?:PIEZAS?|AEROSOL(?:ES)?)\b/
  );
  if (caja) return Number(caja[1]);

  return 1;
}

function isUnitOnly(p) {
  const brandNormalizada = String(
    getBrand(p) || ""
  )
    .trim()
    .toLowerCase();

  const esLineaPrecioDirecto =
    brandNormalizada === "zach chemical" ||
    brandNormalizada === "aqua zach" ||
    brandNormalizada === "zach food" ||
    brandNormalizada === "magno clean" ||
    esMarcaPrecioFijo(brandNormalizada);

  if (esLineaPrecioDirecto) {
    return true;
  }

  const t = getTextoPresentacion(p);

  const esGranel =
    /(PORR[ÓO]N|PORRON|CUBETA|TAMBOR)/.test(
      t
    );

  if (!esGranel) return false;

  const m = t.match(
    /(\d+(?:[.,]\d+)?)\s*(?:LT|LTS|L)\b/
  );

  if (m) {
    const n = parseFloat(
      m[1].replace(",", ".")
    );

    return n > 4;
  }

  if (
    /(19|20|25|50|60|100|200|208)\s*(?:LT|LTS|L)\b/.test(
      t
    )
  ) {
    return true;
  }

  return true;
}

function cargarPublicacionesML() {
  try {
    const rawActual = localStorage.getItem(
      PUBLICACIONES_STORAGE_KEY
    );

    if (rawActual) {
      return normalizarPublicacionesGuardadas(
        JSON.parse(rawActual)
      );
    }

    const rawLegacy = localStorage.getItem(
      PUBLICACIONES_LEGACY_STORAGE_KEY
    );

    if (!rawLegacy) {
      return {};
    }

    const migrado =
      normalizarPublicacionesGuardadas(
        JSON.parse(rawLegacy)
      );

    localStorage.setItem(
      PUBLICACIONES_STORAGE_KEY,
      JSON.stringify(migrado)
    );

    return migrado;
  } catch (error) {
    console.error(
      "Error leyendo publicaciones:",
      error
    );

    return {};
  }
}

function guardarPublicacionesML(data) {
  try {
    localStorage.setItem(
      PUBLICACIONES_STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(
      "Error guardando publicaciones:",
      error
    );
  }
}

async function generarPDFPedido({
  cart,
  subtotalBase,
  subtotal,
  descuento,
  descuentoPercent,
  microfibras,
  esponjas,
  microfibrasGrandes,
  cubetas,
  atomizadores,
  PRECIO_MICRO,
  PRECIO_ESPONJA,
  PRECIO_MICRO_GRANDE,
  PRECIO_CUBETA,
  PRECIO_ATOMIZADOR,
  total,
  cotiza,
  brand,
  tipoPrecio,
}) {
  if (!cart.length) {
    alert("Agrega productos antes de generar la cotización.");
    return;
  }

  if (!cotiza || !cotiza.trim()) {
    if (!confirm("No escribiste quién cotiza. ¿Quieres continuar sin ese dato?"))
      return;
  }

  let html2pdf;

  try {
    const mod = await import("html2pdf.js");
    html2pdf = mod.default || mod;
  } catch (e) {
    console.error("Fallo import('html2pdf.js')", e);
    alert("No se pudo cargar el generador de PDF. ¿Instalaste 'html2pdf.js'?");
    return;
  }

  const folio =
    "COT-" +
    new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[-:T]/g, "")
      .slice(2);

  const fecha = new Date().toLocaleString("es-MX");
  const extraMicro = (microfibras || 0) * (PRECIO_MICRO || 0);
  const extraEsponja = (esponjas || 0) * (PRECIO_ESPONJA || 0);
  const extraMicroGrande =
    (microfibrasGrandes || 0) * (PRECIO_MICRO_GRANDE || 0);
  const extraCubeta = (cubetas || 0) * (PRECIO_CUBETA || 0);
  const extraAtomizador = (atomizadores || 0) * (PRECIO_ATOMIZADOR || 0);

  const filas = cart
    .map((l, i) => {
      const aroma = getAromaCoolGrey(l);

      return `
        <tr>
          <td>${i + 1}</td>
          <td>
            <div class="pname">${l.product}${aroma ? ` · Aroma: ${aroma}` : ""}</div>
            <div class="pdesc">
              Marca: ${l.brand || DEFAULT_BRAND} · 
              Precio: ${getTipoPrecioLabel(l.tipoPrecio || tipoPrecio)} ·
              ${l.mode === "unit" ? "Pieza/Litro" : "Caja/Paquete"} · 
              ${l.description || "—"}
              ${l.sku ? ` · SKU: ${l.sku}` : ""}
              ${l.code ? ` · UPC: ${l.code}` : ""}
            </div>
          </td>
          <td class="num">${peso(l.unitPrice)}</td>
          <td class="num">×${l.qty}</td>
          <td class="num">${peso(l.unitPrice * l.qty)}</td>
        </tr>
      `;
    })
    .join("");

  const html = `
    <div class="pdf-root">
      <style>
        .page{padding:24px;background:#fff;font-family:Arial,sans-serif;}
        .hdr{display:flex;align-items:center;gap:16px;margin-bottom:8px}
        .logos{display:flex;gap:10px;align-items:center}
        .logo{width:56px;height:56px;border-radius:10px;object-fit:cover}
        .logom{width:45px;height:45px;border-radius:10px;object-fit:cover}
        h1{margin:0;font-size:20px}
        .muted{color:#555}
        table{width:100%;border-collapse:collapse;margin-top:12px}
        th,td{padding:10px;vertical-align:top}
        thead th{border-bottom:2px solid #e5e7eb;background:#f8fafc;font-weight:600}
        tbody tr + tr td{border-top:1px solid #e5e7eb}
        .num{text-align:right;white-space:nowrap}
        .pname{font-weight:600}
        .pdesc{font-size:12px;color:#555;margin-top:2px}
        .grid{display:grid;grid-template-columns:1fr auto;gap:8px;margin-top:12px}
        .total{font-size:20px;font-weight:800}
        .foot{margin-top:24px;font-size:12px;color:#444}
      </style>

      <div class="page">
        <div class="hdr">
          <div class="logos">
            <img class="logo" src="https://res.cloudinary.com/dl2s0vpwb/image/upload/v1781551142/Margrey_2025_atwtf1.jpg" />
          </div>

          <div>
            <h1>Cotización · ${brand === "todas" ? "Multimarca" : brand}</h1>
            <div class="muted">${folio} · ${fecha}</div>
            <div class="muted">Tipo de precio: ${getTipoPrecioLabel(tipoPrecio)}</div>
            <div class="muted">Soporte: comercializadoradtup@hotmail.com</div>
            <div class="muted">Atención a clientes: +52 33 3159 6387 · 33 3906 8269</div>
            <div class="muted"><strong>Cotiza:</strong> ${cotiza ? cotiza.trim() : "—"}</div>
          </div>

          <div class="logos">
            <img class="logom" src="https://res.cloudinary.com/dl2s0vpwb/image/upload/v1781551142/Margrey_2025_atwtf1.jpg" />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cant.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>

        <div class="grid">
          <div>Subtotal productos</div><div class="num">${peso(subtotalBase)}</div>

          ${
            descuento
              ? `
            <div>Descuento aplicado (${descuentoPercent}%)</div>
            <div class="num">- ${peso(descuento)}</div>
            <div>Subtotal con descuento</div>
            <div class="num">${peso(subtotal)}</div>
          `
              : ""
          }

          ${
            microfibras > 0
              ? `<div>Microfibras ×${microfibras}</div><div class="num">+ ${peso(
                  extraMicro
                )}</div>`
              : ""
          }
          ${
            esponjas > 0
              ? `<div>Esponjas ×${esponjas}</div><div class="num">+ ${peso(
                  extraEsponja
                )}</div>`
              : ""
          }
          ${
            microfibrasGrandes > 0
              ? `<div>Microfibras grandes 55×90 ×${microfibrasGrandes}</div><div class="num">+ ${peso(
                  extraMicroGrande
                )}</div>`
              : ""
          }
          ${
            cubetas > 0
              ? `<div>Cubetas 19 L con tapa ×${cubetas}</div><div class="num">+ ${peso(
                  extraCubeta
                )}</div>`
              : ""
          }
          ${
            atomizadores > 0
              ? `<div>Atomizadores ×${atomizadores}</div><div class="num">+ ${peso(
                  extraAtomizador
                )}</div>`
              : ""
          }

          <div class="total">TOTAL</div>
          <div class="total num">${peso(total)}</div>
        </div>

        <div class="foot">
          Precios en MXN, sujetos a cambios sin previo aviso. Esta cotización no incluye envío ni impuestos adicionales, salvo que se indique.
        </div>
      </div>
    </div>
  `.trim();

  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.top = "0";
  wrapper.style.left = "0";
  wrapper.style.opacity = "0";
  wrapper.style.pointerEvents = "none";
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const source = wrapper.querySelector(".pdf-root");

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `${folio}.pdf`,
    image: { type: "jpeg", quality: 0.95 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
    },
    jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
  };

  try {
    const worker = html2pdf().from(source).set(opt).toCanvas().toPdf();
    await worker.save();
  } catch (err) {
    console.error("Error generando PDF:", err);
    alert("No se pudo generar el PDF. Revisa la consola para más detalles.");
  } finally {
    document.body.removeChild(wrapper);
  }
}

export default function PedidoTabla() {
  const [modo, setModo] = useState("cotizador");
  const [tipoPrecio, setTipoPrecio] = useState("digital");
  const [cotiza, setCotiza] = useState("");
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("todas");
  const [category, setCategory] = useState("todas");
  const [unidadFiltro, setUnidadFiltro] = useState("todas");
  const [cart, setCart] = useState([]);
  const [confirmVaciar, setConfirmVaciar] = useState(false);
  const [microfibras, setMicrofibras] = useState(0);
  const [esponjas, setEsponjas] = useState(0);
  const [microfibrasGrandes, setMicrofibrasGrandes] = useState(0);
  const [cubetas, setCubetas] = useState(0);
  const [atomizadores, setAtomizadores] = useState(0);
  const [descuentoPercent, setDescuentoPercent] = useState(0);
  const [imagenKit, setImagenKit] = useState("");
  const [generandoImagenKit, setGenerandoImagenKit] = useState(false);
  const [generandoComboAleatorio, setGenerandoComboAleatorio,] = useState(false);
  const [faltantesImagenKit, setFaltantesImagenKit] = useState([]);
  const [confirmComboAleatorio, setConfirmComboAleatorio] = useState(false);
  const [aviso, setAviso] = useState(null);
  const avisoTimerRef = useRef(null);
  const [navColapsada, setNavColapsada] = useState(() => {
  const saved = localStorage.getItem("navColapsada");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {

  localStorage.setItem(

    "navColapsada",

    JSON.stringify(navColapsada)

  );

}, [navColapsada]);

  const [
    plataformasMensaje,
    setPlataformasMensaje,
  ] = useState(() => [
    crearPlataforma("Mercado Libre"),
  ]);

  const [publicacionesML, setPublicacionesML] = useState(() =>
    cargarPublicacionesML()
  );

  const cartRef = useRef(null);
  // En el celular el carrito es un panel que se abre encima de la lista.
  const [carritoMovilAbierto, setCarritoMovilAbierto] = useState(false);
  const esPantallaChica = useEsPantallaChica();

  /*
   * Abrir el panel agrega una entrada al historial para que el botón
   * Atrás del teléfono lo cierre. Cerrarlo por cualquier camino quita
   * esa entrada, así Atrás nunca se "gasta" sin hacer nada.
   */
  function abrirCarritoMovil() {
    if (carritoMovilAbierto) return;

    window.history.pushState({ carritoMovil: true }, "");
    setCarritoMovilAbierto(true);
  }

  function cerrarCarritoMovil() {
    const hayEntrada = window.history.state?.carritoMovil;

    setCarritoMovilAbierto(false);
    if (hayEntrada) window.history.back();
  }

  /*
   * Aviso en pantalla en lugar de alert().
   * Se cierra solo, con la X o llamando cerrarAviso().
   */
  function cerrarAviso() {
    clearTimeout(avisoTimerRef.current);
    setAviso(null);
  }

  function mostrarAviso(mensaje, tipo = "info", duracionMs = 7000) {
    clearTimeout(avisoTimerRef.current);
    setAviso({ mensaje, tipo });

    if (duracionMs > 0) {
      avisoTimerRef.current = setTimeout(
        () => setAviso(null),
        duracionMs
      );
    }
  }

  useEffect(() => {
    const timer = avisoTimerRef;
    return () => clearTimeout(timer.current);
  }, []);

  const PRECIO_MICRO = 13;
  const PRECIO_ESPONJA = 1.5;
  const PRECIO_MICRO_GRANDE = 120;
  const PRECIO_CUBETA = 50;
  const PRECIO_ATOMIZADOR = 10;

  const cartQty = useMemo(() => cart.reduce((a, l) => a + l.qty, 0), [cart]);

  const opcionesDescuento = useMemo(
    () => Array.from({ length: 51 }, (_, i) => i),
    []
  );

  const brands = useMemo(() => {
    const b = new Set();

    products.forEach((p) => {
      if (p.price || p.unitPrice) b.add(getBrand(p));
    });

    return ["todas", ...Array.from(b).sort()];
  }, []);

  const categories = useMemo(() => {
    const c = new Set();

    products.forEach((p) => {
      if (!(p.price || p.unitPrice)) return;

      const itemBrand = getBrand(p);
      const okBrand = brand === "todas" || itemBrand === brand;

      if (okBrand && (p.category || p.product)) {
        c.add(p.category || p.product);
      }
    });

    return ["todas", ...Array.from(c).sort()];
  }, [brand]);

  const unidadesDisponibles = useMemo(() => {
    const u = new Set();

    products.forEach((p) => {
      if (!(p.price || p.unitPrice)) return;

      const itemBrand = getBrand(p);
      const okBrand = brand === "todas" || itemBrand === brand;
      const okCat = category === "todas" || (p.category || p.product) === category;

      if (okBrand && okCat) {
        u.add(getUnidadMedida(p));
      }
    });

    return ["todas", ...Array.from(u).sort()];
  }, [brand, category]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    return products
      .filter((p) => p.price || p.unitPrice)
      .filter((p) => {
        const itemBrand = getBrand(p);
        const unidad = getUnidadMedida(p);

        const okBrand = brand === "todas" || itemBrand === brand;
        const okCat = category === "todas" || (p.category || p.product) === category;
        const okUnidad = unidadFiltro === "todas" || unidad === unidadFiltro;

        if (!okBrand || !okCat || !okUnidad) return false;

        if (!term) return true;

        const blob = [
          itemBrand,
          p.product,
          p.category,
          p.name,
          p.description,
          p.unitDescription,
          p.sku,
          p.code,
          getUnidadLabel(unidad),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        // Cada palabra puede estar en cualquier campo: "honda plata"
        // encuentra el Honda Urban Gray, cuyo color plata está en la
        // descripción.
        return term
          .split(/\s+/)
          .every((palabra) => blob.includes(palabra));
      });
  }, [q, brand, category, unidadFiltro]);

  const productosPublicacion = useMemo(() => {
    return filtered.map((p) => ({
      ...p,
      publicacionKey: getProductKey(p),
    }));
  }, [filtered]);

   const totalPublicados = useMemo(() => {
    return Object.values(publicacionesML).reduce(
      (totalAcumulado, registro) => {
        const plataformas =
          normalizarPlataformasRegistro(registro);

        const publicacionesActivas =
          plataformas.filter(
            (plataforma) =>
              plataforma.publicado ||
              plataforma.estado === "Publicado"
          ).length;

        return (
          totalAcumulado +
          publicacionesActivas
        );
      },
      0
    );
  }, [publicacionesML]);

  const subtotalBase = useMemo(
    () =>
      cart.reduce(
        (acumulado, linea) =>
          acumulado +
          linea.unitPrice * linea.qty,
        0
      ),
    [cart]
  );

  const descuento = useMemo(() => {
    const percent = Number(descuentoPercent || 0);

    if (!percent) return 0;

    return cart.reduce((acc, l) => {
      const nombre = (l.product || "").toLowerCase();
      const excluye = nombre.includes("microfibra") || nombre.includes("esponja");

      if (excluye) return acc;

      return acc + l.unitPrice * l.qty * (percent / 100);
    }, 0);
  }, [cart, descuentoPercent]);

  const subtotal = subtotalBase - descuento;

  const total =
    subtotal +
    microfibras * PRECIO_MICRO +
    esponjas * PRECIO_ESPONJA +
    microfibrasGrandes * PRECIO_MICRO_GRANDE +
    cubetas * PRECIO_CUBETA +
    atomizadores * PRECIO_ATOMIZADOR;

  function goToCart() {
    if (window.matchMedia(MEDIA_PANTALLA_CHICA).matches) {
      abrirCarritoMovil();
    }
  }

  /*
   * Una línea por producto del catálogo, presentación y tipo de precio.
   * getProductKey distingue productos que comparten SKU o código
   * (las dos cajas de Cool Grey, los aromas de Bio Wash).
   */
  function makeLineKey(item, mode) {
    return `${getProductKey(item)}-${mode}-${tipoPrecio}`;
  }

  /*
   * Arma una línea del carrito. La usan el botón Agregar
   * y el combo aleatorio, para que ambas guarden los mismos datos.
   */
  function crearLineaCarrito(item, mode, qty) {
    const costoBase =
      mode === "unit"
        ? item.unitPrice
        : item.price;

    const unitPrice = precioPublico(
      costoBase,
      item,
      tipoPrecio
    );

    if (!unitPrice) return null;

    return {
      key: makeLineKey(item, mode),
      id: item.id || "",

      /*
       * Esta clave enlaza el producto del carrito
       * con su registro en Publicaciones.
       */
      publicacionKey:
        item.publicacionKey ||
        getProductKey(item),

      brand: getBrand(item),
      product: item.product,
      sku: item.sku || "",
      code: item.code ?? null,
      categoria: item.categoria,
      dim: item.dim,
      pesoUnitarioKg: item.pesoUnitarioKg,

      /*
       * Medidas y peso de ML son por pieza.
       * Una caja de 12 se envía como 12 piezas.
       */
      piezasPorEnvio:
        mode === "pack"
          ? getPiezasPorPaquete(item)
          : 1,

      /*
       * Zach se publica en ML a su precio Digital.
       */
      precioMLDirecto: publicaDigitalEnML(item)
        ? precioPublico(costoBase, item, "digital")
        : null,

      /*
       * Neto que debe dejar ML por esta línea:
       * precio Digital menos 25%, sin importar con
       * qué tipo de precio se agregó.
       * En Margrey equivale a costo × 1.5.
       */
      netoMLUnitario: Number(
        (
          precioPublico(
            costoBase,
            item,
            "digital"
          ) * 0.75
        ).toFixed(2)
      ),

      image: item.image || "",
      kitImage:
        getKitProductImage(item),
      kitVolumenMl: item.kitVolumenMl,

      description:
        mode === "unit"
          ? item.unitDescription ||
            item.description ||
            ""
          : item.description || "",

      mode,
      qty: Math.max(
        1,
        Number(qty || 1)
      ),
      unitPrice,
      tipoPrecio,
    };
  }

  function add(item, mode, qty) {
    const nuevaLinea = crearLineaCarrito(
      item,
      mode,
      qty
    );

    if (!nuevaLinea) return;

    setCart((prev) => {
      const existente = prev.find(
        (linea) => linea.key === nuevaLinea.key
      );

      if (existente) {
        return prev.map((linea) =>
          linea.key === nuevaLinea.key
            ? {
                ...linea,
                qty:
                  Number(linea.qty || 0) +
                  Number(qty || 1),

                /*
                 * También actualizamos la referencia
                 * en productos que ya estaban agregados.
                 */
                publicacionKey:
                  nuevaLinea.publicacionKey,
              }
            : linea
        );
      }

      return [...prev, nuevaLinea];
    });
  }

  function removeLine(key) {
    setCart((prev) => prev.filter((x) => x.key !== key));
  }

  // Al bajar de 1 la línea se quita sola, sin apretar "Quitar".
  function decLine(key) {
    setCart((prev) =>
      prev
        .map((x) =>
          x.key === key ? { ...x, qty: Number(x.qty || 1) - 1 } : x
        )
        .filter((x) => x.qty > 0)
    );
  }

  function incLine(key) {
    setCart((prev) =>
      prev.map((x) => (x.key === key ? { ...x, qty: x.qty + 1 } : x))
    );
  }

  function updateLineQty(key, qty) {
    const nextQty = Number(qty);

    setCart((prev) =>
      prev.map((x) =>
        x.key === key ? { ...x, qty: Math.max(1, nextQty || 1) } : x
      )
    );
  }

  function clearCart() {
    if (
      !cart.length &&
      microfibras === 0 &&
      esponjas === 0 &&
      microfibrasGrandes === 0 &&
      cubetas === 0 &&
      atomizadores === 0
    )
      return;

    setConfirmVaciar(true);
  }

  function confirmarVaciarCarrito() {
    setCart([]);
    setMicrofibras(0);
    setEsponjas(0);
    setMicrofibrasGrandes(0);
    setCubetas(0);
    setAtomizadores(0);
    setImagenKit("");
    setFaltantesImagenKit([]);
    setConfirmVaciar(false);
  }

  async function generarComboAleatorioMargrey({
    reemplazar = false,
  } = {}) {
  if (generandoComboAleatorio) {
    return;
  }

  /*
   * Si el carrito ya tiene algo, primero se pide
   * confirmación con una ventana dentro de la página.
   */
  if (
    !reemplazar &&
    (cart.length > 0 ||
      microfibras > 0 ||
      esponjas > 0 ||
      microfibrasGrandes > 0 ||
      cubetas > 0 ||
      atomizadores > 0)
  ) {
    setConfirmComboAleatorio(true);
    return;
  }

  setConfirmComboAleatorio(false);
  cerrarAviso();
  setGenerandoComboAleatorio(true);

  try {
    /*
     * 1. Tomamos únicamente productos Margrey.
     *
     * No usamos un límite de litros.
     * Si existe el PNG, puede entrar incluso
     * Car Wash galón.
     */
    const candidatosIniciales =
      products.filter((item) => {
        const esMargrey =
          getBrand(item) === "Margrey";

        const tienePrecio =
          Number(item.unitPrice || 0) >
            0 ||
          Number(item.price || 0) > 0;

        const tieneIdentificador =
          Boolean(
            item.kitImage ||
              item.id ||
              item.sku ||
              item.code
          );

        return (
          esMargrey &&
          tienePrecio &&
          tieneIdentificador
        );
      });

    /*
     * 2. Comprobamos cuáles PNG
     * existen realmente.
     */
    const comprobaciones =
      await Promise.all(
        candidatosIniciales.map(
          async (item) => {
            const kitImage =
              getKitProductImage(item);

            const existe =
              await existeImagenKit(
                kitImage
              );

            return {
              ...item,
              kitImage,
              tieneImagenKit:
                existe,
            };
          }
        )
      );

    const candidatosConImagen =
      comprobaciones.filter(
        (item) =>
          item.tieneImagenKit
      );

    if (
      candidatosConImagen.length < 3
    ) {
      mostrarAviso(
        "No se encontraron suficientes productos Margrey con PNG válido " +
          `(disponibles: ${candidatosConImagen.length}). ` +
          "Revisa los archivos dentro de public/assets/margrey/productos/.",
        "error"
      );

      return;
    }

    /*
     * 3. Agrupamos por nombre de producto.
     *
     * Así no puede seleccionar:
     * AUTO BRILLO A 500 ML
     * AUTO BRILLO A 1 LT
     *
     * dentro del mismo combo.
     */
    const grupos = new Map();

    candidatosConImagen.forEach(
      (item) => {
        const grupo =
          getGrupoComboAleatorio(
            item
          );

        if (!grupo) {
          return;
        }

        if (!grupos.has(grupo)) {
          grupos.set(grupo, []);
        }

        grupos.get(grupo).push(
          item
        );
      }
    );

    const gruposDisponibles =
      mezclarAleatoriamente(
        Array.from(
          grupos.entries()
        )
      );

    /*
     * El combo tendrá entre 3 y 6
     * productos distintos.
     */
    const minimoProductos = 3;

    const maximoProductos =
      Math.min(
        6,
        gruposDisponibles.length
      );

    const cantidadAleatoria =
      minimoProductos +
      Math.floor(
        Math.random() *
          (
            maximoProductos -
            minimoProductos +
            1
          )
      );

    /*
     * 4. De cada grupo elegimos
     * una sola presentación al azar.
     */
    const seleccionados =
      gruposDisponibles
        .slice(
          0,
          cantidadAleatoria
        )
        .map(
          ([, presentaciones]) => {
            const opciones =
              mezclarAleatoriamente(
                presentaciones
              );

            return opciones[0];
          }
        );

    /*
     * 5. Convertimos los productos
     * seleccionados al formato del carrito.
     */
    const nuevasLineas =
      seleccionados
        .map((item) => {
          /*
           * En Margrey usamos preferentemente
           * pieza individual.
           *
           * Cuando no existe unitPrice,
           * usamos la presentación completa.
           */
          const mode =
            Number(
              item.unitPrice || 0
            ) > 0
              ? "unit"
              : "pack";

          return crearLineaCarrito(
            item,
            mode,
            1
          );
        })
        .filter(Boolean);

    if (
      nuevasLineas.length < 3
    ) {
      mostrarAviso(
        "No fue posible crear el combo porque algunos productos no tienen un precio válido.",
        "error"
      );

      return;
    }

    setCart(nuevasLineas);

    /*
     * Adicionales del combo: siempre una cubeta,
     * un atomizador, una microfibra (normal o
     * grande, al azar) y de 1 a 4 esponjas.
     */
    const conMicrofibraGrande =
      Math.random() < 0.5;

    const cantidadEsponjas =
      1 + Math.floor(Math.random() * 4);

    setCubetas(1);
    setMicrofibras(conMicrofibraGrande ? 0 : 1);
    setMicrofibrasGrandes(
      conMicrofibraGrande ? 1 : 0
    );
    setEsponjas(cantidadEsponjas);
    setAtomizadores(1);

    /*
     * Limpiamos la imagen anterior para
     * evitar mostrar una composición vieja.
     */
    setImagenKit("");
    setFaltantesImagenKit([]);

    mostrarAviso(
      `Combo Margrey listo: ${nuevasLineas.length} productos, ` +
        `cubeta 19 L, atomizador, ${
          conMicrofibraGrande
            ? "microfibra grande"
            : "microfibra"
        } y ${cantidadEsponjas} esponja${
          cantidadEsponjas > 1 ? "s" : ""
        }. Ya puedes generar la imagen del kit.`,
      "exito"
    );
  } catch (error) {
    console.error(
      "Error generando combo aleatorio:",
      error
    );

    mostrarAviso(
      error.message ||
        "No se pudo generar el combo aleatorio.",
      "error"
    );
  } finally {
    setGenerandoComboAleatorio(
      false
    );
  }
}

  function updatePublicacionML(key, patch) {
    setPublicacionesML((prev) => {
      const next = {
        ...prev,
        [key]: {
          ...(prev[key] || {}),
          ...patch,
          updatedAt: new Date().toISOString(),
        },
      };

      guardarPublicacionesML(next);
      return next;
    });
  }

  function editarComboML(key) {
    const combo = publicacionesML[key];

    if (!combo || !combo.isCombo) {
      alert("Solo se pueden editar los combos personalizados.");
      return;
    }

    const nuevoNombre = window.prompt(
      "Nombre del combo:",
      combo.product || "Combo personalizado"
    );

    if (nuevoNombre === null) return;

    const nuevaDescripcion = window.prompt(
      "Contenido del combo:",
      combo.description || ""
    );

    if (nuevaDescripcion === null) return;

    const nuevoTotalTexto = window.prompt(
      "Total interno del combo:",
      String(combo.total || 0)
    );

    if (nuevoTotalTexto === null) return;

    const nuevoTotal = Number(
      String(nuevoTotalTexto)
        .replace(/[$,\s]/g, "")
        .trim()
    );

    if (Number.isNaN(nuevoTotal) || nuevoTotal < 0) {
      alert("Escribe un total válido.");
      return;
    }

    updatePublicacionML(key, {
      product: nuevoNombre.trim() || "Combo personalizado",
      description: nuevaDescripcion.trim(),
      total: nuevoTotal,
    });

    alert("Combo actualizado correctamente.");
  }

  function eliminarComboML(key) {
    const combo = publicacionesML[key];

    if (!combo || !combo.isCombo) {
      alert("Solo se pueden eliminar los combos personalizados.");
      return;
    }

    const confirmar = window.confirm(
      `¿Eliminar el combo "${combo.product || "Combo personalizado"}"?\n\nEsta acción no se puede deshacer.`
    );

    if (!confirmar) return;

    setPublicacionesML((prev) => {
      const next = { ...prev };

      delete next[key];

      guardarPublicacionesML(next);

      return next;
    });
  }

  function crearMensajePublicacionML() {
  const productos = cart
    .map((linea) => {
      return `• ${linea.qty} × ${linea.product}${
        linea.description
          ? ` - ${linea.description}`
          : ""
      }`;
    })
    .join("\n");

  const extras = [
    microfibras > 0
      ? `• ${microfibras} × Microfibra${
          microfibras > 1 ? "s" : ""
        }`
      : null,

    esponjas > 0
      ? `• ${esponjas} × Esponja${
          esponjas > 1 ? "s" : ""
        }`
      : null,

    microfibrasGrandes > 0
      ? `• ${microfibrasGrandes} × ${
          microfibrasGrandes > 1
            ? "Microfibras grandes"
            : "Microfibra grande"
        } 55×90`
      : null,

    cubetas > 0
      ? `• ${cubetas} × Cubeta${
          cubetas > 1 ? "s" : ""
        } 19 L con tapa`
      : null,

    atomizadores > 0
      ? `• ${atomizadores} × Atomizador${
          atomizadores > 1 ? "es" : ""
        }`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  const textoPlataformas =
    plataformasMensaje
      .map((plataforma, index) => {
        return `
${index + 1}. ${plataforma.nombre || "Otra plataforma"}
🔗 Link:
${plataforma.link || "Pendiente de agregar"}

📌 Estado:
${plataforma.estado || "Pendiente"}

📝 Notas:
${plataforma.notas || "—"}
`.trim();
      })
      .join("\n\n");

  return `
✅ Publicación creada

📦 Producto / Combo:
${productos || "—"}

${
  extras
    ? `🧩 Extras incluidos:\n${extras}\n\n`
    : ""
}🛒 Plataformas:

${textoPlataformas || "Sin plataformas agregadas"}

💰 Total interno:
${peso(total)}
`.trim();
}

  async function copiarMensajePublicacionML() {
    if (
      !cart.length &&
      microfibras === 0 &&
      esponjas === 0 &&
      microfibrasGrandes === 0 &&
      cubetas === 0 &&
      atomizadores === 0
    ) {
      alert("Agrega productos o extras antes de copiar el mensaje.");
      return;
    }

    const mensaje = crearMensajePublicacionML();

    try {
      await navigator.clipboard.writeText(mensaje);
      alert("Mensaje copiado. Ahora pégalo en tu grupo de WhatsApp.");
    } catch (error) {
      console.error(error);
      alert("No se pudo copiar automáticamente. Revisa la consola.");
    }
  }

  async function generarImagenKit() {
  if (
    !cart.length &&
    microfibras === 0 &&
    esponjas === 0 &&
    microfibrasGrandes === 0 &&
    cubetas === 0 &&
    atomizadores === 0
  ) {
    alert(
      "Agrega productos o adicionales antes de generar la imagen."
    );

    return;
  }

  const cantidadProductos =
    cart.reduce(
      (acc, item) =>
        acc +
        Number(item.qty || 0),
      0
    );

  const cantidadAccesorios =
    Number(microfibras || 0) +
    Number(esponjas || 0) +
    Number(microfibrasGrandes || 0) +
    Number(atomizadores || 0);

  if (
    cantidadProductos >
    MAX_KIT_PRODUCTS
  ) {
    const continuar =
      window.confirm(
        `El kit contiene ${cantidadProductos} productos.\n\n` +
          `La imagen mostrará hasta ${MAX_KIT_PRODUCTS} productos, repartidos entre todos los del carrito.\n\n` +
          "¿Deseas continuar?"
      );

    if (!continuar) return;
  }

  if (
    cantidadAccesorios >
    MAX_KIT_ACCESSORIES
  ) {
    const continuar =
      window.confirm(
        `El kit contiene ${cantidadAccesorios} adicionales.\n\n` +
          `La imagen mostrará hasta ${MAX_KIT_ACCESSORIES} adicionales, repartidos entre todos los tipos.\n\n` +
          "¿Deseas continuar?"
      );

    if (!continuar) return;
  }

  setGenerandoImagenKit(true);
  setFaltantesImagenKit([]);

  try {
    const resultado =
      await generarImagenKitCanvas({
        cart,
        microfibras,
        esponjas,
        microfibrasGrandes,
        cubetas,
        atomizadores,
      });

    setImagenKit(
      resultado.dataUrl
    );

    setFaltantesImagenKit(
      resultado.faltantes
    );

    if (
      resultado.faltantes.length > 0
    ) {
      const nombres =
        resultado.faltantes
          .map(
            (item) =>
              item.sku ||
              item.name ||
              "Sin nombre"
          )
          .join(", ");

      const porTiempo =
        resultado.faltantes.some(
          (item) => item.motivo === "tiempo"
        );

      alert(
        `Imagen generada, pero faltaron algunas piezas:\n\n${nombres}\n\n` +
          (porTiempo
            ? "Algunas imágenes tardaron demasiado en cargar. Revisa tu conexión y vuelve a generar."
            : "Revisa los PNG dentro de public/assets/.")
      );
    }
  } catch (error) {
    console.error(
      "Error generando imagen del kit:",
      error
    );

    alert(
      error.message ||
        "No se pudo generar la imagen del kit."
    );
  } finally {
    setGenerandoImagenKit(false);
  }
}

function descargarImagenKit() {
  if (!imagenKit) {
    alert(
      "Primero genera la imagen del kit."
    );

    return;
  }

  descargarDataUrl(
    imagenKit,
    `kit-margrey-${Date.now()}-1200x1200.png`
  );
}

  function guardarComboEnPublicaciones() {
  if (
    !cart.length &&
    microfibras === 0 &&
    esponjas === 0 &&
    microfibrasGrandes === 0 &&
    cubetas === 0 &&
    atomizadores === 0
  ) {
    alert(
      "Agrega productos o extras antes de guardar el combo."
    );

    return;
  }

  const key = `combo-${Date.now()}`;

  const descripcionCombo = [
    ...cart.map(
      (linea) =>
        `${linea.qty} × ${linea.product}${
          linea.description
            ? ` - ${linea.description}`
            : ""
        }`
    ),

    microfibras > 0
      ? `${microfibras} × Microfibra${
          microfibras > 1 ? "s" : ""
        }`
      : null,

    esponjas > 0
      ? `${esponjas} × Esponja${
          esponjas > 1 ? "s" : ""
        }`
      : null,

    microfibrasGrandes > 0
      ? `${microfibrasGrandes} × ${
          microfibrasGrandes > 1
            ? "Microfibras grandes"
            : "Microfibra grande"
        } 55×90`
      : null,

    cubetas > 0
      ? `${cubetas} × Cubeta${
          cubetas > 1 ? "s" : ""
        } 19 L con tapa`
      : null,

    atomizadores > 0
      ? `${atomizadores} × Atomizador${
          atomizadores > 1 ? "es" : ""
        }`
      : null,
  ]
    .filter(Boolean)
    .join(" + ");

  updatePublicacionML(key, {
    product: "Combo personalizado",
    brand: "Multiplataforma",
    sku: key,
    code: "",
    description: descripcionCombo,
    total,
    isCombo: true,
    plataformas: [],
  });

  alert(
    "Combo guardado. Ahora puedes agregar una o varias plataformas desde Publicaciones."
  );
}

    return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col scroll-smooth">
      {aviso && (
        <div
          className={`pointer-events-none fixed inset-x-0 z-[60] flex justify-center px-4 ${
            esPantallaChica && carritoMovilAbierto
              ? "bottom-[calc(5.5rem+env(safe-area-inset-bottom))]"
              : "top-4"
          }`}
        >
          <div
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-xl border p-4 text-sm shadow-lg ${
              aviso.tipo === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : aviso.tipo === "exito"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-gray-200 bg-white text-gray-800"
            }`}
          >
            <p className="flex-1 leading-snug">{aviso.mensaje}</p>

            <button
              type="button"
              onClick={cerrarAviso}
              aria-label="Cerrar aviso"
              className="-m-1 rounded-lg p-1 text-lg leading-none opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {confirmComboAleatorio && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-combo-titulo"
          aria-describedby="confirm-combo-descripcion"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <h2
              id="confirm-combo-titulo"
              className="text-lg font-semibold text-gray-900"
            >
              ¿Reemplazar el carrito con un combo aleatorio?
            </h2>

            <p
              id="confirm-combo-descripcion"
              className="mt-2 text-sm text-gray-600"
            >
              Se quitarán los productos y adicionales que tienes ahora.
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmComboAleatorio(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() =>
                  generarComboAleatorioMargrey({
                    reemplazar: true,
                  })
                }
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Sí, reemplazar
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmVaciar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-vaciar-titulo"
          aria-describedby="confirm-vaciar-descripcion"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <h2
              id="confirm-vaciar-titulo"
              className="text-lg font-semibold text-gray-900"
            >
              ¿Vaciar toda la cotización?
            </h2>

            <p
              id="confirm-vaciar-descripcion"
              className="mt-2 text-sm text-gray-600"
            >
              Se eliminarán todos los productos, accesorios y la imagen del kit.
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmVaciar(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmarVaciarCarrito}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Sí, vaciar
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 bg-[#FF1419] text-white border-b border-red-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* =========================
              FILA PRINCIPAL
          ========================== */}
          <div
            className={`grid items-center gap-3 ${
              navColapsada
                ? "grid-cols-[auto_minmax(0,1fr)_auto_auto]"
                : "grid-cols-1 lg:grid-cols-[auto_1fr_auto]"
            }`}
          >
            {/* LOGO Y NOMBRE */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                className={`rounded-lg object-cover shrink-0 ${
                  navColapsada
                    ? "w-9 h-9"
                    : "w-11 h-11"
                }`}
                src="https://res.cloudinary.com/dl2s0vpwb/image/upload/v1781551142/Margrey_2025_atwtf1.jpg"
                alt="DTUP"
              />

              <div
                className={`min-w-0 ${
                  navColapsada
                    ? "hidden sm:block"
                    : "block"
                }`}
              >
                <h2 className="font-bold leading-tight truncate">
                  DTUP
                </h2>

                {!navColapsada && (
                  <div className="text-[11px] text-red-100 leading-tight">
                    Comercializadora DTUP
                  </div>
                )}
              </div>
            </div>

            {/* BUSCADOR */}
            <div
              className={
                navColapsada
                  ? "min-w-0"
                  : "w-full lg:px-4"
              }
            >
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                  <i className="fas fa-search text-sm" />
                </span>

                <input
                  type="search"
                  className="w-full border border-white/30 bg-white text-gray-900 rounded-xl pl-10 pr-10 py-2.5 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/70"
                  placeholder={
                    navColapsada
                      ? "Buscar..."
                      : "Buscar producto, SKU, código o descripción..."
                  }
                  value={q}
                  onChange={(event) =>
                    setQ(event.target.value)
                  }
                />

                {q && (
                  <button
                    type="button"
                    onClick={() => setQ("")}
                    className="absolute inset-y-0 right-2 px-2 flex items-center text-gray-400 hover:text-red-600"
                    aria-label="Limpiar búsqueda"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* VISTAS - SOLO MODO COMPLETO */}
            {!navColapsada && (
              <div className={`flex items-center ${PUBLICACIONES_HABILITADAS ? "justify-between" : "justify-end"} lg:justify-end gap-3`}>
                {PUBLICACIONES_HABILITADAS && (
                <div className="flex rounded-xl overflow-hidden border border-white/50 bg-red-600/30">
                  <button
                    type="button"
                    onClick={() =>
                      setModo("cotizador")
                    }
                    className={`px-4 py-2 text-sm font-medium transition ${
                      modo === "cotizador"
                        ? "bg-white text-[#FF1419]"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Cotizador
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setModo("publicaciones")
                    }
                    className={`px-4 py-2 text-sm font-medium transition ${
                      modo === "publicaciones"
                        ? "bg-white text-[#FF1419]"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Publicaciones
                  </button>
                </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setNavColapsada(true)
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 hover:bg-white/20 px-3 py-2 text-sm transition"
                  title="Colapsar navegación"
                >
                  <i className="fas fa-chevron-up" />

                  <span className="hidden xl:inline">
                    Contraer
                  </span>
                </button>
              </div>
            )}

            {/* CARRITO - MODO COMPACTO */}
            {navColapsada && (
              <button
                type="button"
                onClick={goToCart}
                aria-label="Ir al carrito"
                className="relative w-10 h-10 rounded-xl hover:bg-white/15 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                <i className="fas fa-shopping-cart text-xl" />

                {cartQty > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center bg-yellow-300 text-black text-[10px] font-bold rounded-full px-1">
                    {cartQty > 99
                      ? "99+"
                      : cartQty}
                  </span>
                )}
              </button>
            )}

            {/* EXPANDIR - MODO COMPACTO */}
            {navColapsada && (
              <button
                type="button"
                onClick={() =>
                  setNavColapsada(false)
                }
                className="w-10 h-10 rounded-xl border border-white/40 bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                title="Mostrar filtros"
                aria-label="Expandir navegación"
              >
                <i className="fas fa-sliders-h" />
              </button>
            )}
          </div>

          {/* =========================
              CONTROLES COMPLETOS
          ========================== */}
          {!navColapsada && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-3 items-end">
              <label className="block min-w-0">
                <span className="block text-[11px] font-medium text-red-100 mb-1">
                  Tipo de precio
                </span>

                <select
                  className="w-full border border-white/30 bg-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/70"
                  value={tipoPrecio}
                  onChange={(event) =>
                    setTipoPrecio(
                      event.target.value
                    )
                  }
                >
                  <option value="mayoreo">
                    Mayoreo
                  </option>

                  <option value="mostrador">
                    Mostrador
                  </option>

                  <option value="digital">
                    Digital
                  </option>
                </select>
              </label>

              <label className="block min-w-0">
                <span className="block text-[11px] font-medium text-red-100 mb-1">
                  Marca
                </span>

                <select
                  className="w-full border border-white/30 bg-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/70"
                  value={brand}
                  onChange={(event) => {
                    setBrand(
                      event.target.value
                    );

                    setCategory("todas");
                    setUnidadFiltro("todas");
                  }}
                >
                  {brands.map((itemBrand) => (
                    <option
                      key={itemBrand}
                      value={itemBrand}
                    >
                      {itemBrand === "todas"
                        ? "Todas las marcas"
                        : itemBrand}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block min-w-0">
                <span className="block text-[11px] font-medium text-red-100 mb-1">
                  Categoría
                </span>

                <select
                  className="w-full border border-white/30 bg-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/70"
                  value={category}
                  onChange={(event) => {
                    setCategory(
                      event.target.value
                    );

                    setUnidadFiltro("todas");
                  }}
                >
                  {categories.map(
                    (itemCategory) => (
                      <option
                        key={itemCategory}
                        value={itemCategory}
                      >
                        {itemCategory ===
                        "todas"
                          ? "Todas las categorías"
                          : itemCategory}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="block min-w-0">
                <span className="block text-[11px] font-medium text-red-100 mb-1">
                  Unidad
                </span>

                <select
                  className="w-full border border-white/30 bg-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/70"
                  value={unidadFiltro}
                  onChange={(event) =>
                    setUnidadFiltro(
                      event.target.value
                    )
                  }
                >
                  {unidadesDisponibles.map(
                    (unidad) => (
                      <option
                        key={unidad}
                        value={unidad}
                      >
                        {unidad === "todas"
                          ? "Todas las unidades"
                          : getUnidadLabel(
                              unidad
                            )}
                      </option>
                    )
                  )}
                </select>
              </label>

              {/* CARRITO COMPLETO */}
              <button
                type="button"
                onClick={goToCart}
                aria-label="Ir al carrito"
                className="relative h-10 min-w-11 rounded-xl border border-white/40 bg-white/10 hover:bg-white/20 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                <i className="fas fa-shopping-cart text-xl" />

                {cartQty > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center bg-yellow-300 text-black text-[10px] font-bold rounded-full px-1">
                    {cartQty > 99
                      ? "99+"
                      : cartQty}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* =========================
              FILTROS ACTIVOS
          ========================== */}
          {!navColapsada &&
            (q ||
              brand !== "todas" ||
              category !== "todas" ||
              unidadFiltro !== "todas") && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-red-100">
                  Filtros activos:
                </span>

                {q && (
                  <span className="rounded-full bg-white/20 px-3 py-1">
                    Búsqueda: {q}
                  </span>
                )}

                {brand !== "todas" && (
                  <span className="rounded-full bg-white/20 px-3 py-1">
                    Marca: {brand}
                  </span>
                )}

                {category !== "todas" && (
                  <span className="rounded-full bg-white/20 px-3 py-1">
                    Categoría: {category}
                  </span>
                )}

                {unidadFiltro !== "todas" && (
                  <span className="rounded-full bg-white/20 px-3 py-1">
                    Unidad:{" "}
                    {getUnidadLabel(
                      unidadFiltro
                    )}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    setBrand("todas");
                    setCategory("todas");
                    setUnidadFiltro("todas");
                  }}
                  className="rounded-full bg-white text-[#FF1419] px-3 py-1 font-medium hover:bg-red-50"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
        </div>
      </header>

            {modo === "cotizador" || !PUBLICACIONES_HABILITADAS ? (
        <VistaCotizador
          lineKeyFor={makeLineKey}
          carritoMovilAbierto={carritoMovilAbierto}
          setCarritoMovilAbierto={setCarritoMovilAbierto}
          abrirCarritoMovil={abrirCarritoMovil}
          cerrarCarritoMovil={cerrarCarritoMovil}
          hayDialogo={confirmVaciar || confirmComboAleatorio}
          cerrarDialogos={() => {
            setConfirmVaciar(false);
            setConfirmComboAleatorio(false);
          }}
          filtered={filtered}
          tipoPrecio={tipoPrecio}
          add={add}
          cart={cart}
          cartRef={cartRef}
          clearCart={clearCart}
          decLine={decLine}
          incLine={incLine}
          updateLineQty={updateLineQty}
          removeLine={removeLine}
          subtotalBase={subtotalBase}
          descuento={descuento}
          descuentoPercent={descuentoPercent}
          setDescuentoPercent={setDescuentoPercent}
          opcionesDescuento={opcionesDescuento}
          subtotal={subtotal}
          microfibras={microfibras}
          setMicrofibras={setMicrofibras}
          esponjas={esponjas}
          setEsponjas={setEsponjas}
          microfibrasGrandes={microfibrasGrandes}
          setMicrofibrasGrandes={setMicrofibrasGrandes}
          cubetas={cubetas}
          atomizadores={atomizadores}
          setCubetas={setCubetas}
          setAtomizadores={setAtomizadores}
          PRECIO_MICRO={PRECIO_MICRO}
          PRECIO_ESPONJA={PRECIO_ESPONJA}
          PRECIO_MICRO_GRANDE={PRECIO_MICRO_GRANDE}
          PRECIO_CUBETA={PRECIO_CUBETA}
          PRECIO_ATOMIZADOR={PRECIO_ATOMIZADOR}
          total={total}
          cotiza={cotiza}
          setCotiza={setCotiza}
          brand={brand}
          generarComboAleatorioMargrey={
            generarComboAleatorioMargrey
          }
          generandoComboAleatorio={
            generandoComboAleatorio
          }
          guardarComboEnPublicaciones={
            guardarComboEnPublicaciones
          }
          imagenKit={imagenKit}
          generandoImagenKit={
            generandoImagenKit
          }
          faltantesImagenKit={
            faltantesImagenKit
          }
          generarImagenKit={
            generarImagenKit
          }
          descargarImagenKit={
            descargarImagenKit
          }
        />
      ) : (
        <VistaPublicacionesML
          productos={productosPublicacion}
          publicacionesML={
            publicacionesML
          }
          updatePublicacionML={
            updatePublicacionML
          }
          totalPublicados={
            totalPublicados
          }
          tipoPrecio={tipoPrecio}
          add={add}
          editarComboML={editarComboML}
          eliminarComboML={
            eliminarComboML
          }
          cart={cart}
          clearCart={clearCart}
          microfibras={microfibras}
          setMicrofibras={
            setMicrofibras
          }
          esponjas={esponjas}
          setEsponjas={setEsponjas}
          microfibrasGrandes={
            microfibrasGrandes
          }
          setMicrofibrasGrandes={
            setMicrofibrasGrandes
          }
          cubetas={cubetas}
          atomizadores={atomizadores}
          setCubetas={setCubetas}
          setAtomizadores={setAtomizadores}
          PRECIO_MICRO={PRECIO_MICRO}
          PRECIO_ESPONJA={
            PRECIO_ESPONJA
          }
          PRECIO_MICRO_GRANDE={
            PRECIO_MICRO_GRANDE
          }
          PRECIO_CUBETA={
            PRECIO_CUBETA
          }
          PRECIO_ATOMIZADOR={
            PRECIO_ATOMIZADOR
          }
          total={total}
          plataformasMensaje={
            plataformasMensaje
          }
          setPlataformasMensaje={
            setPlataformasMensaje
          }
          copiarMensajePublicacionML={
            copiarMensajePublicacionML
          }
          
        />
      )}

      <footer className="bg-[#FF1419] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} DTUP ·
            Comercializadora DTUP
          </span>

          <a
            className="underline decoration-white/60 hover:decoration-white"
            href="mailto:comercializadoradtup@hotmail.com"
          >
            Soporte:
            comercializadoradtup@hotmail.com
          </a>
        </div>
      </footer>
        </div>
  );
}

function extraerPesoKgTexto(texto = "") {
  const normalizado = quitarCodigoColor(String(texto).toUpperCase());
  const kg = normalizado.match(/(\d+(?:[.,]\d+)?)\s*(?:KG|KGS)\b/);
  if (kg) return Number(kg[1].replace(",", "."));

  const gramos = normalizado.match(/(\d+(?:[.,]\d+)?)\s*(?:GR|GRS|G)\b/);
  if (gramos) return Number(gramos[1].replace(",", ".")) / 1000;

  const litros = normalizado.match(/(\d+(?:[.,]\d+)?)\s*(?:LT|LTS|L)\b/);
  if (litros) return Number(litros[1].replace(",", "."));

  const ml = normalizado.match(/(\d+(?:[.,]\d+)?)\s*ML\b/);
  if (ml) return Number(ml[1].replace(",", ".")) / 1000;

  return 0.3;
}

function estimarPesoPaqueteKg(cart = [], microfibras = 0, esponjas = 0, microfibrasGrandes = 0, cubetas = 0, atomizadores = 0) {
  const pesoProductos = cart.reduce((acumulado, item) => {
    const pesoContenido = extraerPesoKgTexto(item.description || "");
    const pesoEnvase = pesoContenido <= 0.6 ? 0.08 : pesoContenido <= 2 ? 0.15 : 0.3;
    return acumulado + (pesoContenido + pesoEnvase) * getPiezasLinea(item);
  }, 0);

  const pesoAccesorios =
    Number(microfibras || 0) * 0.05 + Number(esponjas || 0) * 0.01 +
    Number(microfibrasGrandes || 0) * 0.12 + Number(cubetas || 0) * 1.1 +
    Number(atomizadores || 0) * 0.04;

  // 150 g aproximados de caja y protección.
  return Math.max(0.1, Number((pesoProductos + pesoAccesorios + 0.15).toFixed(2)));
}

// Piezas físicas que salen en el envío: una caja de 12 cuenta 12.
function getPiezasLinea(item = {}) {
  return (
    Math.max(1, Number(item.qty || 1)) *
    Math.max(1, Number(item.piezasPorEnvio || 1))
  );
}

function calcularPaqueteMLCarrito(cart = [], microfibras = 0, esponjas = 0, microfibrasGrandes = 0, cubetas = 0, atomizadores = 0) {
  const lineasConDatosML = cart.filter(
    (item) => item.dim && item.pesoUnitarioKg
  );

  if (
    lineasConDatosML.length === 1 &&
    cart.length === 1 &&
    Number(microfibras || 0) === 0 &&
    Number(esponjas || 0) === 0 &&
    Number(microfibrasGrandes || 0) === 0 &&
    Number(cubetas || 0) === 0 &&
    Number(atomizadores || 0) === 0
  ) {
    const item = lineasConDatosML[0];
    return pesoFacturable(
      item.dim,
      item.pesoUnitarioKg,
      getPiezasLinea(item)
    );
  }

  const bultos = [];
  let pesoContenidoKg = 0;

  cart.forEach((item) => {
    const cantidad = getPiezasLinea(item);
    const dim = item.dim || (() => {
      const kg = extraerPesoKgTexto(item.description || "");
      const lado = Math.max(6, Math.cbrt(Math.max(0.1, kg) * 1000));
      return [lado, lado, lado];
    })();
    const pesoUnitario = item.pesoUnitarioKg || (() => {
      const contenido = extraerPesoKgTexto(item.description || "");
      return contenido + (contenido <= 0.6 ? 0.08 : contenido <= 2 ? 0.15 : 0.3);
    })();

    bultos.push({ dim, cantidad });
    pesoContenidoKg += pesoUnitario * cantidad;
  });

  if (Number(microfibras || 0) > 0) {
    bultos.push({ dim: [20, 20, 2], cantidad: Number(microfibras) });
    pesoContenidoKg += Number(microfibras) * 0.05;
  }
  if (Number(esponjas || 0) > 0) {
    bultos.push({ dim: [12, 8, 4], cantidad: Number(esponjas) });
    pesoContenidoKg += Number(esponjas) * 0.01;
  }
  if (Number(microfibrasGrandes || 0) > 0) {
    bultos.push({ dim: [30, 20, 4], cantidad: Number(microfibrasGrandes) });
    pesoContenidoKg += Number(microfibrasGrandes) * 0.12;
  }
  if (Number(atomizadores || 0) > 0) {
    bultos.push({ dim: [26, 10, 5], cantidad: Number(atomizadores) });
    pesoContenidoKg += Number(atomizadores) * 0.04;
  }

  const volumenDemasBultos = bultos.reduce(
    (total, bulto) =>
      total + bulto.dim[0] * bulto.dim[1] * bulto.dim[2] * bulto.cantidad,
    0
  );

  // Los productos viajan dentro de la cubeta: la caja mide al menos lo que
  // la cubeta, pero su volumen no se suma al de los demás bultos.
  let volumenCubetas = 0;
  if (Number(cubetas || 0) > 0) {
    bultos.push({ dim: [32, 32, 40], cantidad: Number(cubetas) });
    pesoContenidoKg += Number(cubetas) * 1.1;
    volumenCubetas = 32 * 32 * 40 * Number(cubetas);
  }

  const volumenProductos = Math.max(volumenDemasBultos, volumenCubetas);
  const maximos = bultos.reduce(
    (max, bulto) => {
      const ordenadas = [...bulto.dim].sort((a, b) => a - b);
      return max.map((valor, i) => Math.max(valor, ordenadas[i]));
    },
    [1, 1, 1]
  );

  const objetivo = Math.cbrt(Math.max(1, volumenProductos));
  const interiorL = Math.max(maximos[2], objetivo);
  const interiorW = Math.max(maximos[1], Math.sqrt(volumenProductos / interiorL));
  const interiorH = Math.max(maximos[0], volumenProductos / (interiorL * interiorW));
  const caja = [interiorL + 2, interiorW + 2, interiorH + 2]
    .sort((a, b) => b - a)
    .map((n) => Number(n.toFixed(1)));
  const volumetrico = Number((caja[0] * caja[1] * caja[2] / 5000).toFixed(2));
  const pesoTextoKg = !lineasConDatosML.length
    ? estimarPesoPaqueteKg(cart, microfibras, esponjas, microfibrasGrandes, cubetas, atomizadores) + 0.5
    : 0;
  const fisico = Number(
    Math.max(pesoContenidoKg + 0.15 + 0.5, pesoTextoKg).toFixed(2)
  );

  return {
    fisico,
    caja,
    volumetrico,
    kg: Math.max(fisico, volumetrico),
    manda: volumetrico > fisico ? "volumen" : "peso",
  };
}

function getCategoriaMLCarrito(cart = [], tipo = "clasica") {
  const categorias = cart.map((item) => item.categoria).filter(Boolean);
  if (!categorias.length) return "abrillantadores";
  return categorias.reduce((mayor, actual) =>
    comision(actual, tipo) > comision(mayor, tipo) ? actual : mayor
  );
}

function VistaCotizador({
  filtered,
  tipoPrecio,
  add,
  cart,
  cartRef,
  clearCart,
  decLine,
  incLine,
  updateLineQty,
  removeLine,
  subtotalBase,
  descuento,
  descuentoPercent,
  setDescuentoPercent,
  opcionesDescuento,
  subtotal,
  microfibras,
  setMicrofibras,
  esponjas,
  setEsponjas,
  microfibrasGrandes,
  setMicrofibrasGrandes,
  cubetas,
  atomizadores,
  setCubetas,
  setAtomizadores,
  PRECIO_MICRO,
  PRECIO_ESPONJA,
  PRECIO_MICRO_GRANDE,
  PRECIO_CUBETA,
  PRECIO_ATOMIZADOR,
  total,
  cotiza,
  setCotiza,
  brand,
  guardarComboEnPublicaciones,
  imagenKit,
  generandoImagenKit,
  faltantesImagenKit,
  generarImagenKit,
  descargarImagenKit,
  generarComboAleatorioMargrey,
  generandoComboAleatorio,
  lineKeyFor,
  carritoMovilAbierto,
  setCarritoMovilAbierto,
  abrirCarritoMovil,
  cerrarCarritoMovil,
  hayDialogo,
  cerrarDialogos,
}) {
  const esPantallaChica = useEsPantallaChica();
  const panelCarrito = esPantallaChica;
  const botonVolverRef = useRef(null);
  const panelListo = usePanelCarritoMovil({
    abierto: panelCarrito && carritoMovilAbierto,
    setAbierto: setCarritoMovilAbierto,
    cerrar: cerrarCarritoMovil,
    hayDialogo,
    cerrarDialogos,
    enfocarRef: botonVolverRef,
  });

  // Si la pantalla crece a tamaño de computadora, el panel se cierra.
  useEffect(() => {
    if (!esPantallaChica && carritoMovilAbierto) cerrarCarritoMovil();
  }, [esPantallaChica, carritoMovilAbierto, cerrarCarritoMovil]);
  const [mostrarResumenCarrito, setMostrarResumenCarrito] = useState(true);
  const [mostrarImagenKit, setMostrarImagenKit] = useState(true);
  const [tipoPublicacionML, setTipoPublicacionML] = useState("clasica");
  const paqueteMLEstimado = calcularPaqueteMLCarrito(
    cart,
    microfibras,
    esponjas,
    microfibrasGrandes,
    cubetas,
    atomizadores
  );
  const pesoEstimadoKg = paqueteMLEstimado.kg;
  const [pesoPaqueteKg, setPesoPaqueteKg] = useState(pesoEstimadoKg);
  useEffect(() => {
    setPesoPaqueteKg(pesoEstimadoKg);
  }, [pesoEstimadoKg]);
  const categoriaML = getCategoriaMLCarrito(cart, tipoPublicacionML);
  const opcionesML = {
    categoria: categoriaML,
    tipo: tipoPublicacionML,
    pesoKg: pesoPaqueteKg,
    envioGratis: true,
  };
  const extrasML =
    microfibras * PRECIO_MICRO + esponjas * PRECIO_ESPONJA;

  /*
   * Zach se publica a su precio Digital. Si el carrito solo trae
   * esas marcas, el precio ML es la suma de sus Digital.
   */
  const lineasPrecioDirectoML = cart.filter((item) => item.precioMLDirecto);
  const soloPrecioDirectoML =
    lineasPrecioDirectoML.length > 0 &&
    lineasPrecioDirectoML.length === cart.length;
  const precioDigitalListaML = Number(
    (
      lineasPrecioDirectoML.reduce(
        (acc, item) =>
          acc + item.precioMLDirecto * Number(item.qty || 0),
        0
      ) + extrasML
    ).toFixed(2)
  );

  /*
   * Neto que debe dejar ML, más los extras:
   * - Margrey y demás: Digital − 25% por línea, aunque la línea
   *   se haya agregado con otro tipo de precio.
   * - Zach en un combo mixto: lo que ML deja al venderla sola
   *   a su precio Digital.
   */
  const netoObjetivoML = Number(
    (
      cart.reduce((acc, item) => {
        if (item.precioMLDirecto) {
          return (
            acc +
            desglose(item.precioMLDirecto * Number(item.qty || 0), {
              categoria: getCategoriaMLCarrito([item], tipoPublicacionML),
              tipo: tipoPublicacionML,
              pesoKg: calcularPaqueteMLCarrito([item]).kg,
              envioGratis: true,
            }).recibes
          );
        }

        return (
          acc +
          Number(item.netoMLUnitario ?? item.unitPrice * 0.75) *
            Number(item.qty || 0)
        );
      }, 0) + extrasML
    ).toFixed(2)
  );
  const productosSinDatosML = cart
    .filter((item) => !item.categoria || !item.dim)
    .map((item) => item.product);
  const precioObjetivoML = soloPrecioDirectoML
    ? { precio: Math.round(precioDigitalListaML) }
    : precioParaRecibir(netoObjetivoML, opcionesML);
  const recomendacionML = precioObjetivoML
    ? desglose(precioObjetivoML.precio, opcionesML)
    : null;

  function generarPDF() {
    generarPDFPedido({
      cart,
      subtotalBase,
      subtotal,
      descuento,
      descuentoPercent,
      microfibras,
      esponjas,
      microfibrasGrandes,
      cubetas,
      atomizadores,
      PRECIO_MICRO,
      PRECIO_ESPONJA,
      PRECIO_MICRO_GRANDE,
      PRECIO_CUBETA,
      PRECIO_ATOMIZADOR,
      total,
      cotiza,
      brand,
      tipoPrecio,
    });
  }

  const cantidadArticulosCarrito =
    cart.reduce((acc, item) => acc + Number(item.qty || 0), 0) +
    Number(microfibras || 0) +
    Number(esponjas || 0) +
    Number(microfibrasGrandes || 0) +
    Number(cubetas || 0) +
    Number(atomizadores || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6 w-full flex-1">
      <section className="lg:col-span-2 overflow-x-auto">
        {esPantallaChica ? (
          <div className="pb-20">
            <ListaProductosMovil
              filtered={filtered}
              tipoPrecio={tipoPrecio}
              add={add}
              cart={cart}
              lineKeyFor={lineKeyFor}
              decLine={decLine}
            />
          </div>
        ) : (
        <table className="w-full text-sm bg-white rounded-2xl shadow overflow-hidden">
          <thead className="bg-[#FF1419] text-white">
            <tr>
              <th className="text-left p-3 w-56">Producto</th>
              <th className="text-left p-3">Descripción</th>
              <th className="text-left p-3 w-40">Precio</th>
              <th className="text-left p-3 w-[320px]">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-4 text-gray-500" colSpan={4}>
                  Sin resultados.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <FilaProducto
                  key={getProductKey(p)}
                  p={p}
                  onAdd={add}
                  tipoPrecio={tipoPrecio}
                />
              ))
            )}
          </tbody>
        </table>
        )}
      </section>

      {esPantallaChica && !carritoMovilAbierto && (
        <BarraCarritoMovil
          cantidad={cantidadArticulosCarrito}
          total={total}
          onAbrir={abrirCarritoMovil}
        />
      )}

      <aside
          className={
            panelCarrito
              ? `fixed inset-0 z-[45] flex flex-col bg-white transition-[translate,visibility] duration-300 ease-out motion-reduce:transition-none ${
                  carritoMovilAbierto
                    ? "translate-y-0 visible"
                    : "translate-y-full invisible"
                } ${panelListo ? "" : "pointer-events-none"}`
              : "lg:col-span-1 min-w-0 pb-8"
          }
          ref={cartRef}
          role={panelCarrito ? "dialog" : undefined}
          aria-modal={panelCarrito ? true : undefined}
          aria-label={panelCarrito ? "Carrito de compras" : undefined}
        >
          <div
            className={
              panelCarrito
                ? "bg-white h-full overflow-hidden flex flex-col"
                : "bg-white rounded-2xl shadow lg:sticky lg:top-28 lg:h-[calc(100vh-8.5rem)] lg:max-h-[calc(100vh-8.5rem)] overflow-hidden flex flex-col"
            }
          >
          <div
            className={`flex items-center justify-between border-b shrink-0 ${
              panelCarrito ? "gap-2 px-3 py-2.5" : "p-4"
            }`}
          >
            {panelCarrito && (
              <button
                ref={botonVolverRef}
                type="button"
                onClick={cerrarCarritoMovil}
                aria-label="Volver a los productos"
                className="w-10 h-10 shrink-0 rounded-full bg-gray-100 text-gray-700 grid place-content-center active:bg-gray-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold">Carrito de compras</h3>

              <div className="text-xs text-gray-500">
                {cantidadArticulosCarrito}{" "}
                {cantidadArticulosCarrito === 1 ? "artículo" : "artículos"}
              </div>
            </div>

            <button
              type="button"
              onClick={clearCart}
              disabled={
                !cart.length &&
                microfibras === 0 &&
                esponjas === 0 &&
                microfibrasGrandes === 0 &&
                cubetas === 0 &&
                atomizadores === 0
              }
              className={`inline-flex items-center justify-center rounded-lg px-2 py-1 transition ${
                cart.length ||
                microfibras > 0 ||
                esponjas > 0 ||
                microfibrasGrandes > 0 ||
                cubetas > 0 ||
                atomizadores > 0
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Vaciar
            </button>
          </div>

          <div
            className={
              panelCarrito
                ? "p-3 pb-4 flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-3 bg-gray-50"
                : "p-4 pb-24 flex-1 min-h-0 overflow-y-scroll overscroll-contain [scrollbar-gutter:stable] space-y-3 touch-pan-y"
            }
          >
          <button
            type="button"
            onClick={
              generarComboAleatorioMargrey
            }
            disabled={
              generandoComboAleatorio
            }
            className={`w-full rounded-xl px-4 py-3 text-white font-semibold shadow-sm transition ${
              generandoComboAleatorio
                ? "bg-gray-400 cursor-wait"
                : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]"
            }`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <span className="text-lg">
                🎲
              </span>

              {generandoComboAleatorio
                ? "Buscando productos con PNG..."
                : "Generar combo aleatorio Margrey"}
            </span>
          </button>
            {/* =========================
                RESUMEN COLAPSABLE
            ========================== */}
            <div className="border rounded-xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() =>
                  setMostrarResumenCarrito((prev) => !prev)
                }
                className="w-full flex items-center justify-between gap-3 px-3 py-3 bg-gray-50 hover:bg-gray-100 transition text-left"
                aria-expanded={mostrarResumenCarrito}
              >
                <div>
                  <div className="font-semibold">
                    Resumen de productos
                  </div>

                  <div className="text-xs text-gray-500">
                    {cart.reduce(
                      (acc, item) => acc + Number(item.qty || 0),
                      0
                    )}{" "}
                    productos agregados
                  </div>
                </div>

                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border bg-white text-lg font-bold transition-transform ${
                    mostrarResumenCarrito ? "" : "rotate-0"
                  }`}
                >
                  {mostrarResumenCarrito ? "−" : "⌄"}
                </span>
              </button>

              {mostrarResumenCarrito && (
                <div className="border-t">
                  {cart.length === 0 ? (
                    <div className="py-5 px-3 text-sm text-gray-500 text-center">
                      Aún no hay productos.
                    </div>
                  ) : (
                    <ul className="divide-y">
                      {cart.map((l) => (
                        <LineaCarrito
                          key={l.key}
                          linea={l}
                          decLine={decLine}
                          incLine={incLine}
                          updateLineQty={updateLineQty}
                          removeLine={removeLine}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* =========================
                TOTALES Y CONFIGURACIÓN
            ========================== */}
            <div className="border rounded-xl p-3 bg-white space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal productos</span>
                <span className="font-medium">
                  {peso(subtotalBase)}
                </span>
              </div>

              <label className="block">
                <span className="text-sm font-medium">Descuento</span>

                <select
                  value={descuentoPercent}
                  onChange={(e) =>
                    setDescuentoPercent(Number(e.target.value))
                  }
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {opcionesDescuento.map((n) => (
                    <option key={n} value={n}>
                      {n === 0
                        ? "Sin descuento"
                        : `${n}% de descuento`}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() =>
                  setDescuentoPercent((prev) =>
                    prev === 25 ? 0 : 25
                  )
                }
                className={`w-full rounded-lg px-3 py-2 text-sm font-medium border transition ${
                  descuentoPercent === 25
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                }`}
              >
                Descuento publicación solo ML 25%
              </button>

              {descuento > 0 && (
                <>
                  <div className="flex items-center justify-between text-red-600">
                    <span>
                      Descuento aplicado {descuentoPercent}%
                    </span>

                    <span className="font-medium">
                      - {peso(descuento)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Subtotal con descuento</span>

                    <span className="font-medium">
                      {peso(subtotal)}
                    </span>
                  </div>

                  {descuentoPercent === 25 && (
                    <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-end">
                        <label className="block">
                          <span className="text-xs font-semibold text-yellow-900">
                            Tipo de publicación
                          </span>
                          <select
                            value={tipoPublicacionML}
                            onChange={(e) => setTipoPublicacionML(e.target.value)}
                            className="mt-1 w-full border border-yellow-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          >
                            <option value="clasica">Clásica</option>
                            <option value="premium">Premium</option>
                          </select>
                        </label>

                        <label className="block">
                          <span className="text-xs font-semibold text-yellow-900">
                            Peso total del paquete (kg)
                          </span>
                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={pesoPaqueteKg}
                            onChange={(e) =>
                              setPesoPaqueteKg(
                                Math.max(0.01, Number(e.target.value || 0.01))
                              )
                            }
                            className="mt-1 w-full border border-yellow-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => setPesoPaqueteKg(pesoEstimadoKg)}
                          className="sm:col-span-2 rounded-lg border border-yellow-400 bg-white px-3 py-2 text-xs font-medium text-yellow-900 hover:bg-yellow-100"
                        >
                          Usar estimado {pesoEstimadoKg} kg
                        </button>
                      </div>

                      <div className="rounded-lg border border-yellow-300 bg-white p-3 space-y-2 text-xs text-yellow-950">
                        <div className="font-semibold text-sm">
                          Datos para declarar el paquete en Mercado Libre
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          <span>Medidas de la caja</span>
                          <span className="text-right font-semibold">
                            {paqueteMLEstimado.caja.join(" × ")} cm
                          </span>

                          <span>Peso físico estimado</span>
                          <span className="text-right font-semibold">
                            {paqueteMLEstimado.fisico.toFixed(2)} kg
                          </span>

                          <span>Peso volumétrico</span>
                          <span className="text-right font-semibold">
                            {paqueteMLEstimado.volumetrico.toFixed(2)} kg
                          </span>

                          <span>Peso facturable</span>
                          <span className="text-right font-bold text-yellow-900">
                            {paqueteMLEstimado.kg.toFixed(2)} kg ({paqueteMLEstimado.manda})
                          </span>
                        </div>
                        <div className="text-[11px] leading-tight text-yellow-700">
                          Incluye aproximadamente 2 cm extra en cada medida, 150 g de empaque y 0.5 kg de colchón. En combos se calcula una caja compacta con todos los artículos agregados.
                        </div>
                      </div>

                      {recomendacionML?.precio > 0 && (
                        <>
                          <div className="flex items-center justify-between gap-3 border-t border-yellow-300 pt-3">
                            <span className="font-semibold text-yellow-900">
                              Recomendación publicar en ML
                            </span>
                            <span className="text-xl font-bold text-yellow-900">
                              {peso(recomendacionML.precio)}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-yellow-900">
                            <span>
                              Cargo por venta ({recomendacionML.comisionPct}%)
                            </span>
                            <span className="text-right">
                              - {peso(recomendacionML.cargoPorVenta)}
                            </span>

                            <span>Costo por envío</span>
                            <span className="text-right">
                              - {peso(recomendacionML.costoEnvio)}
                            </span>

                            <span>ISR (2.5%)</span>
                            <span className="text-right">
                              - {peso(recomendacionML.isr)}
                            </span>

                            <span>IVA (8%)</span>
                            <span className="text-right">
                              - {peso(recomendacionML.ivaRetenido)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-t border-yellow-300 pt-2 text-sm">
                            <span>Recibes</span>
                            <span className="font-bold text-green-700">
                              {peso(recomendacionML.recibes)}
                            </span>
                          </div>

                          {soloPrecioDirectoML ? (
                            <div className="flex items-center justify-between text-xs text-yellow-900">
                              <span>Precio Digital de lista (se publica a este precio)</span>
                              <span className="font-semibold">{peso(precioDigitalListaML)}</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-xs text-yellow-900">
                              <span>Neto objetivo ML</span>
                              <span className="font-semibold">{peso(netoObjetivoML)}</span>
                            </div>
                          )}

                          <div className="text-[11px] leading-tight text-yellow-700">
                            Categoría aplicada: {categoriaML}. Envío gratis calculado con {Number(pesoPaqueteKg).toFixed(2)} kg facturables e incluye los extras del carrito en el neto objetivo.
                          </div>

                          {productosSinDatosML.length > 0 && (
                            <div className="rounded-lg border border-orange-300 bg-orange-50 p-2 text-[11px] leading-tight text-orange-800">
                              Sin datos de ML: {productosSinDatosML.join(", ")}. Su comisión y peso son estimados; revisa el precio antes de publicar.
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="grid grid-cols-[minmax(0,1fr)_auto_5.5rem] items-center gap-2">
                <span className="leading-tight">Microfibras</span>

                <Qty
                  value={microfibras}
                  onChange={setMicrofibras}
                  min={0}
                />

                <span className="text-right whitespace-nowrap">
                  {peso(microfibras * PRECIO_MICRO)}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto_5.5rem] items-center gap-2">
                <span className="leading-tight">Esponjas</span>

                <Qty
                  value={esponjas}
                  onChange={setEsponjas}
                  min={0}
                />

                <span className="text-right whitespace-nowrap">
                  {peso(esponjas * PRECIO_ESPONJA)}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto_5.5rem] items-center gap-2">
                <span className="leading-tight">Microfibras grandes 55×90</span>

                <Qty
                  value={microfibrasGrandes}
                  onChange={setMicrofibrasGrandes}
                  min={0}
                />

                <span className="text-right whitespace-nowrap">
                  {peso(microfibrasGrandes * PRECIO_MICRO_GRANDE)}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto_5.5rem] items-center gap-2">
                <span className="leading-tight">Cubetas 19 L con tapa</span>

                <Qty
                  value={cubetas}
                  onChange={setCubetas}
                  min={0}
                />

                <span className="text-right whitespace-nowrap">
                  {peso(cubetas * PRECIO_CUBETA)}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto_5.5rem] items-center gap-2">
                <span className="leading-tight">Atomizadores</span>

                <Qty
                  value={atomizadores}
                  onChange={setAtomizadores}
                  min={0}
                />

                <span className="text-right whitespace-nowrap">
                  {peso(atomizadores * PRECIO_ATOMIZADOR)}
                </span>
              </div>

              <div className="flex items-center justify-between text-base border-t pt-3">
                <span className="font-semibold">Total</span>

                <span className="text-xl font-bold">
                  {peso(total)}
                </span>
              </div>

              <label className="block">
                <span className="text-sm">¿Quién cotiza?</span>

                <input
                  type="text"
                  value={cotiza}
                  onChange={(e) => setCotiza(e.target.value)}
                  placeholder="Nombre de la persona que cotiza"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </label>
            </div>

            {/* =========================
                IMAGEN KIT COLAPSABLE
            ========================== */}
            <div className="border rounded-xl bg-gray-50 overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setMostrarImagenKit((prev) => !prev)
                }
                className="w-full flex items-center justify-between gap-3 px-3 py-3 hover:bg-gray-100 transition text-left"
                aria-expanded={mostrarImagenKit}
              >
                <div>
                  <div className="font-semibold">
                    Imagen automática del kit
                  </div>

                  <div className="text-xs text-gray-500">
                    1200 × 1200 px · máximo: {MAX_KIT_PRODUCTS} productos + {MAX_KIT_ACCESSORIES} adicionales
                  </div>
                </div>

                <span className="w-8 h-8 rounded-lg flex items-center justify-center border bg-white text-lg font-bold">
                  {mostrarImagenKit ? "−" : "⌄"}
                </span>
              </button>

              {mostrarImagenKit && (
                <div className="p-3 pt-3 space-y-3 border-t">
                  {imagenKit ? (
                    <div className="bg-white border rounded-xl p-2">
                      <img
                        src={imagenKit}
                        alt="Vista previa del kit"
                        className="w-full aspect-square object-contain rounded-lg bg-white"
                      />
                    </div>
                  ) : (
                    <div className="py-8 bg-white border border-dashed rounded-xl grid place-content-center text-center text-gray-400 px-5">
                      <div>
                        <div className="font-medium">
                          Sin imagen generada
                        </div>

                        <div className="text-xs mt-1">
                          Los productos se tomarán del carrito.
                        </div>
                      </div>
                    </div>
                  )}

                  {faltantesImagenKit.length > 0 && (
                    <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-2 text-xs text-yellow-800">
                      <div className="font-semibold">
                        Imágenes que no se pudieron cargar:
                      </div>

                      <div>
                        {faltantesImagenKit
                          .map(
                            (item) =>
                              item.sku || item.name || "Sin nombre"
                          )
                          .join(", ")}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={generarImagenKit}
                      disabled={
                        generandoImagenKit ||
                        (!cart.length &&
                          microfibras === 0 &&
                          esponjas === 0 &&
                          microfibrasGrandes === 0 &&
                          cubetas === 0 &&
                          atomizadores === 0)
                      }
                      className={`w-full py-2 rounded-xl text-white transition ${
                        generandoImagenKit
                          ? "bg-gray-400 cursor-wait"
                          : cart.length ||
                            microfibras > 0 ||
                            esponjas > 0 ||
                            microfibrasGrandes > 0 ||
                            cubetas > 0 ||
                            atomizadores > 0
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {generandoImagenKit
                        ? "Generando..."
                        : imagenKit
                        ? "Actualizar imagen"
                        : "Generar imagen del kit"}
                    </button>

                    <button
                      type="button"
                      onClick={descargarImagenKit}
                      disabled={!imagenKit}
                      className={`w-full py-2 rounded-xl text-white transition ${
                        imagenKit
                          ? "bg-gray-900 hover:bg-black"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Descargar PNG
                    </button>
                  </div>
                </div>
              )}
            </div>
              <div className="space-y-3 pb-2">
                {PUBLICACIONES_HABILITADAS && (
                <button
                  type="button"
                  onClick={guardarComboEnPublicaciones}
                  disabled={
                    !cart.length &&
                    microfibras === 0 &&
                    esponjas === 0 &&
                    microfibrasGrandes === 0 &&
                    cubetas === 0 &&
                    atomizadores === 0
                  }
                  className={`w-full py-2.5 rounded-xl text-white transition ${
                    cart.length ||
                    microfibras > 0 ||
                    esponjas > 0 ||
                    microfibrasGrandes > 0 ||
                    cubetas > 0 ||
                    atomizadores > 0
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Guardar combo en publicaciones ML
                </button>
                )}

                {!panelCarrito && (
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-[#FF1419] text-white hover:opacity-90"
                  onClick={generarPDF}
                >
                  Generar cotización PDF
                </button>
                )}
              </div>    
          </div>

          {panelCarrito && (
            <div className="shrink-0 border-t bg-white px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-xs text-gray-500">Total</div>
                <div className="text-xl font-bold tabular-nums whitespace-nowrap">
                  {peso(total)}
                </div>
              </div>

              <button
                type="button"
                onClick={generarPDF}
                className="shrink-0 h-12 px-5 rounded-xl bg-[#FF1419] text-white font-semibold active:opacity-90"
              >
                Cotización PDF
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function VistaPublicacionesML({
  productos,
  publicacionesML,
  updatePublicacionML,
  totalPublicados,
  add,
  editarComboML,
  eliminarComboML,
  cart,
  clearCart,
  microfibras,
  setMicrofibras,
  esponjas,
  setEsponjas,
  microfibrasGrandes,
  setMicrofibrasGrandes,
  cubetas,
  atomizadores,
  setCubetas,
  setAtomizadores,
  PRECIO_MICRO,
  PRECIO_ESPONJA,
  PRECIO_MICRO_GRANDE,
  PRECIO_CUBETA,
  PRECIO_ATOMIZADOR,
  total,
  plataformasMensaje,
  setPlataformasMensaje,
  copiarMensajePublicacionML,
}) {
  const [
    filtroEstado,
    setFiltroEstado,
  ] = useState("todas");

  const [
    mostrarPanelMensaje,
    setMostrarPanelMensaje,
  ] = useState(false);

  const barraSuperiorRef =
    useRef(null);

  const tablaScrollRef =
    useRef(null);

  const sincronizandoScrollRef =
    useRef(false);

  useEffect(() => {
    const barraSuperior =
      barraSuperiorRef.current;

    const tablaScroll =
      tablaScrollRef.current;

    if (
      !barraSuperior ||
      !tablaScroll
    ) {
      return undefined;
    }

    function sincronizarDesdeArriba() {
      if (
        sincronizandoScrollRef.current
      ) {
        return;
      }

      sincronizandoScrollRef.current =
        true;

      tablaScroll.scrollLeft =
        barraSuperior.scrollLeft;

      window.requestAnimationFrame(
        () => {
          sincronizandoScrollRef.current =
            false;
        }
      );
    }

    function sincronizarDesdeTabla() {
      if (
        sincronizandoScrollRef.current
      ) {
        return;
      }

      sincronizandoScrollRef.current =
        true;

      barraSuperior.scrollLeft =
        tablaScroll.scrollLeft;

      window.requestAnimationFrame(
        () => {
          sincronizandoScrollRef.current =
            false;
        }
      );
    }

    barraSuperior.addEventListener(
      "scroll",
      sincronizarDesdeArriba,
      {
        passive: true,
      }
    );

    tablaScroll.addEventListener(
      "scroll",
      sincronizarDesdeTabla,
      {
        passive: true,
      }
    );

    return () => {
      barraSuperior.removeEventListener(
        "scroll",
        sincronizarDesdeArriba
      );

      tablaScroll.removeEventListener(
        "scroll",
        sincronizarDesdeTabla
      );
    };
  }, []);

  useEffect(() => {
    if (!mostrarPanelMensaje) {
      return undefined;
    }

    function cerrarConEscape(
      event
    ) {
      if (event.key === "Escape") {
        setMostrarPanelMensaje(
          false
        );
      }
    }

    document.addEventListener(
      "keydown",
      cerrarConEscape
    );

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        cerrarConEscape
      );

      document.body.style.overflow =
        overflowAnterior;
    };
  }, [mostrarPanelMensaje]);

  const registros = useMemo(() => {
    const base = productos.map(
      (producto) => ({
        ...producto,
        tipoRegistro:
          "producto",
      })
    );

    const combos = Object.entries(
      publicacionesML
    )
      .filter(
        ([, data]) =>
          data?.isCombo
      )
      .map(([key, data]) => ({
        publicacionKey: key,

        product:
          data.product ||
          "Combo personalizado",

        brand:
          data.brand ||
          "Multiplataforma",

        sku:
          data.sku ||
          key,

        code:
          data.code ||
          "",

        description:
          data.description ||
          "",

        image:
          data.image ||
          "",

        price:
          data.total ||
          0,

        unitPrice:
          data.total ||
          0,

        tipoRegistro:
          "combo",
      }));

    return [
      ...combos,
      ...base,
    ];
  }, [
    productos,
    publicacionesML,
  ]);

  const productosFiltrados =
    useMemo(() => {
      return registros.filter(
        (producto) => {
          const data =
            publicacionesML[
              producto
                .publicacionKey
            ] || {};

          const plataformas =
            normalizarPlataformasRegistro(
              data
            );

          const tienePublicada =
            plataformas.some(
              (plataforma) =>
                plataforma.publicado ||
                plataforma.estado ===
                  "Publicado"
            );

          const tienePendiente =
            plataformas.length === 0 ||
            plataformas.some(
              (plataforma) =>
                !plataforma.publicado &&
                plataforma.estado !==
                  "Publicado"
            );

          const tieneSinLink =
            plataformas.length === 0 ||
            plataformas.some(
              (plataforma) =>
                !String(
                  plataforma.link ||
                    ""
                ).trim()
            );

          if (
            filtroEstado ===
            "todas"
          ) {
            return true;
          }

          if (
            filtroEstado ===
            "publicadas"
          ) {
            return tienePublicada;
          }

          if (
            filtroEstado ===
            "pendientes"
          ) {
            return tienePendiente;
          }

          if (
            filtroEstado ===
            "sinLink"
          ) {
            return tieneSinLink;
          }

          if (
            filtroEstado ===
            "sinPlataforma"
          ) {
            return (
              plataformas.length === 0
            );
          }

          if (
            filtroEstado ===
            "sinImagen"
          ) {
            return (
              !producto.image &&
              !data.isCombo
            );
          }

          return true;
        }
      );
    }, [
      registros,
      publicacionesML,
      filtroEstado,
    ]);

  function obtenerRegistroBase(
    producto
  ) {
    const actual =
      publicacionesML[
        producto.publicacionKey
      ] || {};

    return {
      ...actual,
      product:
        producto.product,
      brand:
        getBrand(producto),
      sku:
        producto.sku || "",
      code:
        producto.code || "",
      description:
        producto.description ||
        "",
      isCombo:
        Boolean(
          actual.isCombo
        ) ||
        producto.tipoRegistro ===
          "combo",
    };
  }

  function guardarPlataformasProducto(
    producto,
    plataformas
  ) {
    updatePublicacionML(
      producto.publicacionKey,
      {
        ...obtenerRegistroBase(
          producto
        ),

        /*
         * Es importante guardar incluso
         * un arreglo vacío.
         */
        plataformas,

        /*
         * Limpieza de propiedades antiguas.
         */
        linkML: "",
        estado: "",
        notas: "",
        fecha: "",
        publicado: false,
      }
    );
  }

  function agregarPlataformaProducto(
    producto
  ) {
    const data =
      publicacionesML[
        producto.publicacionKey
      ] || {};

    const plataformas =
      normalizarPlataformasRegistro(
        data
      );

    guardarPlataformasProducto(
      producto,
      [
        ...plataformas,
        crearPlataforma(
          "Mercado Libre"
        ),
      ]
    );
  }

  function actualizarPlataformaProducto(
    producto,
    plataformaId,
    patch
  ) {
    const data =
      publicacionesML[
        producto.publicacionKey
      ] || {};

    const plataformas =
      normalizarPlataformasRegistro(
        data
      ).map(
        (plataforma) => {
          if (
            plataforma.id !==
            plataformaId
          ) {
            return plataforma;
          }

          const siguiente = {
            ...plataforma,
            ...patch,
          };

          if (
            Object.prototype.hasOwnProperty.call(
              patch,
              "estado"
            )
          ) {
            siguiente.publicado =
              patch.estado ===
              "Publicado";

            if (
              patch.estado ===
                "Publicado" &&
              !siguiente.fecha
            ) {
              siguiente.fecha =
                new Date().toLocaleDateString(
                  "es-MX"
                );
            }
          }

          if (
            Object.prototype.hasOwnProperty.call(
              patch,
              "publicado"
            )
          ) {
            siguiente.estado =
              patch.publicado
                ? "Publicado"
                : siguiente.estado ===
                  "Publicado"
                ? "Pendiente"
                : siguiente.estado;

            if (
              patch.publicado &&
              !siguiente.fecha
            ) {
              siguiente.fecha =
                new Date().toLocaleDateString(
                  "es-MX"
                );
            }
          }

          return siguiente;
        }
      );

    guardarPlataformasProducto(
      producto,
      plataformas
    );
  }

  function eliminarPlataformaProducto(
    producto,
    plataformaId
  ) {
    const data =
      publicacionesML[
        producto.publicacionKey
      ] || {};

    const plataformas =
      normalizarPlataformasRegistro(
        data
      );

    const plataforma =
      plataformas.find(
        (item) =>
          item.id ===
          plataformaId
      );

    const confirmar =
      window.confirm(
        `¿Eliminar la publicación de ${
          plataforma?.nombre ||
          "esta plataforma"
        }?`
      );

    if (!confirmar) {
      return;
    }

    const nuevasPlataformas =
      plataformas.filter(
        (item) =>
          item.id !==
          plataformaId
      );

    guardarPlataformasProducto(
      producto,
      nuevasPlataformas
    );
  }

  function agregarPlataformaMensaje() {
    setPlataformasMensaje(
      (prev) => [
        ...prev,
        crearPlataforma(
          "Mercado Libre"
        ),
      ]
    );
  }

  function actualizarPlataformaMensaje(
    plataformaId,
    patch
  ) {
    setPlataformasMensaje(
      (prev) =>
        prev.map(
          (plataforma) => {
            if (
              plataforma.id !==
              plataformaId
            ) {
              return plataforma;
            }

            const siguiente = {
              ...plataforma,
              ...patch,
            };

            if (
              Object.prototype.hasOwnProperty.call(
                patch,
                "estado"
              )
            ) {
              siguiente.publicado =
                patch.estado ===
                "Publicado";

              if (
                patch.estado ===
                  "Publicado" &&
                !siguiente.fecha
              ) {
                siguiente.fecha =
                  new Date().toLocaleDateString(
                    "es-MX"
                  );
              }
            }

            return siguiente;
          }
        )
    );
  }

  function eliminarPlataformaMensaje(
    plataformaId
  ) {
    setPlataformasMensaje(
      (prev) =>
        prev.filter(
          (plataforma) =>
            plataforma.id !==
            plataformaId
        )
    );
  }

  function obtenerPlataformasDelCarrito() {
    const encontradas = [];

    cart.forEach((linea) => {
      const publicacionKey =
        linea.publicacionKey ||
        getProductKey(linea);

      const registro =
        publicacionesML[
          publicacionKey
        ];

      if (!registro) {
        return;
      }

      const plataformas =
        normalizarPlataformasRegistro(
          registro
        );

      plataformas.forEach(
        (plataforma) => {
          const nombre =
            String(
              plataforma.nombre ||
                ""
            ).trim();

          const link =
            String(
              plataforma.link ||
                ""
            ).trim();

          const tieneInformacion =
            nombre ||
            link ||
            String(
              plataforma.notas ||
                ""
            ).trim() ||
            plataforma.estado ===
              "Publicado";

          if (
            !tieneInformacion
          ) {
            return;
          }

          const yaExiste =
            encontradas.some(
              (existente) =>
                String(
                  existente.nombre ||
                    ""
                )
                  .trim()
                  .toLowerCase() ===
                  nombre.toLowerCase() &&
                String(
                  existente.link ||
                    ""
                ).trim() ===
                  link
            );

          if (!yaExiste) {
            encontradas.push({
              ...plataforma,
              id:
                crearIdPlataforma(),
            });
          }
        }
      );
    });

    return encontradas;
  }

  function cargarPlataformasCarrito() {
    const detectadas =
      obtenerPlataformasDelCarrito();

    if (
      detectadas.length === 0
    ) {
      setPlataformasMensaje([]);

      return false;
    }

    setPlataformasMensaje(
      detectadas
    );

    return true;
  }

  function abrirPanelMensaje() {
    cargarPlataformasCarrito();

    setMostrarPanelMensaje(
      true
    );
  }

  const totalProductosCarrito =
    cart.reduce(
      (acumulado, item) =>
        acumulado +
        Number(item.qty || 0),
      0
    );

  const subtotalProductosCarrito =
    cart.reduce(
      (acumulado, item) =>
        acumulado +
        Number(
          item.unitPrice || 0
        ) *
          Number(item.qty || 0),
      0
    );

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6 w-full flex-1 relative">
      <section className="w-full min-w-0">
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="p-4 border-b flex flex-wrap items-center gap-3">
            <div className="mr-auto">
              <h3 className="text-lg font-semibold">
                Publicaciones
                multiplataforma
              </h3>

              <p className="text-sm text-gray-500">
                Publicaciones activas
                guardadas:{" "}
                {totalPublicados}
              </p>
            </div>

            <select
              value={
                filtroEstado
              }
              onChange={(event) =>
                setFiltroEstado(
                  event.target.value
                )
              }
              className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="todas">
                Todas
              </option>

              <option value="pendientes">
                Con pendientes
              </option>

              <option value="publicadas">
                Con publicaciones
              </option>

              <option value="sinLink">
                Sin link
              </option>

              <option value="sinPlataforma">
                Sin plataforma
              </option>

              <option value="sinImagen">
                Sin imagen
              </option>
            </select>
          </div>

          <div className="bg-gray-50 border-b px-3 pt-2">
            <div
              ref={
                barraSuperiorRef
              }
              className="overflow-x-auto overflow-y-hidden"
              aria-label="Desplazamiento horizontal superior"
            >
              <div className="w-[1500px] h-2" />
            </div>
          </div>

          <div
            ref={
              tablaScrollRef
            }
            className="overflow-auto overscroll-contain max-h-[calc(100vh-14rem)]"
          >
            <table className="w-full text-sm min-w-[1500px]">
              <thead className="bg-[#FF1419] text-white sticky top-0 z-20 shadow-sm">
                <tr>
                  <th className="text-left p-3 w-[290px]">
                    Producto
                  </th>

                  <th className="text-left p-3 w-40">
                    SKU / UPC
                  </th>

                  <th className="text-left p-3 w-28">
                    Unidad
                  </th>

                  <th className="text-left p-3 w-32">
                    Precio digital
                  </th>

                  <th className="text-left p-3 min-w-[650px]">
                    Plataformas
                  </th>

                  <th className="text-left p-3 w-28">
                    Carrito
                  </th>

                  <th className="text-left p-3 w-32">
                    Administrar
                  </th>
                </tr>
              </thead>

              <tbody>
                {productosFiltrados.length ===
                0 ? (
                  <tr>
                    <td
                      className="p-5 text-gray-500 text-center"
                      colSpan={7}
                    >
                      Sin productos para
                      mostrar.
                    </td>
                  </tr>
                ) : (
                  productosFiltrados.map(
                    (producto) => {
                      const data =
                        publicacionesML[
                          producto
                            .publicacionKey
                        ] || {};

                      const plataformas =
                        normalizarPlataformasRegistro(
                          data
                        );

                      const precio =
                        data.isCombo
                          ? data.total ||
                            producto.price ||
                            0
                          : precioPublico(
                              producto.unitPrice ||
                                producto.price,
                              producto,
                              "digital"
                            );

                      return (
                        <tr
                          key={
                            producto.publicacionKey
                          }
                          className="border-t align-top hover:bg-gray-50"
                        >
                          <td className="p-3">
                            <div className="flex items-start gap-3">
                              {producto.image ? (
                                <img
                                  src={
                                    producto.image
                                  }
                                  alt={
                                    producto.product
                                  }
                                  className="w-14 h-14 object-contain rounded-lg bg-white border shrink-0"
                                />
                              ) : (
                                <div className="w-14 h-14 rounded-lg bg-gray-100 grid place-content-center text-[10px] text-gray-500 shrink-0">
                                  {data.isCombo
                                    ? "Combo"
                                    : "Sin foto"}
                                </div>
                              )}

                              <div className="min-w-0">
                                <div className="font-semibold leading-tight">
                                  {
                                    producto.product
                                  }
                                </div>

                                <div className="text-xs text-gray-500 mt-1">
                                  {getBrand(
                                    producto
                                  )}
                                </div>

                                <div className="text-xs text-gray-500 leading-tight mt-1">
                                  {producto.description ||
                                    "—"}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-3 text-xs">
                            <div>
                              {producto.sku ||
                                "—"}
                            </div>

                            <div className="text-gray-500 mt-1">
                              {producto.code ||
                                "—"}
                            </div>
                          </td>

                          <td className="p-3 text-xs">
                            {data.isCombo
                              ? "Combo"
                              : getUnidadLabel(
                                  getUnidadMedida(
                                    producto
                                  )
                                )}
                          </td>

                          <td className="p-3 font-medium whitespace-nowrap">
                            {peso(
                              precio
                            )}
                          </td>

                          <td className="p-3">
                            <div className="space-y-3">
                              {plataformas.length ===
                              0 ? (
                                <div className="rounded-xl border border-dashed bg-gray-50 p-4 text-center">
                                  <div className="text-sm text-gray-500">
                                    Este producto
                                    aún no tiene
                                    plataformas
                                    agregadas.
                                  </div>
                                </div>
                              ) : (
                                plataformas.map(
                                  (
                                    plataforma,
                                    index
                                  ) => {
                                    const opcionesFijas =
                                      PLATAFORMAS_SUGERIDAS.filter(
                                        (
                                          nombre
                                        ) =>
                                          nombre !==
                                          "Otra"
                                      );

                                    const esFija =
                                      opcionesFijas.includes(
                                        plataforma.nombre
                                      );

                                    const valorSelect =
                                      esFija
                                        ? plataforma.nombre
                                        : "Otra";

                                    return (
                                      <div
                                        key={
                                          plataforma.id
                                        }
                                        className="rounded-xl border bg-white p-3 shadow-sm"
                                      >
                                        <div className="flex items-start gap-2 mb-3">
                                          <div className="w-7 h-7 rounded-full bg-gray-100 grid place-content-center text-xs font-bold shrink-0 mt-1">
                                            {index +
                                              1}
                                          </div>

                                          <div className="flex-1 min-w-0">
                                            <select
                                              value={
                                                valorSelect
                                              }
                                              onChange={(
                                                event
                                              ) => {
                                                const seleccion =
                                                  event
                                                    .target
                                                    .value;

                                                actualizarPlataformaProducto(
                                                  producto,
                                                  plataforma.id,
                                                  {
                                                    nombre:
                                                      seleccion ===
                                                      "Otra"
                                                        ? ""
                                                        : seleccion,
                                                  }
                                                );
                                              }}
                                              className="w-full border rounded-lg px-2 py-1.5 bg-white font-semibold"
                                            >
                                              {PLATAFORMAS_SUGERIDAS.map(
                                                (
                                                  nombrePlataforma
                                                ) => (
                                                  <option
                                                    key={
                                                      nombrePlataforma
                                                    }
                                                    value={
                                                      nombrePlataforma
                                                    }
                                                  >
                                                    {
                                                      nombrePlataforma
                                                    }
                                                  </option>
                                                )
                                              )}
                                            </select>

                                            {valorSelect ===
                                              "Otra" && (
                                              <input
                                                type="text"
                                                value={
                                                  plataforma.nombre ||
                                                  ""
                                                }
                                                onChange={(
                                                  event
                                                ) =>
                                                  actualizarPlataformaProducto(
                                                    producto,
                                                    plataforma.id,
                                                    {
                                                      nombre:
                                                        event
                                                          .target
                                                          .value,
                                                    }
                                                  )
                                                }
                                                placeholder="Escribe el nombre de la plataforma"
                                                className="mt-2 w-full border rounded-lg px-2 py-1.5 bg-white"
                                              />
                                            )}
                                          </div>

                                          <label className="inline-flex items-center gap-2 text-xs whitespace-nowrap mt-2">
                                            <input
                                              type="checkbox"
                                              checked={
                                                Boolean(
                                                  plataforma.publicado
                                                ) ||
                                                plataforma.estado ===
                                                  "Publicado"
                                              }
                                              onChange={(
                                                event
                                              ) =>
                                                actualizarPlataformaProducto(
                                                  producto,
                                                  plataforma.id,
                                                  {
                                                    publicado:
                                                      event
                                                        .target
                                                        .checked,
                                                  }
                                                )
                                              }
                                              className="w-4 h-4"
                                            />

                                            Publicado
                                          </label>

                                          <button
                                            type="button"
                                            onClick={() =>
                                              eliminarPlataformaProducto(
                                                producto,
                                                plataforma.id
                                              )
                                            }
                                            className="w-9 h-9 rounded-lg text-red-600 hover:bg-red-50 grid place-content-center text-xl shrink-0"
                                            title="Eliminar plataforma"
                                            aria-label="Eliminar plataforma"
                                          >
                                            ×
                                          </button>
                                        </div>

                                        <div className="grid grid-cols-1 xl:grid-cols-[minmax(220px,1.4fr)_150px_120px_minmax(180px,1fr)] gap-2">
                                          <input
                                            type="url"
                                            value={
                                              plataforma.link ||
                                              ""
                                            }
                                            onChange={(
                                              event
                                            ) =>
                                              actualizarPlataformaProducto(
                                                producto,
                                                plataforma.id,
                                                {
                                                  link: event
                                                    .target
                                                    .value,
                                                }
                                              )
                                            }
                                            placeholder="Link de la publicación"
                                            className="border rounded-lg px-2 py-1.5"
                                          />

                                          <select
                                            value={
                                              plataforma.estado ||
                                              "Pendiente"
                                            }
                                            onChange={(
                                              event
                                            ) =>
                                              actualizarPlataformaProducto(
                                                producto,
                                                plataforma.id,
                                                {
                                                  estado:
                                                    event
                                                      .target
                                                      .value,
                                                }
                                              )
                                            }
                                            className="border rounded-lg px-2 py-1.5 bg-white"
                                          >
                                            <option value="Pendiente">
                                              Pendiente
                                            </option>

                                            <option value="En proceso">
                                              En
                                              proceso
                                            </option>

                                            <option value="Publicado">
                                              Publicado
                                            </option>

                                            <option value="En revisión">
                                              En
                                              revisión
                                            </option>

                                            <option value="Pausado">
                                              Pausado
                                            </option>

                                            <option value="Sin stock">
                                              Sin
                                              stock
                                            </option>

                                            <option value="Revisar">
                                              Revisar
                                            </option>
                                          </select>

                                          <input
                                            type="text"
                                            value={
                                              plataforma.fecha ||
                                              ""
                                            }
                                            onChange={(
                                              event
                                            ) =>
                                              actualizarPlataformaProducto(
                                                producto,
                                                plataforma.id,
                                                {
                                                  fecha:
                                                    event
                                                      .target
                                                      .value,
                                                }
                                              )
                                            }
                                            placeholder="Fecha"
                                            className="border rounded-lg px-2 py-1.5"
                                          />

                                          <input
                                            type="text"
                                            value={
                                              plataforma.notas ||
                                              ""
                                            }
                                            onChange={(
                                              event
                                            ) =>
                                              actualizarPlataformaProducto(
                                                producto,
                                                plataforma.id,
                                                {
                                                  notas:
                                                    event
                                                      .target
                                                      .value,
                                                }
                                              )
                                            }
                                            placeholder="Notas internas"
                                            className="border rounded-lg px-2 py-1.5"
                                          />
                                        </div>
                                      </div>
                                    );
                                  }
                                )
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  agregarPlataformaProducto(
                                    producto
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 text-blue-700 px-3 py-2 text-sm font-medium hover:bg-blue-100"
                              >
                                <span className="text-lg leading-none">
                                  +
                                </span>

                                Agregar
                                plataforma
                              </button>
                            </div>
                          </td>

                          <td className="p-3">
                            {!data.isCombo ? (
                              <button
                                type="button"
                                onClick={() =>
                                  add(
                                    producto,
                                    isUnitOnly(
                                      producto
                                    )
                                      ? "pack"
                                      : "unit",
                                    1
                                  )
                                }
                                className="px-3 py-2 rounded-xl bg-[#FF1419] text-white hover:opacity-90"
                              >
                                Agregar
                              </button>
                            ) : (
                              <span className="text-xs text-gray-400">
                                Combo
                              </span>
                            )}
                          </td>

                          <td className="p-3">
                            {data.isCombo ? (
                              <div className="flex flex-col gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    editarComboML(
                                      producto.publicacionKey
                                    )
                                  }
                                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                  Editar
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    eliminarComboML(
                                      producto.publicacionKey
                                    )
                                  }
                                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                >
                                  Eliminar
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">
                                Catálogo
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={
          abrirPanelMensaje
        }
        className={`fixed right-5 bottom-5 z-40 flex items-center gap-3 rounded-full bg-green-600 text-white shadow-2xl px-4 py-3 hover:bg-green-700 transition-all ${
          mostrarPanelMensaje
            ? "opacity-0 pointer-events-none translate-x-6"
            : "opacity-100 translate-x-0"
        }`}
        aria-label="Abrir generador de mensaje"
      >
        <span className="w-9 h-9 rounded-full bg-white/20 grid place-content-center text-xl">
          <i className="fab fa-whatsapp" />
        </span>

        <span className="hidden sm:block font-semibold">
          Generar mensaje
        </span>
      </button>

      {mostrarPanelMensaje && (
        <button
          type="button"
          onClick={() =>
            setMostrarPanelMensaje(
              false
            )
          }
          className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[1px]"
          aria-label="Cerrar generador"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-dvh w-full sm:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          mostrarPanelMensaje
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="shrink-0 flex items-center justify-between gap-3 border-b bg-green-600 text-white px-4 py-4">
            <div>
              <h3 className="text-lg font-semibold">
                Generador de
                mensaje
              </h3>

              <p className="text-xs text-green-50 mt-1">
                Vista previa de
                productos y
                plataformas del
                carrito.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setMostrarPanelMensaje(
                  false
                )
              }
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 grid place-content-center text-2xl"
              aria-label="Cerrar panel"
            >
              ×
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
            <div className="rounded-2xl border bg-gray-50 p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">
                    Productos agregados
                  </div>

                  <div className="text-xs text-gray-500">
                    Vista previa exacta del carrito
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-white border px-3 py-1 text-xs font-semibold">
                    {totalProductosCarrito}{" "}
                    {totalProductosCarrito === 1
                      ? "producto"
                      : "productos"}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      clearCart();
                      setPlataformasMensaje([]);
                    }}
                    disabled={
                      !cart.length &&
                      microfibras === 0 &&
                      esponjas === 0 &&
                      microfibrasGrandes === 0 &&
                      cubetas === 0 &&
                      atomizadores === 0
                    }
                    className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                      cart.length ||
                      microfibras > 0 ||
                      esponjas > 0 ||
                      microfibrasGrandes > 0 ||
                      cubetas > 0 ||
                      atomizadores > 0
                        ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                        : "border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                    title="Vaciar carrito"
                  >
                    <i className="fas fa-trash-alt mr-1.5" />
                    Vaciar
                  </button>
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="rounded-xl border border-dashed bg-white p-5 text-center">
                  <div className="text-sm font-medium text-gray-600">
                    No hay productos
                    agregados
                  </div>

                  <div className="text-xs text-gray-400 mt-1">
                    Usa el botón
                    Agregar de la
                    tabla.
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map(
                    (linea) => (
                      <div
                        key={
                          linea.key
                        }
                        className="rounded-xl border bg-white p-3"
                      >
                        <div className="flex items-start gap-3">
                          {linea.image ? (
                            <img
                              src={
                                linea.image
                              }
                              alt={
                                linea.product
                              }
                              className="w-14 h-14 rounded-lg border object-contain bg-white shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-gray-100 border grid place-content-center text-[9px] text-gray-400 shrink-0">
                              Sin foto
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm leading-tight">
                              {
                                linea.product
                              }
                            </div>

                            <div className="text-[11px] text-gray-500 mt-1 leading-tight">
                              {linea.description ||
                                "—"}
                            </div>

                            <div className="text-[10px] text-gray-400 mt-1">
                              {linea.sku
                                ? `SKU: ${linea.sku}`
                                : ""}

                              {linea.sku &&
                              linea.code
                                ? " · "
                                : ""}

                              {linea.code
                                ? `UPC: ${linea.code}`
                                : ""}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t text-xs">
                          <div>
                            <div className="text-gray-400">
                              Cantidad
                            </div>

                            <div className="font-semibold">
                              {
                                linea.qty
                              }
                            </div>
                          </div>

                          <div>
                            <div className="text-gray-400">
                              Precio
                            </div>

                            <div className="font-semibold">
                              {peso(
                                linea.unitPrice
                              )}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-gray-400">
                              Importe
                            </div>

                            <div className="font-bold">
                              {peso(
                                Number(
                                  linea.unitPrice ||
                                    0
                                ) *
                                  Number(
                                    linea.qty ||
                                      0
                                  )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}

              <div className="space-y-2 border-t pt-3">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">
                    Subtotal
                    productos
                  </span>

                  <span className="font-semibold">
                    {peso(
                      subtotalProductosCarrito
                    )}
                  </span>
                </div>

                {microfibras >
                  0 && (
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-500">
                      {microfibras} ×
                      Microfibra
                    </span>

                    <span className="font-semibold">
                      {peso(
                        microfibras *
                          PRECIO_MICRO
                      )}
                    </span>
                  </div>
                )}

                {esponjas > 0 && (
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-500">
                      {esponjas} ×
                      Esponja
                    </span>

                    <span className="font-semibold">
                      {peso(
                        esponjas *
                          PRECIO_ESPONJA
                      )}
                    </span>
                  </div>
                )}

                {microfibrasGrandes >
                  0 && (
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-500">
                      {microfibrasGrandes} ×
                      Microfibra grande 55×90
                    </span>

                    <span className="font-semibold">
                      {peso(
                        microfibrasGrandes *
                          PRECIO_MICRO_GRANDE
                      )}
                    </span>
                  </div>
                )}

                {cubetas > 0 && (
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-500">
                      {cubetas} ×
                      Cubeta 19 L con tapa
                    </span>

                    <span className="font-semibold">
                      {peso(
                        cubetas *
                          PRECIO_CUBETA
                      )}
                    </span>
                  </div>
                )}

                {atomizadores > 0 && (
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-500">
                      {atomizadores} ×
                      Atomizador
                    </span>

                    <span className="font-semibold">
                      {peso(
                        atomizadores *
                          PRECIO_ATOMIZADOR
                      )}
                    </span>
                  </div>
                )}

                <div className="flex justify-between gap-3 border-t pt-3">
                  <span className="font-semibold">
                    Total interno
                  </span>

                  <span className="font-bold text-xl">
                    {peso(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4 space-y-3">
              <div className="font-semibold">
                Accesorios
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto_5.5rem] items-center gap-3">
                <span className="leading-tight">
                  Microfibras
                </span>

                <Qty
                  value={
                    microfibras
                  }
                  onChange={
                    setMicrofibras
                  }
                  min={0}
                />

                <span className="text-right whitespace-nowrap">
                  {peso(
                    microfibras *
                      PRECIO_MICRO
                  )}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto_5.5rem] items-center gap-3">
                <span className="leading-tight">
                  Esponjas
                </span>

                <Qty
                  value={
                    esponjas
                  }
                  onChange={
                    setEsponjas
                  }
                  min={0}
                />

                <span className="text-right whitespace-nowrap">
                  {peso(
                    esponjas *
                      PRECIO_ESPONJA
                  )}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto_5.5rem] items-center gap-3">
                <span className="leading-tight">
                  Microfibras grandes 55×90
                </span>

                <Qty
                  value={
                    microfibrasGrandes
                  }
                  onChange={
                    setMicrofibrasGrandes
                  }
                  min={0}
                />

                <span className="text-right whitespace-nowrap">
                  {peso(
                    microfibrasGrandes *
                      PRECIO_MICRO_GRANDE
                  )}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto_5.5rem] items-center gap-3">
                <span className="leading-tight">
                  Cubetas 19 L con tapa
                </span>

                <Qty
                  value={
                    cubetas
                  }
                  onChange={
                    setCubetas
                  }
                  min={0}
                />

                <span className="text-right whitespace-nowrap">
                  {peso(
                    cubetas *
                      PRECIO_CUBETA
                  )}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto_5.5rem] items-center gap-3">
                <span className="leading-tight">
                  Atomizadores
                </span>

                <Qty
                  value={
                    atomizadores
                  }
                  onChange={
                    setAtomizadores
                  }
                  min={0}
                />

                <span className="text-right whitespace-nowrap">
                  {peso(
                    atomizadores *
                      PRECIO_ATOMIZADOR
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-semibold">
                    Plataformas
                  </h4>

                  <p className="text-xs text-gray-500">
                    Solo se cargan
                    las plataformas
                    de los productos
                    agregados.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const cargadas =
                        cargarPlataformasCarrito();

                      if (
                        !cargadas
                      ) {
                        alert(
                          "Los productos agregados no tienen plataformas guardadas."
                        );
                      }
                    }}
                    className="rounded-lg border border-green-300 bg-green-50 text-green-700 px-3 py-2 text-xs font-medium hover:bg-green-100"
                  >
                    Actualizar
                  </button>

                  <button
                    type="button"
                    onClick={
                      agregarPlataformaMensaje
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700"
                  >
                    <span className="text-lg leading-none">
                      +
                    </span>

                    Plataforma
                  </button>
                </div>
              </div>

              {plataformasMensaje.length ===
              0 ? (
                <div className="rounded-2xl border border-dashed bg-gray-50 p-5 text-center">
                  <div className="text-sm font-medium text-gray-600">
                    Sin plataformas
                  </div>

                  <div className="text-xs text-gray-400 mt-1">
                    Los productos del
                    carrito no tienen
                    plataformas
                    guardadas. Puedes
                    agregar una
                    manualmente.
                  </div>
                </div>
              ) : (
                plataformasMensaje.map(
                  (
                    plataforma,
                    index
                  ) => {
                    const opcionesFijas =
                      PLATAFORMAS_SUGERIDAS.filter(
                        (nombre) =>
                          nombre !==
                          "Otra"
                      );

                    const esFija =
                      opcionesFijas.includes(
                        plataforma.nombre
                      );

                    const valorSelect =
                      esFija
                        ? plataforma.nombre
                        : "Otra";

                    return (
                      <div
                        key={
                          plataforma.id
                        }
                        className="rounded-2xl border bg-gray-50 p-4 space-y-3"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-7 h-7 rounded-full bg-white border grid place-content-center text-xs font-bold mt-1 shrink-0">
                            {index +
                              1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <select
                              value={
                                valorSelect
                              }
                              onChange={(
                                event
                              ) => {
                                const seleccion =
                                  event
                                    .target
                                    .value;

                                actualizarPlataformaMensaje(
                                  plataforma.id,
                                  {
                                    nombre:
                                      seleccion ===
                                      "Otra"
                                        ? ""
                                        : seleccion,
                                  }
                                );
                              }}
                              className="w-full border rounded-lg px-3 py-2 bg-white font-semibold"
                            >
                              {PLATAFORMAS_SUGERIDAS.map(
                                (
                                  nombrePlataforma
                                ) => (
                                  <option
                                    key={
                                      nombrePlataforma
                                    }
                                    value={
                                      nombrePlataforma
                                    }
                                  >
                                    {
                                      nombrePlataforma
                                    }
                                  </option>
                                )
                              )}
                            </select>

                            {valorSelect ===
                              "Otra" && (
                              <input
                                type="text"
                                value={
                                  plataforma.nombre ||
                                  ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  actualizarPlataformaMensaje(
                                    plataforma.id,
                                    {
                                      nombre:
                                        event
                                          .target
                                          .value,
                                    }
                                  )
                                }
                                placeholder="Escribe el nombre de la plataforma"
                                className="mt-2 w-full border rounded-lg px-3 py-2 bg-white"
                              />
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              eliminarPlataformaMensaje(
                                plataforma.id
                              )
                            }
                            className="w-9 h-9 rounded-lg text-red-600 hover:bg-red-50 grid place-content-center text-xl shrink-0"
                            aria-label="Eliminar plataforma"
                          >
                            ×
                          </button>
                        </div>

                        <label className="block">
                          <span className="text-xs font-medium">
                            Link
                          </span>

                          <input
                            type="url"
                            value={
                              plataforma.link ||
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              actualizarPlataformaMensaje(
                                plataforma.id,
                                {
                                  link: event
                                    .target
                                    .value,
                                }
                              )
                            }
                            placeholder="https://..."
                            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                          />
                        </label>

                        <label className="block">
                          <span className="text-xs font-medium">
                            Estado
                          </span>

                          <select
                            value={
                              plataforma.estado ||
                              "Pendiente"
                            }
                            onChange={(
                              event
                            ) =>
                              actualizarPlataformaMensaje(
                                plataforma.id,
                                {
                                  estado:
                                    event
                                      .target
                                      .value,
                                }
                              )
                            }
                            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
                          >
                            <option value="Pendiente">
                              Pendiente
                            </option>

                            <option value="En proceso">
                              En proceso
                            </option>

                            <option value="Publicado">
                              Publicado
                            </option>

                            <option value="En revisión">
                              En revisión
                            </option>

                            <option value="Pausado">
                              Pausado
                            </option>

                            <option value="Sin stock">
                              Sin stock
                            </option>

                            <option value="Revisar">
                              Revisar
                            </option>
                          </select>
                        </label>

                        <label className="block">
                          <span className="text-xs font-medium">
                            Notas
                          </span>

                          <textarea
                            value={
                              plataforma.notas ||
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              actualizarPlataformaMensaje(
                                plataforma.id,
                                {
                                  notas:
                                    event
                                      .target
                                      .value,
                                }
                              )
                            }
                            rows={3}
                            placeholder="Notas para el grupo..."
                            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white resize-none"
                          />
                        </label>
                      </div>
                    );
                  }
                )
              )}
            </div>
          </div>

          <div className="shrink-0 border-t bg-white p-4">
            <button
              type="button"
              onClick={
                copiarMensajePublicacionML
              }
              disabled={
                !cart.length &&
                microfibras ===
                  0 &&
                esponjas === 0 &&
                microfibrasGrandes ===
                  0 &&
                cubetas === 0 &&
                atomizadores === 0
              }
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                cart.length ||
                microfibras > 0 ||
                esponjas > 0 ||
                microfibrasGrandes > 0 ||
                cubetas > 0 ||
                atomizadores > 0
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <i className="fab fa-whatsapp mr-2" />

              Copiar mensaje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * Precios de un producto según el tipo de precio.
 * Los usan la tabla de escritorio y las vistas de celular.
 */
function calcularPreciosProducto(p, tipoPrecio) {
  const unitOnly = isUnitOnly(p);
  const litros = getLitros(p);
  const brand = getBrand(p);

  const unitPriceCosto = unitOnly
    ? undefined
    : p.unitPrice;

  const packPriceCosto = p.price;

  const unitPrice = unitPriceCosto
    ? precioPublico(
        unitPriceCosto,
        p,
        tipoPrecio
      )
    : undefined;

  const packPrice = packPriceCosto
    ? precioPublico(
        packPriceCosto,
        p,
        tipoPrecio
      )
    : undefined;

  const pricePerLtInfo =
    unitPrice ??
    (packPrice && litros
      ? packPrice / litros
      : undefined);

  const esPrecioDirecto = [
    "zach chemical",
    "aqua zach",
    "zach food",
    "magno clean",
    ...MARCAS_PRECIO_FIJO,
  ].includes(
    String(brand || "")
      .trim()
      .toLowerCase()
  );

  return {
    unitOnly,
    brand,
    unitPrice,
    packPrice,
    pricePerLtInfo,
    hasUnit: !!unitPrice,
    hasPack: !!packPrice,
    esPrecioDirecto,
  };
}

function FilaProducto({ p, onAdd, tipoPrecio }) {
  const {
    unitOnly,
    brand,
    unitPrice,
    packPrice,
    pricePerLtInfo,
    hasUnit,
    hasPack,
    esPrecioDirecto,
  } = calcularPreciosProducto(p, tipoPrecio);

  const [mode, setMode] = useState(
    unitOnly ? "pack" : "unit"
  );

  const [qty, setQty] = useState(1);

  const disabled =
    (mode === "unit" && !hasUnit) ||
    (mode === "pack" && !hasPack);

  return (
    <tr className="border-t align-top">
      <td className="p-3">
        <div className="flex items-center gap-3">
          {p.image ? (
            <img
              src={p.image}
              alt={p.product}
              className="w-12 h-12 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-12 rounded bg-gray-100 grid place-content-center text-[10px] text-gray-500">
              Sin foto
            </div>
          )}

          <div>
            <div className="font-semibold leading-tight">
              {p.product}
            </div>

            <div className="text-[11px] text-gray-500">
              {brand}

              {p.sku && (
                <> · SKU: {p.sku}</>
              )}

              {p.code && (
                <> · UPC: {p.code}</>
              )}

              <>
                {" "}
                ·{" "}
                {getUnidadLabel(
                  getUnidadMedida(p)
                )}
              </>
            </div>
          </div>
        </div>
      </td>

      <td className="p-3">
        <div className="text-sm">
          {p.description ||
            p.unitDescription ||
            p.name ||
            "—"}
        </div>

        {p.link && (
          <a
            className="text-xs text-red-600 hover:underline"
            href={p.link.replace(
              "comercializadoradtpu",
              "comercializadoradtup"
            )}
            target="_blank"
            rel="noreferrer"
          >
            Ver detalle / ficha
          </a>
        )}
      </td>

      <td className="p-3 whitespace-nowrap">
        {esPrecioDirecto ? (
          <>
            <div className="text-xs text-gray-500">
              {getTipoPrecioLabel(tipoPrecio)}
            </div>

            <div className="font-medium">
              {peso(packPrice)}
            </div>
          </>
        ) : unitOnly ? (
          <>
            <div className="text-xs text-gray-500">
              Precio por litro
            </div>

            <div className="font-medium">
              {pricePerLtInfo
                ? peso(pricePerLtInfo)
                : "—"}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Envase completo
            </div>

            <div className="font-medium">
              {hasPack
                ? peso(packPrice)
                : "—"}
            </div>
          </>
        ) : (
          <>
            <div className="text-xs text-gray-500">
              Pieza/Litro
            </div>

            <div className="font-medium">
              {hasUnit
                ? peso(unitPrice)
                : "—"}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Caja/Paquete
            </div>

            <div className="font-medium">
              {hasPack
                ? peso(packPrice)
                : "—"}
            </div>
          </>
        )}
      </td>

      <td className="p-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="border rounded-lg px-2 py-1 text-sm"
            value={mode}
            onChange={(e) =>
              setMode(e.target.value)
            }
          >
            <option
              value="unit"
              disabled={!hasUnit}
            >
              Pieza/Litro{" "}
              {hasUnit
                ? `(${peso(unitPrice)})`
                : "(—)"}
            </option>

            <option
              value="pack"
              disabled={!hasPack}
            >
              {unitOnly
                ? "Envase completo"
                : "Caja/Paquete"}{" "}
              {hasPack
                ? `(${peso(packPrice)})`
                : "(—)"}
            </option>
          </select>

          <Qty
            value={qty}
            onChange={setQty}
          />

          <button
            type="button"
            className={`inline-flex items-center justify-center px-3 py-2 rounded-xl text-white whitespace-nowrap ${
              disabled
                ? "bg-gray-300"
                : "bg-[#FF1419] hover:opacity-90"
            }`}
            disabled={disabled}
            onClick={() =>
              onAdd(
                { ...p },
                mode,
                qty
              )
            }
          >
            Agregar
          </button>
        </div>
      </td>
    </tr>
  );
}

/* =========================
   LISTA EN CELULAR
   Tres vistas para pantallas chicas: Tarjetas, Lista y Cuadrícula.
   En escritorio se sigue usando la tabla (FilaProducto).
========================= */

const VISTAS_LISTA_MOVIL = [
  { id: "tarjetas", label: "Tarjetas", icon: "fa-grip-lines" },
  { id: "lista", label: "Lista", icon: "fa-list" },
  { id: "cuadricula", label: "Cuadrícula", icon: "fa-table-cells-large" },
];

const VISTA_LISTA_MOVIL_KEY = "cotizador_vista_lista_movil";

function useEsPantallaChica() {
  const [chica, setChica] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(MEDIA_PANTALLA_CHICA).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(MEDIA_PANTALLA_CHICA);
    const onChange = () => setChica(mq.matches);

    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return chica;
}

function cargarVistaListaMovil() {
  try {
    const guardada = localStorage.getItem(VISTA_LISTA_MOVIL_KEY);

    if (VISTAS_LISTA_MOVIL.some((v) => v.id === guardada)) {
      return guardada;
    }
  } catch {
    // Sin acceso a localStorage: se usa la vista por defecto.
  }

  return "tarjetas";
}

function getLinkFicha(p) {
  return p.link
    ? p.link.replace("comercializadoradtpu", "comercializadoradtup")
    : "";
}

function getDescripcionProducto(p) {
  return p.description || p.unitDescription || p.name || "";
}

function getModoInicial(precios) {
  if (precios.unitOnly || !precios.hasUnit) return "pack";
  return "unit";
}

function getPrecioModo(precios, mode) {
  return mode === "unit" ? precios.unitPrice : precios.packPrice;
}

/*
 * Nombre corto de cada presentación, como en la tabla.
 */
function getEtiquetaModo(precios, mode, tipoPrecio) {
  if (mode === "unit") return "Pieza/Litro";
  if (precios.esPrecioDirecto) return getTipoPrecioLabel(tipoPrecio);
  return precios.unitOnly ? "Envase completo" : "Caja/Paquete";
}

/*
 * Muestra "Agregado" un momento después de tocar Agregar,
 * porque en el celular el carrito queda fuera de la pantalla.
 */
function useAvisoAgregado() {
  const [agregado, setAgregado] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function marcar() {
    setAgregado(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAgregado(false), 1200);
  }

  return [agregado, marcar];
}

function FotoProductoMovil({ p, className = "" }) {
  if (!p.image) {
    return (
      <div
        className={`rounded-lg bg-gray-100 grid place-content-center text-[10px] text-gray-500 shrink-0 ${className}`}
      >
        Sin foto
      </div>
    );
  }

  return (
    <img
      src={p.image}
      alt={p.product}
      loading="lazy"
      decoding="async"
      className={`rounded-lg bg-white object-contain shrink-0 ${className}`}
    />
  );
}

/*
 * Botones Pieza / Caja con su precio. Si el producto solo
 * tiene una presentación, muestra ese precio sin botones.
 */
function SelectorPresentacionMovil({
  precios,
  mode,
  setMode,
  tipoPrecio,
  compacto = false,
}) {
  if (precios.hasUnit && precios.hasPack) {
    // En la cuadrícula no caben dos botones lado a lado: van uno sobre otro.
    if (compacto) {
      return (
        <div className="grid gap-1">
          {["unit", "pack"].map((m) => {
            const activo = mode === m;

            return (
              <button
                key={m}
                type="button"
                aria-pressed={activo}
                onClick={() => setMode(m)}
                className={`flex items-baseline justify-between gap-1 rounded-lg border-2 px-2 py-0.5 transition ${
                  activo
                    ? "border-[#FF1419] bg-red-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className="text-[11px] text-gray-500">
                  {m === "unit" ? "Pieza" : "Caja"}
                </span>

                <span className="text-xs font-semibold tabular-nums">
                  {peso(getPrecioModo(precios, m))}
                </span>
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-1.5">
        {["unit", "pack"].map((m) => {
          const activo = mode === m;

          return (
            <button
              key={m}
              type="button"
              aria-pressed={activo}
              onClick={() => setMode(m)}
              className={`min-w-0 text-left rounded-xl border-2 px-3 py-1.5 transition ${
                activo
                  ? "border-[#FF1419] bg-red-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className="block text-[11px] text-gray-500 truncate">
                {getEtiquetaModo(precios, m, tipoPrecio)}
              </span>

              <span className="block text-sm font-semibold tabular-nums truncate">
                {peso(getPrecioModo(precios, m))}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  const modoUnico = precios.hasPack ? "pack" : "unit";

  return (
    <div className="min-w-0">
      <div className="text-[11px] text-gray-500">
        {getEtiquetaModo(precios, modoUnico, tipoPrecio)}
      </div>

      <div
        className={`font-semibold tabular-nums ${
          compacto ? "text-sm" : "text-base"
        }`}
      >
        {precios.hasPack || precios.hasUnit
          ? peso(getPrecioModo(precios, modoUnico))
          : "—"}
      </div>

      {precios.unitOnly &&
        !precios.esPrecioDirecto &&
        precios.pricePerLtInfo && (
          <div className="text-[11px] text-gray-500 tabular-nums">
            {peso(precios.pricePerLtInfo)} por litro
          </div>
        )}
    </div>
  );
}

function BotonAgregarMovil({
  disabled,
  agregado,
  onClick,
  children,
  className = "",
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold text-white whitespace-nowrap transition active:scale-[0.98] ${
        disabled
          ? "bg-gray-300"
          : agregado
            ? "bg-green-600"
            : "bg-[#FF1419] hover:opacity-90"
      } ${className}`}
    >
      {agregado ? (
        <>
          <i className="fas fa-check" /> Agregado
        </>
      ) : (
        children
      )}
    </button>
  );
}

/* ---------- Vista A: Tarjetas ---------- */

function TarjetaProductoMovil({ p, onAdd, tipoPrecio }) {
  const precios = calcularPreciosProducto(p, tipoPrecio);
  const [mode, setMode] = useState(() => getModoInicial(precios));
  const [qty, setQty] = useState(1);
  const [agregado, marcarAgregado] = useAvisoAgregado();
  const precio = getPrecioModo(precios, mode);
  const link = getLinkFicha(p);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 space-y-3">
      <div className="flex gap-3">
        <FotoProductoMovil p={p} className="w-16 h-16" />

        <div className="min-w-0 flex-1">
          <div className="font-semibold leading-tight">{p.product}</div>

          <div className="text-sm text-gray-700 leading-snug">
            {getDescripcionProducto(p) || "—"}
          </div>

          <div className="text-[11px] text-gray-500 truncate">
            {precios.brand}
            {p.sku && <> · SKU {p.sku}</>}
          </div>

          {link && (
            <a
              className="text-xs text-red-600"
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              Ver ficha
            </a>
          )}
        </div>
      </div>

      <SelectorPresentacionMovil
        precios={precios}
        mode={mode}
        setMode={setMode}
        tipoPrecio={tipoPrecio}
      />

      <div className="flex items-center gap-2">
        <Qty value={qty} onChange={setQty} />

        <BotonAgregarMovil
          disabled={!precio}
          agregado={agregado}
          className="flex-1 min-w-0 h-10 px-3 text-sm"
          onClick={() => {
            onAdd({ ...p }, mode, qty);
            setQty(1);
            marcarAgregado();
          }}
        >
          Agregar {precio ? peso(precio * qty) : ""}
        </BotonAgregarMovil>
      </div>
    </div>
  );
}

/* ---------- Vista B: Lista rápida ---------- */

function RenglonProductoMovil({
  p,
  onAdd,
  tipoPrecio,
  enCarrito,
  onAbrir,
}) {
  const precios = calcularPreciosProducto(p, tipoPrecio);
  const mode = getModoInicial(precios);
  const precio = getPrecioModo(precios, mode);
  const [agregado, marcarAgregado] = useAvisoAgregado();
  // Suma pieza y caja: desde el panel se puede agregar cualquiera de las dos.
  const cantidad = enCarrito(p, "unit") + enCarrito(p, "pack");

  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <button
        type="button"
        onClick={() => onAbrir(p)}
        className="flex items-center gap-3 min-w-0 flex-1 text-left"
      >
        <FotoProductoMovil p={p} className="w-12 h-12" />

        <span className="min-w-0 flex-1">
          <span className="block font-semibold leading-tight break-words">
            {p.product}
          </span>

          <span className="block text-xs text-gray-600 truncate">
            {getDescripcionProducto(p) || "—"}
          </span>

          <span className="flex flex-wrap items-baseline gap-x-2 tabular-nums">
            <span className="whitespace-nowrap text-sm font-semibold">
              {precio ? peso(precio) : "—"}
            </span>

            <span className="min-w-0 text-[11px] text-gray-500">
              {getEtiquetaModo(precios, mode, tipoPrecio)}
            </span>

            {precios.hasUnit && precios.hasPack && (
              <span className="whitespace-nowrap text-[11px] text-gray-500">
                Caja {peso(precios.packPrice)}
              </span>
            )}
          </span>
        </span>
      </button>

      {cantidad > 0 && (
        <span
          className="min-w-8 h-8 px-2 rounded-full bg-red-50 text-[#FF1419] text-sm font-bold grid place-content-center tabular-nums"
          aria-label={`${cantidad} en el carrito`}
        >
          {cantidad}
        </span>
      )}

      <button
        type="button"
        disabled={!precio}
        aria-label={`Agregar 1 ${p.product}`}
        onClick={() => {
          onAdd({ ...p }, mode, 1);
          marcarAgregado();
        }}
        className={`w-10 h-10 shrink-0 rounded-full text-white text-xl grid place-content-center transition active:scale-95 ${
          !precio
            ? "bg-gray-300"
            : agregado
              ? "bg-green-600"
              : "bg-[#FF1419]"
        }`}
      >
        <i className={`fas ${agregado ? "fa-check" : "fa-plus"} text-base`} />
      </button>
    </div>
  );
}

/*
 * Panel que sube desde abajo al tocar un renglón de la Lista:
 * ahí se elige Pieza o Caja y la cantidad.
 */
function HojaProductoMovil({ p, onAdd, tipoPrecio, onCerrar }) {
  const precios = calcularPreciosProducto(p, tipoPrecio);
  const [mode, setMode] = useState(() => getModoInicial(precios));
  const [qty, setQty] = useState(1);
  const precio = getPrecioModo(precios, mode);
  const link = getLinkFicha(p);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onCerrar();
    }

    // Mientras el panel está abierto, la lista de atrás no se mueve.
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflowAnterior;
    };
  }, [onCerrar]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end lg:hidden"
      onClick={onCerrar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={p.product}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-white rounded-t-3xl p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] space-y-4 max-h-[85dvh] overflow-y-auto overscroll-contain"
      >
        <div className="flex gap-3">
          <FotoProductoMovil p={p} className="w-20 h-20" />

          <div className="min-w-0 flex-1">
            <div className="font-semibold leading-tight">{p.product}</div>

            <div className="text-sm text-gray-700">
              {getDescripcionProducto(p) || "—"}
            </div>

            <div className="text-[11px] text-gray-500">
              {precios.brand}
              {p.sku && <> · SKU {p.sku}</>}
              {p.code && <> · UPC {p.code}</>}
            </div>

            {link && (
              <a
                className="text-xs text-red-600"
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                Ver ficha
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="w-9 h-9 shrink-0 rounded-full bg-gray-100 text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <SelectorPresentacionMovil
          precios={precios}
          mode={mode}
          setMode={setMode}
          tipoPrecio={tipoPrecio}
        />

        <div className="flex items-center gap-2">
          <Qty value={qty} onChange={setQty} />

          <button
            type="button"
            disabled={!precio}
            onClick={() => {
              onAdd({ ...p }, mode, qty);
              onCerrar();
            }}
            className={`flex-1 min-w-0 h-11 rounded-xl text-white font-semibold whitespace-nowrap ${
              precio ? "bg-[#FF1419]" : "bg-gray-300"
            }`}
          >
            Agregar {precio ? peso(precio * qty) : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Vista C: Cuadrícula ---------- */

function CeldaProductoMovil({
  p,
  onAdd,
  tipoPrecio,
  enCarrito,
  lineKeyFor,
  decLine,
}) {
  const precios = calcularPreciosProducto(p, tipoPrecio);
  const [mode, setMode] = useState(() => getModoInicial(precios));
  const precio = getPrecioModo(precios, mode);
  const cantidad = enCarrito(p, mode);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex flex-col gap-2 min-w-0">
      <FotoProductoMovil p={p} className="w-full aspect-square" />

      <div className="min-w-0">
        <div className="text-sm font-semibold leading-tight break-words">
          {p.product}
        </div>

        <div className="text-xs text-gray-600 leading-snug line-clamp-2">
          {getDescripcionProducto(p) || "—"}
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <SelectorPresentacionMovil
          precios={precios}
          mode={mode}
          setMode={setMode}
          tipoPrecio={tipoPrecio}
          compacto
        />

        {cantidad > 0 ? (
          <div className="flex items-center justify-between rounded-xl border-2 border-[#FF1419] overflow-hidden">
            <button
              type="button"
              aria-label="Quitar 1"
              onClick={() => decLine(lineKeyFor(p, mode))}
              className="w-9 h-8 text-[#FF1419] text-lg"
            >
              −
            </button>

            <span className="text-sm font-bold tabular-nums">
              {cantidad}
            </span>

            <button
              type="button"
              aria-label="Agregar 1"
              onClick={() => onAdd({ ...p }, mode, 1)}
              className="w-9 h-8 text-[#FF1419] text-lg"
            >
              +
            </button>
          </div>
        ) : (
          <BotonAgregarMovil
            disabled={!precio}
            agregado={false}
            className="w-full h-9 text-sm"
            onClick={() => onAdd({ ...p }, mode, 1)}
          >
            Agregar
          </BotonAgregarMovil>
        )}
      </div>
    </div>
  );
}

function ListaProductosMovil({
  filtered,
  tipoPrecio,
  add,
  cart,
  lineKeyFor,
  decLine,
}) {
  const [vista, setVista] = useState(cargarVistaListaMovil);
  const [productoAbierto, setProductoAbierto] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(VISTA_LISTA_MOVIL_KEY, vista);
    } catch {
      // Sin acceso a localStorage: la vista no se recuerda.
    }
  }, [vista]);

  const cantidadesCarrito = useMemo(() => {
    const mapa = new Map();

    cart.forEach((linea) => {
      mapa.set(
        linea.key,
        (mapa.get(linea.key) || 0) + Number(linea.qty || 0)
      );
    });

    return mapa;
  }, [cart]);

  const enCarrito = (p, mode) =>
    cantidadesCarrito.get(lineKeyFor(p, mode)) || 0;

  const cerrarHoja = useCallback(() => setProductoAbierto(null), []);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs text-gray-500 tabular-nums">
          {filtered.length}{" "}
          {filtered.length === 1 ? "producto" : "productos"}
        </div>

        <div
          className="flex rounded-xl bg-white border border-gray-200 p-0.5"
          role="radiogroup"
          aria-label="Forma de ver la lista"
        >
          {VISTAS_LISTA_MOVIL.map((v) => (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={vista === v.id}
              onClick={() => setVista(v.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition ${
                vista === v.id
                  ? "bg-[#FF1419] text-white"
                  : "text-gray-600"
              }`}
            >
              <i className={`fas ${v.icon}`} />
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-4 text-gray-500">
          Sin resultados.
        </div>
      ) : vista === "lista" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y">
          {filtered.map((p) => (
            <RenglonProductoMovil
              key={getProductKey(p)}
              p={p}
              onAdd={add}
              tipoPrecio={tipoPrecio}
              enCarrito={enCarrito}
              onAbrir={setProductoAbierto}
            />
          ))}
        </div>
      ) : vista === "cuadricula" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filtered.map((p) => (
            <CeldaProductoMovil
              key={getProductKey(p)}
              p={p}
              onAdd={add}
              tipoPrecio={tipoPrecio}
              enCarrito={enCarrito}
              lineKeyFor={lineKeyFor}
              decLine={decLine}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => (
            <TarjetaProductoMovil
              key={getProductKey(p)}
              p={p}
              onAdd={add}
              tipoPrecio={tipoPrecio}
            />
          ))}
        </div>
      )}

      {vista === "lista" && productoAbierto && (
        <HojaProductoMovil
          key={getProductKey(productoAbierto)}
          p={productoAbierto}
          onAdd={add}
          tipoPrecio={tipoPrecio}
          onCerrar={cerrarHoja}
        />
      )}
    </div>
  );
}

/*
 * Barra fija abajo en el celular con el total del carrito.
 * Al tocarla se abre el carrito. Hace un pequeño salto cuando
 * se agrega algo, para que se note sin ver el carrito.
 */
function BarraCarritoMovil({ cantidad, total, onAbrir }) {
  const [salto, setSalto] = useState(false);
  const cantidadAnteriorRef = useRef(cantidad);

  useEffect(() => {
    const aumento = cantidad > cantidadAnteriorRef.current;
    cantidadAnteriorRef.current = cantidad;

    if (!aumento) {
      setSalto(false);
      return;
    }

    setSalto(true);
    const t = setTimeout(() => setSalto(false), 180);
    return () => clearTimeout(t);
  }, [cantidad]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pointer-events-none">
      <button
        type="button"
        onClick={onAbrir}
        className={`pointer-events-auto w-full flex items-center justify-between gap-3 rounded-2xl bg-gray-900 text-white px-4 py-3 shadow-2xl transition-transform duration-150 motion-reduce:transition-none ${
          salto ? "scale-[1.03]" : "scale-100"
        }`}
      >
        <span className="flex items-center gap-2 min-w-0">
          <i className="fas fa-shopping-cart" />

          {cantidad > 0 ? (
            <>
              <span className="truncate text-sm text-gray-300">
                {cantidad} {cantidad === 1 ? "artículo" : "artículos"}
              </span>

              <span className="shrink-0 whitespace-nowrap font-semibold tabular-nums">
                {peso(total)}
              </span>
            </>
          ) : (
            <span className="truncate">Carrito vacío</span>
          )}
        </span>

        <span className="shrink-0 rounded-lg bg-[#FF1419] px-3 py-1 text-sm font-semibold">
          Ver carrito
        </span>
      </button>
    </div>
  );
}

/*
 * Mientras el carrito del celular está abierto: bloquea el scroll de
 * la lista de atrás, cierra con Atrás del teléfono o Escape (primero
 * la ventana de confirmación si hay una) y lleva el foco al panel.
 * Regresa false los primeros 350 ms tras abrir, para que un doble
 * toque en "Ver carrito" no caiga en el botón de cotización PDF.
 */
function usePanelCarritoMovil({
  abierto,
  setAbierto,
  cerrar,
  hayDialogo,
  cerrarDialogos,
  enfocarRef,
}) {
  const [listo, setListo] = useState(false);
  const ultimoRef = useRef({});
  ultimoRef.current = { setAbierto, cerrar, hayDialogo, cerrarDialogos };

  useEffect(() => {
    if (!abierto) {
      setListo(false);
      return;
    }

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // El foco va al panel cuando termina de subir (antes aún no es visible).
    const timer = setTimeout(() => {
      setListo(true);
      enfocarRef.current?.focus({ preventScroll: true });
    }, 350);

    function onPopState() {
      const u = ultimoRef.current;

      if (u.hayDialogo) {
        // Atrás cierra la ventana de confirmación y deja el carrito.
        u.cerrarDialogos();
        window.history.pushState({ carritoMovil: true }, "");
        return;
      }

      u.setAbierto(false);
    }

    function onKey(e) {
      if (e.key !== "Escape") return;

      const u = ultimoRef.current;
      if (u.hayDialogo) u.cerrarDialogos();
      else u.cerrar();
    }

    window.addEventListener("popstate", onPopState);
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("keydown", onKey);
    };
  }, [abierto, enfocarRef]);

  return listo;
}

/*
 * Una línea del carrito: nombre, presentación, cantidad y total.
 */
function LineaCarrito({ linea: l, decLine, incLine, updateLineQty, removeLine }) {
  return (
    <li className="flex gap-3 p-3">
      {l.image ? (
        <img
          src={l.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-12 h-12 shrink-0 rounded-lg bg-white object-contain"
        />
      ) : null}

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-medium leading-tight break-words">
              {l.product}
            </div>

            <div className="text-[11px] leading-tight text-gray-500">
              {l.description || "—"}
            </div>

            <div className="text-[11px] leading-tight text-gray-500">
              {l.brand} · {getTipoPrecioLabel(l.tipoPrecio)} ·{" "}
              {l.mode === "unit" ? "Pieza/Litro" : "Caja/Paquete"}
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 -mt-1 -mr-1 min-h-10 rounded-lg px-3 text-xs text-red-600 hover:bg-red-50 active:bg-red-50"
            onClick={() => removeLine(l.key)}
          >
            Quitar
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Quitar 1"
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-200 grid place-content-center text-lg"
              onClick={() => decLine(l.key)}
            >
              −
            </button>

            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={l.qty}
              aria-label={`Cantidad de ${l.product}`}
              onChange={(e) => {
                const nextQty = parseInt(e.target.value, 10);

                if (nextQty === 0) {
                  removeLine(l.key);
                  return;
                }

                if (Number.isNaN(nextQty) || nextQty < 1) {
                  updateLineQty(l.key, 1);
                  return;
                }

                updateLineQty(l.key, nextQty);
              }}
              className="w-12 h-9 text-center border rounded-lg text-sm"
            />

            <button
              type="button"
              aria-label="Agregar 1"
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-200 grid place-content-center text-lg"
              onClick={() => incLine(l.key)}
            >
              +
            </button>
          </div>

          <div className="ml-auto text-right">
            <div className="text-[11px] text-gray-500 tabular-nums whitespace-nowrap">
              {peso(l.unitPrice)} c/u
            </div>

            <div className="font-semibold tabular-nums whitespace-nowrap">
              {peso(l.unitPrice * l.qty)}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
