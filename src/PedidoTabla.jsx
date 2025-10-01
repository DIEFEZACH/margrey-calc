// src/PedidoMargrey.jsx
import React, { useMemo, useState, useRef, useLayoutEffect } from "react";

/** =======================
 *  Base de productos
 *  ======================= */
const products = [
  { product: "AUTO BRILLO A", category: "AUTO BRILLO A", name: "auto brillo a" },
  { product: "AUTO BRILLO A", code: "7501716100013", sku: "0101-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 1572.00, unitPrice: 131.00, link: "https://www.comercializadoradtup.com/MLM-1597916939-autobrillo-a-500ml-abrillanta-proteje-tablero-llanta-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/autobrillo_A_500_llciin.jpg"},
  { product: "AUTO BRILLO A", code: "7501716100020", sku: "0101-01-213", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 2328.00, unitPrice: 194.00, link: "https://www.comercializadoradtup.com/MLM-1597918018-auto-brillo-a-blanco-pieza-1-lt-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/autobrillo_A_1_mmxj1v.jpg"},
  { product: "AUTO BRILLO A", code: "7501716100037", sku: "0101-01-301", description: "PORRON 5 LT", price: 886.00, unitPrice: 177.20, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "AUTO BRILLO A", code: "7501716100044", sku: "0101-01-303", description: "PORRON 25 LT", price: 4173.00, unitPrice: 166.92, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "AUTO BRILLO A", code: "7501716100068", sku: "0101-01-307", description: "TAMBOR 208 LT", price: 30453.00, unitPrice: 146.41, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291911/9c5fb46b5743e810b326d588833f16c3984ae579f78009ca90032acdd62de431_tovtvj.png" },
  { product: "AUTO BRILLO S", category: "AUTO BRILLO S", name: "auto brillo s" },
  { product: "AUTO BRILLO S", code: "7501716107838", sku: "0102-01-211", description: "CAJA 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 1596.00, unitPrice: 133.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/auto_brillo_s_500_xdunv8.jpg", link: "https://www.comercializadoradtup.com/MLM-1597911621-abrillantador-de-plasticos-auto-brillo-s-500-ml-margrey-_JM" },
  { product: "AUTO BRILLO S", code: "7501716100082", sku: "0102-01-213", description: "CAJA 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 2772.00, unitPrice: 231.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/autobrillo_S_1_ikkfxl.jpg", link: "https://www.comercializadoradtup.com/MLM-1597925272-autobrillo-s-1lt-abrillantador-restaurador-plasticos-margrey-_JM" },
  { product: "AUTO BRILLO S", code: "7501716100099", sku: "0102-01-301", description: "PORRON 5 LT", price: 1094.00, unitPrice: 218.80, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "AUTO BRILLO S", code: "7501716100105", sku: "0102-01-303", description: "PORRON 25 LT", price: 5060.00, unitPrice: 202.40, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "AUTO BRILLO S", code: "7501716108507", sku: "0102-01-240", description: "CAJA 12 AEROSOL 473 ML", unitDescription: "PIEZA INDIVIDUAL 473 ML", price: 1650.00, unitPrice: 137.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/autobrillo_S_aerosol_dmxriw.jpg", link:"https://www.comercializadoradtup.com/MLM-2106857515-abrillantador-plasticos-autobrillo-s-aerosol-473ml-margrey-_JM" },
  { product: "SILICREM", category: "SILICREM", name: "silicrem" },
  { product: "SILICREM C/E", code: "7501716107647", sku: "0105-01-221", description: "CAJA 24 PIEZAS 300 ML", unitDescription: "PIEZA INDIVIDUAL 300 ML", price: 2244.00, unitPrice: 93.50, link: "https://www.comercializadoradtup.com/MLM-1597946616-silicrem-pieza-300-ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/silicrem_300_zfdupy.jpg"},
  { product: "SILICREM C/E", code: "7501716100143", sku: "0105-01-206", description: "CAJA 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 1464.00, unitPrice: 244.00, link:"https://www.comercializadoradtup.com/MLM-1793745287-silicrem-1-litro-crema-silicones-tablero-llantas-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/silicrem_1_wfmiz3.jpg"},
  { product: "SILICREM", code: "7501716100167", sku: "0105-01-402", description: "CUBETA 19 LT", price: 3364.00, unitPrice: 177.05, image:"https://res.cloudinary.com/diefezach/image/upload/v1726875085/IMG_0777_lopebl.jpg" },
  { product: "LEATHER CLEAN", category: "LEATHER CLEAN", name: "leather clean" },
  { product: "LEATHER CLEAN", code: "7501716103854", sku: "0107-01-235", description: "PAQUETE 12 PIEZAS 250 ML", unitDescription: "PIEZA INDIVIDUAL 250 ML", price: 1356.00, unitPrice: 113.00,  link: "https://www.comercializadoradtup.com/MLM-1597959351-limpiador-e-hidratante-de-piel-leather-clean-margrey-250ml-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/leather_clean_ve45zc.jpg"},
  { product: "LEATHER CLEAN", code: "7501716102536", sku: "0107-01-401", description: "CUBETA 4 LT", price: 1582.00, unitPrice: 395.50, image: "https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "OIL RESTORER", category: "OIL RESTORER", name: "oil restore" },
  { product: "OIL RESTORER", code: "7501716106138", sku: "0116-22-278", description: "CAJA 12 PIEZAS 50 ML", unitDescription: "PIEZA INDIVIDUAL 50 ML", price: 1284, unitPrice: 107.00, link: "https://www.comercializadoradtup.com/MLM-1626798957-restaurador-de-plasticos-negros-oil-restorer-50ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/oil_restorer_tc8ode.jpg"},
  { product: "AUTOBRILLO ATOMIZABLE", category: "AUTOBRILLO ATOMIZABLE", name: "autobrillo atomizable" },
  { product: "AUTOBRILLO ATOMIZABLE", code: "7501716107739", sku: "0120-01-231", description: "CAJA 6 PIEZAS 600 ML CON ATOMIZADOR", unitDescription: "PIEZA INDIVIDUAL 600 ML", price: 522.00, unitPrice: 87.00, link:"https://www.comercializadoradtup.com/MLM-2015343316-autobrillo-atomizable-pieza-600-ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/autobrillo_frxg6i.jpg"},
  { product: "ABRILLANTADOR QM", category: "ABRILLANTADOR QM", name: "abrillantador qm"},
  { product: "ABRILLANTADOR QM", code: "7501716100341", sku: "0401-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 2124.00, unitPrice: 177.00, link: "https://www.comercializadoradtup.com/MLM-1597960434-abrillantador-qm-pieza-500-ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/abrillantador_QM_vuejq5.jpg"},
  { product: "ABRILLANTADOR QM", code: "7501716100358", sku: "0401-01-301", description: "PORRON 5 LT", price: 1324.00, unitPrice: 264.8, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "FINO TOUCH", category: "FINO TOUCH", name: "fino touch" },
  { product: "FINO TOUCH", code: "7501716100402", sku: "0402-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 1914.00, unitPrice: 159.50, link: "https://www.comercializadoradtup.com/MLM-3198021408-fino-touch-pieza-500-ml-margrey-el-toque-final-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873365/fino_touch_qkbk51.jpg"},
  { product: "PULIMENTO AZUL", category: "PULIMENTO AZUL", name: "pulimento azul" },
  { product: "PULIMENTO AZUL", code: "7501716100280", sku: "0403-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 2004.00, unitPrice: 167.00, link:"https://www.comercializadoradtup.com/MLM-1597930228-pulimento-azul-pieza-500-ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873370/pulimento_azul_sfrvbk.jpg"},
  { product: "PULIMENTO AZUL", code: "7501716100334", sku: "0403-01-402", description: "CUBETA 19 LT", price: 4552.00, unitPrice: 239.58, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "PULIMENTO BLANCO", category: "PULIMENTO BLANCO", name: "pulimento blanco" },
  { product: "PULIMENTO BLANCO", code: "7501716106671", sku: "0404-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 2004.00, unitPrice: 167.00, link:"https://www.comercializadoradtup.com/MLM-2095053277-pulimento-blanco-profesional-500-ml-margrey-grano-fino-1-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873370/pulimento_blanco_lw0sar.jpg"},
  { product: "PULIMENTO BLANCO", code: "7501716100242", sku: "0404-01-402", description: "CUBETA 19 LT", price: 4552.00, unitPrice: 239.58, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "PULIMENTO ROSA", category: "PULIMENTO ROSA", name: "pulimento rosa" },
  { product: "PULIMENTO ROSA", code: "7501716100259", sku: "0406-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 2004.00, unitPrice: 167.00, link: "https://www.comercializadoradtup.com/MLM-1597930185-pulimento-rosa-pieza-500-ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873372/pulimento_rosa_vhptwp.jpg"},
  { product: "PULIMENTO ROSA", code: "7501716100273", sku: "0406-01-402", description: "CUBETA 19 LT", price: 4552.00, unitPrice: 239.58, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "CERA EXPRESS", category: "CERA EXPRESS", name: "cera express" },
  { product: "CERA EXPRESS", code: "7501716100488", sku: "0416-01-231", description: "CAJA 6 PIEZAS 600 ML CON ATOMIZADOR", unitDescription: "PIEZA INDIVIDUAL 600 ML", price: 672.00, unitPrice: 112.00, link: "https://www.comercializadoradtup.com/MLM-3197985832-margrey-automotriz-cera-express-600-ml-cera-rapida-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cera_rapida_jh2lex.jpg"},
  { product: "CERA EXPRESS", code: "7501716102673", sku: "0416-01-303", description: "PORRON 25 LT", price: 2860.00, unitPrice: 114.40, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "PULIMENTO SUPER CORTE", category: "PULIMENTO SUPER CORTE", name: "pulimento super corte" },
  { product: "PULIMENTO SUPER CORTE", code: "7501716102277", sku: "0418-01-235", description: "PAQUETE 12 PIEZAS 250 ML", unitDescription: "PIEZA INDIVIDUAL 250 ML", price: 2064.00, unitPrice: 172.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1759292764/Margrey_2025_uorgiw.jpg"},
  { product: "PULIMENTO SUPER CORTE", code: "7501716103045", sku: "0418-01-201", description: "CAJA 4 PIEZAS DE 3.8 LT", price: 6305.00, unitPrice: 1576.26, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "PULIMENTO RESTAURADOR DE FAROS", category: "PULIMENTO RESTAURADOR DE FAROS", name: "pulimento restaurador de faros" },
  { product: "PULIMENTO RESTAURADOR DE FAROS", code: "7501716105582", sku: "0422-01-253", description: "PAQUETE 6 PIEZAS 130 ML", unitDescription: "PIEZA INDIVIDUAL 130 ML", price: 342.00, unitPrice: 57.00, link: "https://www.comercializadoradtup.com/MLM-1597928608-restaurador-para-faros-pieza-130-ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873372/restaurador_faros_130_jfydce.jpg"},
  { product: "PULIMENTO RESTAURADOR DE FAROS", code: "7501716104813", sku: "0422-01-235", description: "PAQUETE 12 PIEZAS 250 ML", unitDescription: "PIEZA INDIVIDUAL 250 ML", price: 1188.00, unitPrice: 99.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/restaurador_faros_250_bghu6v.jpg", link:"https://www.comercializadoradtup.com/MLM-1597929615-restaurador-para-faros-pieza-250-ml-margrey-_JM"},
  { product: "PLASTI-MAGIC", category: "PLASTI-MAGIC", name: "plasti-magic" },
  { product: "PLASTI-MAGIC", code: "7501716108378", sku: "0423-01-247", description: "CAJA 6 PIEZAS 100 GR", unitDescription: "PIEZA INDIVIDUAL 100 GR", price: 660.00, unitPrice: 110.00, link:"https://www.comercializadoradtup.com/MLM-2094944927-plastilina-descontaminante-plasti-magic-100-grs-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/plasti_magic_100_tcrgcx.jpg"},
  { product: "PLASTI-MAGIC", code: "7502275980207", sku: "0423-01-238", description: "CAJA 4 PIEZAS 200 GR", unitDescription: "PIEZA INDIVIDUAL 200 GR", price: 792.00, unitPrice: 198.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/plasti_magic_200_wz2leq.jpg", tag: "promotion", link:"https://www.comercializadoradtup.com/MLM-1597931862-plastilina-arcilla-descontamina-plasti-magic-200gr-margrey-_JM" },
  { product: "3 EN 1 TOP POLISH", category: "3 EN 1 TOP POLISH", name: "3 en 1 top polish" },
  { product: "3 EN 1 TOP POLISH", code: "7501716105957", sku: "0429-01-211", description: "PAQUETE 12 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 2004.00, unitPrice: 167.00, link: "https://www.comercializadoradtup.com/MLM-1597919442-polish-3-en-1-pule-abrillanta-encera-500ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873370/pulimento_3_en_1_nteocl.jpg"},
  { product: "ALUMBRA", category: "ALUMBRA", name: "alumbra" },
  { product: "ALUMBRA", code: "7501716100983", sku: "0501-01-213", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 1464.00, unitPrice: 122.00, link:"https://www.comercializadoradtup.com/MLM-1597923002-alumbra-pieza-1-lt-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/alumbra_1_ns4lrh.jpg"},
  { product: "ALUMBRA", code: "7501716100990", sku: "0501-01-301", description: "PORRON 5 LT", price: 522.00, unitPrice: 104.40, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "ALUMBRA", code: "7501716101003", sku: "0501-01-303", description: "PORRON 25 LT", price: 2279.00, unitPrice: 91.16, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "DESGRAMOT", category: "DESGRAMOT", name: "desgramot" },
  { product: "DESGRAMOT", code: "7501716101096", sku: "0502-01-213", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 2616.00, unitPrice: 218.00, link:"https://www.comercializadoradtup.com/MLM-1744812301-desengrasante-industrial-y-motor-desgramot-1-lt-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1731041571/desgramot_m5tzde.jpg"},
  { product: "DESGRAMOT", code: "7501716110119", sku: "0502-01-303", description: "PORRON 25 LT", price: 4176.00, unitPrice: 167.04, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "FINGRAS", category: "FINGRAS", name: "fingras" },
  { product: "FINGRAS", code: "7501716101041", sku: "0504-01-213", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 1296.00, unitPrice: 108.00, link:"https://www.comercializadoradtup.com/MLM-1597929266-fingras-pieza-1-lt-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873366/fin_gras_c0ai1z.jpg"},
  { product: "FINGRAS", code: "7501716101058", sku: "0504-01-301", description: "PORRON 5 LT", price: 482.00, unitPrice: 96.40, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "FINGRAS", code: "7501716101065", sku: "0504-01-303", description: "PORRON 25 LT", price: 1738.00, unitPrice: 69.52, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "FINGRAS", code: "7501716101072", sku: "0504-01-306", description: "PORRON 50 LT", price: 3276.00, unitPrice: 65.52, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "FINGRAS", code: "7501716101089", sku: "0504-01-307", description: "TAMBOR 208 LT", price: 12873.00, unitPrice: 61.88, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291911/9c5fb46b5743e810b326d588833f16c3984ae579f78009ca90032acdd62de431_tovtvj.png" },
  { product: "QUITA GOMA", category: "QUITA GOMA", name: "quita goma" },
  { product: "QUITA GOMA", code: "7501716108811", sku: "0506-01-254", description: "CAJA 12 PIEZAS 130 ML", unitDescription: "PIEZA INDIVIDUAL 130 ML", price: 660.00, unitPrice: 55.00, link:"https://www.comercializadoradtup.com/quita-goma-margrey-removedor-multiusos-gotas-goma-130-ml/up/MLMU3006039735", image:"https://res.cloudinary.com/diefezach/image/upload/v1759293096/Margrey_2025_htb5ic.jpg"},
  { product: "QUITA GOMA", code: "7501716108903", sku: "0506-01-201", description: "CAJA 4 PIEZAS 3.8 LT", unitDescription: "PIEZA INDIVIDUAL 3.8 LT", price: 3880.00, unitPrice: 970.00, link:"", image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png"},
  { product: "AFLOJA FÁCIL", category: "AFLOJA FÁCIL", name: "afloja fácil" },
  { product: "AFLOJA FACIL", code: "7501716108866", sku: "0506-01-242", description: "CAJA 12 PIEZAS 296 ML", unitDescription: "PIEZA INDIVIDUAL 296 ML", price: 1068.00, unitPrice: 89.00, link:"https://www.comercializadoradtup.com/afloja-facil-margrey-296ml-desatora-metales-corrohido-en-seg/up/MLMU3124282929", image:"https://res.cloudinary.com/diefezach/image/upload/v1759291882/Margrey_2025_ep0qzh.jpg"},
  { product: "LIMPIADOR DE RINES Y MOTORES", category: "LIMPIADOR DE RINES Y MOTORES", name: "limpiador de rines y motores" },
  { product: "LIMPIADOR DE RINES Y MOTORES", code: "7501716107722", sku: "0532-01-231", description: "CAJA 6 PIEZAS 600 ML CON ATOMIZADOR", unitDescription: "PIEZA INDIVIDUAL 600 ML", price: 522.00, unitPrice: 87.00, link:"https://www.comercializadoradtup.com/MLM-3198068724-limpiador-de-rines-motores-y-llantas-600-ml-margrey-transpa-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/rines_motores_llantas_y_rines_afizj0.jpg"},
  { product: "FRAGANCIA VAINILLA", category: "FRAGANCIA VAINILLA", name: "fragancia vainilla" },
  { product: "FRAGANCIA VAINILLA", code: "7501716101614", sku: "0706-01-213", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 2208.00, unitPrice: 184.00, link:"https://www.comercializadoradtup.com/MLM-3198063530-1-fragancia-vainilla-1-lt-margrey-aromatizante-concentrado-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873365/fragancia_de_vainilla_ih09zj.jpg"},
  { product: "MANO CLEAN", category: "MANO CLEAN", name: "mano clean" },
  { product: "MANO CLEAN", code: "7501716101495", sku: "0901-01-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 900.00, unitPrice: 150.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293269/Margrey_2025_s1uhnx.jpg" },
  { product: "MANO CLEAN", code: "7501716100518", sku: "0901-01-402", description: "CUBETA 19 LT", price: 2278.00, unitPrice: 119.90, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "QUITA GOTAS", category: "QUITA GOTAS", name: "quita gotas" },
  { product: "QUITA GOTAS", code: "7501716105186", sku: "0901-01-250", description: "PAQUETE 24 PIEZAS 130 ML", unitDescription: "PIEZA INDIVIDUAL 130 ML", price: 1152.00, unitPrice: 48.00, link:"https://www.comercializadoradtup.com/MLM-1597658811-quita-gotas-pieza-130-ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873372/quita_gotas_130_sr8f3w.jpg"},
  { product: "QUITA GOTAS", code: "7501716100914", sku: "0901-01-211", description: "PAQUETE 20 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 3280.00, unitPrice: 164.00, link:"https://www.comercializadoradtup.com/MLM-1597934821-quita-gotas-pieza-500-ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873372/quita_gotas_500_rfkxjj.jpg"},
  { product: "QUITA GOTAS", code: "7501716100938", sku: "0901-01-301", description: "PORRON 5 LT", price: 1364.00, unitPrice: 272.80, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "QUITA GOTAS", code: "7501716100945", sku: "0901-01-303", description: "PORRON 25 LT", price: 6173.00, unitPrice: 246.92, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" }, 
  { product: "CREMA QUITAGOTAS", category: "CREMA QUITAGOTAS", name: "crema quitagotas" },
  { product: "CREMA QUITAGOTAS", code: "7501716107753", sku: "1006-01-232", description: "PAQUETE 6 PIEZAS 300 ML", unitDescription: "PIEZA INDIVIDUAL 300 ML", price: 372.00, unitPrice: 62.00, link:"https://www.comercializadoradtup.com/MLM-1597922048-crema-quita-gotas-vidrios-y-cristales-pieza-300-ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873365/crema_quita_gotas_y8xoqw.jpg"},
  { product: "CREMA QUITAGOTAS", code: "-", sku: "1006-01-401", description: "CUBETA 4 LT", price: 657.00, unitPrice: 164.25, image: "https://res.cloudinary.com/diefezach/image/upload/v1726873365/cubeta_crema_quita_gotas_u8q97k.jpg", link:"https://www.comercializadoradtup.com/MLM-3350916446-crema-quita-gotas-vidrios-y-cristales-cubeta-4-lts-margrey-_JM"},
  { product: "CREMA QUITAGOTAS", code: "-", sku: "1006-01-402", description: "CUBETA 19 LT", price: 2653.00, unitPrice: 139.63, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg"},
  { product: "WIPER CLEANER", category: "WIPER CLEANER", name: "wiper cleaner" },
  { product: "WIPER CLEANER", code: "7501716108385", sku: "1007-01-206", description: "PAQUETE 6 PIEZAS 1 L", unitDescription: "PIEZA INDIVIDUAL 1 L", price: 258.00, unitPrice: 43.00,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873376/wiper_clean_1_ymecds.jpg", link:" https://www.comercializadoradtup.com/MLM-2145697487-liquido-limpia-parabrisas-1-l-wipper-cleaner-margrey-_JM", tag: "new-presentation"},
  { product: "WIPER CLEANER", code: "7501716107791", sku: "1007-01-238", description: "PAQUETE 4 PIEZAS 3.8 L", unitDescription: "PIEZA INDIVIDUAL 3.8 L", price: 392.00, unitPrice: 98.00, tag: "new-presentation", image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png"},
  { product: "REPELENTE DE AGUA", category: "REPELENTE DE AGUA", name: "repelente de agua" },
  { product: "REPELENTE DE AGUA", code: "7501716100600", sku: "1008-01-254", description: "CAJA 12 PIEZAS 130 ML", unitDescription: "PIEZA INDIVIDUAL 130 ML", price: 660.00, unitPrice: 55.00, link:"https://www.comercializadoradtup.com/repelente-de-agua-multiusos-en-todo-tipo-de-cristal-margrey/up/MLMU2964948338", image:"https://res.cloudinary.com/diefezach/image/upload/v1759292724/Margrey_2025_jygtog.jpg"},
  { product: "SHAMPOO CON CERA", category: "SHAMPOO CON CERA", name: "shampoo con cera" },
  { product: "SHAMPOO CON CERA", code: "7501716137132", sku: "1401-01-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 474.00, unitPrice: 79.00, link:"https://www.comercializadoradtup.com/MLM-2094943653-shampoo-con-cera-profesional-1lt-automotriz-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/shampoo_con_cera_g1awj6.jpg"},
  { product: "SHAMPOO CON CERA", code: "7501716100587", sku: "1401-01-303", description: "PORRON 25 LT", price: 1623.00, unitPrice: 64.92, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "SHAMPOO CON CERA", code: "7501716100600", sku: "1401-01-307", description: "TAMBOR 208 LT", price: 12126.00, unitPrice: 58.30, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291911/9c5fb46b5743e810b326d588833f16c3984ae579f78009ca90032acdd62de431_tovtvj.png" },
  { product: "PUM SHAMPOO PARA TAPICERIAS", category: "PUM SHAMPOO PARA TAPICERIAS", name: "pum shampoo para tapicerias" },
  { product: "PUM SHAMPOO PARA TAPICERIAS", code: "7501716102253", sku: "1402-01-231", description: "CAJA 6 PIEZAS 600 ML CON ATOMIZADOR", unitDescription: "PIEZA INDIVIDUAL 600 ML", price: 474.00, unitPrice: 79.00, link:"https://www.comercializadoradtup.com/MLM-1597928862-pum-shampoo-tapicerias-pieza-600-ml-catm-margrey-magno-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/shampoo_pum_pt9emp.jpg"},
  { product: "AROMATIZANTE COOL GREY", category: "AROMATIZANTE COOL GREY", name: "aromatizante cool grey" },
  { product: "AROMATIZANTE COOL GREY", code: "7501716105223", sku: "2002-01-291", description: "UVA SILVESTRE CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 675.00, unitPrice: 22.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873374/uva_cgycx1.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716105230", sku: "2003-01-291", description: "UVA SILVESTRE CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 846.00, unitPrice: 23.50, link:"https://www.comercializadoradtup.com/MLM-3197989978-aromatizante-margrey-auto-casa-ambiente-cool-grey-hoja-vario-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873374/uva_cgycx1.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716105247", sku: "2003-01-294", description: "HAPPY BANANA CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 675.00, unitPrice: 22.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/banana_gd6fup.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716105247", sku: "2003-01-294", description: "HAPPY BANANA CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 846.00, unitPrice: 23.50, link:"https://www.comercializadoradtup.com/MLM-3197989978-aromatizante-margrey-auto-casa-ambiente-cool-grey-hoja-vario-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/banana_gd6fup.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716105209", sku: "2008-01-291", description: "CARRO NUEVO CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 675.00, unitPrice: 22.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/carro_nuevo_h0fnat.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716105209", sku: "2008-01-294", description: "CARRO NUEVO CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 846.00, unitPrice: 23.50, link:"https://www.comercializadoradtup.com/MLM-3197989978-aromatizante-margrey-auto-casa-ambiente-cool-grey-hoja-vario-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/carro_nuevo_h0fnat.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716108453", sku: "2008-01-291", description: "CHERRY CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 675.00, unitPrice: 22.50,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cereza_waymje.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716108453", sku: "2008-01-294", description: "CHERRY CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 846.00, unitPrice: 23.50,   link:"https://www.comercializadoradtup.com/MLM-3197989978-aromatizante-margrey-auto-casa-ambiente-cool-grey-hoja-vario-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cereza_waymje.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716108521", sku: "2016-01-291", description: "STRAWBERRY-FRESA CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 675.00, unitPrice: 22.50,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873366/fresa_aaobqq.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716108521", sku: "2016-01-294", description: "STRAWBERRY-FRESA CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 846.00, unitPrice: 23.50,   link:"https://www.comercializadoradtup.com/MLM-3197989978-aromatizante-margrey-auto-casa-ambiente-cool-grey-hoja-vario-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873366/fresa_aaobqq.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716108514", sku: "2017-01-291", description: "BERRIES CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 675.00, unitPrice: 22.50,   image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/moras_dvmsnu.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "7501716108514", sku: "2017-01-294", description: "BERRIES CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 846.00, unitPrice: 23.50,   link:"https://www.comercializadoradtup.com/MLM-3197989978-aromatizante-margrey-auto-casa-ambiente-cool-grey-hoja-vario-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/moras_dvmsnu.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "", sku: "2007-01-291", description: "MIXTO CAJA 30 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 675.00, unitPrice: 22.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293970/.com.apple.Foundation.NSItemProvider.odsLeg_gtcbla.jpg"},
  { product: "AROMATIZANTE COOL GREY", code: "", sku: "2007-01-294", description: "MIXTO CAJA 3 TIRAS CON 12 PIEZAS", unitDescription: "PIEZA INDIVIDUAL", price: 846.00, unitPrice: 23.50, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293970/.com.apple.Foundation.NSItemProvider.odsLeg_gtcbla.jpg"},
  { product: "GEL AZUL W", category: "GEL AZUL W", name: "gel azul w" },
  { product: "GEL AZUL W", code: "7502275980375", sku: "0104-21-235", description: "PAQUETE 12 PIEZAS 250 ML", unitDescription: "PIEZA INDIVIDUAL 250 ML", price: 612.00, unitPrice: 51.00,  link: "https://www.comercializadoradtup.com/MLM-1597920737-abrillantador-e-hidratante-de-llantas-gel-azul-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1731041398/gel_azul_250_hzts9x.jpg" },
  { product: "GEL AZUL W", code: "7501716137118", sku: "0104-21-205", description: "PAQUETE 6 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 462.00, unitPrice: 77.00, link: "https://www.comercializadoradtup.com/MLM-1597815104-gel-azul-pieza-500-ml-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873368/gel_azul_ztpkhd.jpg"},
  { product: "GEL AZUL W", code: "-", sku: "0104-21-309", description: "PORRON 20 LT", price: 2020.00, unitPrice: 101.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "SILICREM W SIN ESPONJA", category: "SILICREM W SIN ESPONJA", name: "silicrem w sin esponja" },
  { product: "SILICREM W SIN ESPONJA", code: "7501716100136", sku: "0105-95-232", description: "PAQUETE 6 PIEZAS 300 ML", unitDescription: "PIEZA INDIVIDUAL 300 ML", price: 372.00, unitPrice: 62.00, link:"https://www.comercializadoradtup.com/MLM-1597960745-crema-de-silicon-silicrem-limpieza-de-interiores-automovil-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/silicrem_W_m8a0fc.jpg"},
  { product: "BRILLO PLATINUM", category: "BRILLO PLATINUM", name: "brillo platinum" },
  { product: "BRILLO PLATINUM", code: "7501716106336", sku: "0118-21-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 486.00, unitPrice: 81.00, link: "https://www.comercializadoradtup.com/MLM-1597920896-brillo-platinum-1-l-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/brillo_platinum_mf6nkv.jpg"},
  { product: "CERA LIQUIDA W", category: "CERA LIQUIDA W", name: "cera liquida w" },
  { product: "CERA LIQUIDA W", code: "7501716106411", sku: "0402-21-205", description: "PAQUETE 6 PIEZAS 500 ML", unitDescription: "PIEZA INDIVIDUAL 500 ML", price: 552.00, unitPrice: 92.00, link: "https://www.comercializadoradtup.com/MLM-1945777462-nanotecnologia-protectora-cera-en-liquido-margrey-500-ml-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cera_liquida_500_wtyreh.jpg"},
  { product: "CERA LIQUIDA W", code: "7501716107524", sku: "0402-21-301", description: "PORRON 5 LT", price: 710.00, unitPrice: 142.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291917/897a9f0c12d24e450295419043098a7234b08e3bd8735aeed3e16f39fd22917c_ktmyfe.png" },
  { product: "POLISH BLANCO", category: "POLISH BLANCO", name: "polish blanco" },
  { product: "POLISH BLANCO", code: "7501716100228", sku: "0404-95-290", description: "PAQUETE 12 PIEZAS 300 GR", unitDescription: "PIEZA INDIVIDUAL 300 GR", price: 516.00, unitPrice: 43.00, link: "https://www.comercializadoradtup.com/MLM-1597920608-pulimento-grano-fino-polish-blanco-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/polish_blanco_vydeyp.jpg"},
  { product: "POLISH BLANCO", code: "-", sku: "0404-95-402", description: "CUBETA 19 LT", price: 1901.00, unitPrice: 100.06, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "POLISH ROJO", category: "POLISH ROJO", name: "polish rojo" },
  { product: "POLISH ROJO", code: "7501716100310", sku: "0405-21-290", description: "PAQUETE 12 PIEZAS 300 GR", unitDescription: "PIEZA INDIVIDUAL 300 GR", price: 516.00, unitPrice: 43.00, link: "https://www.comercializadoradtup.com/MLM-1597785848-pulimento-quita-rayones-polish-rojo-margrey-300ml-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/polish_rojo_afcqyz.jpg"},
  { product: "POLISH ROJO", code: "-", sku: "0405-21-402", description: "CUBETA 19 LT", price: 1901.00, unitPrice: 100.06, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "POLISH ROSA", category: "POLISH ROSA", name: "polish rosa" },
  { product: "POLISH ROSA", code: "7501716106855", sku: "0406-21-290", description: "PAQUETE 12 PIEZAS 300 GR", unitDescription: "PIEZA INDIVIDUAL 300 GR", price: 516.00, unitPrice: 43.00, link: "https://www.comercializadoradtup.com/MLM-1597926745-pulimento-quita-rayones-polish-rosa-margrey-300ml-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873370/polish_rosa_dkuqdu.jpg"},
  { product: "POLISH ROSA", code: "-", sku: "0406-21-402", description: "CUBETA 19 LT", price: 1901.00, unitPrice: 100.06, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293528/.com.apple.Foundation.NSItemProvider.zsvAmv_yhajtd.jpg" },
  { product: "CERA ACRILICA", category: "CERA ACRILICA", name: "cera acrilica" },
  { product: "CERA ACRILICA", code: "7501716106886", sku: "0414-21-289", description: "PAQUETE 6 PIEZAS 355 ML", unitDescription: "PIEZA INDIVIDUAL 355 ML", price: 684.00, unitPrice: 114.00, link: "https://www.comercializadoradtup.com/MLM-1597911568-cera-en-pasta-automotriz-para-carro-margrey-355-ml-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/cera_en_pasta_p2mwwp.jpg"},
  { product: "ALUMINOX", category: "ALUMINOX", name: "aluminox" },
  { product: "ALUMINOX", code: "7502275980573", sku: "0501-21-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 456.00, unitPrice: 76.00, link:"https://www.comercializadoradtup.com/MLM-1597821136-abrillantador-para-aluminio-acero-margrey-aluminox-1-l-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873363/aluminox_jbfta5.jpg"},
  { product: "ALUMINOX", code: "-", sku: "0501-21-309", description: "PORRON 20 LT", price: 1244.00, unitPrice: 62.20, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "GRAS-FIN", category: "GRAS-FIN", name: "gras-fin" },
  { product: "GRAS-FIN", code: "7502275980559", sku: "0509-21-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 432.00, unitPrice: 72, link:"https://www.comercializadoradtup.com/MLM-1597814905-gras-fin-1-l-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873369/gras_fin_ux38kr.jpg"},
  { product: "GRAS-FIN", code: "-", sku: "0509-21-307", description: "PORRON 20 LT", price: 919.00, unitPrice: 45.95, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "GRAS-FIN", code: "-", sku: "0509-21-307", description: "TAMBOR 208 LT", price: 7752.00, unitPrice: 37.27, image:"https://res.cloudinary.com/diefezach/image/upload/v1759291911/9c5fb46b5743e810b326d588833f16c3984ae579f78009ca90032acdd62de431_tovtvj.png" },
  { product: "SHAMPOO CON CERA PLATINUM", category: "SHAMPOO CON CERA PLATINUM", name: "shampoo con cera platinum" },
  { product: "SHAMPOO CON CERA PLATINUM", code: "7501716106442", sku: "1401-21-206", description: "PAQUETE 12 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 708.00, unitPrice: 59.00, link:"https://www.comercializadoradtup.com/MLM-3198029262-shampoo-con-cera-platinum-auto-moto-1lt-alta-espuma-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873373/shampoo_con_cera_platinum_kzd6zr.jpg"},
  { product: "SHAMPOO CON CERA PLATINUM", code: "-", sku: "1401-21-309", description: "PORRON 20 LT", price: 861.00, unitPrice: 43.05, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "SHAMPOO AUTO CAR WASH", category: "SHAMPOO AUTO CAR WASH", name: "shampoo auto car wash" },
  { product: "SHAMPOO AUTO CAR WASH", code: "7502275980771", sku: "1405-95-206", description: "PAQUETE 6 PIEZAS 1 LT", unitDescription: "PIEZA INDIVIDUAL 1 LT", price: 300.00, unitPrice: 50.00, link:"https://www.comercializadoradtup.com/MLM-1597795171-shampoo-con-cera-para-auto-espumoso-car-wash-margrey-1lt-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1726873372/shampoo_car_wash_p2y0o2.jpg"},
  { product: "SHAMPOO AUTO CAR WASH", code: "7501716107326", sku: "1405-95-402", description: "PAQUETE 4 PIEZAS 3.8 LT", unitDescription: "PIEZA INDIVIDUAL 3.8 LT", price: 484.00, unitPrice: 121.00, image:"https://res.cloudinary.com/diefezach/image/upload/v1726873364/car_wash_3-8_leb5j8.jpg", link:"https://www.comercializadoradtup.com/MLM-2112442209-shampoo-con-cera-para-auto-espumoso-car-wash-38-l-margrey-_JM"},
  { product: "SHAMPOO AUTO CAR WASH", code: "-", sku: "1405-95-309", description: "PORRON 20 LT", price: 658.00, unitPrice: 32.90, image:"https://res.cloudinary.com/diefezach/image/upload/v1759293845/Margrey_2025_hlhntt.jpg" },
  { product: "BUBBLE WASH", category: "BUBBLE WASH", name: "shampoo bubble wash" },
  { product: "SHAMPOO BUBBLE WASH", code: "7502275980771", sku: "1414-21-299 ", description: "PAQUETE 4 PIEZAS 1.89 LT", unitDescription: "PIEZA INDIVIDUAL 1.89 LT", price: 348.00, tag: "new", unitPrice: 87.00, link:"https://www.comercializadoradtup.com/MLM-3410407942-shampoo-bubble-wash-189-l-concentrado-alto-brillo-margrey-_JM", image:"https://res.cloudinary.com/diefezach/image/upload/v1731041824/bubble_wash_bbzfb1.jpg"},
];

const peso = (n) =>
  Number(n || 0).toLocaleString("es-MX", { style: "currency", currency: "MXN" });

function Qty({ value, onChange, min = 1 }) {
  return (
    <div className="inline-flex items-center gap-2">
      <button className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e)=>onChange(parseInt(e.target.value||min,10))}
        className="w-16 text-center border rounded-lg py-1"
      />
      <button className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}

function modoLabel(m){ return m==="unit" ? "Pieza/Litro" : "Caja/Paquete"; }

async function generarPDFPedido({
  cart, subtotal, descuento, llevaMicrofibra, esponjas,
  PRECIO_MICRO, PRECIO_ESPONJA, total, cotiza
}) {
  if (!cart.length) {
    alert("Agrega productos antes de generar la cotización.");
    return;
  }
  if (!cotiza || !cotiza.trim()) {
  if (!confirm("No escribiste quién cotiza. ¿Quieres continuar sin ese dato?")) return;
  }

  // Carga perezosa de html2pdf (evita problemas con SSR/Vite)
  let html2pdf;
  try {
    const mod = await import("html2pdf.js");
    html2pdf = mod.default || mod;
  } catch (e) {
    console.error("Fallo import('html2pdf.js')", e);
    alert("No se pudo cargar el generador de PDF. ¿Instalaste 'html2pdf.js'?");
    return;
  }

  const folio = "COT-" + new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "").slice(2);
  const fecha = new Date().toLocaleString("es-MX");
  const extraMicro = llevaMicrofibra ? PRECIO_MICRO : 0;
  const extraEsponja = (esponjas || 0) * (PRECIO_ESPONJA || 0);

  const filas = cart.map((l, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>
        <div class="pname">${l.product}</div>
        <div class="pdesc">
          ${l.mode === "unit" ? "Pieza/Litro" : "Caja/Paquete"} · ${l.description || "—"}
          ${l.sku ? ` · SKU: ${l.sku}` : ""}${l.code ? ` · UPC: ${l.code}` : ""}
        </div>
      </td>
      <td class="num">${peso(l.unitPrice)}</td>
      <td class="num">×${l.qty}</td>
      <td class="num">${peso(l.unitPrice * l.qty)}</td>
    </tr>
  `).join("");

  // HTML solo del contenido (sin <html>, <head> ni <body>)
  const html = `
    <div class="pdf-root">
      <style>
        .page{padding:24px; background:#fff; font-family:Arial, sans-serif;}
        .hdr{display:flex; align-items:center; gap:16px; margin-bottom:8px}
        .logos{display:flex; gap:10px; align-items:center}
        .logo{width:56px;height:56px;border-radius:10px;object-fit:cover}
        .logom{width:45px;height:45px;border-radius:10px;object-fit:cover}
        h1{margin:0;font-size:20px}
        .muted{color:#555}
        table{width:100%; border-collapse:collapse; margin-top:12px}
        th,td{padding:10px; vertical-align:top}
        thead th{border-bottom:2px solid #e5e7eb; background:#f8fafc; font-weight:600}
        tbody tr + tr td{border-top:1px solid #e5e7eb}
        .num{text-align:right; white-space:nowrap}
        .pname{font-weight:600}
        .pdesc{font-size:12px; color:#555; margin-top:2px}
        .grid{display:grid; grid-template-columns:1fr auto; gap:8px; margin-top:12px}
        .total{font-size:20px; font-weight:800}
        .foot{margin-top:24px; font-size:12px; color:#444}
      </style>

      <div class="page">
        <div class="hdr">
          <div class="logos">
            <img class="logo" src=" https://res.cloudinary.com/diefezach/image/upload/v1759352900/Margrey_2025_ednlm6.jpg" />
          </div>
          <div>
            <h1>Cotización · Margrey</h1>
            <div class="muted">${folio} · ${fecha}</div>
            <div class="muted">Soporte: comercializadoradtup@hotmail.com</div>
            <div class="muted">Atención a clientes: +52 33 3159 6387 · 33 3906 8269</div>
            <div class="muted"><strong>Cotiza:</strong> ${cotiza ? cotiza.trim() : "—"}</div>
          </div>
          <div class="logos">
            <img class="logom" src="https://res.cloudinary.com/diefezach/image/upload/v1720413175/logo_margrey_ynqpbx.jpg" />
          </div>
        </div>

        <table>
          <thead>
            <tr><th>#</th><th>Producto</th><th>Precio</th><th>Cant.</th><th>Total</th></tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>

        <div class="grid">
          <div>Subtotal productos</div><div class="num">${peso(subtotal)}</div>
          ${descuento ? `<div>Descuento aplicado</div><div class="num">- ${peso(descuento)}</div>` : ""}
          ${llevaMicrofibra ? `<div>Microfibra</div><div class="num">+ ${peso(extraMicro)}</div>` : ""}
          ${esponjas > 0 ? `<div>Esponjas</div><div class="num">+ ${peso(extraEsponja)}</div>` : ""}
          <div class="total">TOTAL</div><div class="total num">${peso(total)}</div>
        </div>

        <div class="foot">
          Precios en MXN, sujetos a cambios sin previo aviso. Esta cotización no incluye envío ni impuestos adicionales, salvo que se indique.
        </div>
      </div>
    </div>
  `.trim();

  // Contenedor montado pero invisible (html2canvas necesita layout real)
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
    html2canvas: { scale: 2, useCORS: true, allowTaint: false, backgroundColor: "#ffffff" },
    jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
  };

  // Utilidades para watermark
  async function loadHtmlImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  async function makeTransparentPNG(url, alpha = 0.07) {
    const img = await loadHtmlImage(url);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, 0, 0);
    return {
      dataURL: canvas.toDataURL("image/png"),
      ratio: img.naturalHeight / img.naturalWidth,
    };
  }

  try {
    // Forzar render previo a canvas y luego a PDF (evita páginas en blanco)
    const worker = html2pdf().from(source).set(opt).toCanvas().toPdf();

    // Añadir watermark a cada página
    await worker.get("pdf").then(async (pdf) => {
      const { dataURL: wmPNG, ratio } = await makeTransparentPNG(
        " https://res.cloudinary.com/diefezach/image/upload/v1759352900/Margrey_2025_ednlm6.jpg",
        0.07
      );

      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        const pw = pdf.internal.pageSize.getWidth();
        const ph = pdf.internal.pageSize.getHeight();
        const w = pw * 0.7;
        const h = w * ratio;
        const x = (pw - w) / 2;
        const y = (ph - h) / 2;
        pdf.addImage(wmPNG, "PNG", x, y, w, h, undefined, "FAST");
      }
    });

    await worker.save();
  } catch (err) {
    console.error("Error generando PDF:", err);
    alert("No se pudo generar el PDF. Revisa la consola para más detalles.");
  } finally {
    document.body.removeChild(wrapper);
  }
}

export default function PedidoTabla() {
  // filtros y búsqueda
  const [cotiza, setCotiza] = useState("");
  const [q,setQ] = useState("");
  const [category,setCategory] = useState("todas");
  // carrito
  const [cart,setCart] = useState([]);
  // extras
  const [llevaMicrofibra,setLlevaMicrofibra] = useState(false);
  const [esponjas,setEsponjas] = useState(0);
  const [aplicaDescuento,setAplicaDescuento] = useState(false);
  const cartQty = useMemo(()=> cart.reduce((a,l)=>a + l.qty, 0), [cart]);

  // ref al resumen del carrito (para móvil)
  const cartRef = useRef(null);
  const goToCart = () => {
    if (window.matchMedia("(max-width: 768px)").matches && cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const footerRef = useRef(null);
const [footerH, setFooterH] = useState(0);

useLayoutEffect(() => {
  const ro = new ResizeObserver(([entry]) => {
    setFooterH(entry?.contentRect.height || 0);
  });
  if (footerRef.current) ro.observe(footerRef.current);
  return () => ro.disconnect();
}, []);

  const PRECIO_MICRO = 12;
  const PRECIO_ESPONJA = 1;

  const categories = useMemo(()=>{
    const c=new Set(); products.forEach(p=>p.category&&c.add(p.category));
    return ["todas",...Array.from(c)];
  },[]); // products es estático

function makeLineKey(item, mode) {
  const base = item.sku || item.code || item.product || "item";
  const pres = (item.unitDescription || item.description || "")
    .toLowerCase()
    .replace(/\s+/g, "_")        // espacios -> _
    .replace(/[^\w.-]/g, "");    // limpia caracteres raros
  return `${base}-${mode}-${pres}`;
}

  const filtered = useMemo(()=>{
    const term=q.trim().toLowerCase();
    return products
      .filter(p => p.price || p.unitPrice)
      .filter(p=>{
        const okCat = category==="todas" || (p.category||p.product)===category;
        if(!okCat) return false;
        if(!term) return true;
        const blob=[p.product,p.category,p.name,p.description,p.unitDescription,p.sku,p.code]
          .filter(Boolean).join(" ").toLowerCase();
        return blob.includes(term);
      });
  },[q,category]);

  function add(item, mode, qty){
  const unitPrice = mode==="unit" ? item.unitPrice : item.price;
  if(!unitPrice) return;

  const key = makeLineKey(item, mode);  // <<--- clave única por presentación

  setCart(prev=>{
    const i = prev.find(x=>x.key===key);
    if(i) return prev.map(x=>x.key===key ? {...x, qty:x.qty+qty} : x);
    return [...prev, {
      key,
      product: item.product,
      sku: item.sku,
      code: item.code ?? null,
      description: mode==="unit" ? (item.unitDescription || item.description) : item.description,
      mode,
      qty,
      unitPrice
    }];
  });
}
  function removeLine(key){ setCart(prev=>prev.filter(x=>x.key!==key)); }

  function updateLineQty(key, newQty) {
  setCart(prev => {
    if (newQty <= 0) return prev.filter(x => x.key !== key); // elimina si llega a 0
    return prev.map(x => x.key === key ? { ...x, qty: newQty } : x);
  });
}

function decLine(key) {
  setCart(prev => {
    const item = prev.find(x => x.key === key);
    if (!item) return prev;
    if (item.qty <= 1) {
      // si ya es 1, eliminar el renglón
      return prev.filter(x => x.key !== key);
    }
    return prev.map(x => x.key === key ? { ...x, qty: x.qty - 1 } : x);
  });
}

function clearCart() {
  if (!cart.length) return;
  if (confirm("¿Vaciar toda la cotización?")) setCart([]);
}

  // totales
  const subtotalBase = useMemo(()=>cart.reduce((a,l)=>a+l.unitPrice*l.qty,0),[cart]);
  const descuento = useMemo(()=>{
    if (!aplicaDescuento) return 0;
    return cart.reduce((acc,l)=>{
      const nombre = (l.product||"").toLowerCase();
      const excluye = nombre.includes("microfibra") || nombre.includes("esponja");
      if (excluye) return acc;
      return acc + (l.unitPrice*l.qty*0.25);
    },0);
  },[cart,aplicaDescuento]);
  const subtotal = subtotalBase - descuento;
  const total = subtotal + (llevaMicrofibra?PRECIO_MICRO:0) + (esponjas*PRECIO_ESPONJA);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col scroll-smooth">
      {/* Header rojo */}
      <header className="sticky top-0 z-10 bg-red-600 text-white border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 mr-auto">
            <img className="w-9 h-9 rounded" src="https://res.cloudinary.com/diefezach/image/upload/v1720413175/logo_margrey_ynqpbx.jpg" alt="Logo" />
            <h2 className="font-semibold text-lg">Cotizador</h2>
          </div>

          <input
            className="border border-white/40 bg-white text-gray-900 rounded-lg px-3 py-2 w-full sm:w-80 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Buscar por producto, SKU, código…"
            value={q}
            onChange={e=>setQ(e.target.value)}
          />

          <select
            className="border border-white/40 bg-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={category}
            onChange={e=>setCategory(e.target.value)}
          >
            {categories.map(c=><option key={c} value={c}>{c}</option>)}
          </select>

          {/* Botón carrito: en móvil hace scroll al resumen */}
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

      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6 w-full flex-1">
        {/* Tabla de productos */}
        <section className="lg:col-span-2 overflow-x-auto">
          <table className="w-full text-sm bg-white rounded-2xl shadow overflow-hidden">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="text-left p-3 w-56">Producto</th>
                <th className="text-left p-3">Descripción</th>
                <th className="text-left p-3 w-40">Precio</th>
                <th className="text-left p-3 w-[320px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td className="p-4 text-gray-500" colSpan={4}>Sin resultados.</td></tr>
              ) : (
                filtered.map((p, idx) => (
                  <FilaProducto
                    key={`${p.sku || p.code || p.product}-${idx}`}
                    p={p}
                    onAdd={add}
                  />
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Carrito */}
        {/* Carrito */}
<aside className="lg:col-span-1" ref={cartRef}>
  {/* El card es sticky, pero lo que scrollea es el contenido interno */}
  <div className="bg-white rounded-2xl shadow lg:sticky lg:top-20">
    {/* Header del card (NO scrollea) */}
    <div className="p-4 flex items-center justify-between border-b">
      <h3 className="text-lg font-semibold">Carrito de compras</h3>

      <button
        type="button"
        onClick={clearCart}
        disabled={!cart.length}
        aria-label="Vaciar cotización"
        title="Vaciar cotización"
        className={`inline-flex items-center justify-center rounded-lg px-2 py-1 transition
          ${cart.length ? "text-red-600 hover:bg-red-50" : "text-gray-300 cursor-not-allowed"}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             className="w-5 h-5" fill="none" stroke="currentColor"
             strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
        <span className="ml-2 text-sm">Vaciar</span>
      </button>
    </div>

    {/* Contenido desplazable */}
    <div
  className="p-4 max-h-[calc(100vh-8rem)] overflow-y-auto"
>
  {/* …tabla del carrito aquí… */}
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
            {cart.length===0 ? (
              <tr><td className="py-4 text-gray-500" colSpan={5}>Aún no hay productos.</td></tr>
            ) : cart.map(l => (
              <tr key={l.key} className="border-t">
                <td className="py-2">
                  <div className="font-medium">{l.product}</div>
                  <div className="text-xs text-gray-500">
                    {l.mode==="unit"?"Pieza/Litro":"Caja/Paquete"} · {l.description || "—"}
                  </div>
                </td>
                <td className="py-2">{peso(l.unitPrice)}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-0.5 rounded-lg bg-gray-100 hover:bg-gray-200" title="Restar 1" onClick={()=>decLine(l.key)}>−</button>
                    <span className="inline-flex items-center justify-center text-[11px] px-2 py-0.5 rounded-full bg-red-100 text-red-700">×{l.qty}</span>
                  </div>
                </td>
                <td className="py-2 font-medium">{peso(l.unitPrice*l.qty)}</td>
                <td className="py-2">
                  <button className="text-red-600" onClick={()=>removeLine(l.key)}>Quitar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Extras */}
      {/* Extras (resumen fijo) */}
<div
    ref={footerRef}
    className="sticky bottom-0 z-10 bg-white border-t pt-3 pb-4 space-y-3 text-sm
               shadow-[0_-6px_10px_-6px_rgba(0,0,0,0.08)]"
  >
  <div className="flex items-center justify-between">
    <span>Subtotal productos</span>
    <span className="font-medium">{peso(subtotal)}</span>
  </div>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      className="w-4 h-4"
      checked={aplicaDescuento}
      onChange={e=>setAplicaDescuento(e.target.checked)}
    />
    Aplicar 25% descuento (no aplica a microfibra ni esponjas)
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      className="w-4 h-4"
      checked={llevaMicrofibra}
      onChange={e=>setLlevaMicrofibra(e.target.checked)}
    />
    ¿Lleva microfibra?
    <span className="ml-auto">{llevaMicrofibra? `+ ${peso(PRECIO_MICRO)}` : "+ $0.00"}</span>
  </label>

  <div className="flex items-center gap-3">
    <span>Esponjas</span>
    <Qty value={esponjas} onChange={setEsponjas} min={0} />
    <span className="ml-auto">{peso(esponjas*PRECIO_ESPONJA)}</span>
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
    onChange={(e)=>setCotiza(e.target.value)}
    placeholder="Nombre de la persona que cotiza"
    className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
  />
  </label>

  <button
    className="w-full mt-1 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
    onClick={()=>{
      generarPDFPedido({
        cart,
        subtotal,
        descuento,
        llevaMicrofibra,
        esponjas,
        PRECIO_MICRO,
        PRECIO_ESPONJA,
        total,
        cotiza, 
      });
    }}
  >
    Generar pedido
  </button>
</div>
    </div>
  </div>
</aside>
      </div>

      {/* Footer rojo pegado abajo */}
      <footer className="bg-red-600 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Margrey · Comercializadora DTUP</span>
          <a className="underline decoration-white/60 hover:decoration-white" href="mailto:comercializadoradtup@hotmail.com">
            Soporte: comercializadoradtup@hotmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

function getLitros(p){
  const t = `${p.description||""} ${p.unitDescription||""}`.toUpperCase();
  const m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:LT|LTS|L)\b/);
  return m ? parseFloat(m[1].replace(",", ".")) : null;
}

// Detecta presentaciones a granel que deben ser solo pieza
function isUnitOnly(p) {
  const t = `${p.description||""} ${p.unitDescription||""}`.toUpperCase();

  // ¿Es porrón/cubeta/tambor?
  const esGranel = /(PORR[ÓO]N|PORRON|CUBETA|TAMBOR)/.test(t);
  if (!esGranel) return false;

  // Extrae litros si vienen en el texto
  const m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:LT|LTS|L)\b/);
  if (m) {
    const n = parseFloat(m[1].replace(",", "."));
    return n > 4; // solo pieza si es mayor a 4L
  }

  // Fallback por tamaños comunes
  if (/(19|20|25|50|60|100|200|208)\s*(?:LT|LTS|L)\b/.test(t)) return true;

  // Si no hay número pero es granel, mejor prevenir
  return true;
}

function FilaProducto({ p, onAdd }) {
  const unitOnly = isUnitOnly(p);
  const litros = getLitros(p);

  // Precios “derivados” sin mutar p:
  const unitPrice = unitOnly ? undefined : p.unitPrice; // no vendible en granel
  const packPrice = p.price;                            // envase completo
  const pricePerLtInfo = (p.unitPrice ?? ((packPrice && litros) ? packPrice / litros : undefined));

  const [mode,setMode] = useState(unitOnly ? "pack" : "unit"); // en granel, default pack
  const [qty,setQty] = useState(1);

  const hasUnit = !!unitPrice;
  const hasPack = !!packPrice; // quedará false cuando sea unitOnly

  const disabled = (mode==="unit" && !hasUnit) || (mode==="pack" && !hasPack);

  return (
    <tr className="border-t align-top">
      <td className="p-3">
        <div className="flex items-center gap-3">
          {p.image ? (
            <img src={p.image} alt={p.product} className="w-12 h-12 object-cover rounded" />
          ) : (
            <div className="w-12 h-12 rounded bg-gray-100 grid place-content-center text-[10px] text-gray-500">Sin foto</div>
          )}
          <div>
            <div className="font-semibold leading-tight">{p.product}</div>
            <div className="text-[11px] text-gray-500">
              {p.sku && <>SKU: {p.sku} · </>}
              {p.code && <>UPC: {p.code}</>}
            </div>
          </div>
        </div>
      </td>

      <td className="p-3">
        <div className="text-sm">{p.description || p.unitDescription || p.name || "—"}</div>
        {p.link && (
          <a
            className="text-xs text-red-600 hover:underline"
            href={p.link.replace("comercializadoradtpu","comercializadoradtup")}
            target="_blank" rel="noreferrer"
          >
            Ver detalle / ficha
          </a>
        )}
      </td>

      <td className="p-3 whitespace-nowrap">
        {unitOnly ? (
     <>
       <div className="text-xs text-gray-500">Precio por litro (informativo)</div>
       <div className="font-medium">
         {pricePerLtInfo ? Number(pricePerLtInfo).toLocaleString("es-MX",{style:"currency",currency:"MXN"}) : "—"}
       </div>
       <div className="text-xs text-gray-500 mt-1">Envase completo</div>
       <div className="font-medium">
         {hasPack ? Number(packPrice).toLocaleString("es-MX",{style:"currency",currency:"MXN"}) : "—"}
       </div>
     </>
   ) : (
     <>
       <div className="text-xs text-gray-500">Pieza/Litro</div>
       <div className="font-medium">
         {hasUnit ? Number(unitPrice).toLocaleString("es-MX",{style:"currency",currency:"MXN"}) : "—"}
       </div>
       <div className="text-xs text-gray-500 mt-1">Caja/Paquete</div>
       <div className="font-medium">
         {hasPack ? Number(packPrice).toLocaleString("es-MX",{style:"currency",currency:"MXN"}) : "—"}
       </div>
     </>
   )}
      </td>

      <td className="p-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="border rounded-lg px-2 py-1 text-sm"
            value={mode}
            onChange={(e)=>setMode(e.target.value)}
          >
            <option value="unit" disabled={!hasUnit}>
              Pieza/Litro {hasUnit ? `(${Number(unitPrice).toLocaleString("es-MX",{style:"currency",currency:"MXN"})})` : "(—)"}
            </option>
            <option value="pack" disabled={!hasPack}>
              {unitOnly ? "Envase completo" : "Caja/Paquete"} {hasPack ? `(${peso(packPrice)})` : "(—)"}
            </option>
          </select>

          <Qty value={qty} onChange={setQty} />

          <button
            className={`inline-flex items-center justify-center px-3 py-2 rounded-xl text-white whitespace-nowrap ${
              disabled ? "bg-gray-300" : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={disabled}
            onClick={()=>{
              // Pasamos precios derivados sin tocar el array original
              onAdd(
                { ...p, unitPrice, price: packPrice },
                mode,
                qty
              );
            }}
          >
            Agregar
          </button>
        </div>
      </td>
    </tr>
  );
}