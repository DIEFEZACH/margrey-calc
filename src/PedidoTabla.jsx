// src/PedidoMargrey.jsx
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/** =======================
 *  Base de productos
 *  ======================= */
const products = [
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
  { product: "PLASTI-MAGIC", code: "7501716108378", sku: "0423-01-247", description: "CAJA 12 PIEZAS 100 GR", unitDescription: "PIEZA INDIVIDUAL 100 GR", price: 696.00, unitPrice: 58.00, link:"https://www.comercializadoradtup.com/products/plasti-magic-margrey-100g-lubricante-60ml?_pos=1&_psq=plasti&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/plasti_magic_100_tcrgcx.jpg"},
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
  { product: "QUITA GOMA", code: "7501716108811", sku: "0506-01-254", description: "CAJA 12 PIEZAS 130 ML", unitDescription: "PIEZA INDIVIDUAL 130 ML", price: 348.00, unitPrice: 29.00, link:"https://www.comercializadoradtup.com/products/quita-goma-margrey-130-ml?_pos=1&_psq=quita+goma&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1759293096/Margrey_2025_htb5ic.jpg"},
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
  { product: "BLISTER CREMA Y REPELENTE", code: "-", sku: "1415-21-300", description: "PAQUETE 2 PIEZAS 130 ML", unitDescription: "PIEZA BLISTER DUO", price: 182.00, tag: "new", unitPrice: 45.50, link:"https://www.comercializadoradtup.com/products/shampoo-auto-bubble-wash-margrey-1-89-l?_pos=1&_psq=bubble&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1731041824/bubble_wash_bbzfb1.jpg"},
  
  { product: "DTUP", category: "DTUP", name: "dtup" },
  { product: "CLARIFICADOR", brand: "DTUP", code: "-", sku: "clarificador dtup", description: "PORRON 20 LT", price: 575.00, unitPrice: 28.75, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "FLOCULANTE", brand: "DTUP", code: "-", sku: "floculante dtup", description: "PORRON 20 LT", price: 675.00, unitPrice: 33.75, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  
  { id: "zach-rompe-grasas-1l", brand: "Zach Chemical", product: "ROMPE GRASAS", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 50.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-rompe-grasas-4l", brand: "Zach Chemical", product: "ROMPE GRASAS", category: "Zach Chemical", description: "4 LT", price: 146.00, unitPrice: 146.00, mayoreo: 146.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-rompe-grasas-20l", brand: "Zach Chemical", product: "ROMPE GRASAS", category: "Zach Chemical", description: "20 LT", price: 660.00, unitPrice: 660.00, mayoreo: 660.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-apc-orange-neutro-1l", brand: "Zach Chemical", product: "APC ORANGE NEUTRO", category: "Zach Chemical", description: "1 LT", price: 40.00, unitPrice: 40.00, mayoreo: 40.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-apc-orange-neutro-4l", brand: "Zach Chemical", product: "APC ORANGE NEUTRO", category: "Zach Chemical", description: "4 LT", price: 110.00, unitPrice: 110.00, mayoreo: 110.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-apc-orange-neutro-20l", brand: "Zach Chemical", product: "APC ORANGE NEUTRO", category: "Zach Chemical", description: "20 LT", price: 510.00, unitPrice: 510.00, mayoreo: 510.00, mostrador: 1399.00, digital: 1399.00, image: "" },
  { id: "zach-detergente-alcalino-1l", brand: "Zach Chemical", product: "DETERGENTE ALCALINO", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 50.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-detergente-alcalino-4l", brand: "Zach Chemical", product: "DETERGENTE ALCALINO", category: "Zach Chemical", description: "4 LT", price: 110.00, unitPrice: 110.00, mayoreo: 110.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-detergente-alcalino-20l", brand: "Zach Chemical", product: "DETERGENTE ALCALINO", category: "Zach Chemical", description: "20 LT", price: 510.00, unitPrice: 510.00, mayoreo: 510.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-lavagarrafones-1l", brand: "Zach Chemical", product: "LAVAGARRAFONES", category: "Zach Chemical", description: "1 LT", price: 45.00, unitPrice: 45.00, mayoreo: 45.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-lavagarrafones-4l", brand: "Zach Chemical", product: "LAVAGARRAFONES", category: "Zach Chemical", description: "4 LT", price: 123.00, unitPrice: 123.00, mayoreo: 123.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-lavagarrafones-20l", brand: "Zach Chemical", product: "LAVAGARRAFONES", category: "Zach Chemical", description: "20 LT", price: 627.00, unitPrice: 627.00, mayoreo: 627.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-solvex-n6-1l", brand: "Zach Chemical", product: "SOLVEX N6", category: "Zach Chemical", description: "1 LT", price: 43.00, unitPrice: 43.00, mayoreo: 43.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-solvex-n6-4l", brand: "Zach Chemical", product: "SOLVEX N6", category: "Zach Chemical", description: "4 LT", price: 110.00, unitPrice: 110.00, mayoreo: 110.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-solvex-n6-20l", brand: "Zach Chemical", product: "SOLVEX N6", category: "Zach Chemical", description: "20 LT", price: 520.00, unitPrice: 520.00, mayoreo: 520.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-shampoo-neutro-limpiador-1l", brand: "Zach Chemical", product: "SHAMPOO NEUTRO LIMPIADOR", category: "Zach Chemical", description: "1 LT", price: 45.00, unitPrice: 45.00, mayoreo: 45.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-shampoo-neutro-limpiador-4l", brand: "Zach Chemical", product: "SHAMPOO NEUTRO LIMPIADOR", category: "Zach Chemical", description: "4 LT", price: 123.00, unitPrice: 123.00, mayoreo: 123.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-shampoo-neutro-limpiador-20l", brand: "Zach Chemical", product: "SHAMPOO NEUTRO LIMPIADOR", category: "Zach Chemical", description: "20 LT", price: 627.00, unitPrice: 627.00, mayoreo: 627.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-rompe-manchas-organicas-1l", brand: "Zach Chemical", product: "ROMPE MANCHAS ORGANICAS", category: "Zach Chemical", description: "1 LT", price: 52.00, unitPrice: 52.00, mayoreo: 52.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-rompe-manchas-organicas-4l", brand: "Zach Chemical", product: "ROMPE MANCHAS ORGANICAS", category: "Zach Chemical", description: "4 LT", price: 163.00, unitPrice: 163.00, mayoreo: 163.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-rompe-manchas-organicas-20l", brand: "Zach Chemical", product: "ROMPE MANCHAS ORGANICAS", category: "Zach Chemical", description: "20 LT", price: 810.00, unitPrice: 810.00, mayoreo: 810.00, mostrador: 1699.00, digital: 1699.00, image: "" },
  { id: "zach-detergente-limpiador-colchones-1l", brand: "Zach Chemical", product: "DETERGENTE LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "1 LT", price: 52.00, unitPrice: 52.00, mayoreo: 52.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-detergente-limpiador-colchones-4l", brand: "Zach Chemical", product: "DETERGENTE LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "4 LT", price: 160.00, unitPrice: 160.00, mayoreo: 160.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-detergente-limpiador-colchones-20l", brand: "Zach Chemical", product: "DETERGENTE LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "20 LT", price: 810.00, unitPrice: 810.00, mayoreo: 810.00, mostrador: 1699.00, digital: 1699.00, image: "" },
  { id: "zach-vinagre-limpieza-8-1l", brand: "Zach Chemical", product: "VINAGRE DE LIMPIEZA 8%", category: "Zach Chemical", description: "1 LT", price: 34.00, unitPrice: 34.00, mayoreo: 34.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-vinagre-limpieza-8-4l", brand: "Zach Chemical", product: "VINAGRE DE LIMPIEZA 8%", category: "Zach Chemical", description: "4 LT", price: 94.00, unitPrice: 94.00, mayoreo: 94.00, mostrador: 298.00, digital: 298.00, image: "" },
  { id: "zach-vinagre-limpieza-8-20l", brand: "Zach Chemical", product: "VINAGRE DE LIMPIEZA 8%", category: "Zach Chemical", description: "20 LT", price: 450.00, unitPrice: 450.00, mayoreo: 450.00, mostrador: 1099.00, digital: 1099.00, image: "" },
  { id: "zach-titan-bio-pet-500ml", brand: "Zach Chemical", product: "TITAN BIO PET", category: "Zach Chemical", description: "500 ML", price: 75.00, unitPrice: 75.00, mayoreo: 75.00, mostrador: 299.00, digital: 299.00, image: "" },
  { id: "zach-acaro-fin-500ml", brand: "Zach Chemical", product: "ACARO FIN", category: "Zach Chemical", description: "500 ML", price: 75.00, unitPrice: 75.00, mayoreo: 75.00, mostrador: 299.00, digital: 299.00, image: "" },
  { id: "zach-black-revive-500ml", brand: "Zach Chemical", product: "BLACK REVIVE", category: "Zach Chemical", description: "500 ML", price: 65.00, unitPrice: 65.00, mayoreo: 65.00, mostrador: 299.00, digital: 299.00, image: "" },
  { id: "zach-plancha-facil-1l", brand: "Zach Chemical", product: "PLANCHA FACIL", category: "Zach Chemical", description: "1 LT", price: 37.00, unitPrice: 37.00, mayoreo: 37.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-plancha-facil-4l", brand: "Zach Chemical", product: "PLANCHA FACIL", category: "Zach Chemical", description: "4 LT", price: 100.00, unitPrice: 100.00, mayoreo: 100.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-plancha-facil-20l", brand: "Zach Chemical", product: "PLANCHA FACIL", category: "Zach Chemical", description: "20 LT", price: 510.00, unitPrice: 510.00, mayoreo: 510.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-biotechx-1l", brand: "Zach Chemical", product: "BIOTECHX", category: "Zach Chemical", description: "1 LT", price: 45.00, unitPrice: 45.00, mayoreo: 45.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-biotechx-4l", brand: "Zach Chemical", product: "BIOTECHX", category: "Zach Chemical", description: "4 LT", price: 119.00, unitPrice: 119.00, mayoreo: 119.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-biotechx-20l", brand: "Zach Chemical", product: "BIOTECHX", category: "Zach Chemical", description: "20 LT", price: 590.00, unitPrice: 590.00, mayoreo: 590.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-gel-limpiador-colchones-1l", brand: "Zach Chemical", product: "GEL LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "1 LT", price: 45.00, unitPrice: 45.00, mayoreo: 45.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-gel-limpiador-colchones-4l", brand: "Zach Chemical", product: "GEL LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "4 LT", price: 127.00, unitPrice: 127.00, mayoreo: 127.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-gel-limpiador-colchones-20l", brand: "Zach Chemical", product: "GEL LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "20 LT", price: 627.00, unitPrice: 627.00, mayoreo: 627.00, mostrador: 1599.00, digital: 1599.00, image: "" },
  { id: "zach-eliminador-olores-mascota-enzimatico-1l", brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO", category: "Zach Chemical", description: "1 LT", price: 43.00, unitPrice: 43.00, mayoreo: 43.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-eliminador-olores-mascota-enzimatico-4l", brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO", category: "Zach Chemical", description: "4 LT", price: 119.00, unitPrice: 119.00, mayoreo: 119.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-eliminador-olores-mascota-enzimatico-20l", brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO", category: "Zach Chemical", description: "20 LT", price: 590.00, unitPrice: 590.00, mayoreo: 590.00, mostrador: 1399.00, digital: 1399.00, image: "" },
  { id: "zach-aroma-finalizador-canela-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO CANELA", category: "Zach Chemical", description: "1 LT", price: 49.80, unitPrice: 49.80, mayoreo: 49.80, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-menta-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO MENTA", category: "Zach Chemical", description: "1 LT", price: 49.80, unitPrice: 49.80, mayoreo: 49.80, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-cherry-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO CHERRY", category: "Zach Chemical", description: "1 LT", price: 49.80, unitPrice: 49.80, mayoreo: 49.80, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-drakar-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO DRAKAR", category: "Zach Chemical", description: "1 LT", price: 49.80, unitPrice: 49.80, mayoreo: 49.80, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-fresh-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO FRESH", category: "Zach Chemical", description: "1 LT", price: 49.80, unitPrice: 49.80, mayoreo: 49.80, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-hugo-magno-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO HUGO MAGNO", category: "Zach Chemical", description: "1 LT", price: 49.80, unitPrice: 49.80, mayoreo: 49.80, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-ferra-magno-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO FERRA MAGNO", category: "Zach Chemical", description: "1 LT", price: 49.80, unitPrice: 49.80, mayoreo: 49.80, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-vainilla-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO VAINILLA", category: "Zach Chemical", description: "1 LT", price: 49.80, unitPrice: 49.80, mayoreo: 49.80, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-eterno-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO ETERNO", category: "Zach Chemical", description: "1 LT", price: 49.80, unitPrice: 49.80, mayoreo: 49.80, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-petalos-1l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO PETALOS", category: "Zach Chemical", description: "1 LT", price: 49.80, unitPrice: 49.80, mayoreo: 49.80, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-aroma-finalizador-canela-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO CANELA", category: "Zach Chemical", description: "4 LT", price: 179.00, unitPrice: 179.00, mayoreo: 179.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-menta-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO MENTA", category: "Zach Chemical", description: "4 LT", price: 179.00, unitPrice: 179.00, mayoreo: 179.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-cherry-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO CHERRY", category: "Zach Chemical", description: "4 LT", price: 179.00, unitPrice: 179.00, mayoreo: 179.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-drakar-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO DRAKAR", category: "Zach Chemical", description: "4 LT", price: 179.00, unitPrice: 179.00, mayoreo: 179.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-fresh-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO FRESH", category: "Zach Chemical", description: "4 LT", price: 179.00, unitPrice: 179.00, mayoreo: 179.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-hugo-magno-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO HUGO MAGNO", category: "Zach Chemical", description: "4 LT", price: 179.00, unitPrice: 179.00, mayoreo: 179.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-ferra-magno-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO FERRA MAGNO", category: "Zach Chemical", description: "4 LT", price: 179.00, unitPrice: 179.00, mayoreo: 179.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-vainilla-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO VAINILLA", category: "Zach Chemical", description: "4 LT", price: 179.00, unitPrice: 179.00, mayoreo: 179.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-eterno-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO ETERNO", category: "Zach Chemical", description: "4 LT", price: 179.00, unitPrice: 179.00, mayoreo: 179.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-aroma-finalizador-petalos-4l", brand: "Zach Chemical", product: "AROMA FINALIZADOR DE SERVICIO PETALOS", category: "Zach Chemical", description: "4 LT", price: 179.00, unitPrice: 179.00, mayoreo: 179.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-shampoo-con-cera-1l", brand: "Zach Chemical", product: "SHAMPOO CON CERA", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 50.00, mostrador: 125.00, digital: 125.00, image: "" },
  { id: "zach-prelavador-neutro-1l", brand: "Zach Chemical", product: "PRELAVADOR NEUTRO", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 50.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-prelavador-neutro-4l", brand: "Zach Chemical", product: "PRELAVADOR NEUTRO", category: "Zach Chemical", description: "4 LT", price: 123.00, unitPrice: 123.00, mayoreo: 123.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-prelavador-desmanchador-ph12-1l", brand: "Zach Chemical", product: "PRELAVADOR DESMANCHADOR PH 12", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 50.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-prelavador-desmanchador-ph12-4l", brand: "Zach Chemical", product: "PRELAVADOR DESMANCHADOR PH 12", category: "Zach Chemical", description: "4 LT", price: 110.00, unitPrice: 110.00, mayoreo: 110.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-shampoo-tapicerias-negras-1l", brand: "Zach Chemical", product: "SHAMPOO PARA TAPICERIAS NEGRAS", category: "Zach Chemical", description: "1 LT", price: 45.00, unitPrice: 45.00, mayoreo: 45.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-shampoo-tapicerias-negras-4l", brand: "Zach Chemical", product: "SHAMPOO PARA TAPICERIAS NEGRAS", category: "Zach Chemical", description: "4 LT", price: 115.00, unitPrice: 115.00, mayoreo: 115.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-enjuague-final-citrus-1l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CITRUS", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 50.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-enjuague-final-cereza-1l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CEREZA", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 50.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-enjuague-final-carro-nuevo-1l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CARRO NUEVO", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 50.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-enjuague-final-coco-1l", brand: "Zach Chemical", product: "ENJUAGUE FINAL COCO", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 50.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-enjuague-final-menta-1l", brand: "Zach Chemical", product: "ENJUAGUE FINAL MENTA", category: "Zach Chemical", description: "1 LT", price: 50.00, unitPrice: 50.00, mayoreo: 50.00, mostrador: 199.00, digital: 199.00, image: "" },
  { id: "zach-enjuague-final-citricos-4l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CITRICOS", category: "Zach Chemical", description: "4 LT", price: 149.00, unitPrice: 149.00, mayoreo: 149.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-enjuague-final-cereza-4l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CEREZA", category: "Zach Chemical", description: "4 LT", price: 149.00, unitPrice: 149.00, mayoreo: 149.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-enjuague-final-carro-nuevo-4l", brand: "Zach Chemical", product: "ENJUAGUE FINAL CARRO NUEVO", category: "Zach Chemical", description: "4 LT", price: 149.00, unitPrice: 149.00, mayoreo: 149.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-enjuague-final-coco-4l", brand: "Zach Chemical", product: "ENJUAGUE FINAL COCO", category: "Zach Chemical", description: "4 LT", price: 149.00, unitPrice: 149.00, mayoreo: 149.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-enjuague-final-menta-4l", brand: "Zach Chemical", product: "ENJUAGUE FINAL MENTA", category: "Zach Chemical", description: "4 LT", price: 149.00, unitPrice: 149.00, mayoreo: 149.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-desodorante-calzado-1l", brand: "Zach Chemical", product: "DESODORANTE PARA CALZADO", category: "Zach Chemical", description: "1 LT", price: 47.50, unitPrice: 47.50, mayoreo: 47.50, mostrador: 142.50, digital: 142.50, image: "" },
  { id: "zach-desodorante-calzado-4l", brand: "Zach Chemical", product: "DESODORANTE PARA CALZADO", category: "Zach Chemical", description: "4 LT", price: 146.00, unitPrice: 146.00, mayoreo: 146.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-talco-liquido-1l", brand: "Zach Chemical", product: "TALCO LIQUIDO", category: "Zach Chemical", description: "1 LT", price: 47.50, unitPrice: 47.50, mayoreo: 47.50, mostrador: 142.50, digital: 142.50, image: "" },
  { id: "zach-talco-liquido-4l", brand: "Zach Chemical", product: "TALCO LIQUIDO", category: "Zach Chemical", description: "4 LT", price: 146.00, unitPrice: 146.00, mayoreo: 146.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-shampoo-tenis-1l", brand: "Zach Chemical", product: "SHAMPOO PARA TENIS", category: "Zach Chemical", description: "1 LT", price: 35.00, unitPrice: 35.00, mayoreo: 35.00, mostrador: 120.00, digital: 120.00, image: "" },
  { id: "zach-shampoo-tenis-4l", brand: "Zach Chemical", product: "SHAMPOO PARA TENIS", category: "Zach Chemical", description: "4 LT", price: 95.00, unitPrice: 95.00, mayoreo: 95.00, mostrador: 350.00, digital: 350.00, image: "" },
  { id: "zach-limpiador-gorras-1l", brand: "Zach Chemical", product: "LIMPIADOR PARA GORRAS", category: "Zach Chemical", description: "1 LT", price: 39.00, unitPrice: 39.00, mayoreo: 39.00, mostrador: 135.00, digital: 135.00, image: "" },
  { id: "zach-limpiador-gorras-4l", brand: "Zach Chemical", product: "LIMPIADOR PARA GORRAS", category: "Zach Chemical", description: "4 LT", price: 124.00, unitPrice: 124.00, mayoreo: 124.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-limpiador-gamuza-1l", brand: "Zach Chemical", product: "LIMPIADOR DE GAMUZA", category: "Zach Chemical", description: "1 LT", price: 39.00, unitPrice: 39.00, mayoreo: 39.00, mostrador: 135.00, digital: 135.00, image: "" },
  { id: "zach-limpiador-gamuza-4l", brand: "Zach Chemical", product: "LIMPIADOR DE GAMUZA", category: "Zach Chemical", description: "4 LT", price: 124.00, unitPrice: 124.00, mayoreo: 124.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-paneles-solares-1l", brand: "Zach Chemical", product: "PANELES SOLARES", category: "Zach Chemical", description: "1 LT", price: 35.00, unitPrice: 35.00, mayoreo: 35.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "zach-paneles-solares-4l", brand: "Zach Chemical", product: "PANELES SOLARES", category: "Zach Chemical", description: "4 LT", price: 93.00, unitPrice: 93.00, mayoreo: 93.00, mostrador: 399.00, digital: 399.00, image: "" },
  { id: "aqua-zach-agua-alcalina-1l", brand: "Aqua Zach", product: "AGUA ALCALINA", category: "Aqua Zach", description: "1 LITRO", price: 7.50, unitPrice: 7.50, mayoreo: 7.50, mostrador: 20.00, digital: 20.00, image: "" },
  { id: "aqua-zach-agua-alcalina-500ml", brand: "Aqua Zach", product: "AGUA ALCALINA", category: "Aqua Zach", description: "500 ML", price: 6.50, unitPrice: 6.50, mayoreo: 6.50, mostrador: 15.00, digital: 15.00, image: "" },
  { id: "zach-food-vinagre-arroz-350ml", brand: "Zach Food", product: "VINAGRE DE ARROZ", category: "Zach Food", description: "350 ML", price: 13.50, unitPrice: 13.50, mayoreo: 13.50, mostrador: 35.00, digital: 35.00, image: "" },
  
  { brand: "Magno Clean", product: "CITRICAL", category: "Magno", code: "PLCT1", description: "1 KG", price: 179.92, unitPrice: 179.92, mayoreo: 239.90, mostrador: 299.87, digital: 299.87 },
  { brand: "Magno Clean", product: "CITRICAL", category: "Magno", code: "PLCT2", description: "2 KG", price: 343.19, unitPrice: 343.19, mayoreo: 457.58, mostrador: 571.98, digital: 571.98 },
  { brand: "Magno Clean", product: "CITRICAL", category: "Magno", code: "PLCT3", description: "3 KG", price: 466.84, unitPrice: 466.84, mayoreo: 622.45, mostrador: 778.06, digital: 778.06 },
  { brand: "Magno Clean", product: "CHAZAM", category: "Magno", code: "PLCZ1", description: "1 KG", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 },
  { brand: "Magno Clean", product: "CHAZAM", category: "Magno", code: "PLCZ2", description: "2 KG", price: 359.40, unitPrice: 359.40, mayoreo: 479.20, mostrador: 599.00, digital: 599.00 },
  { brand: "Magno Clean", product: "CHAZAM", category: "Magno", code: "PLCZ3", description: "3 KG", price: 539.40, unitPrice: 539.40, mayoreo: 719.20, mostrador: 899.00, digital: 899.00 },
  { brand: "Magno Clean", product: "BIO WASH KIWI", category: "Magno", code: "PLBW2_1", description: "2 KG", price: 515.26, unitPrice: 515.26, mayoreo: 687.01, mostrador: 858.76, digital: 858.76 },
  { brand: "Magno Clean", product: "BIO WASH MENTA", category: "Magno", code: "PLBW2_2", description: "2 KG", price: 515.26, unitPrice: 515.26, mayoreo: 687.01, mostrador: 858.76, digital: 858.76 },
  { brand: "Magno Clean", product: "BIO WASH NARANJA", category: "Magno", code: "PLBW2_3", description: "2 KG", price: 515.26, unitPrice: 515.26, mayoreo: 687.01, mostrador: 858.76, digital: 858.76 },
  { brand: "Magno Clean", product: "LYPTUS LIQUID", category: "Magno", code: "PLLL1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "LYPTUS LIQUID", category: "Magno", code: "PLLL5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "LYPTUS LIQUID", category: "Magno", code: "PLLL20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "ORANGE LIQUID", category: "Magno", code: "PLOL1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "ORANGE LIQUID", category: "Magno", code: "", description: "GLN", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 },
  { brand: "Magno Clean", product: "ORANGE LIQUID", category: "Magno", code: "PLOL5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "ORANGE LIQUID", category: "Magno", code: "PLOL20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "SEVEN NEUTRO", category: "Magno", code: "PLSN1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "SEVEN NEUTRO", category: "Magno", code: "PLSN5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "SEVEN NEUTRO", category: "Magno", code: "PLSN20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "FINE CLEANNER", category: "Magno", code: "PLFC1.5", description: "1.5 KG", price: 329.34, unitPrice: 329.34, mayoreo: 439.12, mostrador: 548.90, digital: 548.90 },
  { brand: "Magno Clean", product: "MULTIFIBRAS", category: "Magno", code: "EMLF1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "MULTIFIBRAS", category: "Magno", code: "", description: "GLN", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 },
  { brand: "Magno Clean", product: "MULTIFIBRAS", category: "Magno", code: "EMLF5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "MULTIFIBRAS", category: "Magno", code: "EMLF20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "MULTIFIBRAS ORANGE", category: "Magno", code: "EMLFO1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "MULTIFIBRAS ORANGE", category: "Magno", code: "EMLFO5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "MULTIFIBRAS ORANGE", category: "Magno", code: "EMLFO20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "MULTIFIBRAS LYPTUS", category: "Magno", code: "EMLFL1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "MULTIFIBRAS LYPTUS", category: "Magno", code: "EMLFL5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "MULTIFIBRAS LYPTUS", category: "Magno", code: "EMLFL20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "BIO WASH ENJUAGUE KIWI", category: "Magno", code: "EBW1.5_1", description: "1.5 KG", price: 332.97, unitPrice: 332.97, mayoreo: 443.96, mostrador: 554.95, digital: 554.95 },
  { brand: "Magno Clean", product: "BIO WASH ENJUAGUE MENTA", category: "Magno", code: "EBW1.5_2", description: "1.5 KG", price: 332.97, unitPrice: 332.97, mayoreo: 443.96, mostrador: 554.95, digital: 554.95 },
  { brand: "Magno Clean", product: "BIO WASH ENJUAGUE NARANJA", category: "Magno", code: "EBW1.5_3", description: "1.5 KG", price: 332.97, unitPrice: 332.97, mayoreo: 443.96, mostrador: 554.95, digital: 554.95 },
  { brand: "Magno Clean", product: "FINE ENJUAGUE", category: "Magno", code: "EFN1.5", description: "1.5 KG", price: 475.06, unitPrice: 475.06, mayoreo: 633.41, mostrador: 791.76, digital: 791.76 },
  { brand: "Magno Clean", product: "BLANCOLCHON FORTE", category: "Magno", code: "DBCF1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "BLANCOLCHON FORTE", category: "Magno", code: "", description: "GLN", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 },
  { brand: "Magno Clean", product: "BLANCOLCHON FORTE", category: "Magno", code: "DBCF5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "BLANCOLCHON FORTE", category: "Magno", code: "DBCF20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "CITRIMAG", category: "Magno", code: "DCM4", description: "250 ML", price: 151.51, unitPrice: 151.51, mayoreo: 202.02, mostrador: 252.52, digital: 252.52 },
  { brand: "Magno Clean", product: "CITRIMAG", category: "Magno", code: "DCM2", description: "500 ML", price: 236.69, unitPrice: 236.69, mayoreo: 315.58, mostrador: 394.48, digital: 394.48 },
  { brand: "Magno Clean", product: "PERMAG", category: "Magno", code: "DPM4", description: "250 ML", price: 79.04, unitPrice: 79.04, mayoreo: 105.38, mostrador: 131.73, digital: 131.73 },
  { brand: "Magno Clean", product: "PERMAG", category: "Magno", code: "DPM2", description: "500 ML", price: 142.12, unitPrice: 142.12, mayoreo: 189.50, mostrador: 236.87, digital: 236.87 },
  { brand: "Magno Clean", product: "PROTEMAG", category: "Magno", code: "DPT4", description: "250 ML", price: 169.87, unitPrice: 169.87, mayoreo: 226.50, mostrador: 283.12, digital: 283.12 },
  { brand: "Magno Clean", product: "PROTEMAG", category: "Magno", code: "DPT2", description: "500 ML", price: 311.41, unitPrice: 311.41, mayoreo: 415.21, mostrador: 519.01, digital: 519.01 },
  { brand: "Magno Clean", product: "OXIMAG", category: "Magno", code: "DOX4", description: "250 ML", price: 92.35, unitPrice: 92.35, mayoreo: 123.13, mostrador: 153.91, digital: 153.91 },
  { brand: "Magno Clean", product: "OXIMAG", category: "Magno", code: "DOX2", description: "500 ML", price: 139.27, unitPrice: 139.27, mayoreo: 185.70, mostrador: 232.12, digital: 232.12 },
  { brand: "Magno Clean", product: "PEXIDIL", category: "Magno", code: "DPX1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "PEXIDIL", category: "Magno", code: "DPX5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "PEXIDIL", category: "Magno", code: "DPX20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "BLUE GEL", category: "Magno", code: "DBG1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "BLUE GEL", category: "Magno", code: "", description: "GLN", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 },
  { brand: "Magno Clean", product: "BLUE GEL", category: "Magno", code: "DBG5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "BLUE GEL", category: "Magno", code: "DBG20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "APC TNT", category: "Magno", code: "APC1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "APC TNT", category: "Magno", code: "", description: "GLN", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 },
  { brand: "Magno Clean", product: "APC TNT", category: "Magno", code: "APC5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "APC TNT", category: "Magno", code: "APC20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "MAGNIFICO MAGNIFICO", category: "Magno", code: "APCMA1", description: "1 LT", price: 88.15, unitPrice: 88.15, mayoreo: 117.54, mostrador: 146.92, digital: 146.92 },
  { brand: "Magno Clean", product: "AMOXI ULTRA", category: "Magno", code: "APCAMU1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "AMOXI ULTRA", category: "Magno", code: "", description: "GLN", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 },
  { brand: "Magno Clean", product: "AMOXI ULTRA", category: "Magno", code: "APCAMU5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "AMOXI ULTRA", category: "Magno", code: "APCAM20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "APC CITRUS NEUTRO", category: "Magno", code: "APCCN1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "APC CITRUS NEUTRO", category: "Magno", code: "", description: "GLN", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 },
  { brand: "Magno Clean", product: "APC CITRUS NEUTRO", category: "Magno", code: "APCCN5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "APC CITRUS NEUTRO", category: "Magno", code: "APCCN20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "MAGBOOSTER", category: "Magno", code: "ABS2", description: "2 KG", price: 411.46, unitPrice: 411.46, mayoreo: 548.62, mostrador: 685.77, digital: 685.77 },
  { brand: "Magno Clean", product: "MATA OLORES ENZIMATICO", category: "Magno", code: "COCE1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "MATA OLORES ENZIMATICO", category: "Magno", code: "", description: "GLN", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 },
  { brand: "Magno Clean", product: "MATA OLORES ENZIMATICO", category: "Magno", code: "COCE5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "MATA OLORES ENZIMATICO", category: "Magno", code: "COCE20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "SHAMPOO ALFOMBRAS", category: "Magno", code: "SAN1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "SHAMPOO ALFOMBRAS", category: "Magno", code: "", description: "GLN", price: 239.40, unitPrice: 239.40, mayoreo: 319.20, mostrador: 399.00, digital: 399.00 },
  { brand: "Magno Clean", product: "SHAMPOO ALFOMBRAS", category: "Magno", code: "SAN5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "SHAMPOO ALFOMBRAS", category: "Magno", code: "SAN20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "ULTRA BLACK", category: "Magno", code: "SHLTN1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "ULTRA BLACK", category: "Magno", code: "SHLTN5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "ULTRA BLACK", category: "Magno", code: "SHLTN20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "SHAMPOO GERMICIDA", category: "Magno", code: "SGA1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "SHAMPOO GERMICIDA", category: "Magno", code: "SGA5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "SHAMPOO GERMICIDA", category: "Magno", code: "SGA20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "HIDRATADOR DE CUERO", category: "Magno", code: "TCPH1", description: "1 KG", price: 210.46, unitPrice: 210.46, mayoreo: 280.61, mostrador: 350.76, digital: 350.76 },
  { brand: "Magno Clean", product: "HIDRATADOR DE CUERO", category: "Magno", code: "TCPH4", description: "4 KG", price: 619.13, unitPrice: 619.13, mayoreo: 825.51, mostrador: 1031.89, digital: 1031.89 },
  { brand: "Magno Clean", product: "LIMPIADOR DE CUERO", category: "Magno", code: "TCPL1", description: "1 KG", price: 245.11, unitPrice: 245.11, mayoreo: 326.81, mostrador: 408.51, digital: 408.51 },
  { brand: "Magno Clean", product: "LIMPIADOR DE CUERO", category: "Magno", code: "TCPL4", description: "4 KG", price: 747.87, unitPrice: 747.87, mayoreo: 997.16, mostrador: 1246.45, digital: 1246.45 },
  { brand: "Magno Clean", product: "REPEL", category: "Magno", code: "PTR1", description: "1 LT", price: 289.53, unitPrice: 289.53, mayoreo: 386.04, mostrador: 482.55, digital: 482.55 },
  { brand: "Magno Clean", product: "REPEL", category: "Magno", code: "PTR4", description: "4 LTS", price: 786.05, unitPrice: 786.05, mayoreo: 1048.07, mostrador: 1310.09, digital: 1310.09 },
  { brand: "Magno Clean", product: "REPEL APPLY WET", category: "Magno", code: "PTRW1", description: "1 LT", price: 324.51, unitPrice: 324.51, mayoreo: 432.68, mostrador: 540.85, digital: 540.85 },
  { brand: "Magno Clean", product: "REPEL APPLY WET", category: "Magno", code: "PTRW4", description: "4 LTS", price: 856.01, unitPrice: 856.01, mayoreo: 1141.35, mostrador: 1426.69, digital: 1426.69 },
  { brand: "Magno Clean", product: "CRISTALIZADOR DON REMIGIO H.", category: "Magno", code: "PICD1", description: "1 LT", price: 253.22, unitPrice: 253.22, mayoreo: 337.62, mostrador: 422.03, digital: 422.03 },
  { brand: "Magno Clean", product: "CRISTALIZADOR DON REMIGIO H.", category: "Magno", code: "PICD4", description: "4 LTS", price: 807.30, unitPrice: 807.30, mayoreo: 1076.40, mostrador: 1345.50, digital: 1345.50 },
  { brand: "Magno Clean", product: "ACABA-ÁCAROS", category: "Magno", code: "DAA1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "ACABA-ÁCAROS", category: "Magno", code: "DAA5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "ACABA-ÁCAROS", category: "Magno", code: "DAA20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },
  { brand: "Magno Clean", product: "PLANCHA FACIL", category: "Magno", code: "LPF", description: "5 LTS", price: 139.22, unitPrice: 139.22, mayoreo: 185.62, mostrador: 232.03, digital: 232.03 },
  { brand: "Magno Clean", product: "SILICREMA", category: "Magno", code: "SIL1", description: "1 LT", price: 93.02, unitPrice: 93.02, mayoreo: 124.02, mostrador: 155.03, digital: 155.03 },
  { brand: "Magno Clean", product: "NEUTRO CAR", category: "Magno", code: "SHPHNC1", description: "1 LT", price: 119.40, unitPrice: 119.40, mayoreo: 159.20, mostrador: 199.00, digital: 199.00 },
  { brand: "Magno Clean", product: "NEUTRO CAR", category: "Magno", code: "SHPHNC5", description: "5 LTS", price: 299.40, unitPrice: 299.40, mayoreo: 399.20, mostrador: 499.00, digital: 499.00 },
  { brand: "Magno Clean", product: "NEUTRO CAR", category: "Magno", code: "SHPHNC20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 },

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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
    kitImage:
      "/assets/verde-santo/productos/vs-bebida-sabila-nopal-cuachalalate-1l.png",
  },
];

const peso = (n) =>
  Number(n || 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

const DEFAULT_BRAND = "Margrey";
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

const KIT_SIZE = 1200;

// Solo limita los productos principales.
// Las esponjas y microfibras no consumen estos 15 lugares.
const MAX_KIT_PRODUCTS = 15;

// Máximo de productos por fila.
const PRODUCTOS_POR_FILA = 5;
// Máximo total de accesorios visibles físicamente.
// Se combinan microfibras y esponjas.
const MAX_KIT_ACCESSORIES = 5;

const MICROFIBRA_KIT_IMAGE =
  "/assets/margrey/accesorios/microfibra.png";

const ESPONJA_KIT_IMAGE =
  "/assets/margrey/accesorios/esponja-blanca.png";

function limpiarSkuArchivo(sku = "") {
  return String(sku)
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9_.-]/g, "");
}

function getKitProductImage(item = {}) {
  if (item.kitImage) return item.kitImage;

  const identificador = limpiarSkuArchivo(
    item.id || item.sku || item.code || ""
  );

  if (!identificador) return "";

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

function getPresentacionNumero(item = {}) {
  const texto = `${
    item.description || ""
  } ${item.name || ""}`.toUpperCase();

  const ml = texto.match(
    /(\d+(?:[.,]\d+)?)\s*ML\b/
  );

  if (ml) {
    return {
      unidad: "ml",
      cantidad: Number(
        ml[1].replace(",", ".")
      ),
    };
  }

  const litros = texto.match(
    /(\d+(?:[.,]\d+)?)\s*(?:LT|LTS|L)\b/
  );

  if (litros) {
    return {
      unidad: "litros",
      cantidad: Number(
        litros[1].replace(",", ".")
      ),
    };
  }

  const kg = texto.match(
    /(\d+(?:[.,]\d+)?)\s*(?:KG|KGS)\b/
  );

  if (kg) {
    return {
      unidad: "kg",
      cantidad: Number(
        kg[1].replace(",", ".")
      ),
    };
  }

  const gramos = texto.match(
    /(\d+(?:[.,]\d+)?)\s*(?:GR|GRS)\b/
  );

  if (gramos) {
    return {
      unidad: "gramos",
      cantidad: Number(
        gramos[1].replace(",", ".")
      ),
    };
  }

  return {
    unidad: "otros",
    cantidad: 0,
  };
}

function getEscalaVisualKit(item = {}) {
  const sku = String(
    item.sku || ""
  )
    .trim()
    .toUpperCase();

  const nombre = String(
    item.name ||
      item.product ||
      ""
  ).toUpperCase();

  /*
   * Ajustes individuales.
   *
   * Estas excepciones se aplican antes
   * de calcular el tamaño por presentación.
   */
  const ESCALAS_ESPECIALES = {
    "0423-01-247": 1, // Plasti-Magic 100 g
    "0423-01-238": 1, // Plasti-Magic 200 g
    "1006-01-232": 1.15, // Crema
    "0105-95-232": 1.12, // Silicrem
    "0404-95-290": 1.09, // Polish Blanco
    "0405-21-290": 1.12, // Polish Rojo
    "0406-21-290": 1.12, // Polish Rosa
  };

  if (
    Object.prototype.hasOwnProperty.call(
      ESCALAS_ESPECIALES,
      sku
    )
  ) {
    return ESCALAS_ESPECIALES[sku];
  }

  /*
   * Respaldo por nombre, por si algún producto
   * llega sin SKU al carrito.
   */
  if (
    nombre.includes("PLASTI-MAGIC") ||
    nombre.includes("PLASTI MAGIC")
  ) {
    const presentacionPlasti =
      getPresentacionNumero(item);

    if (
      presentacionPlasti.unidad ===
        "gramos" &&
      presentacionPlasti.cantidad <= 100
    ) {
      return 1.14;
    }

    if (
      presentacionPlasti.unidad ===
        "gramos" &&
      presentacionPlasti.cantidad <= 200
    ) {
      return 1.18;
    }

    return 1.15;
  }

  const presentacion =
    getPresentacionNumero(item);

  if (presentacion.unidad === "ml") {
    if (presentacion.cantidad <= 150) {
      return 0.72;
    }

    if (presentacion.cantidad <= 300) {
      return 0.82;
    }

    if (presentacion.cantidad <= 600) {
      return 0.92;
    }

    return 0.96;
  }

  if (presentacion.unidad === "litros") {
    if (presentacion.cantidad <= 1) {
      return 1;
    }

    if (presentacion.cantidad <= 2) {
      return 1.05;
    }

    if (presentacion.cantidad <= 4) {
      return 1.12;
    }

    return 1.18;
  }

  if (presentacion.unidad === "gramos") {
    if (presentacion.cantidad <= 150) {
      return 0.74;
    }

    if (presentacion.cantidad <= 300) {
      return 0.84;
    }

    return 0.92;
  }

  if (presentacion.unidad === "kg") {
    if (presentacion.cantidad <= 1) {
      return 0.95;
    }

    if (presentacion.cantidad <= 2) {
      return 1.04;
    }

    return 1.12;
  }

  return 0.92;
}

function obtenerDatosKit(
  cart,
  microfibras,
  esponjas
) {
  const productos = [];

  cart.forEach((item) => {
    const cantidad = Math.max(
      0,
      Number(item.qty || 0)
    );

    const imagen =
      getKitProductImage(item);

    for (let i = 0; i < cantidad; i += 1) {
      productos.push({
        type: "product",
        name: item.product,
        sku: item.sku || item.code || "",
        description:
          item.description || "",
        image: imagen,
        groupKey:
          item.sku ||
          item.code ||
          imagen ||
          `${item.product}-${item.description}`,
      });
    }
  });

  productos.sort((a, b) =>
    String(a.groupKey || "").localeCompare(
      String(b.groupKey || "")
    )
  );

  return {
    productos: productos.slice(
      0,
      MAX_KIT_PRODUCTS
    ),
    microfibras: Math.max(
      0,
      Number(microfibras || 0)
    ),
    esponjas: Math.max(
      0,
      Number(esponjas || 0)
    ),
    totalProductosSolicitados:
      productos.length,
  };
}

function dividirProductosEnFilas(
  productos = []
) {
  const filas = [];

  for (
    let i = 0;
    i < productos.length;
    i += PRODUCTOS_POR_FILA
  ) {
    filas.push(
      productos.slice(
        i,
        i + PRODUCTOS_POR_FILA
      )
    );
  }

  return filas;
}

function dibujarImagenContain(
  ctx,
  image,
  x,
  y,
  anchoCaja,
  altoCaja,
  escala = 1
) {
  const imageWidth =
    image.naturalWidth || image.width;

  const imageHeight =
    image.naturalHeight || image.height;

  const proporcion =
    imageWidth / imageHeight;

  let drawHeight = altoCaja * escala;
  let drawWidth = drawHeight * proporcion;

  if (drawWidth > anchoCaja * escala) {
    drawWidth = anchoCaja * escala;
    drawHeight = drawWidth / proporcion;
  }

  const drawX =
    x + (anchoCaja - drawWidth) / 2;

  const drawY =
    y + altoCaja - drawHeight;

  ctx.drawImage(
    image,
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );

  return {
    x: drawX,
    y: drawY,
    width: drawWidth,
    height: drawHeight,
  };
}

function obtenerAccesoriosVisibles(
  microfibras,
  esponjas
) {
  const accesorios = [];

  const cantidadEsponjas = Math.max(
    0,
    Number(esponjas || 0)
  );

  const cantidadMicrofibras = Math.max(
    0,
    Number(microfibras || 0)
  );

  /*
   * Primero agregamos las esponjas
   * y después las microfibras.
   *
   * Ejemplos:
   * 3 esponjas + 2 microfibras
   * 4 esponjas + 1 microfibra
   * 5 microfibras
   */
  for (
    let i = 0;
    i < cantidadEsponjas;
    i += 1
  ) {
    accesorios.push({
      type: "esponja",
      image: ESPONJA_KIT_IMAGE,
    });
  }

  for (
    let i = 0;
    i < cantidadMicrofibras;
    i += 1
  ) {
    accesorios.push({
      type: "microfibra",
      image: MICROFIBRA_KIT_IMAGE,
    });
  }

  return {
    accesorios: accesorios.slice(
      0,
      MAX_KIT_ACCESSORIES
    ),

    totalSolicitado:
      cantidadEsponjas +
      cantidadMicrofibras,

    totalMostrado: Math.min(
      accesorios.length,
      MAX_KIT_ACCESSORIES
    ),
  };
}

async function generarImagenKitCanvas({
  cart,
  microfibras,
  esponjas,
}) {
  const datos = obtenerDatosKit(
    cart,
    microfibras,
    esponjas
  );
  const datosAccesorios =
  obtenerAccesoriosVisibles(
    microfibras,
    esponjas
  );

  const hayContenido =
    datos.productos.length > 0 ||
    datos.microfibras > 0 ||
    datos.esponjas > 0;

  if (!hayContenido) {
    throw new Error(
      "Agrega productos, microfibras o esponjas antes de generar la imagen."
    );
  }

  const canvas =
    document.createElement("canvas");

  canvas.width = KIT_SIZE;
  canvas.height = KIT_SIZE;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error(
      "No se pudo crear el canvas."
    );
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(
    0,
    0,
    KIT_SIZE,
    KIT_SIZE
  );

  const resultadosProductos =
    await Promise.allSettled(
      datos.productos.map(
        async (producto) => ({
          ...producto,
          loadedImage:
            await cargarImagenCanvas(
              producto.image
            ),
        })
      )
    );

  const productosCargados = [];
  const faltantes = [];

  resultadosProductos.forEach(
    (resultado, index) => {
      if (
        resultado.status === "fulfilled"
      ) {
        productosCargados.push(
          resultado.value
        );
      } else {
        faltantes.push(
          datos.productos[index]
        );
      }
    }
  );

  const accesoriosCargados = [];

  for (
    const accesorio of
    datosAccesorios.accesorios
  ) {
    try {
      const loadedImage =
        await cargarImagenCanvas(
          accesorio.image
        );

      accesoriosCargados.push({
        ...accesorio,
        loadedImage,
      });
    } catch (error) {
      faltantes.push({
        type: accesorio.type,
        name:
          accesorio.type === "esponja"
            ? "Esponja"
            : "Microfibra",
        image: accesorio.image,
      });
    }
  }

  if (
    !productosCargados.length &&
    !accesoriosCargados.length
  ) {
    throw new Error(
      "No se pudo cargar ninguna imagen. Revisa las rutas de los PNG."
    );
  }

  const filas =
    dividirProductosEnFilas(
      productosCargados
    );

  const tieneAccesorios =
    accesoriosCargados.length > 0;

  /*
   * Distribución:
   *
   * 1 a 5 productos:
   * una sola fila horizontal.
   *
   * 6 a 10 productos:
   * dos filas de máximo cinco.
   *
   * 11 a 15 productos:
   * tres filas de máximo cinco.
   *
   * Accesorios:
   * parte inferior,
   * esponja a la izquierda,
   * microfibra a la derecha.
   */

  const margenHorizontal = 65;
  const margenSuperior = 60;
  const margenInferior = 50;

  const alturaAccesorios =
    tieneAccesorios ? 260 : 0;

  const separacionAccesorios =
    tieneAccesorios ? 15 : 0;

  const alturaProductos =
    KIT_SIZE -
    margenSuperior -
    margenInferior -
    alturaAccesorios -
    separacionAccesorios;

  const cantidadFilas =
    Math.max(1, filas.length);

  /*
   * Separación vertical negativa para que
   * las filas formen una composición compacta.
   */
  const traslapeVertical =
    cantidadFilas === 1
      ? 0
      : cantidadFilas === 2
      ? -35
      : -28;

  const alturaFila =
    (
      alturaProductos -
      traslapeVertical *
        (cantidadFilas - 1)
    ) / cantidadFilas;

  filas.forEach(
    (fila, indiceFila) => {
      const cantidadFila = fila.length;

      const anchoDisponible =
        KIT_SIZE -
        margenHorizontal * 2;

      /*
       * Cada producto tiene una columna fija.
       * De esta forma cinco productos usan
       * todo el ancho del canvas.
       */
      const anchoColumna =
        anchoDisponible /
        PRODUCTOS_POR_FILA;

      /*
       * Cuando una fila tiene menos de cinco,
       * centramos únicamente las columnas usadas.
       */
      const anchoFila =
        anchoColumna * cantidadFila;

      const inicioX =
        (KIT_SIZE - anchoFila) / 2;

      const inicioY =
        margenSuperior +
        indiceFila *
          (
            alturaFila +
            traslapeVertical
          );

      fila.forEach(
        (producto, indiceProducto) => {
          const x =
            inicioX +
            indiceProducto *
              anchoColumna;

          const escala =
            getEscalaVisualKit(
              producto
            );

          /*
           * Permitimos que el producto use
           * casi toda su columna.
           */
          const anchoCaja =
            anchoColumna * 1.12;

          const altoCaja =
            alturaFila * 0.98;

          const ajusteX =
            x -
            (anchoCaja -
              anchoColumna) /
              2;

          dibujarImagenContain(
            ctx,
            producto.loadedImage,
            ajusteX,
            inicioY,
            anchoCaja,
            altoCaja,
            escala
          );
        }
      );
    }
  );

  /*
 * Zona inferior de accesorios.
 *
 * Se dibuja físicamente cada unidad.
 * No se muestran cantidades, badges
 * ni textos dentro de la imagen.
 *
 * Máximo total: 5 accesorios.
 */
if (tieneAccesorios) {
  const accesoriosY =
    KIT_SIZE -
    margenInferior -
    alturaAccesorios;

  const cantidadAccesorios =
    accesoriosCargados.length;

  const anchoDisponibleAccesorios =
    KIT_SIZE - 130;

  const separacion =
    cantidadAccesorios <= 1
      ? 0
      : 8;

  const anchoCelda =
    Math.min(
      205,
      (
        anchoDisponibleAccesorios -
        separacion *
          (cantidadAccesorios - 1)
      ) /
        cantidadAccesorios
    );

  const anchoFilaAccesorios =
    anchoCelda *
      cantidadAccesorios +
    separacion *
      Math.max(
        0,
        cantidadAccesorios - 1
      );

  const inicioAccesoriosX =
    (KIT_SIZE -
      anchoFilaAccesorios) /
    2;

  accesoriosCargados.forEach(
    (accesorio, index) => {
      const x =
        inicioAccesoriosX +
        index *
          (
            anchoCelda +
            separacion
          );

      /*
       * La microfibra puede verse un poco
       * más grande porque generalmente es
       * más horizontal.
       */
      const escala =
        accesorio.type ===
        "microfibra"
          ? 1
          : 0.9;

      dibujarImagenContain(
        ctx,
        accesorio.loadedImage,
        x,
        accesoriosY,
        anchoCelda,
        225,
        escala
      );
    }
  );
}

  return {
  dataUrl:
      canvas.toDataURL(
        "image/png",
        1
      ),

    faltantes,

    totalMostrado:
      productosCargados.length,

    totalSolicitado:
      datos.totalProductosSolicitados,

    accesoriosMostrados:
      accesoriosCargados.length,

    accesoriosSolicitados:
      datosAccesorios.totalSolicitado,
  };
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

    if (brandNormalizada === "verde santo") {
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
     * costo distribuidor + 50%.
     *
     * No toma item.mayoreo porque los registros
     * anteriores pueden conservar precios viejos.
     */
    const precioMayoreo =
      precioDistribuidor * 1.5;

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

function getTextoPresentacion(p = {}) {
  return `${p.description || ""} ${p.unitDescription || ""}`.toUpperCase();
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
    brandNormalizada === "magno clean";

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
  PRECIO_MICRO,
  PRECIO_ESPONJA,
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
  const [microfibras, setMicrofibras] = useState(0);
  const [esponjas, setEsponjas] = useState(0);
  const [descuentoPercent, setDescuentoPercent] = useState(0);
  const [imagenKit, setImagenKit] = useState("");
  const [generandoImagenKit, setGenerandoImagenKit] = useState(false);
  const [faltantesImagenKit, setFaltantesImagenKit] = useState([]);
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

  const PRECIO_MICRO = 13;
  const PRECIO_ESPONJA = 1.5;

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

        return blob.includes(term);
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
    subtotal + microfibras * PRECIO_MICRO + esponjas * PRECIO_ESPONJA;

  function goToCart() {
    if (window.matchMedia("(max-width: 768px)").matches && cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function makeLineKey(item, mode) {
    const base = item.sku || item.code || item.product || "item";
    const pres = (item.unitDescription || item.description || "")
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, "");

    return `${getBrand(item)}-${base}-${mode}-${pres}-${tipoPrecio}`;
  }

  function add(item, mode, qty) {
  const costoBase =
    mode === "unit"
      ? item.unitPrice
      : item.price;

  const unitPrice = precioPublico(
    costoBase,
    item,
    tipoPrecio
  );

  if (!unitPrice) return;

  const key = makeLineKey(
    item,
    mode
  );

  /*
   * Esta clave enlaza el producto del carrito
   * con su registro en Publicaciones.
   */
  const publicacionKey =
    item.publicacionKey ||
    getProductKey(item);

  setCart((prev) => {
    const existente = prev.find(
      (linea) => linea.key === key
    );

    if (existente) {
      return prev.map((linea) =>
        linea.key === key
          ? {
              ...linea,
              qty:
                Number(linea.qty || 0) +
                Number(qty || 1),

              /*
               * También actualizamos la referencia
               * en productos que ya estaban agregados.
               */
              publicacionKey,
            }
          : linea
      );
    }

    return [
      ...prev,
      {
        key,
        id: item.id || "",
        publicacionKey,
        brand: getBrand(item),
        product: item.product,
        sku: item.sku || "",
        code: item.code ?? null,
        image: item.image || "",
        kitImage:
          getKitProductImage(item),

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
      },
    ];
  });
}

  function removeLine(key) {
    setCart((prev) => prev.filter((x) => x.key !== key));
  }

  function decLine(key) {
  setCart((prev) =>
    prev.map((x) =>
      x.key === key
        ? { ...x, qty: Math.max(1, Number(x.qty || 1) - 1) }
        : x
    )
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
  if (!cart.length && microfibras === 0 && esponjas === 0) return;

  if (confirm("¿Vaciar toda la cotización?")) {
    setCart([]);
    setMicrofibras(0);
    setEsponjas(0);
    setImagenKit("");
    setFaltantesImagenKit([]);
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
    if (!cart.length && microfibras === 0 && esponjas === 0) {
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
    esponjas === 0
  ) {
    alert(
      "Agrega productos, microfibras o esponjas antes de generar la imagen."
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
    Number(esponjas || 0);

  if (
    cantidadProductos >
    MAX_KIT_PRODUCTS
  ) {
    const continuar =
      window.confirm(
        `El kit contiene ${cantidadProductos} productos principales.\n\n` +
          `La imagen mostrará únicamente los primeros ${MAX_KIT_PRODUCTS} productos.\n\n` +
          "Las esponjas y microfibras se mostrarán aparte en la zona inferior.\n\n" +
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
      `El kit contiene ${cantidadAccesorios} accesorios.\n\n` +
        `La imagen mostrará físicamente solo los primeros ${MAX_KIT_ACCESSORIES} accesorios.\n\n` +
        "No se colocarán textos ni indicadores de cantidad.\n\n" +
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

      alert(
        `Imagen generada, pero faltaron algunos archivos:\n\n${nombres}\n\n` +
          "Revisa los PNG dentro de public/assets/margrey/."
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
    esponjas === 0
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
              <div className="flex items-center justify-between lg:justify-end gap-3">
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

            {modo === "cotizador" ? (
        <VistaCotizador
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
          PRECIO_MICRO={PRECIO_MICRO}
          PRECIO_ESPONJA={PRECIO_ESPONJA}
          total={total}
          cotiza={cotiza}
          setCotiza={setCotiza}
          brand={brand}
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
          PRECIO_MICRO={PRECIO_MICRO}
          PRECIO_ESPONJA={
            PRECIO_ESPONJA
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

const ML_COMISION_PORCENTAJE = 12;

// Calculado con tu venta real:
// $30.32 de retenciones sobre una venta de $335.
const ML_RETENCIONES_PORCENTAJE = (30.32 / 335) * 100;

// Tabla oficial proporcionada por el usuario.
// Columnas según el precio publicado en Mercado Libre.
const ML_RANGOS_PRECIO = [
  { min: 0, max: 98.99 },
  { min: 99, max: 198.99 },
  { min: 199, max: 298.99 },
  { min: 299, max: 498.99 },
  { min: 499, max: 998.99 },
  { min: 999, max: Infinity },
];

const ML_TABLA_ENVIO = [
  { maxKg: 0.3, costos: [25, 32, 35, 52.4, 65.5, 65.5] },
  { maxKg: 0.5, costos: [28.5, 34, 38, 56, 70, 70] },
  { maxKg: 1, costos: [33, 38, 39, 59.6, 74.5, 74.5] },
  { maxKg: 2, costos: [35, 40, 41, 67.6, 84.5, 84.5] },
  { maxKg: 3, costos: [37, 46, 48, 76, 88.5, 95] },
  { maxKg: 4, costos: [39, 50, 54, 82.4, 95.5, 103] },
  { maxKg: 5, costos: [40, 53, 59, 88, 102.5, 110] },
  { maxKg: 7, costos: [45, 59, 70, 98, 122.5, 122.5] },
  { maxKg: 9, costos: [51, 67, 81, 111.6, 139.5, 139.5] },
  { maxKg: 12, costos: [59, 78, 96, 129.2, 161.5, 161.5] },
  { maxKg: 15, costos: [69, 92, 113, 152, 190, 190] },
  { maxKg: 20, costos: [81, 108, 140, 178, 222.5, 222.5] },
  { maxKg: 30, costos: [102, 137, 195, 225.2, 281.5, 281.5] },
  { maxKg: 40, costos: [126, 170, 250, 279.2, 349, 349] },
  { maxKg: 50, costos: [163, 220, 305, 361.2, 451.5, 451.5] },
  { maxKg: 60, costos: [183, 247, 334, 405.6, 507, 507] },
  { maxKg: 70, costos: [188, 254, 363, 416.4, 520.5, 520.5] },
  { maxKg: 80, costos: [196, 264, 392, 433.6, 542, 542] },
  { maxKg: 90, costos: [220, 297, 421, 487.6, 609.5, 609.5] },
  { maxKg: 100, costos: [254, 343, 450, 562.4, 703, 703] },
  { maxKg: 125, costos: [288, 389, 523, 637.2, 796.5, 796.5] },
  { maxKg: 150, costos: [382, 516, 694, 846, 1057.5, 1057.5] },
  { maxKg: 175, costos: [476, 643, 865, 1054.8, 1318.5, 1318.5] },
  { maxKg: 200, costos: [570, 770, 1036, 1263.6, 1579.5, 1579.5] },
  { maxKg: 225, costos: [664, 897, 1207, 1472.4, 1840.5, 1840.5] },
  { maxKg: 250, costos: [758, 1024, 1378, 1681.2, 2101.5, 2101.5] },
  { maxKg: 275, costos: [852, 1151, 1549, 1890, 2362.5, 2362.5] },
  { maxKg: 300, costos: [946, 1278, 1720, 2098.4, 2623, 2623] },
  { maxKg: 325, costos: [1040, 1406, 1892, 2308, 2885, 2885] },
  { maxKg: 350, costos: [1134, 1533, 2063, 2516.8, 3146, 3146] },
  { maxKg: Infinity, costos: [1134, 1533, 2063, 2516.8, 3146, 3146] },
];

function getIndiceRangoPrecioML(precio) {
  const valor = Math.max(0, Number(precio || 0));
  const indice = ML_RANGOS_PRECIO.findIndex(
    (rango) => valor >= rango.min && valor <= rango.max
  );
  return indice >= 0 ? indice : ML_RANGOS_PRECIO.length - 1;
}

function calcularCostoEnvioML(pesoKg, precioPublicado) {
  const kg = Math.max(0.01, Number(pesoKg || 0.01));
  const fila =
    ML_TABLA_ENVIO.find((rango) => kg <= rango.maxKg) ||
    ML_TABLA_ENVIO[ML_TABLA_ENVIO.length - 1];
  const indicePrecio = getIndiceRangoPrecioML(precioPublicado);
  return Number(fila.costos[indicePrecio] || 0);
}

function extraerPesoKgTexto(texto = "") {
  const normalizado = String(texto).toUpperCase();
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

function estimarPesoPaqueteKg(cart = [], microfibras = 0, esponjas = 0) {
  const pesoProductos = cart.reduce((acumulado, item) => {
    const pesoContenido = extraerPesoKgTexto(item.description || "");
    const pesoEnvase = pesoContenido <= 0.6 ? 0.08 : pesoContenido <= 2 ? 0.15 : 0.3;
    return acumulado + (pesoContenido + pesoEnvase) * Number(item.qty || 0);
  }, 0);

  const pesoAccesorios =
    Number(microfibras || 0) * 0.05 + Number(esponjas || 0) * 0.01;

  // 150 g aproximados de caja y protección.
  return Math.max(0.1, Number((pesoProductos + pesoAccesorios + 0.15).toFixed(2)));
}

function calcularPrecioPublicacionML(
  netoObjetivo,
  pesoKg,
  {
    comisionPorcentaje = ML_COMISION_PORCENTAJE,
    retencionesPorcentaje = ML_RETENCIONES_PORCENTAJE,
  } = {}
) {
  const objetivo = Math.max(0, Number(netoObjetivo || 0));
  const kg = Math.max(0.01, Number(pesoKg || 0.01));
  const comisionDecimal = Number(comisionPorcentaje || 0) / 100;
  const retencionesDecimal = Number(retencionesPorcentaje || 0) / 100;
  const porcentajeRestante = 1 - comisionDecimal - retencionesDecimal;

  if (objetivo <= 0 || porcentajeRestante <= 0) {
    return {
      precioExacto: 0,
      precioRecomendado: 0,
      netoEstimado: 0,
      comisionEstimada: 0,
      retencionesEstimadas: 0,
      costoEnvio: 0,
      pesoKg: kg,
    };
  }

  const netoParaPrecio = (precio) => {
    const envio = calcularCostoEnvioML(kg, precio);
    return precio * porcentajeRestante - envio;
  };

  let limiteInferior = 0;
  let limiteSuperior = Math.max(100, objetivo / porcentajeRestante + 4000);

  while (netoParaPrecio(limiteSuperior) < objetivo) {
    limiteSuperior *= 2;
  }

  // Búsqueda binaria del precio exacto mínimo que alcanza el neto objetivo.
  for (let i = 0; i < 80; i += 1) {
    const medio = (limiteInferior + limiteSuperior) / 2;
    if (netoParaPrecio(medio) >= objetivo) limiteSuperior = medio;
    else limiteInferior = medio;
  }

  const precioExacto = limiteSuperior;
  const precioRecomendado = Math.ceil(precioExacto);
  const costoEnvio = calcularCostoEnvioML(kg, precioRecomendado);
  const comisionEstimada = precioRecomendado * comisionDecimal;
  const retencionesEstimadas = precioRecomendado * retencionesDecimal;
  const netoEstimado =
    precioRecomendado -
    comisionEstimada -
    retencionesEstimadas -
    costoEnvio;

  return {
    precioExacto,
    precioRecomendado,
    netoEstimado,
    comisionEstimada,
    retencionesEstimadas,
    costoEnvio,
    pesoKg: kg,
  };
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
  PRECIO_MICRO,
  PRECIO_ESPONJA,
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
}) {
  const [mostrarResumenCarrito, setMostrarResumenCarrito] = useState(true);
  const [mostrarImagenKit, setMostrarImagenKit] = useState(true);
  const pesoEstimadoKg = estimarPesoPaqueteKg(cart, microfibras, esponjas);
  const [pesoPaqueteKg, setPesoPaqueteKg] = useState(pesoEstimadoKg);
  const recomendacionML = calcularPrecioPublicacionML(total, pesoPaqueteKg);

  const cantidadArticulosCarrito =
    cart.reduce((acc, item) => acc + Number(item.qty || 0), 0) +
    Number(microfibras || 0) +
    Number(esponjas || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6 w-full flex-1">
      <section className="lg:col-span-2 overflow-x-auto">
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
      </section>

      <aside
          className="lg:col-span-1 min-w-0 pb-8"
          ref={cartRef}
        >
          <div className="bg-white rounded-2xl shadow lg:sticky lg:top-28 lg:h-[calc(100vh-8.5rem)] overflow-hidden flex flex-col">
          <div className="p-4 flex items-center justify-between border-b">
            <div>
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
                !cart.length && microfibras === 0 && esponjas === 0
              }
              className={`inline-flex items-center justify-center rounded-lg px-2 py-1 transition ${
                cart.length || microfibras > 0 || esponjas > 0
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Vaciar
            </button>
          </div>

          <div className="p-4 pb-16 flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-3">
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
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-gray-600 bg-white">
                        <tr>
                          <th className="text-left py-2 px-2">
                            Producto
                          </th>
                          <th className="text-left py-2 px-2">
                            Precio
                          </th>
                          <th className="text-left py-2 px-2">
                            Cant.
                          </th>
                          <th className="text-left py-2 px-2">
                            Total
                          </th>
                          <th className="py-2 px-2"></th>
                        </tr>
                      </thead>

                      <tbody>
                        {cart.length === 0 ? (
                          <tr>
                            <td
                              className="py-5 px-2 text-gray-500 text-center"
                              colSpan={5}
                            >
                              Aún no hay productos.
                            </td>
                          </tr>
                        ) : (
                          cart.map((l) => (
                            <tr
                              key={l.key}
                              className="border-t align-top"
                            >
                              <td className="py-2 px-2 min-w-[135px]">
                                <div className="font-medium leading-tight">
                                  {l.product}
                                </div>

                                <div className="text-[10px] leading-tight text-gray-500 mt-1">
                                  {l.brand} ·{" "}
                                  {getTipoPrecioLabel(l.tipoPrecio)}
                                </div>

                                <div className="text-[10px] leading-tight text-gray-500">
                                  {l.mode === "unit"
                                    ? "Pieza/Litro"
                                    : "Caja/Paquete"}
                                </div>

                                <div className="text-[10px] leading-tight text-gray-500">
                                  {l.description || "—"}
                                </div>
                              </td>

                              <td className="py-2 px-2 whitespace-nowrap">
                                {peso(l.unitPrice)}
                              </td>

                              <td className="py-2 px-2">
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                    onClick={() => decLine(l.key)}
                                  >
                                    −
                                  </button>

                                  <input
                                    type="number"
                                    min={1}
                                    value={l.qty}
                                    onChange={(e) => {
                                      const nextQty = parseInt(
                                        e.target.value,
                                        10
                                      );

                                      if (
                                        Number.isNaN(nextQty) ||
                                        nextQty < 1
                                      ) {
                                        updateLineQty(l.key, 1);
                                        return;
                                      }

                                      updateLineQty(l.key, nextQty);
                                    }}
                                    className="w-12 text-center border rounded-md py-1 text-xs"
                                  />

                                  <button
                                    type="button"
                                    className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                    onClick={() => incLine(l.key)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>

                              <td className="py-2 px-2 font-medium whitespace-nowrap">
                                {peso(l.unitPrice * l.qty)}
                              </td>

                              <td className="py-2 px-2">
                                <button
                                  type="button"
                                  className="text-red-600 text-xs hover:underline"
                                  onClick={() => removeLine(l.key)}
                                >
                                  Quitar
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
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
                      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 items-end">
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
                          className="rounded-lg border border-yellow-400 bg-white px-3 py-2 text-xs font-medium text-yellow-900 hover:bg-yellow-100"
                        >
                          Usar estimado {pesoEstimadoKg} kg
                        </button>
                      </div>

                      {recomendacionML.precioRecomendado > 0 && (
                        <>
                          <div className="flex items-center justify-between gap-3 border-t border-yellow-300 pt-3">
                            <span className="font-semibold text-yellow-900">
                              Recomendación publicar en ML
                            </span>
                            <span className="text-xl font-bold text-yellow-900">
                              {peso(recomendacionML.precioRecomendado)}
                            </span>
                          </div>

                          <div className="text-xs text-yellow-800">
                            Precio mínimo exacto: {peso(recomendacionML.precioExacto)}
                          </div>

                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-yellow-900">
                            <span>Comisión estimada 12%</span>
                            <span className="text-right">
                              - {peso(recomendacionML.comisionEstimada)}
                            </span>

                            <span>
                              Retenciones estimadas {ML_RETENCIONES_PORCENTAJE.toFixed(2)}%
                            </span>
                            <span className="text-right">
                              - {peso(recomendacionML.retencionesEstimadas)}
                            </span>

                            <span>Envío según {Number(pesoPaqueteKg).toFixed(2)} kg</span>
                            <span className="text-right">
                              - {peso(recomendacionML.costoEnvio)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-t border-yellow-300 pt-2 text-sm">
                            <span>Neto estimado que recibirías</span>
                            <span className="font-bold text-green-700">
                              {peso(recomendacionML.netoEstimado)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-yellow-900">
                            <span>Neto objetivo del cotizador</span>
                            <span className="font-semibold">{peso(total)}</span>
                          </div>

                          <div className="text-[11px] leading-tight text-yellow-700">
                            El envío se toma automáticamente de la tabla oficial según el peso y el rango del precio publicado. Incluye los extras del carrito en el neto objetivo.
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="flex items-center gap-2">
                <span className="min-w-[78px]">Microfibras</span>

                <Qty
                  value={microfibras}
                  onChange={setMicrofibras}
                  min={0}
                />

                <span className="ml-auto whitespace-nowrap">
                  {peso(microfibras * PRECIO_MICRO)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="min-w-[78px]">Esponjas</span>

                <Qty
                  value={esponjas}
                  onChange={setEsponjas}
                  min={0}
                />

                <span className="ml-auto whitespace-nowrap">
                  {peso(esponjas * PRECIO_ESPONJA)}
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
                    1200 × 1200 px · máximo: 15 productos + accesorios
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
                    <div className="aspect-square bg-white border border-dashed rounded-xl grid place-content-center text-center text-gray-400 px-5">
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
                        Imágenes no encontradas:
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
                          esponjas === 0)
                      }
                      className={`w-full py-2 rounded-xl text-white transition ${
                        generandoImagenKit
                          ? "bg-gray-400 cursor-wait"
                          : cart.length ||
                            microfibras > 0 ||
                            esponjas > 0
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
                <button
                  type="button"
                  onClick={guardarComboEnPublicaciones}
                  disabled={
                    !cart.length &&
                    microfibras === 0 &&
                    esponjas === 0
                  }
                  className={`w-full py-2.5 rounded-xl text-white transition ${
                    cart.length || microfibras > 0 || esponjas > 0
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Guardar combo en publicaciones ML
                </button>

                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-[#FF1419] text-white hover:opacity-90"
                  onClick={() => {
                    generarPDFPedido({
                      cart,
                      subtotalBase,
                      subtotal,
                      descuento,
                      descuentoPercent,
                      microfibras,
                      esponjas,
                      PRECIO_MICRO,
                      PRECIO_ESPONJA,
                      total,
                      cotiza,
                      brand,
                      tipoPrecio,
                    });
                  }}
                >
                  Generar cotización PDF
                </button>
              </div>    
          </div>
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
  tipoPrecio,
  add,
  editarComboML,
  eliminarComboML,
  cart,
  clearCart,
  microfibras,
  setMicrofibras,
  esponjas,
  setEsponjas,
  PRECIO_MICRO,
  PRECIO_ESPONJA,
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
                      esponjas === 0
                    }
                    className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                      cart.length ||
                      microfibras > 0 ||
                      esponjas > 0
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

              <div className="flex items-center gap-3">
                <span className="min-w-[95px]">
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

                <span className="ml-auto whitespace-nowrap">
                  {peso(
                    microfibras *
                      PRECIO_MICRO
                  )}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="min-w-[95px]">
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

                <span className="ml-auto whitespace-nowrap">
                  {peso(
                    esponjas *
                      PRECIO_ESPONJA
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
                esponjas === 0
              }
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                cart.length ||
                microfibras > 0 ||
                esponjas > 0
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

function FilaProducto({ p, onAdd, tipoPrecio }) {
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

  const [mode, setMode] = useState(
    unitOnly ? "pack" : "unit"
  );

  const [qty, setQty] = useState(1);

  const hasUnit = !!unitPrice;
  const hasPack = !!packPrice;

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
        {[
            "zach chemical",
            "aqua zach",
            "zach food",
            "magno clean",
          ].includes(
            String(brand || "")
              .trim()
              .toLowerCase()
          ) ? (
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