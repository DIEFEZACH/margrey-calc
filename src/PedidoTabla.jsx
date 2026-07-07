// src/PedidoMargrey.jsx
import React, { useMemo, useState, useRef } from "react";

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
  { product: "PRELAVADOR ALCALINO", code: "-", sku: "-", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 1176.00, unitPrice: 98.00, link: "https://www.comercializadoradtup.com/products/pre-lavado-shampoo-alcalino-margrey-1-l-descontaminante-auto-elimina-grasa-e-insectos?_pos=1&_psq=pre&_ss=e&_v=1.0", image:"https://res.cloudinary.com/dl2s0vpwb/image/upload/v1768537787/prelavador_qp1grh.png"},
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
  { product: "AROMATIZANTE COOL GREY UVA", code: "7501716105230", sku: "2003-01-291", description: "UVA SILVESTRE CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00, link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873374/uva_cgycx1.jpg"},
  { product: "AROMATIZANTE COOL GREY BANANA", code: "7501716105247", sku: "2003-01-294", description: "HAPPY BANANA CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/banana_gd6fup.jpg"},
  { product: "AROMATIZANTE COOL GREY BANANA", code: "7501716105247", sku: "2003-01-294", description: "HAPPY BANANA CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00, link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/banana_gd6fup.jpg"},
  { product: "AROMATIZANTE COOL GREY CARRO NUEVO", code: "7501716105209", sku: "2008-01-291", description: "CARRO NUEVO CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/carro_nuevo_h0fnat.jpg"},
  { product: "AROMATIZANTE COOL GREY CARRO NUEVO", code: "7501716105209", sku: "2008-01-294", description: "CARRO NUEVO CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00, link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/carro_nuevo_h0fnat.jpg"},
  { product: "AROMATIZANTE COOL GREY CEREZA", code: "7501716108453", sku: "2008-01-291", description: "CHERRY CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cereza_waymje.jpg"},
  { product: "AROMATIZANTE COOL GREY CEREZA", code: "7501716108453", sku: "2008-01-294", description: "CHERRY CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00,   link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cereza_waymje.jpg"},
  { product: "AROMATIZANTE COOL GREY FRESA", code: "7501716108521", sku: "2016-01-291", description: "STRAWBERRY-FRESA CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873366/fresa_aaobqq.jpg"},
  { product: "AROMATIZANTE COOL GREY FRESA", code: "7501716108521", sku: "2016-01-294", description: "STRAWBERRY-FRESA CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00,   link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873366/fresa_aaobqq.jpg"},
  { product: "AROMATIZANTE COOL GREY MORAS", code: "7501716108514", sku: "2017-01-291", description: "BERRIES CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 375.00, unitPrice: 13.00,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/moras_dvmsnu.jpg"},
  { product: "AROMATIZANTE COOL GREY MORAS", code: "7501716108514", sku: "2017-01-294", description: "BERRIES CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 468.00, unitPrice: 13.00,   link:"https://www.comercializadoradtup.com/products/aromatizante-colgante-margrey-cool-grey-6-piezas?_pos=1&_psq=cool&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/moras_dvmsnu.jpg"},
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
  { product: "SHAMPOO BUBBLE WASH", code: "7502275980771", sku: "1414-21-299 ", description: "PAQUETE 4 PIEZAS 1.89 LT", unitDescription: "PIEZA INDIVIDUAL 1.89 LT", price: 182.00, tag: "new", unitPrice: 45.50, link:"https://www.comercializadoradtup.com/products/shampoo-auto-bubble-wash-margrey-1-89-l?_pos=1&_psq=bubble&_ss=e&_v=1.0", image:"https://res.cloudinary.com/diefezach/image/upload/v1731041824/bubble_wash_bbzfb1.jpg"},
  { product: "DTUP", category: "DTUP", name: "dtup" },
  { product: "CLARIFICADOR", brand: "DTUP", code: "-", sku: "clarificador dtup", description: "PORRON 20 LT", price: 575.00, unitPrice: 28.75, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "FLOCULANTE", brand: "DTUP", code: "-", sku: "floculante dtup", description: "PORRON 20 LT", price: 675.00, unitPrice: 33.75, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { brand: "Zach Chemical", product: "ROMPE GRASAS", category: "Zach Chemical", description: "1 LT", price: 48.00, unitPrice: 48.00, mayoreo: 72.50, mostrador: 160.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "ROMPE GRASAS", category: "Zach Chemical", description: "4 LT", price: 141.00, unitPrice: 141.00, mayoreo: 217.00, mostrador: 320.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "ROMPE GRASAS", category: "Zach Chemical", description: "20 LT", price: 660.00, unitPrice: 660.00, mayoreo: 990.00, mostrador: 1280.00, digital: 1599.00 },
  { brand: "Zach Chemical", product: "APC ORANGE NEUTRO", category: "Zach Chemical", description: "1 LT", price: 37.00, unitPrice: 37.00, mayoreo: 57.00, mostrador: 159.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "APC ORANGE NEUTRO", category: "Zach Chemical", description: "4 LT", price: 100.00, unitPrice: 100.00, mayoreo: 153.00, mostrador: 320.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "APC ORANGE NEUTRO", category: "Zach Chemical", description: "20 LT", price: 510.00, unitPrice: 510.00, mayoreo: 783.00, mostrador: 1280.00, digital: 1599.00 },
  { brand: "Zach Chemical", product: "DETERGENTE ALCALINO", category: "Zach Chemical", description: "1 LT", price: 37.00, unitPrice: 37.00, mayoreo: 57.00, mostrador: 159.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "DETERGENTE ALCALINO", category: "Zach Chemical", description: "4 LT", price: 100.00, unitPrice: 100.00, mayoreo: 153.00, mostrador: 320.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "DETERGENTE ALCALINO", category: "Zach Chemical", description: "20 LT", price: 510.00, unitPrice: 510.00, mayoreo: 783.00, mostrador: 1280.00, digital: 1599.00 },
  { brand: "Zach Chemical", product: "LAVAGARRAFONES", category: "Zach Chemical", description: "1 LT", price: 43.00, unitPrice: 43.00, mayoreo: 66.00, mostrador: 159.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "LAVAGARRAFONES", category: "Zach Chemical", description: "4 LT", price: 123.00, unitPrice: 123.00, mayoreo: 189.00, mostrador: 320.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "LAVAGARRAFONES", category: "Zach Chemical", description: "20 LT", price: 627.00, unitPrice: 627.00, mayoreo: 965.00, mostrador: 1280.00, digital: 1599.00 },
  { brand: "Zach Chemical", product: "SOLVEX N6", category: "Zach Chemical", description: "1 LT", price: 40.00, unitPrice: 40.00, mayoreo: 60.00, mostrador: 163.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "SOLVEX N6", category: "Zach Chemical", description: "4 LT", price: 105.00, unitPrice: 105.00, mayoreo: 160.00, mostrador: 330.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "SOLVEX N6", category: "Zach Chemical", description: "20 LT", price: 520.00, unitPrice: 520.00, mayoreo: 790.00, mostrador: 1295.00, digital: 1599.00 },
  { brand: "Zach Chemical", product: "SHAMPOO NEUTRO LIMPIADOR", category: "Zach Chemical", description: "1 LT", price: 43.00, unitPrice: 43.00, mayoreo: 66.00, mostrador: 159.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "SHAMPOO NEUTRO LIMPIADOR", category: "Zach Chemical", description: "4 LT", price: 123.00, unitPrice: 123.00, mayoreo: 189.00, mostrador: 320.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "SHAMPOO NEUTRO LIMPIADOR", category: "Zach Chemical", description: "20 LT", price: 627.00, unitPrice: 627.00, mayoreo: 965.00, mostrador: 1280.00, digital: 1599.00 },
  { brand: "Zach Chemical", product: "ROMPE MANCHAS ORGANICAS", category: "Zach Chemical", description: "1 LT", price: 52.00, unitPrice: 52.00, mayoreo: 80.00, mostrador: 159.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "ROMPE MANCHAS ORGANICAS", category: "Zach Chemical", description: "4 LT", price: 160.00, unitPrice: 160.00, mayoreo: 246.00, mostrador: 320.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "ROMPE MANCHAS ORGANICAS", category: "Zach Chemical", description: "20 LT", price: 810.00, unitPrice: 810.00, mayoreo: 1246.00, mostrador: 1359.00, digital: 1699.00 },
  { brand: "Zach Chemical", product: "DETERGENTE LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "1 LT", price: 52.00, unitPrice: 52.00, mayoreo: 80.00, mostrador: 159.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "DETERGENTE LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "4 LT", price: 160.00, unitPrice: 160.00, mayoreo: 246.00, mostrador: 320.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "DETERGENTE LIMPIADOR DE COLCHONES", category: "Zach Chemical", description: "20 LT", price: 810.00, unitPrice: 810.00, mayoreo: 1246.00, mostrador: 1359.00, digital: 1699.00 },
  { brand: "Zach Chemical", product: "VINAGRE DE LIMPIEZA 8%", category: "Zach Chemical", description: "1 LT", price: 34.00, unitPrice: 34.00, mayoreo: 52.00, mostrador: 159.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "VINAGRE DE LIMPIEZA 8%", category: "Zach Chemical", description: "4 LT", price: 88.00, unitPrice: 88.00, mayoreo: 136.00, mostrador: 209.00, digital: 298.00 },
  { brand: "Zach Chemical", product: "VINAGRE DE LIMPIEZA 8%", category: "Zach Chemical", description: "20 LT", price: 450.00, unitPrice: 450.00, mayoreo: 700.00, mostrador: 880.00, digital: 1099.00 },
  { brand: "Zach Chemical", product: "TITAN BIO PET", category: "Zach Chemical", description: "500 ML", price: 75.00, unitPrice: 75.00, mayoreo: 140.00, mostrador: 240.00, digital: 299.00 },
  { brand: "Zach Chemical", product: "ACARO FIN", category: "Zach Chemical", description: "500 ML", price: 75.00, unitPrice: 75.00, mayoreo: 140.00, mostrador: 240.00, digital: 299.00 },
  { brand: "Zach Chemical", product: "BLACK REVIVE", category: "Zach Chemical", description: "500 ML", price: 65.00, unitPrice: 65.00, mayoreo: 140.00, mostrador: 240.00, digital: 299.00 },
  { brand: "Zach Chemical", product: "PLANCHA FACIL", category: "Zach Chemical", description: "1 LT", price: 37.00, unitPrice: 37.00, mayoreo: 57.00, mostrador: 159.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "PLANCHA FACIL", category: "Zach Chemical", description: "4 LT", price: 100.00, unitPrice: 100.00, mayoreo: 153.00, mostrador: 320.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "PLANCHA FACIL", category: "Zach Chemical", description: "20 LT", price: 510.00, unitPrice: 510.00, mayoreo: 783.00, mostrador: 1280.00, digital: 1599.00 },
  { brand: "Zach Chemical", product: "BIOTECHX", category: "Zach Chemical", description: "1 LT", price: 41.00, unitPrice: 41.00, mayoreo: 63.00, mostrador: 159.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "BIOTECHX", category: "Zach Chemical", description: "4 LT", price: 116.00, unitPrice: 116.00, mayoreo: 180.00, mostrador: 320.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "BIOTECHX", category: "Zach Chemical", description: "20 LT", price: 590.00, unitPrice: 590.00, mayoreo: 910.00, mostrador: 1280.00, digital: 1599.00 },
  { brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO", category: "Zach Chemical", description: "1 LT", price: 41.00, unitPrice: 41.00, mayoreo: 63.00, mostrador: 159.00, digital: 199.00 },
  { brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO", category: "Zach Chemical", description: "4 LT", price: 116.00, unitPrice: 116.00, mayoreo: 180.00, mostrador: 320.00, digital: 399.00 },
  { brand: "Zach Chemical", product: "ELIMINADOR DE OLORES MASCOTA ENZIMATICO", category: "Zach Chemical", description: "20 LT", price: 590.00, unitPrice: 590.00, mayoreo: 910.00, mostrador: 1280.00, digital: 1599.00 },
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

  { brand: "Magno Clean", product: "NEUTRO CAR", category: "Magno", code: "SHPHNC20", description: "20 LTS", price: 959.40, unitPrice: 959.40, mayoreo: 1279.20, mostrador: 1599.00, digital: 1599.00 }

];

const peso = (n) =>
  Number(n || 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

const DEFAULT_BRAND = "Margrey";
const PUBLICACIONES_STORAGE_KEY = "pedidoMargrey_publicacionesML";

function getBrand(p = {}) {
  return p.brand || DEFAULT_BRAND;
}

function getTipoPrecioLabel(tipoPrecio) {
  if (tipoPrecio === "mayoreo") return "Mayoreo";
  if (tipoPrecio === "mostrador") return "Mostrador";
  if (tipoPrecio === "digital") return "Digital";
  return "Digital";
}

function precioPublico(valor, item = {}, tipoPrecio = "digital") {
  const brand = getBrand(item);

  if (brand === "Zach Chemical" || brand === "Magno Clean") {
    if (tipoPrecio === "mayoreo") return Number(item.mayoreo || 0);
    if (tipoPrecio === "mostrador")
      return Number(item.mostrador || item.mayoreo || 0);
    if (tipoPrecio === "digital")
      return Number(item.digital || item.mostrador || item.mayoreo || 0);

    return Number(item.digital || item.mostrador || item.mayoreo || 0);
  }

  const precioBase = Number(valor || 0) * 2;

  if (tipoPrecio === "mayoreo") return precioBase * 0.75;
  if (tipoPrecio === "mostrador") return precioBase;
  if (tipoPrecio === "digital") return precioBase;

  return precioBase;
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
  const brand = getBrand(p);

  if (brand === "Zach Chemical" || brand === "Magno Clean") return true;

  const t = getTextoPresentacion(p);
  const esGranel = /(PORR[ÓO]N|PORRON|CUBETA|TAMBOR)/.test(t);

  if (!esGranel) return false;

  const m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:LT|LTS|L)\b/);

  if (m) {
    const n = parseFloat(m[1].replace(",", "."));
    return n > 4;
  }

  if (/(19|20|25|50|60|100|200|208)\s*(?:LT|LTS|L)\b/.test(t)) return true;

  return true;
}

function cargarPublicacionesML() {
  try {
    const raw = localStorage.getItem(PUBLICACIONES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Error leyendo publicaciones ML:", error);
    return {};
  }
}

function guardarPublicacionesML(data) {
  try {
    localStorage.setItem(PUBLICACIONES_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error guardando publicaciones ML:", error);
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

  const [linkML, setLinkML] = useState("");
  const [estadoPublicacion, setEstadoPublicacion] = useState("Publicado");
  const [notasPublicacion, setNotasPublicacion] = useState("");

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
    return Object.values(publicacionesML).filter((x) => x?.publicado).length;
  }, [publicacionesML]);

  const subtotalBase = useMemo(
    () => cart.reduce((a, l) => a + l.unitPrice * l.qty, 0),
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
    const costoBase = mode === "unit" ? item.unitPrice : item.price;
    const unitPrice = precioPublico(costoBase, item, tipoPrecio);

    if (!unitPrice) return;

    const key = makeLineKey(item, mode);

    setCart((prev) => {
      const i = prev.find((x) => x.key === key);

      if (i) {
        return prev.map((x) =>
          x.key === key ? { ...x, qty: x.qty + qty } : x
        );
      }

      return [
        ...prev,
        {
          key,
          brand: getBrand(item),
          product: item.product,
          sku: item.sku,
          code: item.code ?? null,
          description:
            mode === "unit"
              ? item.unitDescription || item.description
              : item.description,
          mode,
          qty,
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
    setCart((prev) => {
      const item = prev.find((x) => x.key === key);

      if (!item) return prev;

      if (item.qty <= 1) return prev.filter((x) => x.key !== key);

      return prev.map((x) =>
        x.key === key ? { ...x, qty: x.qty - 1 } : x
      );
    });
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
    if (!cart.length) return;
    if (confirm("¿Vaciar toda la cotización?")) setCart([]);
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
      .map((l) => {
        return `• ${l.qty} × ${l.product}${l.description ? ` - ${l.description}` : ""}`;
      })
      .join("\n");

    const extras = [
      microfibras > 0
        ? `• ${microfibras} × Microfibra${microfibras > 1 ? "s" : ""}`
        : null,
      esponjas > 0
        ? `• ${esponjas} × Esponja${esponjas > 1 ? "s" : ""}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `
✅ Publicación creada en Mercado Libre

📦 Producto / Combo:
${productos || "—"}

${extras ? `🧩 Extras incluidos:\n${extras}\n` : ""}🔗 Link de publicación:
${linkML || "Pendiente de agregar"}

📌 Estado:
${estadoPublicacion || "Publicado"}

📝 Notas:
${notasPublicacion || "—"}

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

  function guardarComboEnPublicaciones() {
  if (!cart.length && microfibras === 0 && esponjas === 0) {
    alert("Agrega productos o extras antes de guardar el combo.");
    return;
  }

  const key = `combo-${Date.now()}`;

  const descripcionCombo = [
    ...cart.map(
      (l) =>
        `${l.qty} × ${l.product}${
          l.description ? ` - ${l.description}` : ""
        }`
    ),
    microfibras > 0
      ? `${microfibras} × Microfibra${microfibras > 1 ? "s" : ""}`
      : null,
    esponjas > 0
      ? `${esponjas} × Esponja${esponjas > 1 ? "s" : ""}`
      : null,
  ]
    .filter(Boolean)
    .join(" + ");

  updatePublicacionML(key, {
    publicado: false,
    product: "Combo personalizado",
    brand: "Mercado Libre",
    sku: key,
    code: "",
    description: descripcionCombo,
    linkML: "",
    estado: "Pendiente",
    notas: "",
    fecha: "",
    total,
    isCombo: true,
  });

  alert(
    "Combo guardado como pendiente. Ahora puedes completar su publicación en Publicaciones ML."
  );
}

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col scroll-smooth">
      <header className="sticky top-0 z-10 bg-[#FF1419] text-white border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 mr-auto">
            <img
              className="w-9 h-9 rounded"
              src="https://res.cloudinary.com/dl2s0vpwb/image/upload/v1781551142/Margrey_2025_atwtf1.jpg"
              alt="Logo"
            />
            <h2 className="font-semibold text-lg">
              {modo === "cotizador" ? "Cotizador" : "Publicaciones ML"}
            </h2>
          </div>

          <div className="flex rounded-xl overflow-hidden border border-white/40">
            <button
              type="button"
              onClick={() => setModo("cotizador")}
              className={`px-3 py-2 text-sm ${
                modo === "cotizador"
                  ? "bg-white text-[#FF1419]"
                  : "bg-transparent text-white hover:bg-red-500/30"
              }`}
            >
              Cotizador
            </button>

            <button
              type="button"
              onClick={() => setModo("publicaciones")}
              className={`px-3 py-2 text-sm ${
                modo === "publicaciones"
                  ? "bg-white text-[#FF1419]"
                  : "bg-transparent text-white hover:bg-red-500/30"
              }`}
            >
              Publicaciones ML
            </button>
          </div>

          <input
            className="border border-white/40 bg-white text-gray-900 rounded-lg px-3 py-2 w-full sm:w-72 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Buscar producto, SKU, código…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select
            className="border border-white/40 bg-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={tipoPrecio}
            onChange={(e) => setTipoPrecio(e.target.value)}
          >
            <option value="mayoreo">Mayoreo</option>
            <option value="mostrador">Mostrador</option>
            <option value="digital">Digital</option>
          </select>

          <select
            className="border border-white/40 bg-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setCategory("todas");
              setUnidadFiltro("todas");
            }}
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b === "todas" ? "Todas las marcas" : b}
              </option>
            ))}
          </select>

          <select
            className="border border-white/40 bg-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setUnidadFiltro("todas");
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "todas" ? "Todas las categorías" : c}
              </option>
            ))}
          </select>

          <select
            className="border border-white/40 bg-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={unidadFiltro}
            onChange={(e) => setUnidadFiltro(e.target.value)}
          >
            {unidadesDisponibles.map((u) => (
              <option key={u} value={u}>
                {u === "todas" ? "Todas las unidades" : getUnidadLabel(u)}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={goToCart}
            aria-label="Ir al carrito"
            className="relative px-3 py-2 rounded hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <i className="fas fa-shopping-cart text-xl"></i>
            <span className="absolute -top-1 -right-1 bg-yellow-300 text-black text-xs rounded-full px-2">
              {cartQty}
            </span>
          </button>
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
          guardarComboEnPublicaciones={guardarComboEnPublicaciones}
        />
      ) : (
        <VistaPublicacionesML
          productos={productosPublicacion}
          publicacionesML={publicacionesML}
          updatePublicacionML={updatePublicacionML}
          totalPublicados={totalPublicados}
          tipoPrecio={tipoPrecio}
          add={add}
          editarComboML={editarComboML}
          eliminarComboML={eliminarComboML}
          cart={cart}
          microfibras={microfibras}
          setMicrofibras={setMicrofibras}
          esponjas={esponjas}
          setEsponjas={setEsponjas}
          PRECIO_MICRO={PRECIO_MICRO}
          PRECIO_ESPONJA={PRECIO_ESPONJA}
          total={total}
          linkML={linkML}
          setLinkML={setLinkML}
          estadoPublicacion={estadoPublicacion}
          setEstadoPublicacion={setEstadoPublicacion}
          notasPublicacion={notasPublicacion}
          setNotasPublicacion={setNotasPublicacion}
          copiarMensajePublicacionML={copiarMensajePublicacionML}
        />
      )}

      <footer className="bg-[#FF1419] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} DTUP · Comercializadora DTUP</span>
          <a
            className="underline decoration-white/60 hover:decoration-white"
            href="mailto:comercializadoradtup@hotmail.com"
          >
            Soporte: comercializadoradtup@hotmail.com
          </a>
        </div>
      </footer>
    </div>
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
  PRECIO_MICRO,
  PRECIO_ESPONJA,
  total,
  cotiza,
  setCotiza,
  brand,
  guardarComboEnPublicaciones,
}) {
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

      <aside className="lg:col-span-1" ref={cartRef}>
        <div className="bg-white rounded-2xl shadow lg:sticky lg:top-20">
          <div className="p-4 flex items-center justify-between border-b">
            <h3 className="text-lg font-semibold">Carrito de compras</h3>

            <button
              type="button"
              onClick={clearCart}
              disabled={!cart.length}
              className={`inline-flex items-center justify-center rounded-lg px-2 py-1 transition ${
                cart.length
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Vaciar
            </button>
          </div>

          <div className="p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-600">
                  <tr>
                    <th className="text-left py-2">Producto</th>
                    <th className="text-left py-2">Precio</th>
                    <th className="text-left py-2">Cant.</th>
                    <th className="text-left py-2">Total</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>

                <tbody>
                  {cart.length === 0 ? (
                    <tr>
                      <td className="py-4 text-gray-500" colSpan={5}>
                        Aún no hay productos.
                      </td>
                    </tr>
                  ) : (
                    cart.map((l) => (
                      <tr key={l.key} className="border-t">
                        <td className="py-2">
                          <div className="font-medium">{l.product}</div>

                          <div className="text-xs text-gray-500">
                            {l.brand} · {getTipoPrecioLabel(l.tipoPrecio)} ·{" "}
                            {l.mode === "unit" ? "Pieza/Litro" : "Caja/Paquete"} ·{" "}
                            {l.description || "—"}
                          </div>
                        </td>

                        <td className="py-2">{peso(l.unitPrice)}</td>

                        <td className="py-2">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="px-2 py-0.5 rounded-lg bg-gray-100 hover:bg-gray-200"
                              onClick={() => decLine(l.key)}
                            >
                              −
                            </button>

                            <input
                              type="number"
                              min={1}
                              value={l.qty}
                              onChange={(e) => {
                                const nextQty = parseInt(e.target.value, 10);

                                if (Number.isNaN(nextQty) || nextQty < 1) {
                                  updateLineQty(l.key, 1);
                                  return;
                                }

                                updateLineQty(l.key, nextQty);
                              }}
                              className="w-14 text-center border rounded-lg py-1 text-sm"
                            />

                            <button
                              type="button"
                              className="px-2 py-0.5 rounded-lg bg-gray-100 hover:bg-gray-200"
                              onClick={() => incLine(l.key)}
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="py-2 font-medium">
                          {peso(l.unitPrice * l.qty)}
                        </td>

                        <td className="py-2">
                          <button
                            type="button"
                            className="text-red-600"
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

            <div className="sticky bottom-0 z-10 bg-white border-t pt-3 pb-4 space-y-3 text-sm shadow-[0_-6px_10px_-6px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <span>Subtotal productos</span>
                <span className="font-medium">{peso(subtotalBase)}</span>
              </div>

              <label className="block">
                <span className="text-sm font-medium">Descuento</span>

                <select
                  value={descuentoPercent}
                  onChange={(e) => setDescuentoPercent(Number(e.target.value))}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {opcionesDescuento.map((n) => (
                    <option key={n} value={n}>
                      {n === 0 ? "Sin descuento" : `${n}% de descuento`}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() =>
                  setDescuentoPercent((prev) => (prev === 25 ? 0 : 25))
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
                    <span>Descuento aplicado {descuentoPercent}%</span>
                    <span className="font-medium">- {peso(descuento)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Subtotal con descuento</span>
                    <span className="font-medium">{peso(subtotal)}</span>
                  </div>
                </>
              )}

              <div className="flex items-center gap-3">
                <span>Microfibras</span>
                <Qty value={microfibras} onChange={setMicrofibras} min={0} />
                <span className="ml-auto">{peso(microfibras * PRECIO_MICRO)}</span>
              </div>

              <div className="flex items-center gap-3">
                <span>Esponjas</span>
                <Qty value={esponjas} onChange={setEsponjas} min={0} />
                <span className="ml-auto">{peso(esponjas * PRECIO_ESPONJA)}</span>
              </div>

              <div className="flex items-center justify-between text-base">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">{peso(total)}</span>
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
              <button
                type="button"
                onClick={guardarComboEnPublicaciones}
                disabled={!cart.length && microfibras === 0 && esponjas === 0}
                className={`w-full py-2 rounded-xl text-white transition ${
                  cart.length || microfibras > 0 || esponjas > 0
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Guardar combo en publicaciones ML
              </button>

              <button
                className="w-full mt-1 py-2 rounded-xl bg-[#FF1419] text-white hover:opacity-90"
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
  microfibras,
  setMicrofibras,
  esponjas,
  setEsponjas,
  PRECIO_MICRO,
  PRECIO_ESPONJA,
  total,
  linkML,
  setLinkML,
  estadoPublicacion,
  setEstadoPublicacion,
  notasPublicacion,
  setNotasPublicacion,
  copiarMensajePublicacionML,
}) {
  const [filtroEstado, setFiltroEstado] = useState("todas");

  const registros = useMemo(() => {
    const base = productos.map((p) => ({
      ...p,
      tipoRegistro: "producto",
    }));

    const combos = Object.entries(publicacionesML)
      .filter(([, data]) => data?.isCombo)
      .map(([key, data]) => ({
        publicacionKey: key,
        product: data.product || "Combo personalizado",
        brand: data.brand || "Mercado Libre",
        sku: data.sku || key,
        code: data.code || "",
        description: data.description || "",
        image: "",
        price: data.total || 0,
        unitPrice: data.total || 0,
        tipoRegistro: "combo",
      }));

    return [...combos, ...base];
  }, [productos, publicacionesML]);

  const productosFiltrados = useMemo(() => {
    return registros.filter((p) => {
      const data = publicacionesML[p.publicacionKey] || {};

      if (filtroEstado === "todas") return true;
      if (filtroEstado === "publicadas") return !!data.publicado;
      if (filtroEstado === "pendientes") return !data.publicado;
      if (filtroEstado === "sinLink") return !data.linkML;
      if (filtroEstado === "sinImagen") return !p.image && !data.isCombo;

      return true;
    });
  }, [registros, publicacionesML, filtroEstado]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 w-full flex-1 grid lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="p-4 border-b flex flex-wrap items-center gap-3">
            <div className="mr-auto">
              <h3 className="text-lg font-semibold">
                Modo Publicaciones Mercado Libre
              </h3>
              <p className="text-sm text-gray-500">
                Publicados guardados: {totalPublicados}
              </p>
            </div>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="todas">Todas</option>
              <option value="pendientes">Pendientes</option>
              <option value="publicadas">Publicadas</option>
              <option value="sinLink">Sin link ML</option>
              <option value="sinImagen">Sin imagen</option>
            </select>
          </div>

          <div className="overflow-auto">
            <table className="w-full text-sm min-w-[1200px]">
              <thead className="bg-[#FF1419] text-white sticky top-0">
                <tr>
                  <th className="text-left p-3 w-24">Publicado</th>
                  <th className="text-left p-3">Producto</th>
                  <th className="text-left p-3 w-36">SKU / UPC</th>
                  <th className="text-left p-3 w-32">Unidad</th>
                  <th className="text-left p-3 w-32">Precio digital</th>
                  <th className="text-left p-3 w-64">Link ML</th>
                  <th className="text-left p-3 w-40">Estado</th>
                  <th className="text-left p-3 w-72">Notas</th>
                  <th className="text-left p-3 w-36">Fecha</th>
                  <th className="text-left p-3 w-28">Acción</th>
                  <th className="text-left p-3 w-40">Administrar</th>
                </tr>
              </thead>

              <tbody>
                {productosFiltrados.length === 0 ? (
                  <tr>
                    <td className="p-4 text-gray-500" colSpan={10}>
                      Sin productos para mostrar.
                    </td>
                  </tr>
                ) : (
                  productosFiltrados.map((p) => {
                    const data = publicacionesML[p.publicacionKey] || {};
                    const precio = data.isCombo
                      ? data.total || 0
                      : precioPublico(p.unitPrice || p.price, p, "digital");

                    return (
                      <tr key={p.publicacionKey} className="border-t align-top">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            className="w-5 h-5"
                            checked={!!data.publicado}
                            onChange={(e) =>
                              updatePublicacionML(p.publicacionKey, {
                                publicado: e.target.checked,
                                estado: e.target.checked
                                  ? "Publicado"
                                  : data.estado || "Pendiente",
                                fecha: e.target.checked
                                  ? new Date().toLocaleDateString("es-MX")
                                  : data.fecha || "",
                                product: p.product,
                                brand: getBrand(p),
                                sku: p.sku || "",
                                code: p.code || "",
                                description: p.description || "",
                                isCombo: !!data.isCombo,
                              })
                            }
                          />
                        </td>

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
                                {data.isCombo ? "Combo" : "Sin foto"}
                              </div>
                            )}

                            <div>
                              <div className="font-semibold">{p.product}</div>
                              <div className="text-xs text-gray-500">
                                {getBrand(p)} · {p.description || "—"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-3 text-xs">
                          <div>{p.sku || "—"}</div>
                          <div className="text-gray-500">{p.code || "—"}</div>
                        </td>

                        <td className="p-3 text-xs">
                          {data.isCombo ? "Combo" : getUnidadLabel(getUnidadMedida(p))}
                        </td>

                        <td className="p-3 whitespace-nowrap">{peso(precio)}</td>

                        <td className="p-3">
                          <input
                            type="url"
                            value={data.linkML || ""}
                            onChange={(e) =>
                              updatePublicacionML(p.publicacionKey, {
                                linkML: e.target.value,
                                product: p.product,
                                brand: getBrand(p),
                                sku: p.sku || "",
                                code: p.code || "",
                                description: p.description || "",
                                isCombo: !!data.isCombo,
                              })
                            }
                            placeholder="https://articulo.mercadolibre.com.mx/..."
                            className="w-full border rounded-lg px-2 py-1"
                          />
                        </td>

                        <td className="p-3">
                          <select
                            value={data.estado || "Pendiente"}
                            onChange={(e) =>
                              updatePublicacionML(p.publicacionKey, {
                                estado: e.target.value,
                                publicado: e.target.value === "Publicado",
                                fecha:
                                  e.target.value === "Publicado"
                                    ? data.fecha ||
                                      new Date().toLocaleDateString("es-MX")
                                    : data.fecha || "",
                                product: p.product,
                                brand: getBrand(p),
                                sku: p.sku || "",
                                code: p.code || "",
                                description: p.description || "",
                                isCombo: !!data.isCombo,
                              })
                            }
                            className="w-full border rounded-lg px-2 py-1 bg-white"
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En proceso">En proceso</option>
                            <option value="Publicado">Publicado</option>
                            <option value="En revisión">En revisión</option>
                            <option value="Pausado">Pausado</option>
                            <option value="Sin stock">Sin stock</option>
                            <option value="Revisar">Revisar</option>
                          </select>
                        </td>

                        <td className="p-3">
                          <textarea
                            value={data.notas || ""}
                            onChange={(e) =>
                              updatePublicacionML(p.publicacionKey, {
                                notas: e.target.value,
                                product: p.product,
                                brand: getBrand(p),
                                sku: p.sku || "",
                                code: p.code || "",
                                description: p.description || "",
                                isCombo: !!data.isCombo,
                              })
                            }
                            rows={2}
                            placeholder="Notas internas..."
                            className="w-full border rounded-lg px-2 py-1 resize-none"
                          />
                        </td>

                        <td className="p-3 text-xs text-gray-600">
                          {data.fecha || "—"}
                        </td>

                        <td className="p-3">
                          {!data.isCombo ? (
                            <button
                              type="button"
                              onClick={() => add(p, isUnitOnly(p) ? "pack" : "unit", 1)}
                              className="px-3 py-2 rounded-xl bg-[#FF1419] text-white hover:opacity-90"
                            >
                              Agregar
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">Combo</span>
                          )}
                        </td>
                        <td className="p-3">
                          {data.isCombo ? (
                            <div className="flex flex-col gap-2">
                              <button
                                type="button"
                                onClick={() => editarComboML(p.publicacionKey)}
                                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                              >
                                Editar
                              </button>

                              <button
                                type="button"
                                onClick={() => eliminarComboML(p.publicacionKey)}
                                className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                              >
                                Eliminar
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">
                              Producto del catálogo
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <aside className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow p-4 lg:sticky lg:top-20 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Mensaje para grupo WhatsApp</h3>
            <p className="text-sm text-gray-500">
              Arma el combo con el botón Agregar y copia el mensaje para pegarlo en el grupo.
            </p>
          </div>

          <div className="border rounded-xl p-3 bg-gray-50 space-y-3">
            <div className="font-semibold text-sm">Publicación Mercado Libre</div>

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Productos en carrito</span>
                <span className="font-semibold">{cart.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Microfibras</span>
                <span className="font-semibold">{microfibras}</span>
              </div>

              <div className="flex justify-between">
                <span>Esponjas</span>
                <span className="font-semibold">{esponjas}</span>
              </div>

              <div className="flex justify-between pt-2 border-t mt-2">
                <span>Total interno</span>
                <span className="font-bold">{peso(total)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span>Microfibras</span>
              <Qty value={microfibras} onChange={setMicrofibras} min={0} />
              <span className="ml-auto">{peso(microfibras * PRECIO_MICRO)}</span>
            </div>

            <div className="flex items-center gap-3">
              <span>Esponjas</span>
              <Qty value={esponjas} onChange={setEsponjas} min={0} />
              <span className="ml-auto">{peso(esponjas * PRECIO_ESPONJA)}</span>
            </div>

            <label className="block">
              <span className="text-sm">Link de publicación ML</span>
              <input
                type="url"
                value={linkML}
                onChange={(e) => setLinkML(e.target.value)}
                placeholder="https://articulo.mercadolibre.com.mx/..."
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </label>

            <label className="block">
              <span className="text-sm">Estado</span>
              <select
                value={estadoPublicacion}
                onChange={(e) => setEstadoPublicacion(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Publicado">Publicado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En revisión">En revisión</option>
                <option value="Pausado">Pausado</option>
                <option value="Sin stock">Sin stock</option>
                <option value="Revisar">Revisar</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm">Notas para el grupo</span>
              <textarea
                value={notasPublicacion}
                onChange={(e) => setNotasPublicacion(e.target.value)}
                placeholder="Ej. Combo publicado con 1 crema, 1 silicrem, 1 esponja y 2 microfibras."
                rows={3}
                className="mt-1 w-full border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </label>

            <button
              type="button"
              onClick={copiarMensajePublicacionML}
              className="w-full py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
            >
              Copiar mensaje para grupo WhatsApp
            </button>

          </div>
        </div>
      </aside>
    </div>
  );
}

function FilaProducto({ p, onAdd, tipoPrecio }) {
  const unitOnly = isUnitOnly(p);
  const litros = getLitros(p);
  const brand = getBrand(p);

  const unitPriceCosto = unitOnly ? undefined : p.unitPrice;
  const packPriceCosto = p.price;

  const unitPrice = unitPriceCosto
    ? precioPublico(unitPriceCosto, p, tipoPrecio)
    : undefined;

  const packPrice = packPriceCosto
    ? precioPublico(packPriceCosto, p, tipoPrecio)
    : undefined;

  const pricePerLtInfo =
    unitPrice ?? (packPrice && litros ? packPrice / litros : undefined);

  const [mode, setMode] = useState(unitOnly ? "pack" : "unit");
  const [qty, setQty] = useState(1);

  const hasUnit = !!unitPrice;
  const hasPack = !!packPrice;

  const disabled = (mode === "unit" && !hasUnit) || (mode === "pack" && !hasPack);

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
            <div className="font-semibold leading-tight">{p.product}</div>
            <div className="text-[11px] text-gray-500">
              {brand}
              {p.sku && <> · SKU: {p.sku}</>}
              {p.code && <> · UPC: {p.code}</>}
              <> · {getUnidadLabel(getUnidadMedida(p))}</>
            </div>
          </div>
        </div>
      </td>

      <td className="p-3">
        <div className="text-sm">
          {p.description || p.unitDescription || p.name || "—"}
        </div>

        {p.link && (
          <a
            className="text-xs text-red-600 hover:underline"
            href={p.link.replace("comercializadoradtpu", "comercializadoradtup")}
            target="_blank"
            rel="noreferrer"
          >
            Ver detalle / ficha
          </a>
        )}
      </td>

      <td className="p-3 whitespace-nowrap">
        {brand === "Zach Chemical" || brand === "Magno Clean" ? (
          <>
            <div className="text-xs text-gray-500">
              {getTipoPrecioLabel(tipoPrecio)}
            </div>
            <div className="font-medium">{peso(packPrice)}</div>
          </>
        ) : unitOnly ? (
          <>
            <div className="text-xs text-gray-500">Precio por litro</div>
            <div className="font-medium">
              {pricePerLtInfo ? peso(pricePerLtInfo) : "—"}
            </div>

            <div className="text-xs text-gray-500 mt-1">Envase completo</div>
            <div className="font-medium">{hasPack ? peso(packPrice) : "—"}</div>
          </>
        ) : (
          <>
            <div className="text-xs text-gray-500">Pieza/Litro</div>
            <div className="font-medium">{hasUnit ? peso(unitPrice) : "—"}</div>

            <div className="text-xs text-gray-500 mt-1">Caja/Paquete</div>
            <div className="font-medium">{hasPack ? peso(packPrice) : "—"}</div>
          </>
        )}
      </td>

      <td className="p-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="border rounded-lg px-2 py-1 text-sm"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="unit" disabled={!hasUnit}>
              Pieza/Litro {hasUnit ? `(${peso(unitPrice)})` : "(—)"}
            </option>

            <option value="pack" disabled={!hasPack}>
              {unitOnly ? "Envase completo" : "Caja/Paquete"}{" "}
              {hasPack ? `(${peso(packPrice)})` : "(—)"}
            </option>
          </select>

          <Qty value={qty} onChange={setQty} />

          <button
            className={`inline-flex items-center justify-center px-3 py-2 rounded-xl text-white whitespace-nowrap ${
              disabled ? "bg-gray-300" : "bg-[#FF1419] hover:opacity-90"
            }`}
            disabled={disabled}
            onClick={() => onAdd({ ...p }, mode, qty)}
          >
            Agregar
          </button>
        </div>
      </td>
    </tr>
  );
}