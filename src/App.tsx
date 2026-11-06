import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ==========================================================
   GENERATED SHOWCASE ASSETS (Mexicali Local Business Samples)
   ========================================================== */
const IMG_LONAS_IMPRESION =
  "/src/assets/images/mexicali_lonas_impresion_1793958654775.jpg";
const IMG_EXTERIOR_BANDERAS =
  "/src/assets/images/mexicali_exterior_banderas_1793958655573.jpg";
const IMG_TEXTIL_DTF =
  "/src/assets/images/mexicali_textil_dtf_bordado_1793958657806.jpg";
const IMG_PROMO_LASER =
  "/src/assets/images/mexicali_promocionales_laser_1793958658419.jpg";
const IMG_TARJETAS_DISENO =
  "/src/assets/images/mexicali_tarjetas_diseno_1793958658645.jpg";

/* ==========================================================
   TYPES & DATA INTERFACES
   ========================================================== */
export type CategoryKey =
  | "impresion"
  | "exterior"
  | "textil"
  | "promocionales"
  | "especiales";

export type ThemeMode = "system" | "light" | "dark";

export interface ProductItem {
  id: string;
  category: CategoryKey;
  name: string;
  price: number;
  desc: string;
  badge: string;
  specs: string;
  img: string;
}

export interface GalleryItem {
  id: string;
  category: CategoryKey;
  title: string;
  businessType?: string;
  desc: string;
  img: string;
}

export interface MexicaliShowcaseItem {
  id: string;
  businessName: string;
  sector: string;
  zone: string;
  packageTitle: string;
  includedItems: string[];
  estimatedPrice: number;
  category: CategoryKey;
  linkedProductId: string;
  img: string;
}

export interface BrandConfig {
  brandName: string;
  slogan: string;
  subtitle: string;
  whatsappPhone: string;
  adminPin: string;
  location: string;
  primaryColor: string;
  customQrUrl?: string;
}

export interface DatabaseState {
  config: BrandConfig;
  showcase: MexicaliShowcaseItem[];
  products: ProductItem[];
  gallery: GalleryItem[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  showQuoteAction?: boolean;
}

const STORAGE_KEY = "as_publicidad_db_ios27_v3";
const THEME_STORAGE_KEY = "as_publicidad_theme_mode";

/* ==========================================================
   FICTIONAL MEXICALI LOCAL BUSINESS SHOWCASE DATA (MOSTRARIO)
   ========================================================== */
const MEXICALI_SHOWCASE_ITEMS: MexicaliShowcaseItem[] = [
  {
    id: "show-1",
    businessName: "Taquería La Esquina & Café Estrella",
    sector: "Gastronomía & Restaurantes",
    zone: "Zona Centro / Benito Juárez, Mexicali",
    packageTitle: "Kit Apertura Gastronómica HD",
    includedItems: [
      "Lona Exterior 15oz 3x1.5m con Protección UV",
      "10 Playeras DTF Full Color para Staff",
      "Menús Tabloides Plastificados 300g",
    ],
    estimatedPrice: 2450,
    category: "impresion",
    linkedProductId: "prod-1",
    img: IMG_LONAS_IMPRESION,
  },
  {
    id: "show-2",
    businessName: "Plaza California · Vivant & Nexus",
    sector: "Plazas Comerciales & Boutiques",
    zone: "Blvd. Lázaro Cárdenas / Zona Dorada, Mexicali",
    packageTitle: "Pack Visibilidad Vial & Fachada",
    includedItems: [
      "2 Banderas Publicitarias Pluma 3.5m Doble Vista",
      "Caja Luminosa LED de Acrílico Exterior",
      "Vinil Microperforado para Ventanales",
    ],
    estimatedPrice: 5890,
    category: "exterior",
    linkedProductId: "prod-6",
    img: IMG_EXTERIOR_BANDERAS,
  },
  {
    id: "show-3",
    businessName: "Northwest Beer Co. & Oakwood Logistics",
    sector: "Cervecerías Artesanales & Parque Industrial",
    zone: "Parque Industrial Cachanilla, Mexicali",
    packageTitle: "Colección Textil Corporativa Pro",
    includedItems: [
      "12 Camisas Polo con Bordado Computarizado 3D",
      "12 Playeras Algodón Peinado con Impresión DTF",
      "Gorras Trucker Personalizadas",
    ],
    estimatedPrice: 4680,
    category: "textil",
    linkedProductId: "prod-12",
    img: IMG_TEXTIL_DTF,
  },
  {
    id: "show-4",
    businessName: "Apex Logistics & Stratos Group",
    sector: "Corporativos, Clínicas & Despachos",
    zone: "Centro Cívico / Calzada Cetys, Mexicali",
    packageTitle: "Kit Regalos Ejecutivos & Bienvenida",
    includedItems: [
      "15 Termos Acero Inox 304 con Grabado Láser",
      "24 Tazas Cerámicas 11oz Sublimación Espejo",
      "Llaveros Metálicos con Estuche",
    ],
    estimatedPrice: 4950,
    category: "promocionales",
    linkedProductId: "prod-16",
    img: IMG_PROMO_LASER,
  },
  {
    id: "show-5",
    businessName: "Velvet & Co. · Estudio Arquitectónico",
    sector: "Inmobiliarias, Consultores & Estudios",
    zone: "San Pedro / Villafontana, Mexicali",
    packageTitle: "Identidad Corporativa & Papelería de Lujo",
    includedItems: [
      "1,000 Tarjetas Soft Touch 16pts con Barniz UV",
      "Diseño Vectorial de Identidad de Marca",
      "Recetarios / Notas Foliadas Corporativas",
    ],
    estimatedPrice: 1690,
    category: "especiales",
    linkedProductId: "prod-2",
    img: IMG_TARJETAS_DISENO,
  },
];

/* ==========================================================
   SVG DATA URI ILLUSTRATION GENERATOR (Zero-Broken-Image Policy)
   ========================================================== */
function createProductVisualSvg(
  title: string,
  subtitle: string,
  accentA: string,
  accentB: string,
  iconType: "print" | "banner" | "apparel" | "laser" | "studio"
): string {
  const iconMarkup: Record<typeof iconType, string> = {
    print: `
      <rect x="210" y="95" width="180" height="125" rx="14" fill="rgba(255,255,255,0.12)" stroke="${accentA}" stroke-width="2.5"/>
      <rect x="230" y="115" width="90" height="14" rx="4" fill="${accentA}"/>
      <rect x="230" y="138" width="140" height="8" rx="4" fill="rgba(255,255,255,0.65)"/>
      <rect x="230" y="154" width="115" height="8" rx="4" fill="rgba(255,255,255,0.4)"/>
      <circle cx="355" cy="185" r="18" fill="${accentB}" opacity="0.85"/>
      <path d="M185 245 L415 245" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-dasharray="6 6"/>
    `,
    banner: `
      <path d="M250 75 C315 75, 345 115, 330 185 C320 225, 275 245, 250 255 L250 75 Z" fill="url(#accentGrad)" opacity="0.9"/>
      <line x1="246" y1="68" x2="246" y2="285" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
      <rect x="216" y="280" width="60" height="12" rx="6" fill="${accentA}"/>
      <circle cx="355" cy="120" r="28" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
    `,
    apparel: `
      <path d="M235 90 L265 90 C272 105, 328 105, 335 90 L365 90 L405 135 L375 165 L355 145 L355 255 L245 255 L245 145 L225 165 L195 135 Z" fill="rgba(255,255,255,0.12)" stroke="${accentA}" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="270" y="135" width="60" height="60" rx="12" fill="url(#accentGrad)"/>
      <path d="M285 165 L297 177 L318 153" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    `,
    laser: `
      <rect x="255" y="85" width="90" height="175" rx="18" fill="rgba(255,255,255,0.12)" stroke="${accentA}" stroke-width="2.5"/>
      <rect x="265" y="70" width="70" height="18" rx="6" fill="${accentB}"/>
      <line x1="300" y1="35" x2="300" y2="145" stroke="#00d4ff" stroke-width="2.5" stroke-dasharray="4 4"/>
      <circle cx="300" cy="150" r="22" fill="url(#accentGrad)"/>
      <circle cx="300" cy="150" r="6" fill="#ffffff"/>
    `,
    studio: `
      <rect x="205" y="100" width="190" height="135" rx="20" fill="rgba(255,255,255,0.12)" stroke="${accentA}" stroke-width="2.5"/>
      <circle cx="300" cy="168" r="38" fill="none" stroke="url(#accentGrad)" stroke-width="5"/>
      <circle cx="300" cy="168" r="16" fill="${accentB}"/>
      <circle cx="362" cy="126" r="7" fill="#00d4ff"/>
    `,
  };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#060b16"/>
        <stop offset="52%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e1b4b"/>
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accentA}"/>
        <stop offset="100%" stop-color="${accentB}"/>
      </linearGradient>
      <radialGradient id="glowA" cx="20%" cy="20%" r="55%">
        <stop offset="0%" stop-color="${accentA}" stop-opacity="0.38"/>
        <stop offset="100%" stop-color="${accentA}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glowB" cx="82%" cy="80%" r="55%">
        <stop offset="0%" stop-color="${accentB}" stop-opacity="0.36"/>
        <stop offset="100%" stop-color="${accentB}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="400" fill="url(#bg)"/>
    <rect width="600" height="400" fill="url(#glowA)"/>
    <rect width="600" height="400" fill="url(#glowB)"/>
    <g opacity="0.12" stroke="#ffffff" stroke-width="1">
      <line x1="0" y1="80" x2="600" y2="80"/>
      <line x1="0" y1="160" x2="600" y2="160"/>
      <line x1="0" y1="240" x2="600" y2="240"/>
      <line x1="0" y1="320" x2="600" y2="320"/>
      <line x1="120" y1="0" x2="120" y2="400"/>
      <line x1="240" y1="0" x2="240" y2="400"/>
      <line x1="360" y1="0" x2="360" y2="400"/>
      <line x1="480" y1="0" x2="480" y2="400"/>
    </g>
    ${iconMarkup[iconType]}
    <text x="300" y="330" text-anchor="middle" fill="#ffffff" font-family="Outfit, sans-serif" font-weight="800" font-size="22" letter-spacing="0.5">${title}</text>
    <text x="300" y="358" text-anchor="middle" fill="#38bdf8" font-family="JetBrains Mono, monospace" font-weight="600" font-size="12" letter-spacing="2">${subtitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* ==========================================================
   DETERMINISTIC HIGH-PRECISION QR CODE MATRIX SVG COMPONENT
   Generates a crisp 25x25 QR matrix with Finder Patterns,
   Alignment Pattern, Timing Tracks, and Branded Center Badge
   ========================================================== */
const QrCodeMatrix: React.FC<{
  value: string;
  size?: number;
  showScanline?: boolean;
  className?: string;
}> = ({ value, size = 180, showScanline = true, className = "" }) => {
  const gridSize = 25;

  const matrix = useMemo(() => {
    const grid: boolean[][] = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(false)
    );
    const reserved: boolean[][] = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(false)
    );

    const placeFinder = (rowOffset: number, colOffset: number) => {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const rr = rowOffset + r;
          const cc = colOffset + c;
          if (rr >= 0 && rr < gridSize && cc >= 0 && cc < gridSize) {
            reserved[rr][cc] = true;
            if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
              const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
              const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
              grid[rr][cc] = isBorder || isInner;
            }
          }
        }
      }
    };

    placeFinder(0, 0);
    placeFinder(0, gridSize - 7);
    placeFinder(gridSize - 7, 0);

    // Alignment pattern at bottom-right (row 16..20, col 16..20)
    for (let r = 16; r <= 20; r++) {
      for (let c = 16; c <= 20; c++) {
        reserved[r][c] = true;
        const isBorder = r === 16 || r === 20 || c === 16 || c === 20;
        const isCenter = r === 18 && c === 18;
        grid[r][c] = isBorder || isCenter;
      }
    }

    // Timing patterns
    for (let i = 8; i < gridSize - 8; i++) {
      reserved[6][i] = true;
      reserved[i][6] = true;
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    // Reserve center 5x5 for "AS" emblem
    for (let r = 10; r <= 14; r++) {
      for (let c = 10; c <= 14; c++) {
        reserved[r][c] = true;
        grid[r][c] = false;
      }
    }

    // Deterministic hash from value string
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (!reserved[r][c]) {
          const seed =
            Math.imul(r * 31 + c * 17 + 13, hash) ^
            value.charCodeAt((r * gridSize + c) % Math.max(1, value.length));
          grid[r][c] = (Math.abs(seed) & 3) !== 0;
        }
      }
    }

    return grid;
  }, [value]);

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative bg-white p-3 rounded-2xl shadow-md border border-slate-200 overflow-hidden select-none shrink-0 ${className}`}
    >
      <svg
        viewBox={`0 0 ${gridSize} ${gridSize}`}
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        {matrix.map((row, rIdx) =>
          row.map((cell, cIdx) =>
            cell ? (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx}
                y={rIdx}
                width={1}
                height={1}
                fill="#080c16"
                rx={0.18}
              />
            ) : null
          )
        )}
      </svg>

      {/* Center AS Brand Emblem */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-8 h-8 rounded-lg bg-slate-950 text-white font-display font-black text-[11px] flex items-center justify-center shadow-md border-2 border-white">
          AS
        </div>
      </div>

      {/* Animated Laser Scanline */}
      {showScanline && (
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-qr-scan" />
        </div>
      )}
    </div>
  );
};

/* ==========================================================
   DEFAULT DATABASE (20 Products across A-E + 8 Gallery Items)
   ========================================================== */
const DEFAULT_DB: DatabaseState = {
  config: {
    brandName: "AS PUBLICIDAD",
    slogan: "TU MARCA, EN TODAS PARTES.",
    subtitle:
      "Impresión digital de alta resolución, publicidad exterior, personalización textil y artículos promocionales con calidad premium garantizada en Mexicali.",
    whatsappPhone: "526860000000",
    adminPin: "1234",
    location: "Mexicali, Baja California, México",
    primaryColor: "#007aff",
    customQrUrl: "",
  },
  showcase: MEXICALI_SHOWCASE_ITEMS,
  products: [
    // CATEGORÍA A: IMPRESIÓN
    {
      id: "prod-1",
      category: "impresion",
      name: "Lonas Publicitarias 13oz / 15oz Ultra HD",
      price: 180,
      desc: "Impresión a 1440 DPI con tintas solventes resistentes a la radiación solar de Mexicali. Dobladillo perimetral vulcanizado y ojillos de acero reforzados.",
      badge: "Alta Resistencia",
      specs:
        "Lona frontlite de 13oz o 15oz • Tintas UV 3 años de garantía • Ojillos perimetrales cada metro.",
      img: IMG_LONAS_IMPRESION,
    },
    {
      id: "prod-2",
      category: "impresion",
      name: "Tarjetas de Presentación Soft Touch con Barniz UV",
      price: 360,
      desc: "Sulfatada 16pts con laminado aterciopelado mate y barniz a registro brillante sobre tu logotipo. Gran elegancia para ejecutivos.",
      badge: "Acabado de Lujo",
      specs:
        "Cartulina sulfatada 16pts • Barniz UV a registro brillante • Paquete de 1,000 unidades.",
      img: IMG_TARJETAS_DISENO,
    },
    {
      id: "prod-3",
      category: "impresion",
      name: "Tabloides & Posters Sulfatados 300g",
      price: 25,
      desc: "Papel Couche brillante o sulfatado de 300g. Colores nítidos calibrados para publicidad de mostrador, menús y señalética comercial.",
      badge: "Full Color",
      specs:
        "Medida 12x18 pulgadas • Papel 300g grueso • Entrega el mismo día disponible.",
      img: IMG_LONAS_IMPRESION,
    },
    {
      id: "prod-4",
      category: "impresion",
      name: "Volantes & Flyers Publicitarios Mayoreo",
      price: 540,
      desc: "Medida 1/4 o 1/2 carta en papel couche brillante 130g. Impresión offset full color frente y vuelta para campañas de alto alcance.",
      badge: "Volumen",
      specs:
        "Offset industrial • Papel couche 130g • Millares completos garantizados.",
      img: createProductVisualSvg(
        "FLYERS OFFSET MAYOREO",
        "FRENTE Y VUELTA • ALTO ALCANCE",
        "#007aff",
        "#00d4ff",
        "print"
      ),
    },
    {
      id: "prod-5",
      category: "impresion",
      name: "Notas de Remisión y Recetarios Foliados",
      price: 460,
      desc: "Papel autocopiante original y copias a color, engrapadas en block con folio consecutivo y plecado microperforado para desprendimiento fácil.",
      badge: "Corporativo",
      specs:
        "Bloques de 50 juegos • Duplicado o triplicado • Folio rojo de control.",
      img: createProductVisualSvg(
        "NOTAS & RECETARIOS FOLIADOS",
        "AUTOCOPIANTE • FOLIO CONSECUTIVO",
        "#34c759",
        "#007aff",
        "print"
      ),
    },

    // CATEGORÍA B: PUBLICIDAD EXTERIOR
    {
      id: "prod-6",
      category: "exterior",
      name: "Banderas Publicitarias Pluma / Gota",
      price: 1290,
      desc: "Estructura de fibra de vidrio articulada, tela sublimada resistente al viento y base metálica con dona de agua o estaca para pasto.",
      badge: "Gran Impacto",
      specs:
        "Alturas de 2.8m a 4.5m • Tela náutica lavable • Base para vientos fuertes.",
      img: IMG_EXTERIOR_BANDERAS,
    },
    {
      id: "prod-7",
      category: "exterior",
      name: "Vinil Adhesivo Microperforado & Suajado",
      price: 240,
      desc: "Vinil brillante, mate o microperforado para cristales y canceles. Permite ver hacia afuera mientras muestra tu diseño a la calle.",
      badge: "UV Solvente",
      specs:
        "Material grado automotriz y arquitectónico • Instalación profesional disponible en Mexicali.",
      img: IMG_LONAS_IMPRESION,
    },
    {
      id: "prod-8",
      category: "exterior",
      name: "Calcomanías & Stickers Troquelados HD",
      price: 330,
      desc: "Corte a registro según la silueta de tu logotipo. Vinil impermeable a prueba de sol, intemperie y rayaduras.",
      badge: "Troquelado Preciso",
      specs:
        "Acabado brillante, holográfico o mate • Paquetes por planilla o individuales.",
      img: createProductVisualSvg(
        "STICKERS TROQUELADOS HD",
        "CORTE A REGISTRO • IMPERMEABLES",
        "#ff9500",
        "#ff2a5f",
        "banner"
      ),
    },
    {
      id: "prod-9",
      category: "exterior",
      name: "Rotulación Vehicular Comercial & Flotillas",
      price: 1950,
      desc: "Rotulación para camiones de reparto, pickups y vehículos utilitarios. Vinil de alta maleabilidad con protección UV.",
      badge: "Publicidad Móvil",
      specs:
        "Vinil fundido conformable • Adhesivo libre de burbujas • Protección térmica.",
      img: createProductVisualSvg(
        "ROTULACIÓN DE FLOTILLAS",
        "VINIL FUNDIDO GRADO AUTOMOTRIZ",
        "#007aff",
        "#ff2a5f",
        "banner"
      ),
    },
    {
      id: "prod-10",
      category: "exterior",
      name: "Anuncios Publicitarios y Cajas de Luz LED",
      price: 3600,
      desc: "Cajas luminosas tubulares con iluminación de módulos LED de alta intensidad y bajo consumo, cara de acrílico o lona traslúcida.",
      badge: "Luminoso LED",
      specs:
        "Estructura de aluminio y acero • Módulos LED Samsung IP67 • Para exterior 24/7.",
      img: IMG_EXTERIOR_BANDERAS,
    },

    // CATEGORÍA C: TEXTIL Y PERSONALIZACIÓN
    {
      id: "prod-11",
      category: "textil",
      name: "Playeras DTF Textil Ultra HD",
      price: 155,
      desc: "Algodón 100% peinado o tela tacto suave. Impresión DTF full color de máxima elasticidad y suavidad, sin límite de tonos ni degradados.",
      badge: "Tacto Suave",
      specs:
        "Tinta elástica antiextensión • Más de 50 lavadas garantizadas • Tallas desde 2 años hasta 3XL.",
      img: IMG_TEXTIL_DTF,
    },
    {
      id: "prod-12",
      category: "textil",
      name: "Uniformes y Camisas Polo con Bordado Computarizado",
      price: 295,
      desc: "Bordado de alta densidad en pecho, manga o espalda con hilos alemanes de brillo premium. Gran presencia para empresas.",
      badge: "Bordado Pro",
      specs:
        "Matricería digital de precisión • Hilos resistentes al cloro • Corte ergonómico.",
      img: IMG_TEXTIL_DTF,
    },
    {
      id: "prod-13",
      category: "textil",
      name: "Serigrafía Textil Tradicional",
      price: 90,
      desc: "Ideal para eventos masivos, carreras atléticas y pedidos de más de 50 piezas. Tintas plastisol o base agua de máxima duración.",
      badge: "Precio Mayoreo",
      specs:
        "A partir de 30 piezas • Malla de alta definición • Tacto suave curado en horno.",
      img: createProductVisualSvg(
        "SERIGRAFÍA TEXTIL MAYOREO",
        "PLASTISOL & BASE AGUA • EVENTOS",
        "#ff9500",
        "#ff2a5f",
        "apparel"
      ),
    },
    {
      id: "prod-14",
      category: "textil",
      name: "Sublimación Deportiva Full Print",
      price: 210,
      desc: "Confección deportiva o promocional con cobertura 100% en telas dry-fit con tecnología de secado rápido y colores neón vibrantes.",
      badge: "Full Print",
      specs:
        "Tela microfibra transpirable • No se despinta nunca • Números y nombres personalizados.",
      img: createProductVisualSvg(
        "JERSEYS SUBLIMACIÓN FULL",
        "TECNOLOGÍA DRY-FIT • SECADO RÁPIDO",
        "#00d4ff",
        "#34c759",
        "apparel"
      ),
    },

    // CATEGORÍA D: ARTÍCULOS PROMOCIONALES
    {
      id: "prod-15",
      category: "promocionales",
      name: "Tazas Cerámicas 11oz Personalizadas",
      price: 70,
      desc: "Cerámica blanca triple A con polímero brillante de máxima fijación. Aptas para microondas y lavavajillas sin perder brillo.",
      badge: "Favorito",
      specs:
        "Capacidad 11oz / 325ml • Opciones: blanca clásica, asa de color o taza mágica negra.",
      img: IMG_PROMO_LASER,
    },
    {
      id: "prod-16",
      category: "promocionales",
      name: "Termos y Vasos Térmicos con Grabado Láser",
      price: 260,
      desc: "Acero inoxidable con doble pared aislada al vacío para 24 horas de frío y 12 horas de calor. Grabado láser indeleble con tu marca.",
      badge: "Grabado Láser",
      specs:
        "Acero grado alimenticio 304 • Grabado de fibra óptica • Acabados mate o satinado.",
      img: IMG_PROMO_LASER,
    },
    {
      id: "prod-17",
      category: "promocionales",
      name: "Llaveros Publicitarios Acrílicos / Metálicos",
      price: 38,
      desc: "Llaveros en corte láser acrílico cristal o metal esmaltado con tu logo para posicionamiento constante en clientes.",
      badge: "Económico",
      specs: "Corte láser milimétrico • Herraje reforzado • Doble vista.",
      img: createProductVisualSvg(
        "LLAVEROS ACRÍLICO & METAL",
        "CORTE LÁSER MILIMÉTRICO • DOBLE VISTA",
        "#7928ca",
        "#00d4ff",
        "laser"
      ),
    },
    {
      id: "prod-18",
      category: "promocionales",
      name: "Pañaleros Personalizados de Algodón",
      price: 130,
      desc: "Prendas hipoalergénicas 100% algodón para bebés con broches inoxidables y diseños personalizados temáticos o tiernos.",
      badge: "Bebé & Familia",
      specs:
        "Algodón peinado hipoalergénico • Impresión DTF tacto cero • Tallas 0 a 24 meses.",
      img: createProductVisualSvg(
        "PAÑALEROS ALGODÓN 100%",
        "HIPOALERGÉNICO • IMPRESIÓN TACTO CERO",
        "#ff9500",
        "#00d4ff",
        "apparel"
      ),
    },

    // CATEGORÍA E: SERVICIOS ESPECIALES
    {
      id: "prod-19",
      category: "especiales",
      name: "Fotografía Publicitaria de Producto",
      price: 980,
      desc: "Sesión fotográfica en estudio con iluminación profesional para menús de restaurantes, catálogos digitales y campañas en redes.",
      badge: "Estudio Pro",
      specs:
        "Cámara Full Frame • Fondos infinitos y props • Retoque digital de alta gama.",
      img: IMG_PROMO_LASER,
    },
    {
      id: "prod-20",
      category: "especiales",
      name: "Diseño Gráfico & Identidad Corporativa",
      price: 890,
      desc: "Creación de logotipos vectoriales, manuales de marca y preparación técnica de archivos con curvas listos para imprenta.",
      badge: "Creatividad",
      specs:
        "Entrega en AI, PDF, EPS y PNG • Paleta cromática oficial • Tipografías incluidas.",
      img: IMG_TARJETAS_DISENO,
    },
  ],
  gallery: [
    {
      id: "gal-1",
      category: "impresion",
      title: "Lonas HD para Taquería La Esquina & Café Estrella",
      businessType: "Gastronomía Local · Mexicali",
      desc: "Impresión a 1440 DPI en plotter Roland TrueVIS con tintas ecosolventes UV sobre lona 15oz reforzada para el sol de Mexicali.",
      img: IMG_LONAS_IMPRESION,
    },
    {
      id: "gal-2",
      category: "exterior",
      title: "Banderas Pluma & Anuncios LED en Plaza California",
      businessType: "Centro Comercial · Zona Dorada",
      desc: "Banderas publicitarias de 3.5 metros resistentes al viento y letras de canal LED para locales comerciales en Mexicali.",
      img: IMG_EXTERIOR_BANDERAS,
    },
    {
      id: "gal-3",
      category: "textil",
      title: "Uniformes Polos Bordados & DTF para Empresas",
      businessType: "Industria & Cervecería Artesanal",
      desc: "Polos corporativas con bordado computarizado de alta densidad y playeras negras en DTF Textil Ultra HD.",
      img: IMG_TEXTIL_DTF,
    },
    {
      id: "gal-4",
      category: "promocionales",
      title: "Termos Grabado Láser & Tazas Corporativas",
      businessType: "Logística & Consultoría · Mexicali",
      desc: "Termos térmicos de acero inoxidable negro mate grabados con láser de fibra óptica y tazas cerámicas 11oz.",
      img: IMG_PROMO_LASER,
    },
    {
      id: "gal-5",
      category: "impresion",
      title: "Tarjetas Soft Touch con Barniz UV y Dorado",
      businessType: "Despacho Arquitectónico & Legal",
      desc: "Cartulina sulfatada 16pts con laminado mate aterciopelado, barniz a registro 3D y acabados ejecutivos.",
      img: IMG_TARJETAS_DISENO,
    },
    {
      id: "gal-6",
      category: "exterior",
      title: "Rotulación de Flotilla de Reparto Comercial",
      businessType: "Distribuidora Calafia · Mexicali",
      desc: "Vinil fundido grado automotriz resistente a lavados a presión y temperaturas extremas de verano.",
      img: createProductVisualSvg(
        "FLOTILLA COMERCIAL CALAFIA",
        "ROTULACIÓN VEHICULAR COMPLETA",
        "#007aff",
        "#34c759",
        "banner"
      ),
    },
    {
      id: "gal-7",
      category: "textil",
      title: "Bordado 3D en Gorras Estilo Trucker",
      businessType: "Agroindustria del Valle de Mexicali",
      desc: "Bordado 3D de alto relieve con hilos alemanes resistentes al sol y sudor.",
      img: createProductVisualSvg(
        "BORDADO 3D GORRAS TRUCKER",
        "ALTO RELIEVE • VALLE DE MEXICALI",
        "#7928ca",
        "#ff2a5f",
        "apparel"
      ),
    },
    {
      id: "gal-8",
      category: "promocionales",
      title: "Stickers Troquelados & Etiquetas Waterproof",
      businessType: "Cafeterías & Repostería Local",
      desc: "Calcomanías troqueladas a registro resistentes a humedad y refrigeración para vasos y empaques.",
      img: createProductVisualSvg(
        "STICKERS WATERPROOF HD",
        "CORTE A REGISTRO • EMPAQUES",
        "#00d4ff",
        "#ff2a5f",
        "laser"
      ),
    },
  ],
};

function getCategoryLabel(catKey: string): string {
  const labels: Record<string, string> = {
    impresion: "A • Impresión Digital & Lonas",
    exterior: "B • Publicidad Exterior & Banderas",
    textil: "C • Textil, DTF & Bordado",
    promocionales: "D • Artículos Promocionales",
    especiales: "E • Servicios Especiales & Diseño",
  };
  return labels[catKey] || catKey;
}

function generateSmartFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("dtf") || q.includes("sublima")) {
    return `💡 **DTF vs Sublimación:**
- **DTF Textil Ultra HD:** Imprime a todo color sobre algodón 100%, poliéster o mezclas de cualquier color (incluso negro). Su tinta elástica no se cuartea y tiene un tacto ultra suave.
- **Sublimación:** Ideal para telas deportivas dry-fit claras o artículos promocionales de cerámica/aluminio. La tinta se funde con la fibra.
👉 Para playeras corporativas o moda en Mexicali, te recomendamos ampliamente **DTF Textil**. ¿Deseas cotizarlo en el cotizador?`;
  }

  if (q.includes("lona") || q.includes("sol") || q.includes("exterior")) {
    return `☀️ **Lonas para el Clima de Mexicali:**
Para el sol y viento de nuestra región recomendamos **Lona de 13oz o 15oz reforzada** con tintas ecosolventes UV y ojillos cada metro con dobladillo perimetral vulcanizado. Tienen una durabilidad excelente y colores vibrantes garantizados.`;
  }

  if (q.includes("tarjeta") || q.includes("soft touch")) {
    return `💼 **Tarjetas Soft Touch:**
Impresas en cartulina sulfatada 16pts con laminado mate aterciopelado al tacto y la opción de aplicar barniz UV a registro brillante en tu logotipo. El paquete estándar de 1,000 piezas comienza desde $360 MXN.`;
  }

  if (q.includes("termo") || q.includes("taza") || q.includes("laser")) {
    return `☕ **Termos & Tazas Promocionales:**
Contamos con termos de acero inoxidable doble pared con grabado láser de fibra óptica (indeleble, jamás se borra) y tazas cerámicas de 11oz aptas para microondas. Excelentes para regalos de fin de año y branding empresarial.`;
  }

  return `✨ Gracias por tu mensaje. En **AS PUBLICIDAD** somos especialistas en impresión de alta definición (1440 DPI), publicidad exterior, personalización textil (DTF y Bordado) y artículos promocionales en Mexicali. 
Puedo ayudarte a cotizar cualquier producto o puedes presionar el botón de abajo para platicar de inmediato con nuestro asesor humano en WhatsApp.`;
}

/* ==========================================================
   RESILIENT IMAGE COMPONENT (Zero-Broken-Image Policy)
   ========================================================== */
const ResilientImage: React.FC<{
  src: string;
  alt: string;
  category?: string;
  className?: string;
}> = ({ src, alt, category = "impresion", className = "" }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const fallbackSvg = useMemo(() => {
    return createProductVisualSvg(
      alt.slice(0, 24).toUpperCase(),
      getCategoryLabel(category).toUpperCase(),
      "#00d4ff",
      "#ff2a5f",
      category === "textil"
        ? "apparel"
        : category === "exterior"
        ? "banner"
        : category === "promocionales"
        ? "laser"
        : category === "especiales"
        ? "studio"
        : "print"
    );
  }, [alt, category]);

  return (
    <img
      src={hasError || !src ? fallbackSvg : src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

/* ==========================================================
   3D TILT PRODUCT CARD COMPONENT WITH ANIMATION
   ========================================================== */
const ProductTiltCard: React.FC<{
  prod: ProductItem;
  index: number;
  onQuote: (id: string) => void;
  onAskAI: (name: string) => void;
  onOpenQr: (title: string, urlText: string) => void;
}> = ({ prod, index, onQuote, onAskAI, onOpenQr }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="liquid-glass rounded-3xl overflow-hidden flex flex-col group relative shadow-liquid"
    >
      <div className="card-glare" />

      {/* Product Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <ResilientImage
          src={prod.img}
          alt={prod.name}
          category={prod.category}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Scrim & Badge Overlay */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[10px] font-extrabold text-cyan-300 uppercase tracking-wider border border-white/20 whitespace-nowrap">
            {prod.badge || "Calidad AS"}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-white/95 dark:bg-slate-950/90 backdrop-blur-md text-xs font-mono font-bold text-slate-900 dark:text-slate-100 shadow-md whitespace-nowrap border border-white/20">
          Desde{" "}
          <span className="text-cyan-700 dark:text-cyan-400 font-black text-sm">
            ${prod.price}
          </span>{" "}
          MXN
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 font-mono">
            {getCategoryLabel(prod.category)}
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-950 dark:text-white mt-1 leading-snug font-display">
            {prod.name}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {prod.desc}
          </p>

          {/* Expandable Specs Accordion */}
          <details className="mt-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-2 cursor-pointer group/spec">
            <summary className="font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 flex items-center justify-between list-none">
              <span>📋 Ver Ficha Técnica</span>
              <span className="text-xs group-open/spec:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 bg-cyan-50/50 dark:bg-slate-800/70 p-2.5 rounded-xl border border-cyan-100/60 dark:border-slate-700 leading-normal">
              {prod.specs ||
                "Técnica estándar de alta resolución con garantía de taller."}
            </p>
          </details>
        </div>

        {/* Actions Row */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuote(prod.id)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-extrabold shadow-liquid-cyan transition-all flex items-center justify-center gap-2 btn-spring whitespace-nowrap"
          >
            <span>⚡ Cotizar</span>
          </button>
          <button
            type="button"
            onClick={() =>
              onOpenQr(
                prod.name,
                `AS PUBLICIDAD MEXICALI • ${prod.name} • Desde $${prod.price} MXN`
              )
            }
            title="Ver QR de Muestra"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition btn-spring shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onAskAI(prod.name)}
            title="Preguntar a AS Intelligence"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition btn-spring shrink-0"
          >
            <span>✨</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================
   MAIN APPLICATION COMPONENT
   ========================================================== */
export function App() {
  // Database State
  const [appData, setAppData] = useState<DatabaseState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.config && parsed.products && parsed.gallery) {
          return {
            ...DEFAULT_DB,
            ...parsed,
            config: { ...DEFAULT_DB.config, ...parsed.config },
            showcase: Array.isArray(parsed.showcase)
              ? parsed.showcase
              : MEXICALI_SHOWCASE_ITEMS,
          };
        }
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_DB;
  });

  // Theme State ('system' | 'light' | 'dark') - defaults to 'system' per user request
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (saved === "light" || saved === "dark" || saved === "system") {
        return saved;
      }
    } catch {
      // ignore
    }
    return "system";
  });

  const [resolvedDark, setResolvedDark] = useState<boolean>(false);

  // Sync theme with system preference and apply .dark class to <html>
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      const isDark =
        themeMode === "dark" ||
        (themeMode === "system" && mediaQuery.matches);
      setResolvedDark(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    updateTheme();
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // ignore
    }

    const listener = () => updateTheme();
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [themeMode]);

  const cycleThemeMode = () => {
    const next: ThemeMode =
      themeMode === "system"
        ? "dark"
        : themeMode === "dark"
        ? "light"
        : "system";
    setThemeMode(next);
    playHapticSound("pop");
    const labels: Record<ThemeMode, string> = {
      system: "Modo Automático (Según tu dispositivo)",
      dark: "Modo Dark Activado",
      light: "Modo Blanco Activado",
    };
    triggerToast("Tema Visual", labels[next]);
  };

  // UI & Navigation State
  const [activeNav, setActiveNav] = useState<string>("inicio");
  const [islandExpanded, setIslandExpanded] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [toast, setToast] = useState<{
    visible: boolean;
    title: string;
    msg: string;
  }>({
    visible: false,
    title: "Aviso de Sistema",
    msg: "Operación ejecutada con éxito.",
  });

  // QR Modal State
  const [qrModal, setQrModal] = useState<{
    open: boolean;
    mode: "catalogo" | "whatsapp" | "custom";
    customTitle: string;
    customValue: string;
  }>({
    open: false,
    mode: "catalogo",
    customTitle: "Mostrario Digital Mexicali",
    customValue: "",
  });

  // Catalog & Gallery Filters
  const [catalogCategory, setCatalogCategory] = useState<string>("all");
  const [catalogSearch, setCatalogSearch] = useState<string>("");
  const [galleryCategory, setGalleryCategory] = useState<string>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // 5-Step Quote Wizard State
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [quoteCategory, setQuoteCategory] = useState<CategoryKey>("impresion");
  const [quoteProductId, setQuoteProductId] = useState<string>("prod-1");
  const [quoteDimensions, setQuoteDimensions] = useState<string>("");
  const [quoteFinish, setQuoteFinish] = useState<string>(
    "Recomendado por AS Publicidad"
  );
  const [quoteQty, setQuoteQty] = useState<number>(10);
  const [quoteHasDesign, setQuoteHasDesign] = useState<string>(
    "Cuento con archivo en vector (AI, PDF, EPS, SVG)"
  );
  const [quoteNotes, setQuoteNotes] = useState<string>("");
  const [ticketFolio, setTicketFolio] = useState<string>("#AS-4829");
  const [whatsAppPreviewModal, setWhatsAppPreviewModal] = useState<{
    open: boolean;
    url: string;
    message: string;
  }>({ open: false, url: "", message: "" });

  // Chatbot State
  const [chatbotOpen, setChatbotOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatTyping, setChatTyping] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "¡Hola! Soy **AS Intelligence**.\nTu asesor técnico comercial en Mexicali. Puedo recomendarte materiales, paquetes para negocios locales, resolver dudas de diseño o ayudarte a preparar tu cotización para WhatsApp. ¿Qué proyecto traes en mente?",
      showQuoteAction: false,
    },
  ]);

  // Admin Modals State
  const [adminPinModalOpen, setAdminPinModalOpen] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<
    "general" | "mostrario" | "productos" | "galeria" | "backup"
  >("general");

  // Admin General Config Form State
  const [cfgBrandName, setCfgBrandName] = useState<string>(
    appData.config.brandName
  );
  const [cfgBrandSlogan, setCfgBrandSlogan] = useState<string>(
    appData.config.slogan
  );
  const [cfgBrandSubtitle, setCfgBrandSubtitle] = useState<string>(
    appData.config.subtitle
  );
  const [cfgWhatsappPhone, setCfgWhatsappPhone] = useState<string>(
    appData.config.whatsappPhone
  );
  const [cfgAdminPin, setCfgAdminPin] = useState<string>(
    appData.config.adminPin
  );
  const [cfgLocation, setCfgLocation] = useState<string>(
    appData.config.location
  );
  const [cfgCustomQrUrl, setCfgCustomQrUrl] = useState<string>(
    appData.config.customQrUrl || ""
  );

  // Admin Showcase (Mostrario Mexicali) Edit Modal State
  const [showcaseModalOpen, setShowcaseModalOpen] = useState<boolean>(false);
  const [editShowId, setEditShowId] = useState<string>("");
  const [editShowBusinessName, setEditShowBusinessName] = useState<string>("");
  const [editShowSector, setEditShowSector] = useState<string>("");
  const [editShowZone, setEditShowZone] = useState<string>("");
  const [editShowPackageTitle, setEditShowPackageTitle] = useState<string>("");
  const [editShowItemsText, setEditShowItemsText] = useState<string>("");
  const [editShowPrice, setEditShowPrice] = useState<number>(2500);
  const [editShowCategory, setEditShowCategory] =
    useState<CategoryKey>("impresion");
  const [editShowImgUrl, setEditShowImgUrl] = useState<string>("");

  // Admin Product Edit Modal State
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);
  const [editProdId, setEditProdId] = useState<string>("");
  const [editProdName, setEditProdName] = useState<string>("");
  const [editProdCategory, setEditProdCategory] =
    useState<CategoryKey>("impresion");
  const [editProdPrice, setEditProdPrice] = useState<number>(100);
  const [editProdDesc, setEditProdDesc] = useState<string>("");
  const [editProdBadge, setEditProdBadge] = useState<string>("Nuevo");
  const [editProdSpecs, setEditProdSpecs] = useState<string>("");
  const [editProdImgUrl, setEditProdImgUrl] = useState<string>("");

  // Admin Gallery Photo Add/Edit Modal State
  const [addPhotoModalOpen, setAddPhotoModalOpen] = useState<boolean>(false);
  const [editPhotoId, setEditPhotoId] = useState<string>("");
  const [newPhotoTitle, setNewPhotoTitle] = useState<string>("");
  const [newPhotoBusinessType, setNewPhotoBusinessType] = useState<string>("");
  const [newPhotoDesc, setNewPhotoDesc] = useState<string>("");
  const [newPhotoCategory, setNewPhotoCategory] =
    useState<CategoryKey>("impresion");
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>("");

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  /* ==========================================================
     SPARKLES CANVAS ENGINE (Blanco / Dark Destellos)
     ========================================================== */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "rgba(0, 212, 255, ",
      "rgba(255, 42, 95, ",
      "rgba(255, 149, 0, ",
      "rgba(0, 122, 255, ",
      "rgba(121, 40, 202, ",
    ];

    const count = window.innerWidth < 640 ? 28 : 55;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4 - 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now() * 0.003;
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(now) * 0.008;

        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const alpha = Math.max(0.12, Math.min(0.85, p.opacity));
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  /* ==========================================================
     HAPTIC SOUND SYNTHESIZER
     ========================================================== */
  const playHapticSound = (type: "soft" | "click" | "pop" = "soft") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "click") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "pop") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(360, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(950, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      }
    } catch {
      // ignore audio context errors
    }
  };

  /* ==========================================================
     TOAST CONTROLLER & PERSISTENCE
     ========================================================== */
  const triggerToast = (title: string, msg: string) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast({ visible: true, title, msg });
    playHapticSound("pop");
    toastTimerRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  const persistDatabase = (nextData: DatabaseState, toastMsg?: string) => {
    setAppData(nextData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
      if (toastMsg) {
        triggerToast("Cambios Guardados", toastMsg);
      }
    } catch {
      triggerToast("Aviso", "No se pudo guardar en el almacenamiento local.");
    }
  };

  useEffect(() => {
    const t = window.setTimeout(() => {
      triggerToast(
        "AS Publicidad iOS 27",
        "Mostrario interactivo de Mexicali listo en modo automático."
      );
    }, 800);
    return () => window.clearTimeout(t);
  }, []);

  /* ==========================================================
     NAVIGATION HELPER
     ========================================================== */
  const navigateTo = (sectionId: string) => {
    setActiveNav(sectionId);
    const el = document.getElementById(`sec-${sectionId}`);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  /* ==========================================================
     DERIVED CATALOG & QUOTE CALCULATIONS
     ========================================================== */
  const filteredCatalog = useMemo(() => {
    let items = appData.products;
    if (catalogCategory !== "all") {
      items = items.filter((p) => p.category === catalogCategory);
    }
    const q = catalogSearch.toLowerCase().trim();
    if (q.length > 0) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.badge.toLowerCase().includes(q) ||
          (p.specs && p.specs.toLowerCase().includes(q))
      );
    }
    return items;
  }, [appData.products, catalogCategory, catalogSearch]);

  const filteredGallery = useMemo(() => {
    if (galleryCategory === "all") return appData.gallery;
    return appData.gallery.filter((g) => g.category === galleryCategory);
  }, [appData.gallery, galleryCategory]);

  const categoryProducts = useMemo(() => {
    return appData.products.filter((p) => p.category === quoteCategory);
  }, [appData.products, quoteCategory]);

  useEffect(() => {
    if (
      categoryProducts.length > 0 &&
      !categoryProducts.some((p) => p.id === quoteProductId)
    ) {
      setQuoteProductId(categoryProducts[0].id);
    }
  }, [categoryProducts, quoteProductId]);

  const selectedQuoteProduct = useMemo(() => {
    return (
      appData.products.find((p) => p.id === quoteProductId) ||
      categoryProducts[0] ||
      appData.products[0]
    );
  }, [appData.products, quoteProductId, categoryProducts]);

  const quoteCalculation = useMemo(() => {
    const basePrice = selectedQuoteProduct ? selectedQuoteProduct.price : 0;
    const qty = Math.max(1, quoteQty);
    let discountMultiplier = 1.0;
    let badgeText = "Precio Regular";

    if (qty >= 100) {
      discountMultiplier = 0.82;
      badgeText = "18% Descuento Mayoreo";
    } else if (qty >= 50) {
      discountMultiplier = 0.88;
      badgeText = "12% Descuento Volumen";
    } else if (qty >= 12) {
      discountMultiplier = 0.93;
      badgeText = "7% Descuento Especial";
    }

    const subtotal = Math.round(basePrice * qty * discountMultiplier);
    return {
      basePrice,
      subtotal,
      subtotalFormatted: `$${subtotal.toLocaleString("es-MX")}.00 MXN`,
      badgeText,
    };
  }, [selectedQuoteProduct, quoteQty]);

  const startQuoteForProduct = (productId: string, customNotes?: string) => {
    const prod = appData.products.find((p) => p.id === productId);
    if (!prod) return;
    setQuoteCategory(prod.category);
    setQuoteProductId(prod.id);
    if (customNotes) {
      setQuoteNotes(customNotes);
    }
    setWizardStep(1);
    navigateTo("cotizador");
    playHapticSound("pop");
    triggerToast(
      "Producto Listo",
      `Configurando cotización para: ${prod.name}`
    );
  };

  const handleNextWizardStep = () => {
    if (wizardStep < 5) {
      const next = wizardStep + 1;
      if (next === 5) {
        const randomFolio = Math.floor(1000 + Math.random() * 9000);
        setTicketFolio(`#AS-${randomFolio}`);
      }
      setWizardStep(next);
      playHapticSound("soft");
    }
  };

  const handlePrevWizardStep = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
      playHapticSound("soft");
    }
  };

  const buildWhatsAppQuoteData = () => {
    const prod = selectedQuoteProduct;
    const dims =
      quoteDimensions.trim() || "Estándar / Por definir con asesor";
    const notes = quoteNotes.trim() || "Sin notas adicionales";
    const phone = appData.config.whatsappPhone || "526860000000";

    const msg = `*SOLICITUD FORMAL DE COTIZACIÓN*
*${appData.config.brandName} — DIGITAL EXPERIENCE*
_Plataforma desarrollada por NEXO DIGITAL MEXICALI_
------------------------------------------
🎫 *Folio Digital:* ${ticketFolio}
📦 *Producto:* ${prod ? prod.name : "Personalizado"}
🏷️ *Categoría:* ${getCategoryLabel(prod ? prod.category : "impresion")}
📐 *Medidas / Talla:* ${dims}
⚙️ *Acabado / Técnica:* ${quoteFinish}
🔢 *Cantidad:* ${quoteQty} piezas
🎨 *Diseño:* ${quoteHasDesign}
📝 *Instrucciones:* ${notes}
------------------------------------------
💵 *Total Estimado Sugerido:* ${quoteCalculation.subtotalFormatted}
📍 *Entrega:* Mexicali, B.C.

Hola, generé este boleto de cotización desde la Mini App oficial iOS 27. ¿Me confirman disponibilidad y tiempos de entrega? Gracias.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    return { url, msg };
  };

  const submitQuoteToWhatsApp = () => {
    const { url, msg } = buildWhatsAppQuoteData();
    playHapticSound("pop");
    setWhatsAppPreviewModal({ open: true, url, message: msg });
    triggerToast(
      "Boleto Generado",
      "Tu cotización oficial está lista para enviar por WhatsApp."
    );
  };

  const openQuickWhatsAppQuote = () => {
    const phone = appData.config.whatsappPhone || "526860000000";
    const msg = `Hola ${appData.config.brandName}, deseo cotizar un proyecto de publicidad e impresión desde su plataforma interactiva oficial NEXO DIGITAL en Mexicali.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    playHapticSound("pop");
    setWhatsAppPreviewModal({ open: true, url, message: msg });
  };

  /* ==========================================================
     QR CODE MODAL HELPERS
     ========================================================== */
  const openQrModalWithCustom = (title: string, val: string) => {
    setQrModal({
      open: true,
      mode: "custom",
      customTitle: title,
      customValue: val,
    });
    playHapticSound("pop");
  };

  const currentQrValue = useMemo(() => {
    const phone = appData.config.whatsappPhone || "526860000000";
    if (qrModal.mode === "whatsapp") {
      return `https://wa.me/${phone}?text=${encodeURIComponent(
        `Hola ${appData.config.brandName}, escaneé su código QR en Mexicali y deseo solicitar una cotización.`
      )}`;
    }
    if (qrModal.mode === "custom" && qrModal.customValue) {
      return qrModal.customValue;
    }
    if (appData.config.customQrUrl && appData.config.customQrUrl.trim()) {
      return appData.config.customQrUrl.trim();
    }
    return typeof window !== "undefined"
      ? window.location.href
      : "https://aspublicidad.mexicali.nexo";
  }, [qrModal, appData.config]);

  /* ==========================================================
     AS INTELLIGENCE CHATBOT (SERVER-SIDE GEMINI + SMART FALLBACK)
     ========================================================== */
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, chatTyping]);

  const sendChatQuery = async (rawText: string) => {
    const userText = rawText.trim();
    if (!userText) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatTyping(true);
    playHapticSound("click");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error("Server response error");
      }

      const data = (await response.json()) as { reply?: string };
      const replyText = data.reply || generateSmartFallbackReply(userText);

      setChatMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: replyText,
          showQuoteAction: true,
        },
      ]);
      playHapticSound("soft");
    } catch {
      const fallbackReply = generateSmartFallbackReply(userText);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: fallbackReply,
          showQuoteAction: true,
        },
      ]);
      playHapticSound("soft");
    } finally {
      setChatTyping(false);
    }
  };

  const askAIAboutProduct = (prodName: string) => {
    setChatbotOpen(true);
    playHapticSound("pop");
    const prompt = `Deseo saber más información técnica, recomendaciones de uso y cotización estimada sobre: ${prodName}`;
    sendChatQuery(prompt);
  };

  /* ==========================================================
     ADMIN CONTROL CENTER HANDLERS (100% EDITABLE)
     ========================================================== */
  const openAdminSecurityModal = (
    targetTab: "general" | "mostrario" | "productos" | "galeria" | "backup" = "general"
  ) => {
    setAdminTab(targetTab);
    setAdminPinInput("");
    setPinError(false);
    setAdminPinModalOpen(true);
    playHapticSound("click");
  };

  const verifyAdminPin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPin = appData.config.adminPin || "1234";
    if (adminPinInput.trim() === currentPin) {
      setAdminPinModalOpen(false);
      setCfgBrandName(appData.config.brandName);
      setCfgBrandSlogan(appData.config.slogan);
      setCfgBrandSubtitle(appData.config.subtitle);
      setCfgWhatsappPhone(appData.config.whatsappPhone);
      setCfgAdminPin(appData.config.adminPin);
      setCfgLocation(appData.config.location);
      setCfgCustomQrUrl(appData.config.customQrUrl || "");
      setAdminDashboardOpen(true);
      playHapticSound("pop");
    } else {
      setPinError(true);
      playHapticSound("click");
    }
  };

  const saveGeneralConfig = () => {
    const nextConfig: BrandConfig = {
      ...appData.config,
      brandName: cfgBrandName.trim() || "AS PUBLICIDAD",
      slogan: cfgBrandSlogan.trim() || "TU MARCA, EN TODAS PARTES.",
      subtitle:
        cfgBrandSubtitle.trim() ||
        "Impresión digital de alta resolución, publicidad exterior, personalización textil y artículos promocionales en Mexicali.",
      whatsappPhone: cfgWhatsappPhone.replace(/\D/g, "") || "526860000000",
      adminPin: cfgAdminPin.trim() || "1234",
      location: cfgLocation.trim() || "Mexicali, Baja California, México",
      customQrUrl: cfgCustomQrUrl.trim(),
    };
    persistDatabase(
      { ...appData, config: nextConfig },
      "Identidad comercial, Hero, WhatsApp y QR actualizados."
    );
  };

  // --- SHOWCASE (MOSTRARIO MEXICALI) CRUD ---
  const openShowcaseEditModal = (showcaseId: string | null) => {
    if (showcaseId) {
      const s = (appData.showcase || []).find((item) => item.id === showcaseId);
      if (!s) return;
      setEditShowId(s.id);
      setEditShowBusinessName(s.businessName);
      setEditShowSector(s.sector);
      setEditShowZone(s.zone);
      setEditShowPackageTitle(s.packageTitle);
      setEditShowItemsText(s.includedItems.join("\n"));
      setEditShowPrice(s.estimatedPrice);
      setEditShowCategory(s.category);
      setEditShowImgUrl(s.img);
    } else {
      setEditShowId("");
      setEditShowBusinessName("");
      setEditShowSector("Restaurantes & Comercios Locales");
      setEditShowZone("Mexicali, B.C.");
      setEditShowPackageTitle("Paquete Comercial Personalizado");
      setEditShowItemsText(
        "Lona Publicitaria Exterior HD\nPlayeras con Logotipo DTF\nTarjetas de Presentación"
      );
      setEditShowPrice(2490);
      setEditShowCategory("impresion");
      setEditShowImgUrl(IMG_LONAS_IMPRESION);
    }
    setShowcaseModalOpen(true);
  };

  const handleShowcaseImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") {
        setEditShowImgUrl(ev.target.result);
        triggerToast(
          "Imagen Cargada",
          "Vista previa lista para el paquete del mostrario."
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const saveShowcaseFromModal = (e: React.FormEvent) => {
    e.preventDefault();
    const businessName = editShowBusinessName.trim();
    if (!businessName) return;

    const includedItems = editShowItemsText
      .split(/\n|,/)
      .map((line) => line.trim())
      .filter(Boolean);

    const img =
      editShowImgUrl.trim() ||
      createProductVisualSvg(
        businessName.slice(0, 22).toUpperCase(),
        "MOSTRARIO MEXICALI",
        "#00d4ff",
        "#ff2a5f",
        "print"
      );

    const currentShowcase = appData.showcase || MEXICALI_SHOWCASE_ITEMS;
    let nextShowcase: MexicaliShowcaseItem[];

    if (editShowId) {
      nextShowcase = currentShowcase.map((s) =>
        s.id === editShowId
          ? {
              ...s,
              businessName,
              sector: editShowSector.trim() || "Comercio Local",
              zone: editShowZone.trim() || "Mexicali, B.C.",
              packageTitle:
                editShowPackageTitle.trim() || "Paquete Publicitario",
              includedItems:
                includedItems.length > 0
                  ? includedItems
                  : ["Servicio personalizado AS Publicidad"],
              estimatedPrice: Number(editShowPrice) || 0,
              category: editShowCategory,
              img,
            }
          : s
      );
    } else {
      const newShow: MexicaliShowcaseItem = {
        id: `show-${Date.now()}`,
        businessName,
        sector: editShowSector.trim() || "Comercio Local",
        zone: editShowZone.trim() || "Mexicali, B.C.",
        packageTitle: editShowPackageTitle.trim() || "Paquete Publicitario",
        includedItems:
          includedItems.length > 0
            ? includedItems
            : ["Servicio personalizado AS Publicidad"],
        estimatedPrice: Number(editShowPrice) || 0,
        category: editShowCategory,
        linkedProductId: appData.products[0]?.id || "prod-1",
        img,
      };
      nextShowcase = [newShow, ...currentShowcase];
    }

    persistDatabase(
      { ...appData, showcase: nextShowcase },
      "Mostrario de negocios locales de Mexicali actualizado."
    );
    setShowcaseModalOpen(false);
  };

  const deleteShowcaseItem = (showcaseId: string) => {
    const nextShowcase = (appData.showcase || []).filter(
      (s) => s.id !== showcaseId
    );
    persistDatabase(
      { ...appData, showcase: nextShowcase },
      "Paquete eliminado del mostrario de Mexicali."
    );
  };

  // --- PRODUCTS CRUD ---
  const openProductEditModal = (productId: string | null) => {
    if (productId) {
      const p = appData.products.find((item) => item.id === productId);
      if (!p) return;
      setEditProdId(p.id);
      setEditProdName(p.name);
      setEditProdCategory(p.category);
      setEditProdPrice(p.price);
      setEditProdDesc(p.desc);
      setEditProdBadge(p.badge || "Calidad AS");
      setEditProdSpecs(
        p.specs ||
          "Especificación técnica estándar de producción AS Publicidad."
      );
      setEditProdImgUrl(p.img);
    } else {
      setEditProdId("");
      setEditProdName("");
      setEditProdCategory("impresion");
      setEditProdPrice(150);
      setEditProdDesc("");
      setEditProdBadge("Nuevo");
      setEditProdSpecs(
        "Especificación técnica estándar de producción AS Publicidad."
      );
      setEditProdImgUrl(IMG_LONAS_IMPRESION);
    }
    setProductModalOpen(true);
  };

  const handleProductImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") {
        setEditProdImgUrl(ev.target.result);
        triggerToast(
          "Foto Cargada",
          "Vista previa generada para el producto."
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const saveProductFromModal = (e: React.FormEvent) => {
    e.preventDefault();
    const name = editProdName.trim();
    if (!name) return;

    const img =
      editProdImgUrl.trim() ||
      createProductVisualSvg(
        name.slice(0, 22).toUpperCase(),
        "CALIDAD AS PUBLICIDAD",
        "#00d4ff",
        "#007aff",
        "print"
      );

    const specs =
      editProdSpecs.trim() ||
      "Especificación técnica estándar de producción AS Publicidad.";

    let nextProducts: ProductItem[];
    if (editProdId) {
      nextProducts = appData.products.map((p) =>
        p.id === editProdId
          ? {
              ...p,
              name,
              category: editProdCategory,
              price: Number(editProdPrice) || 0,
              desc: editProdDesc.trim(),
              badge: editProdBadge.trim() || "Calidad AS",
              specs,
              img,
            }
          : p
      );
    } else {
      const newProd: ProductItem = {
        id: `prod-${Date.now()}`,
        name,
        category: editProdCategory,
        price: Number(editProdPrice) || 0,
        desc: editProdDesc.trim(),
        badge: editProdBadge.trim() || "Calidad AS",
        img,
        specs,
      };
      nextProducts = [newProd, ...appData.products];
    }

    persistDatabase(
      { ...appData, products: nextProducts },
      "Catálogo de productos actualizado."
    );
    setProductModalOpen(false);
  };

  const deleteProduct = (productId: string) => {
    const nextProducts = appData.products.filter((p) => p.id !== productId);
    persistDatabase(
      { ...appData, products: nextProducts },
      "Producto eliminado del catálogo."
    );
  };

  // --- GALLERY CRUD (ADD + EDIT + DELETE) ---
  const openGalleryPhotoModal = (photoId: string | null) => {
    if (photoId) {
      const g = appData.gallery.find((item) => item.id === photoId);
      if (!g) return;
      setEditPhotoId(g.id);
      setNewPhotoTitle(g.title);
      setNewPhotoBusinessType(g.businessType || "Negocio Local · Mexicali");
      setNewPhotoDesc(
        g.desc || "Trabajo real garantizado para cliente en Mexicali."
      );
      setNewPhotoCategory(g.category);
      setNewPhotoUrl(g.img);
    } else {
      setEditPhotoId("");
      setNewPhotoTitle("");
      setNewPhotoBusinessType("Negocio Local · Mexicali");
      setNewPhotoDesc("Trabajo real garantizado para cliente en Mexicali.");
      setNewPhotoCategory("impresion");
      setNewPhotoUrl(IMG_LONAS_IMPRESION);
    }
    setAddPhotoModalOpen(true);
  };

  const handleGalleryImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") {
        setNewPhotoUrl(ev.target.result);
        triggerToast(
          "Foto Lista",
          "Fotografía local preparada para publicar."
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const savePhotoToGallery = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newPhotoTitle.trim();
    if (!title) return;
    const img =
      newPhotoUrl.trim() ||
      createProductVisualSvg(
        title.slice(0, 22).toUpperCase(),
        "PROYECTO REAL ENTREGADO",
        "#ff2a5f",
        "#00d4ff",
        "banner"
      );

    let nextGallery: GalleryItem[];
    if (editPhotoId) {
      nextGallery = appData.gallery.map((g) =>
        g.id === editPhotoId
          ? {
              ...g,
              title,
              category: newPhotoCategory,
              businessType:
                newPhotoBusinessType.trim() || "Negocio Local · Mexicali",
              desc:
                newPhotoDesc.trim() ||
                "Trabajo real garantizado para cliente en Mexicali.",
              img,
            }
          : g
      );
    } else {
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        title,
        category: newPhotoCategory,
        businessType:
          newPhotoBusinessType.trim() || "Negocio Local · Mexicali",
        desc:
          newPhotoDesc.trim() ||
          "Trabajo real garantizado para cliente en Mexicali.",
        img,
      };
      nextGallery = [newItem, ...appData.gallery];
    }

    persistDatabase(
      { ...appData, gallery: nextGallery },
      editPhotoId
        ? "Fotografía de galería actualizada."
        : "Nueva fotografía publicada en la galería."
    );
    setEditPhotoId("");
    setNewPhotoTitle("");
    setNewPhotoUrl("");
    setAddPhotoModalOpen(false);
  };

  const deleteGalleryPhoto = (id: string) => {
    const nextGallery = appData.gallery.filter((g) => g.id !== id);
    persistDatabase(
      { ...appData, gallery: nextGallery },
      "Fotografía eliminada de la galería."
    );
  };

  const exportDatabaseJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(appData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `as_publicidad_backup_${Date.now()}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast(
      "Respaldo Descargado",
      "Archivo JSON de copia de seguridad generado."
    );
  };

  const importDatabaseJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(String(ev.target?.result));
        if (imported.config && imported.products && imported.gallery) {
          const merged: DatabaseState = {
            ...DEFAULT_DB,
            ...imported,
            config: { ...DEFAULT_DB.config, ...imported.config },
            showcase: Array.isArray(imported.showcase)
              ? imported.showcase
              : MEXICALI_SHOWCASE_ITEMS,
          };
          persistDatabase(
            merged,
            "Tu catálogo, mostrario y ajustes fueron restaurados con éxito."
          );
          setCfgBrandName(merged.config.brandName);
          setCfgBrandSlogan(merged.config.slogan);
          setCfgBrandSubtitle(merged.config.subtitle);
          setCfgWhatsappPhone(merged.config.whatsappPhone);
          setCfgAdminPin(merged.config.adminPin);
          setCfgLocation(merged.config.location);
          setCfgCustomQrUrl(merged.config.customQrUrl || "");
        } else {
          triggerToast(
            "Formato Inválido",
            "El archivo JSON no contiene la estructura requerida."
          );
        }
      } catch {
        triggerToast(
          "Error de Lectura",
          "No se pudo interpretar el archivo JSON."
        );
      }
    };
    reader.readAsText(file);
  };

  const resetToFactoryDefaults = () => {
    persistDatabase(
      DEFAULT_DB,
      "Se restableció el catálogo y mostrario original de demostración."
    );
    setCfgBrandName(DEFAULT_DB.config.brandName);
    setCfgBrandSlogan(DEFAULT_DB.config.slogan);
    setCfgBrandSubtitle(DEFAULT_DB.config.subtitle);
    setCfgWhatsappPhone(DEFAULT_DB.config.whatsappPhone);
    setCfgAdminPin(DEFAULT_DB.config.adminPin);
    setCfgLocation(DEFAULT_DB.config.location);
    setCfgCustomQrUrl(DEFAULT_DB.config.customQrUrl || "");
  };

  const renderFormattedBotText = (raw: string) => {
    const parts = raw.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-bold text-slate-950 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  const stepProgressWidth = ["0%", "20%", "40%", "65%", "85%", "100%"][
    wizardStep
  ];

  return (
    <div className="min-h-screen relative text-slate-900 dark:text-slate-100">
      {/* Interactive Sparkles Canvas (Blanco / Dark Destellos Engine) */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* ============================================================
          1. DYNAMIC ISLAND iOS 27 (MORPHING FLUID PILL)
          ============================================================ */}
      <header className="fixed top-2 sm:top-3 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[96vw] pointer-events-auto">
        <div className="flex items-center gap-2">
          <div
            onClick={() => {
              setIslandExpanded((prev) => !prev);
              playHapticSound("pop");
            }}
            className={`cursor-pointer bg-slate-950/90 text-white rounded-full px-4 py-2.5 shadow-island backdrop-blur-3xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-all duration-300 hover:border-cyan-400/50 ${
              islandExpanded ? "border-cyan-400 scale-105" : "border-white/25"
            }`}
          >
            {/* Left side: Brand Title */}
            <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
              <span className="inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-cyan-400 to-rose-500" />
              <span className="font-bold tracking-tight text-white font-display">
                {appData.config.brandName}
              </span>
            </div>

            <div className="h-3.5 w-px bg-white/20 shrink-0" />

            {/* Right side: Interactive Status */}
            <div className="flex items-center gap-2 text-slate-200 whitespace-nowrap shrink-0">
              <span className="text-[11px] sm:text-xs text-cyan-300 font-semibold">
                Mexicali • Mostrario
              </span>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-500 to-cyan-500 flex items-center justify-center p-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Theme Switcher Pill (Auto / Dark / Blanco) */}
          <button
            type="button"
            onClick={cycleThemeMode}
            title={`Cambiar Tema (Actual: ${
              themeMode === "system"
                ? "Auto Sistema"
                : themeMode === "dark"
                ? "Modo Dark"
                : "Modo Blanco"
            })`}
            className="bg-slate-950/90 text-white rounded-full px-3 py-2.5 shadow-island backdrop-blur-3xl border border-white/25 hover:border-cyan-400/60 flex items-center gap-1.5 text-xs font-bold transition-all btn-spring whitespace-nowrap shrink-0"
          >
            <span>{resolvedDark ? "🌙" : "☀️"}</span>
            <span className="hidden sm:inline text-[11px] font-mono text-cyan-300">
              {themeMode === "system"
                ? "Auto"
                : themeMode === "dark"
                ? "Dark"
                : "Blanco"}
            </span>
          </button>

          {/* Quick QR Code Button */}
          <button
            type="button"
            onClick={() => {
              setQrModal({
                open: true,
                mode: "catalogo",
                customTitle: "Mostrario Digital Mexicali",
                customValue: "",
              });
              playHapticSound("pop");
            }}
            title="Abrir Código QR de Mostrario"
            className="bg-slate-950/90 text-white rounded-full p-2.5 shadow-island backdrop-blur-3xl border border-white/25 hover:border-rose-400/60 flex items-center justify-center transition-all btn-spring shrink-0"
          >
            <svg
              className="w-4 h-4 text-rose-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
          </button>
        </div>

        {/* Island Expanded Interactive Dropdown Drawer */}
        <AnimatePresence>
          {islandExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ duration: 0.18 }}
              className="mt-2 p-4 bg-slate-950/95 text-white rounded-3xl shadow-2xl border border-white/20 backdrop-blur-3xl w-[330px] sm:w-[380px] mx-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-400">
                    Centro de Control
                  </span>
                  <span className="text-[10px] text-cyan-300 font-mono">
                    · iOS 27
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIslandExpanded(false);
                  }}
                  className="text-slate-400 hover:text-white text-xs px-1"
                >
                  ✕
                </button>
              </div>

              {/* Theme Segmented Selector */}
              <div className="mb-3">
                <span className="text-[10px] text-slate-400 font-mono block mb-1.5">
                  APARIENCIA (SEGÚN TU DISPOSITIVO O MANUAL)
                </span>
                <div className="grid grid-cols-3 gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10 text-xs">
                  {[
                    { key: "system", label: "📱 Auto" },
                    { key: "light", label: "☀️ Blanco" },
                    { key: "dark", label: "🌙 Dark" },
                  ].map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setThemeMode(m.key as ThemeMode);
                        playHapticSound("soft");
                      }}
                      className={`py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                        themeMode === m.key
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIslandExpanded(false);
                    setChatbotOpen(true);
                    playHapticSound("pop");
                  }}
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 flex flex-col items-center justify-center text-center gap-1 transition btn-spring"
                >
                  <span className="text-base">✨</span>
                  <span className="font-bold text-cyan-300">IA Copilot</span>
                  <span className="text-[9px] text-slate-300">Asesor Pro</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIslandExpanded(false);
                    navigateTo("mostrario");
                    playHapticSound("pop");
                  }}
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 flex flex-col items-center justify-center text-center gap-1 transition btn-spring"
                >
                  <span className="text-base">🏪</span>
                  <span className="font-bold text-amber-300">Mostrario</span>
                  <span className="text-[9px] text-slate-300">Mexicali</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIslandExpanded(false);
                    setQrModal({
                      open: true,
                      mode: "catalogo",
                      customTitle: "Mostrario Digital Mexicali",
                      customValue: "",
                    });
                    playHapticSound("pop");
                  }}
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 flex flex-col items-center justify-center text-center gap-1 transition btn-spring"
                >
                  <span className="text-base">📲</span>
                  <span className="font-bold text-rose-300">Código QR</span>
                  <span className="text-[9px] text-slate-300">Compartir</span>
                </button>
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span>📍 Mexicali, B.C.</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSoundEnabled((prev) => !prev);
                    playHapticSound("pop");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 font-semibold flex items-center gap-1 whitespace-nowrap"
                >
                  <span>{soundEnabled ? "🔊" : "🔇"}</span>
                  <span>
                    {soundEnabled ? "Sonido Activado" : "Sonido Silenciado"}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================
          TOAST ALERTS (iOS Glass Banner)
          ============================================================ */}
      <div
        className={`fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 transform w-11/12 max-w-md ${
          toast.visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-8 opacity-0"
        }`}
      >
        <div className="liquid-glass rounded-2xl p-3.5 shadow-liquid flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-liquid-red">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              {toast.title}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 truncate">
              {toast.msg}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================
          MAIN CONTENT CONTAINER
          ============================================================ */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-safe relative z-10">
        {/* ==========================================
            HERO SECTION: BLANCO / DARK DESTELLOS
            ========================================== */}
        <section
          id="sec-inicio"
          className="py-6 sm:py-12 flex flex-col items-center text-center relative"
        >
          {/* Nexo Digital Mexicali Attribution Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-holo text-slate-800 dark:text-slate-200 text-xs font-semibold mb-6 shadow-sm"
          >
            <span>
              Desarrollado por{" "}
              <strong className="text-slate-950 dark:text-white font-bold">
                NEXO DIGITAL MEXICALI
              </strong>
            </span>
            <span className="text-slate-400">·</span>
            <span className="bg-gradient-to-r from-rose-500 to-cyan-500 bg-clip-text text-transparent font-mono font-bold text-[11px]">
              iOS 27 Edition
            </span>
          </motion.div>

          {/* Main Holographic Logo Emblem with Floating Animation */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            onClick={() =>
              triggerToast(
                "AS Publicidad",
                "Innovación gráfica de alta tecnología en Mexicali"
              )
            }
            className="relative mb-5 group cursor-pointer animate-float"
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-rose-500/30 via-cyan-500/30 to-violet-500/30 rounded-full blur-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-700" />

            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-1 shadow-2xl flex items-center justify-center border border-white/60">
              <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
                <div className="absolute -right-3 -top-3 w-14 h-14 bg-cyan-400/30 rounded-full blur-md" />
                <div className="absolute -left-3 -bottom-3 w-14 h-14 bg-rose-500/40 rounded-full blur-md" />

                <span className="text-4xl sm:text-5xl font-black tracking-tighter text-white font-display">
                  AS
                </span>
                <span className="text-[10px] font-bold bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent tracking-widest uppercase -mt-1 font-mono">
                  Publicidad
                </span>
              </div>
            </div>
          </motion.div>

          {/* Headline (100% Editable via Admin Panel) */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-3xl sm:text-6xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.08] max-w-4xl mt-2 font-display text-balance"
          >
            {appData.config.slogan.includes(",") ? (
              <>
                {appData.config.slogan.split(",")[0]},{" "}
                <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-rose-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {appData.config.slogan.split(",").slice(1).join(",").trim()}
                </span>
              </>
            ) : (
              <span className="bg-gradient-to-r from-rose-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {appData.config.slogan}
              </span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mt-4 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed"
          >
            {appData.config.subtitle || appData.config.slogan}
          </motion.p>

          {/* Primary Action CTA Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full max-w-xl"
          >
            <button
              type="button"
              onClick={() => {
                navigateTo("mostrario");
                playHapticSound("click");
              }}
              className="flex-1 min-w-[175px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm shadow-liquid-cyan hover:shadow-cyan-400/40 active:scale-95 transition-all flex items-center justify-center gap-2 group btn-spring whitespace-nowrap"
            >
              <span>Ver Mostrario Mexicali</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={openQuickWhatsAppQuote}
              className="flex-1 min-w-[175px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-bold text-sm shadow-liquid-red hover:shadow-rose-500/40 active:scale-95 transition-all flex items-center justify-center gap-2 btn-spring whitespace-nowrap"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.905 3.063.905h.002c3.181 0 5.767-2.586 5.768-5.766 0-1.54-.599-2.989-1.688-4.078-1.089-1.089-2.538-1.686-4.349-1.686zm3.328 8.082c-.144.405-.838.774-1.171.824-.312.046-.717.067-1.164-.076-.288-.093-.655-.213-1.129-.418-1.995-.863-3.298-2.884-3.398-3.018-.1-.134-.81-1.077-.81-2.053 0-.976.512-1.455.694-1.656.182-.2.396-.25.528-.25.132 0 .264.002.379.008.121.006.284-.046.444.339.165.396.562 1.371.611 1.472.049.101.082.22.016.353-.066.133-.1.216-.198.332-.099.116-.208.26-.297.35-.099.1-.203.208-.087.408.116.2 1.031 1.701 2.213 2.753.473.42 1.054.673 1.203.738.149.066.236.055.324-.044.088-.099.379-.441.48-.592.1-.151.203-.127.34-.077.137.049.87.41 1.02.485.151.075.25.113.287.177.037.064.037.371-.107.776z" />
              </svg>
              <span>Cotizar por WhatsApp</span>
            </button>

            <div className="w-full flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setChatbotOpen(true);
                  playHapticSound("soft");
                }}
                className="flex-1 py-3 px-5 rounded-2xl liquid-glass text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
              >
                <span>
                  ✨ Asistente IA <strong>AS Intelligence</strong>
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setQrModal({
                    open: true,
                    mode: "catalogo",
                    customTitle: "Mostrario Digital Mexicali",
                    customValue: "",
                  });
                  playHapticSound("pop");
                }}
                className="py-3 px-5 rounded-2xl liquid-glass text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm whitespace-nowrap"
              >
                <svg
                  className="w-4 h-4 text-cyan-600 dark:text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                <span>Código QR Mostrario</span>
              </button>

              <button
                type="button"
                onClick={() => openAdminSecurityModal("general")}
                className="py-3 px-4 rounded-2xl liquid-glass text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm whitespace-nowrap"
                title="Personalizar textos, precios, fotos y WhatsApp (PIN: 1234)"
              >
                <span>⚙️ 100% Editable</span>
              </button>
            </div>
          </motion.div>

          {/* Highlights Grid (iOS 27 Glass) */}
          <div className="mt-10 grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-xl">
            <div className="liquid-glass p-3.5 sm:p-4 rounded-2xl text-center shadow-liquid">
              <div className="w-7 h-7 mx-auto mb-1.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                🎯
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                Resolución
              </p>
              <p className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white font-display tabular-nums">
                1440 DPI
              </p>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
                Ultra Nítido
              </span>
            </div>

            <div className="liquid-glass p-3.5 sm:p-4 rounded-2xl text-center shadow-liquid">
              <div className="w-7 h-7 mx-auto mb-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                ✨
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                Técnicas Pro
              </p>
              <p className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white font-display">
                DTF & Láser
              </p>
              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                Larga Duración
              </span>
            </div>

            <div className="liquid-glass p-3.5 sm:p-4 rounded-2xl text-center shadow-liquid">
              <div className="w-7 h-7 mx-auto mb-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                ⚡
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                Entrega
              </p>
              <p className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white font-display">
                Mexicali
              </p>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                Servicio Express
              </span>
            </div>
          </div>
        </section>

        {/* ==========================================
            NEW SECTION: MOSTRARIO PARA NEGOCIOS LOCALES EN MEXICALI
            ========================================== */}
        <section
          id="sec-mostrario"
          className="py-8 sm:py-14 border-t border-slate-200/70 dark:border-slate-800/80"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
                Ejemplos Visuales para Comercios · Mexicali, B.C.
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display">
                Mostrario para Negocios Locales
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Paquetes demostrativos diseñados para restaurantes, plazas
                comerciales, industria y consultorios de Mexicali.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <button
                type="button"
                onClick={() => openAdminSecurityModal("mostrario")}
                className="px-3.5 py-2.5 rounded-2xl liquid-glass text-xs font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5 btn-spring whitespace-nowrap"
              >
                <span>✏️ Editar Paquetes</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setQrModal({
                    open: true,
                    mode: "catalogo",
                    customTitle: "Mostrario de Negocios Mexicali",
                    customValue: "",
                  });
                  playHapticSound("pop");
                }}
                className="px-4 py-2.5 rounded-2xl liquid-glass text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 btn-spring whitespace-nowrap"
              >
                <span>📲 Mostrar QR a Cliente</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(appData.showcase || MEXICALI_SHOWCASE_ITEMS).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className={`liquid-glass rounded-3xl overflow-hidden flex flex-col justify-between shadow-liquid group ${
                  idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div
                    className={`relative w-full overflow-hidden bg-slate-900 ${
                      idx === 0 ? "h-64 sm:h-72" : "h-52"
                    }`}
                  >
                    <ResilientImage
                      src={item.img}
                      alt={item.businessName}
                      category={item.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-cyan-300 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                        {item.sector}
                      </span>
                      <span className="text-xs font-mono font-bold text-white bg-rose-600/90 backdrop-blur-md px-3 py-1 rounded-full tabular-nums">
                        Paquete ${item.estimatedPrice.toLocaleString("es-MX")}{" "}
                        MXN
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-[11px] text-slate-300 font-mono">
                        📍 {item.zone}
                      </p>
                      <h3 className="text-lg sm:text-xl font-black font-display leading-tight">
                        {item.businessName}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-extrabold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider font-mono">
                      {item.packageTitle}
                    </p>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {item.includedItems.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      startQuoteForProduct(
                        item.linkedProductId,
                        `Interesado en el ${item.packageTitle} (Mostrario: ${item.businessName}) — Incluye: ${item.includedItems.join(
                          ", "
                        )}.`
                      )
                    }
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white text-xs font-extrabold shadow-liquid-red transition btn-spring whitespace-nowrap"
                  >
                    Cotizar Este Paquete
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openQrModalWithCustom(
                        `${item.packageTitle} · ${item.businessName}`,
                        `AS PUBLICIDAD MEXICALI | ${item.packageTitle} (${
                          item.businessName
                        }) - $${item.estimatedPrice} MXN`
                      )
                    }
                    title="Código QR de esta muestra"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition btn-spring"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==========================================
            SECTION 2: CATÁLOGO ENRIQUECIDO (A - E)
            ========================================== */}
        <section
          id="sec-catalogo"
          className="py-8 sm:py-14 border-t border-slate-200/70 dark:border-slate-800/80"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mb-1">
                Catálogo Completo y Especializado · Mexicali
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display">
                Soluciones para tu Marca
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Explora cada técnica con especificaciones reales para negocios y
                eventos.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="Buscar producto, técnica o material..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl liquid-glass text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
              />
              <svg
                className="w-4 h-4 text-cyan-600 dark:text-cyan-400 absolute left-3.5 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Categories Segmented Control */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
            {[
              { key: "all", label: "Todos los Servicios" },
              { key: "impresion", label: "01. Impresión Digital & Lonas" },
              { key: "exterior", label: "02. Publicidad Exterior & Banderas" },
              { key: "textil", label: "03. Textil, DTF & Bordado" },
              {
                key: "promocionales",
                label: "04. Termos, Tazas & Promocionales",
              },
              { key: "especiales", label: "05. Servicios Especiales & Diseño" },
            ].map((cat) => {
              const active = catalogCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    setCatalogCategory(cat.key);
                    playHapticSound("soft");
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-liquid-cyan"
                      : "liquid-glass text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Product Grid with 3D Tilt Glare */}
          {filteredCatalog.length === 0 ? (
            <div className="py-12 text-center liquid-glass rounded-3xl">
              <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                🔍
              </div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                No encontramos coincidencias
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Prueba con otra palabra o consulta al Asistente IA.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalog.map((prod, idx) => (
                <ProductTiltCard
                  key={prod.id}
                  prod={prod}
                  index={idx}
                  onQuote={startQuoteForProduct}
                  onAskAI={askAIAboutProduct}
                  onOpenQr={openQrModalWithCustom}
                />
              ))}
            </div>
          )}
        </section>

        {/* ==========================================
            SECTION 3: GALERÍA VISUAL ULTRA-PREMIUM
            ========================================== */}
        <section
          id="sec-galeria"
          className="py-8 sm:py-14 border-t border-slate-200/70 dark:border-slate-800/80"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
                Trabajos Reales & Muestras Comerciales · Portafolio
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display">
                Galería de Proyectos
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Calidad tangible producida para negocios e instalaciones de
                Mexicali.
              </p>
            </div>

            {/* Gallery Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { key: "all", label: "Todas" },
                { key: "impresion", label: "Lonas & Impresión" },
                { key: "exterior", label: "Viniles & Banderas" },
                { key: "textil", label: "Textil & Bordado" },
                { key: "promocionales", label: "Promocionales" },
              ].map((tab) => {
                const active = galleryCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setGalleryCategory(tab.key);
                      playHapticSound("soft");
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                      active
                        ? "bg-slate-950 dark:bg-cyan-500 text-white dark:text-slate-950"
                        : "liquid-glass text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => {
                  setLightboxItem(item);
                  playHapticSound("pop");
                }}
                className="liquid-glass rounded-2xl overflow-hidden cursor-pointer group relative aspect-square shadow-sm"
              >
                <ResilientImage
                  src={item.img}
                  alt={item.title}
                  category={item.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] font-bold text-cyan-300 font-mono">
                    {item.businessType || getCategoryLabel(item.category)}
                  </span>
                  <p className="text-xs font-bold leading-tight mt-0.5 line-clamp-2">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==========================================
            SECTION 4: COTIZADOR INTELIGENTE + WALLET CON QR
            ========================================== */}
        <section
          id="sec-cotizador"
          className="py-8 sm:py-14 border-t border-slate-200/70 dark:border-slate-800/80"
        >
          <div className="text-center max-w-xl mx-auto mb-8">
            <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mb-1">
              Configurador en 5 Pasos · Precios Reales & Boleto QR
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display">
              Cotizador Interactivo
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Configura cantidades, acabados, genera tu pase con código QR y
              envíalo por WhatsApp.
            </p>
          </div>

          <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-liquid max-w-3xl mx-auto">
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200/80 dark:bg-slate-700 w-full -z-0" />
              <div
                style={{ width: stepProgressWidth }}
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-cyan-500 to-rose-500 transition-all duration-300 -z-0"
              />

              {[1, 2, 3, 4, 5].map((stepNum) => (
                <button
                  key={stepNum}
                  type="button"
                  onClick={() => {
                    if (stepNum === 5) {
                      const randomFolio = Math.floor(
                        1000 + Math.random() * 9000
                      );
                      setTicketFolio(`#AS-${randomFolio}`);
                    }
                    setWizardStep(stepNum);
                    playHapticSound("soft");
                  }}
                  className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center relative z-10 transition-all ${
                    stepNum <= wizardStep
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-liquid-cyan"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {stepNum}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNextWizardStep();
              }}
            >
              <AnimatePresence mode="wait">
                {/* PASO 1: CATEGORÍA Y PRODUCTO */}
                {wizardStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                      Paso 1: Selecciona el Servicio y Producto
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ¿Qué producto gráfico o publicitario deseas personalizar?
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Categoría
                        </label>
                        <select
                          value={quoteCategory}
                          onChange={(e) => {
                            setQuoteCategory(e.target.value as CategoryKey);
                            playHapticSound("soft");
                          }}
                          className="w-full px-4 py-3 rounded-2xl liquid-glass text-xs sm:text-sm text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-slate-900/80 font-semibold focus:ring-2 focus:ring-cyan-500 outline-none"
                        >
                          <option value="impresion">
                            A • Impresión Digital & Lonas
                          </option>
                          <option value="exterior">
                            B • Publicidad Exterior & Banderas
                          </option>
                          <option value="textil">
                            C • Textil, DTF & Bordado
                          </option>
                          <option value="promocionales">
                            D • Artículos Promocionales
                          </option>
                          <option value="especiales">
                            E • Servicios Especiales & Diseño
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Producto Específico
                        </label>
                        <select
                          value={quoteProductId}
                          onChange={(e) => setQuoteProductId(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl liquid-glass text-xs sm:text-sm text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-slate-900/80 font-semibold focus:ring-2 focus:ring-cyan-500 outline-none"
                        >
                          {categoryProducts.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} (Base ${p.price} MXN)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-slate-800/80 border border-cyan-100 dark:border-slate-700 flex items-center justify-between text-xs">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        Precio base de catálogo:
                      </span>
                      <span className="font-bold text-cyan-700 dark:text-cyan-400 text-sm font-mono tabular-nums">
                        ${quoteCalculation.basePrice.toFixed(2)} MXN c/u
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* PASO 2: ESPECIFICACIONES & ACABADOS */}
                {wizardStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                      Paso 2: Medidas y Acabado Técnico
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Define dimensiones, material y especificaciones de taller.
                    </p>

                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Medidas / Tallas / Formato
                        </label>
                        <input
                          type="text"
                          value={quoteDimensions}
                          onChange={(e) => setQuoteDimensions(e.target.value)}
                          placeholder="Ej: 2x1 metros / Tallas M y L / 9x5 cm"
                          className="w-full px-4 py-3 rounded-2xl liquid-glass text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Técnica de Impresión / Acabado
                        </label>
                        <select
                          value={quoteFinish}
                          onChange={(e) => setQuoteFinish(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl liquid-glass text-xs sm:text-sm text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-slate-900/80 font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
                        >
                          <option value="Recomendado por AS Publicidad">
                            Recomendado por AS Publicidad (Máxima duración)
                          </option>
                          <option value="Lona 13oz con ojillos reforzados">
                            Lona 13oz con dobladillo y ojillos reforzados
                          </option>
                          <option value="Vinil Brillante con Laminado UV">
                            Vinil Brillante con Laminado UV Antirrayaduras
                          </option>
                          <option value="DTF Textil Full Color HD">
                            DTF Textil Full Color HD de Alta Elasticidad
                          </option>
                          <option value="Bordado Computarizado de Alta Densidad">
                            Bordado Computarizado de Alta Densidad
                          </option>
                          <option value="Grabado Láser de Fibra Óptica">
                            Grabado Láser de Fibra Óptica Indeleble
                          </option>
                          <option value="Serigrafía Textil Tradicional">
                            Serigrafía Textil Tradicional (Mayoreo)
                          </option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PASO 3: CANTIDAD Y DESCUENTOS POR VOLUMEN */}
                {wizardStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                      Paso 3: Volumen y Estimación de Descuento
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      El sistema calcula descuentos automáticos para pedidos
                      medianos y grandes.
                    </p>

                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          <span>Piezas requeridas:</span>
                          <span className="text-cyan-700 dark:text-cyan-400 font-mono text-base font-black tabular-nums">
                            {quoteQty} piezas
                          </span>
                        </div>

                        <input
                          type="range"
                          min={1}
                          max={500}
                          value={quoteQty}
                          onChange={(e) => setQuoteQty(Number(e.target.value))}
                          className="w-full accent-cyan-600 cursor-pointer"
                        />

                        <div className="flex items-center justify-between gap-1.5 mt-2">
                          {[1, 12, 50, 100, 500].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => {
                                setQuoteQty(preset);
                                playHapticSound("click");
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                quoteQty === preset
                                  ? "bg-cyan-600 text-white"
                                  : "liquid-glass text-slate-700 dark:text-slate-200 hover:text-cyan-600"
                              }`}
                            >
                              {preset} {preset === 1 ? "pza" : "pzas"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Cost Estimation Box */}
                      <div className="liquid-glass p-4 rounded-2xl flex items-center justify-between shadow-sm">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Subtotal Estimado Base:
                          </p>
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                            ✓ {quoteCalculation.badgeText}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono tabular-nums">
                            {quoteCalculation.subtotalFormatted}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            Precios ajustables por asesor
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PASO 4: ARCHIVO DE DISEÑO & NOTAS */}
                {wizardStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                      Paso 4: Archivo de Diseño y Comentarios
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ¿Cuentas con logotipo vectorizado o requieres apoyo del
                      equipo de diseño?
                    </p>

                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Estatus de tu Archivo Gráfico
                        </label>
                        <select
                          value={quoteHasDesign}
                          onChange={(e) => setQuoteHasDesign(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl liquid-glass text-xs sm:text-sm text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-slate-900/80 font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
                        >
                          <option value="Cuento con archivo en vector (AI, PDF, EPS, SVG)">
                            Cuento con archivo en vector listo (AI, PDF, EPS,
                            SVG)
                          </option>
                          <option value="Tengo imagen o foto en alta calidad (PNG, JPG)">
                            Tengo imagen o foto en alta calidad (PNG, JPG)
                          </option>
                          <option value="Cuento con boceto o referencia visual">
                            Cuento con boceto o referencia visual
                          </option>
                          <option value="Requiero diseño completo desde cero por AS Publicidad">
                            Requiero diseño completo desde cero por AS
                            Publicidad
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Instrucciones o Fechas de Entrega
                        </label>
                        <textarea
                          rows={3}
                          value={quoteNotes}
                          onChange={(e) => setQuoteNotes(e.target.value)}
                          placeholder="Ej: Necesitamos que lleve el logotipo en el frente a 2 tintas y en la manga un patrocinador. Requerimos entrega para este fin de semana."
                          className="w-full px-4 py-3 rounded-2xl liquid-glass text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PASO 5: TICKET APPLE WALLET PASS CON QR & CHECKOUT WHATSAPP */}
                {wizardStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="text-center py-1">
                      <span className="text-2xl">🎟️</span>
                      <h3 className="text-lg font-black text-slate-950 dark:text-white font-display">
                        Boleto Digital de Cotización con QR
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Escanea el código QR o envía el formato directo al
                        WhatsApp de AS Publicidad.
                      </p>
                    </div>

                    {/* Apple Wallet Style Pass with Embedded QR */}
                    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20 relative overflow-hidden font-sans">
                      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl" />
                      <div className="absolute -left-10 -top-10 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl" />

                      {/* Ticket Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="font-extrabold tracking-wider text-xs font-mono text-white">
                          AS PUBLICIDAD PASS · MEXICALI
                        </span>
                        <span className="text-xs font-mono text-cyan-300 tabular-nums">
                          {ticketFolio}
                        </span>
                      </div>

                      {/* Ticket Body + QR Split */}
                      <div className="flex flex-col sm:flex-row items-center gap-5 my-4">
                        <div className="flex-1 grid grid-cols-2 gap-3 text-xs w-full">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Producto
                            </span>
                            <span className="font-bold text-white text-sm line-clamp-1">
                              {selectedQuoteProduct
                                ? selectedQuoteProduct.name
                                : "Servicio Gráfico"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Cantidad
                            </span>
                            <span className="font-bold text-cyan-300 text-sm tabular-nums">
                              {quoteQty} unidades
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Medidas / Técnica
                            </span>
                            <span className="font-semibold text-slate-200 text-xs line-clamp-1">
                              {quoteDimensions.trim() || "Estándar"} •{" "}
                              {quoteFinish}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Estatus Gráfico
                            </span>
                            <span className="font-semibold text-slate-200 text-xs line-clamp-1">
                              {quoteHasDesign}
                            </span>
                          </div>
                        </div>

                        {/* Live QR Code inside the Wallet Ticket */}
                        <div className="flex flex-col items-center shrink-0">
                          <QrCodeMatrix
                            value={buildWhatsAppQuoteData().url}
                            size={116}
                            showScanline={true}
                          />
                          <span className="text-[9px] font-mono text-cyan-300 mt-1.5">
                            ESCANEAR ORDEN QR
                          </span>
                        </div>
                      </div>

                      {/* Ticket Total */}
                      <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            Total Estimado
                          </span>
                          <span className="text-xl font-black text-rose-400 font-mono tabular-nums">
                            {quoteCalculation.subtotalFormatted}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-emerald-400 font-bold block">
                            ✓ Válido en Mexicali
                          </span>
                          <span className="text-[9px] text-slate-400">
                            Atención Personalizada
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button to WhatsApp */}
                    <button
                      type="button"
                      onClick={submitQuoteToWhatsApp}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2.5 btn-spring"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.905 3.063.905h.002c3.181 0 5.767-2.586 5.768-5.766 0-1.54-.599-2.989-1.688-4.078-1.089-1.089-2.538-1.686-4.349-1.686zm3.328 8.082c-.144.405-.838.774-1.171.824-.312.046-.717.067-1.164-.076-.288-.093-.655-.213-1.129-.418-1.995-.863-3.298-2.884-3.398-3.018-.1-.134-.81-1.077-.81-2.053 0-.976.512-1.455.694-1.656.182-.2.396-.25.528-.25.132 0 .264.002.379.008.121.006.284-.046.444.339.165.396.562 1.371.611 1.472.049.101.082.22.016.353-.066.133-.1.216-.198.332-.099.116-.208.26-.297.35-.099.1-.203.208-.087.408.116.2 1.031 1.701 2.213 2.753.473.42 1.054.673 1.203.738.149.066.236.055.324-.044.088-.099.379-.441.48-.592.1-.151.203-.127.34-.077.137.049.87.41 1.02.485.151.075.25.113.287.177.037.064.037.371-.107.776z" />
                      </svg>
                      <span>Enviar Cotización Oficial por WhatsApp</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wizard Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200/60 dark:border-slate-700/60 mt-6">
                {wizardStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevWizardStep}
                    className="px-5 py-2.5 rounded-xl liquid-glass text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white active:scale-95 transition-all"
                  >
                    ← Paso Anterior
                  </button>
                ) : (
                  <div />
                )}

                {wizardStep < 5 && (
                  <button
                    type="button"
                    onClick={handleNextWizardStep}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-liquid-cyan hover:from-blue-700 hover:to-cyan-600 active:scale-95 transition-all btn-spring"
                  >
                    Siguiente Paso →
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* ==========================================
            FOOTER: CREDITS & NEXO DIGITAL MEXICALI
            ========================================== */}
        <footer className="mt-16 py-10 border-t border-slate-200/70 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-extrabold text-slate-900 dark:text-white text-sm font-display">
              {appData.config.brandName}
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {appData.config.location} · Alta Tecnología Gráfica
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Desarrollado y Diseñado por{" "}
              <strong className="text-slate-900 dark:text-white font-bold">
                NEXO DIGITAL MEXICALI
              </strong>{" "}
              · Arquitectura Web iOS 27
            </p>
          </div>
        </footer>
      </main>

      {/* ============================================================
          FLOATING DOCK NAVIGATION (iOS 27 Fluid Glass)
          ============================================================ */}
      <nav className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[96vw]">
        <div className="liquid-glass rounded-full p-1.5 shadow-dock flex items-center gap-1 sm:gap-1.5">
          {/* Inicio */}
          <button
            type="button"
            onClick={() => {
              navigateTo("inicio");
              playHapticSound("soft");
            }}
            className={`px-3 sm:px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeNav === "inicio"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-liquid-cyan"
                : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="hidden sm:inline">Inicio</span>
          </button>

          {/* Mostrario Mexicali */}
          <button
            type="button"
            onClick={() => {
              navigateTo("mostrario");
              playHapticSound("soft");
            }}
            className={`px-3 sm:px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeNav === "mostrario"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-liquid-cyan"
                : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            <span>🏪</span>
            <span>Mostrario</span>
          </button>

          {/* Catálogo */}
          <button
            type="button"
            onClick={() => {
              navigateTo("catalogo");
              playHapticSound("soft");
            }}
            className={`px-3 sm:px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeNav === "catalogo"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-liquid-cyan"
                : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span className="hidden md:inline">Catálogo</span>
          </button>

          {/* Cotizador */}
          <button
            type="button"
            onClick={() => {
              navigateTo("cotizador");
              playHapticSound("soft");
            }}
            className={`px-3 sm:px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeNav === "cotizador"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-liquid-cyan"
                : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            <svg
              className="w-4 h-4 text-cyan-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span>Cotizar</span>
          </button>

          {/* QR Button */}
          <button
            type="button"
            onClick={() => {
              setQrModal({
                open: true,
                mode: "catalogo",
                customTitle: "Mostrario Digital Mexicali",
                customValue: "",
              });
              playHapticSound("pop");
            }}
            className="px-3 py-2 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-cyan-500 flex items-center gap-1 transition-all whitespace-nowrap"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
            <span className="hidden sm:inline">QR</span>
          </button>

          {/* AS Intelligence Copilot */}
          <button
            type="button"
            onClick={() => {
              setChatbotOpen(true);
              playHapticSound("pop");
              setTimeout(() => chatInputRef.current?.focus(), 150);
            }}
            className="px-3 sm:px-3.5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-rose-500/15 to-cyan-500/15 text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1 transition-all border border-rose-300/40 whitespace-nowrap"
          >
            <span>✨</span>
            <span className="font-extrabold">IA</span>
          </button>

          {/* Admin Lock (100% Editable) */}
          <button
            type="button"
            onClick={() => openAdminSecurityModal("general")}
            title="Panel Administrativo 100% Editable (PIN: 1234)"
            className="px-2.5 py-2 rounded-full text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* ============================================================
          INTERACTIVE QR SHOWCASE MODAL (Catálogo / WhatsApp / Muestra)
          ============================================================ */}
      <AnimatePresence>
        {qrModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQrModal((prev) => ({ ...prev, open: false }))}
            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="liquid-glass rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📲</span>
                  <h3 className="text-sm font-black text-slate-950 dark:text-white font-display">
                    Pase QR · {appData.config.brandName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setQrModal((prev) => ({ ...prev, open: false }))
                  }
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              {/* QR Mode Selector */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-200/70 dark:bg-slate-800/80 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setQrModal((prev) => ({ ...prev, mode: "catalogo" }));
                    playHapticSound("soft");
                  }}
                  className={`py-2 rounded-xl font-bold transition ${
                    qrModal.mode === "catalogo"
                      ? "bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  🏪 QR Mostrario Web
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQrModal((prev) => ({ ...prev, mode: "whatsapp" }));
                    playHapticSound("soft");
                  }}
                  className={`py-2 rounded-xl font-bold transition ${
                    qrModal.mode === "whatsapp"
                      ? "bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  💬 QR WhatsApp Directo
                </button>
              </div>

              {/* QR Matrix Display Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col items-center shadow-xl border border-white/15">
                <QrCodeMatrix
                  value={currentQrValue}
                  size={190}
                  showScanline={true}
                />
                <p className="mt-3 text-xs font-extrabold text-white font-display">
                  {qrModal.mode === "whatsapp"
                    ? "Atención Directa por WhatsApp"
                    : qrModal.mode === "custom"
                    ? qrModal.customTitle
                    : "Mostrario Digital para Negocios"}
                </p>
                <span className="text-[10px] text-cyan-300 font-mono mt-0.5">
                  MEXICALI, B.C. · ESCANEA CON TU CÁMARA
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(currentQrValue);
                    triggerToast(
                      "Enlace Copiado",
                      "Enlace del código QR copiado al portapapeles."
                    );
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl liquid-glass text-xs font-bold text-slate-800 dark:text-slate-100 btn-spring"
                >
                  Copiar Enlace
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQrModal((prev) => ({ ...prev, open: false }));
                    openQuickWhatsAppQuote();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-liquid-cyan btn-spring"
                >
                  Abrir WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          AS INTELLIGENCE CHATBOT MODAL (Siri / iMessage iOS 27)
          ============================================================ */}
      <AnimatePresence>
        {chatbotOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-5"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="liquid-glass rounded-3xl w-full max-w-lg h-[85vh] sm:h-[720px] flex flex-col shadow-2xl overflow-hidden relative"
            >
              {/* Siri Glow Sphere Header */}
              <div className="px-5 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-between shrink-0 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 siri-orb rounded-full opacity-60" />

                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-rose-500 to-blue-600 p-0.5 shadow-lg flex items-center justify-center">
                    <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-sm font-bold">
                      ✨
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-sm sm:text-base font-extrabold tracking-tight font-display">
                        AS INTELLIGENCE
                      </h2>
                      <span className="text-[10px] text-cyan-300 font-mono font-bold">
                        · Copilot 27
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Asesor Experto en Impresión, DTF & Promocionales
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setChatbotOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold text-white transition z-10"
                >
                  ✕
                </button>
              </div>

              {/* Quick Interactive Suggestions */}
              <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
                {[
                  {
                    label: "👕 DTF vs Sublimación",
                    prompt:
                      "¿Cuál es la diferencia entre DTF Textil y Sublimación?",
                  },
                  {
                    label: "☀️ Lonas Resistentes al Sol",
                    prompt:
                      "¿Qué lona me recomiendan para publicidad exterior con sol fuerte en Mexicali?",
                  },
                  {
                    label: "💼 Tarjetas Soft Touch",
                    prompt:
                      "¿Cuánto cuestan 1000 tarjetas de presentación Soft Touch?",
                  },
                  {
                    label: "☕ Termos con Láser",
                    prompt:
                      "¿Hacen grabado láser en termos y vasos de acero inoxidable?",
                  },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => sendChatQuery(chip.prompt)}
                    className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px] font-semibold border border-slate-200 dark:border-slate-700 hover:border-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 whitespace-nowrap shadow-sm transition shrink-0"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Chat Messages Scroll Area */}
              <div
                ref={chatScrollRef}
                className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm"
              >
                {chatMessages.map((m) =>
                  m.sender === "user" ? (
                    <div key={m.id} className="flex justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-3.5 rounded-2xl rounded-tr-sm max-w-[85%] shadow-md">
                        <p className="leading-relaxed">{m.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div key={m.id} className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500 to-rose-500 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                        AS
                      </div>
                      <div className="liquid-glass p-3.5 rounded-2xl rounded-tl-sm max-w-[85%] text-slate-800 dark:text-slate-100 shadow-sm">
                        <div className="leading-relaxed whitespace-pre-line">
                          {renderFormattedBotText(m.text)}
                        </div>
                        {m.showQuoteAction && (
                          <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => {
                                setChatbotOpen(false);
                                navigateTo("cotizador");
                              }}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-sm hover:opacity-95 transition whitespace-nowrap"
                            >
                              ⚡ Abrir Cotizador
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setChatbotOpen(false);
                                openQuickWhatsAppQuote();
                              }}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-700 transition whitespace-nowrap"
                            >
                              💬 Hablar por WhatsApp
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}

                {chatTyping && (
                  <div className="px-2 py-1 text-[11px] text-cyan-700 dark:text-cyan-400 font-semibold flex items-center gap-2">
                    <span>AS Intelligence está preparando tu respuesta...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Area */}
              <div className="p-3 bg-white/80 dark:bg-slate-900/90 border-t border-slate-200/60 dark:border-slate-800 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendChatQuery(chatInput);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Escribe tu duda sobre materiales, precios o diseño..."
                    className="flex-1 px-4 py-2.5 rounded-2xl liquid-glass text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white flex items-center justify-center shadow-liquid-cyan transition active:scale-95 shrink-0 btn-spring"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          WHATSAPP ORDER DISPATCH & COPY MODAL (Iframe-Safe)
          ============================================================ */}
      <AnimatePresence>
        {whatsAppPreviewModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setWhatsAppPreviewModal((prev) => ({ ...prev, open: false }))
            }
            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 14 }}
              onClick={(e) => e.stopPropagation()}
              className="liquid-glass rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                    Enviar Orden por WhatsApp
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setWhatsAppPreviewModal((prev) => ({
                      ...prev,
                      open: false,
                    }))
                  }
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tu boleto de cotización está listo. Presiona{" "}
                <strong>Abrir WhatsApp Oficial</strong> o escanea el código QR.
              </p>

              <pre className="p-3.5 rounded-2xl bg-slate-950 text-slate-100 text-[11px] font-mono whitespace-pre-wrap max-h-48 overflow-y-auto border border-slate-800">
                {whatsAppPreviewModal.message}
              </pre>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href={whatsAppPreviewModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    setWhatsAppPreviewModal((prev) => ({
                      ...prev,
                      open: false,
                    }))
                  }
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold text-center shadow-lg transition btn-spring"
                >
                  Abrir WhatsApp Oficial ↗
                </a>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      whatsAppPreviewModal.message
                    );
                    triggerToast(
                      "Copiado al Portapapeles",
                      "Texto de cotización listo para pegar en WhatsApp."
                    );
                  }}
                  className="py-3 px-4 rounded-xl liquid-glass text-slate-800 dark:text-slate-100 text-xs font-bold transition btn-spring"
                >
                  Copiar Texto
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          LIGHTBOX MODAL (Image Preview)
          ============================================================ */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full liquid-glass rounded-3xl overflow-hidden p-3 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-slate-950/60 text-white flex items-center justify-center backdrop-blur-md hover:bg-slate-950 transition"
              >
                ✕
              </button>
              <ResilientImage
                src={lightboxItem.img}
                alt={lightboxItem.title}
                category={lightboxItem.category}
                className="w-full h-80 sm:h-96 object-cover rounded-2xl"
              />
              <div className="p-4 text-left">
                <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 font-mono">
                  {lightboxItem.businessType ||
                    getCategoryLabel(lightboxItem.category)}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-display">
                  {lightboxItem.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {lightboxItem.desc}
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const item = lightboxItem;
                      setLightboxItem(null);
                      openQrModalWithCustom(
                        item.title,
                        `AS PUBLICIDAD MEXICALI · ${item.title}`
                      );
                    }}
                    className="px-4 py-2.5 rounded-xl liquid-glass text-xs font-bold text-slate-800 dark:text-slate-100 btn-spring"
                  >
                    📲 Ver QR
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const cat = lightboxItem.category;
                      setLightboxItem(null);
                      setQuoteCategory(cat);
                      setWizardStep(1);
                      navigateTo("cotizador");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-bold shadow-liquid-red hover:from-rose-700 hover:to-rose-600 transition btn-spring"
                  >
                    Cotizar Este Mismo Producto
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          ADMIN PIN MODAL
          ============================================================ */}
      {adminPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="liquid-glass rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl relative">
            <button
              type="button"
              onClick={() => setAdminPinModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
              <svg
                className="w-6 h-6 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
              Panel Administrativo
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Ingresa el PIN de seguridad para gestionar catálogo, precios y
              WhatsApp.
            </p>
            <p className="text-[11px] text-cyan-700 dark:text-cyan-400 font-mono mt-1 font-semibold">
              PIN Inicial por defecto: 1234
            </p>

            <form onSubmit={verifyAdminPin} className="mt-6 space-y-4">
              <input
                type="password"
                maxLength={6}
                value={adminPinInput}
                onChange={(e) => setAdminPinInput(e.target.value)}
                placeholder="••••"
                autoFocus
                className="w-36 mx-auto text-center tracking-widest text-2xl font-mono px-4 py-2.5 rounded-2xl liquid-glass text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {pinError && (
                <div className="text-xs font-semibold text-rose-600">
                  PIN incorrecto. Intenta de nuevo.
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAdminPinModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl liquid-glass text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-slate-950 dark:bg-cyan-500 text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 btn-spring"
                >
                  Acceder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          ADMIN DASHBOARD FULL MODAL (100% Funcional & Editable)
          ============================================================ */}
      {adminDashboardOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-white/60 dark:border-slate-700 overflow-hidden my-auto">
            {/* Admin Header Bar */}
            <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-sm sm:text-base font-bold font-mono tracking-tight">
                  CONTROL CENTER 100% EDITABLE · AS PUBLICIDAD
                </h2>
                <p className="text-[11px] text-slate-400">
                  Desarrollado por NEXO DIGITAL MEXICALI · Edita textos, precios, fotos, paquetes y QR
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAdminDashboardOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Admin Tabs Navigation (5 Complete Sections) */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-2 overflow-x-auto no-scrollbar shrink-0">
              {[
                { key: "general", label: "1. Identidad, Hero & QR" },
                { key: "mostrario", label: "2. Mostrario Mexicali" },
                { key: "productos", label: "3. Catálogo & Precios" },
                { key: "galeria", label: "4. Galería Fotográfica" },
                { key: "backup", label: "5. Copia de Seguridad" },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    setAdminTab(
                      t.key as
                        | "general"
                        | "mostrario"
                        | "productos"
                        | "galeria"
                        | "backup"
                    );
                    playHapticSound("soft");
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    adminTab === t.key
                      ? "bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Admin Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              {/* TAB 1: GENERAL, HERO & QR */}
              {adminTab === "general" && (
                <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                    Identidad Comercial, Portada Hero, WhatsApp & Código QR
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Modifica el nombre de tu negocio, el titular principal, la descripción, el WhatsApp que recibe pedidos y el enlace de tu código QR.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Nombre Comercial
                      </label>
                      <input
                        type="text"
                        value={cfgBrandName}
                        onChange={(e) => setCfgBrandName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Slogan / Titular Principal (Usa coma para dividir color)
                      </label>
                      <input
                        type="text"
                        value={cfgBrandSlogan}
                        onChange={(e) => setCfgBrandSlogan(e.target.value)}
                        placeholder="Ej: TU MARCA, EN TODAS PARTES."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Subtítulo Descriptivo de Portada (Hero)
                      </label>
                      <textarea
                        rows={2}
                        value={cfgBrandSubtitle}
                        onChange={(e) => setCfgBrandSubtitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Número de WhatsApp (con lada de país sin +)
                      </label>
                      <input
                        type="text"
                        value={cfgWhatsappPhone}
                        onChange={(e) => setCfgWhatsappPhone(e.target.value)}
                        placeholder="Ej: 526861234567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none font-mono text-slate-800 dark:text-slate-100"
                      />
                      <span className="text-[10px] text-slate-400">
                        Ejemplo Mexicali: 52686 seguido de 7 dígitos.
                      </span>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        PIN Administrativo de Acceso
                      </label>
                      <input
                        type="password"
                        maxLength={6}
                        value={cfgAdminPin}
                        onChange={(e) => setCfgAdminPin(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none font-mono text-slate-800 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Ubicación / Ciudad
                      </label>
                      <input
                        type="text"
                        value={cfgLocation}
                        onChange={(e) => setCfgLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Enlace Personalizado para Código QR (Opcional)
                      </label>
                      <input
                        type="text"
                        value={cfgCustomQrUrl}
                        onChange={(e) => setCfgCustomQrUrl(e.target.value)}
                        placeholder="Dejar vacío para usar la URL automática de la app"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none font-mono text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={saveGeneralConfig}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold shadow-md transition btn-spring"
                    >
                      Guardar Ajustes Generales
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: GESTOR DE MOSTRARIO MEXICALI (NEGOCIOS LOCALES) */}
              {adminTab === "mostrario" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                        Mostrario para Negocios de Mexicali (
                        {(appData.showcase || MEXICALI_SHOWCASE_ITEMS).length})
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Personaliza los paquetes demostrativos de negocios locales, sus precios, lo que incluyen y sus fotografías.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openShowcaseEditModal(null)}
                      className="px-4 py-2 rounded-xl bg-slate-950 dark:bg-cyan-500 text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 btn-spring whitespace-nowrap"
                    >
                      <span>+ Nuevo Paquete Local</span>
                    </button>
                  </div>

                  <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-semibold">
                          <tr>
                            <th className="p-3">Muestra</th>
                            <th className="p-3">Negocio / Giro</th>
                            <th className="p-3">Paquete</th>
                            <th className="p-3">Precio</th>
                            <th className="p-3 text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {(appData.showcase || MEXICALI_SHOWCASE_ITEMS).map(
                            (s) => (
                              <tr
                                key={s.id}
                                className="hover:bg-slate-50 dark:hover:bg-slate-900/60 transition"
                              >
                                <td className="p-3">
                                  <ResilientImage
                                    src={s.img}
                                    alt={s.businessName}
                                    category={s.category}
                                    className="w-12 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                                  />
                                </td>
                                <td className="p-3">
                                  <p className="font-bold text-slate-900 dark:text-white">
                                    {s.businessName}
                                  </p>
                                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                    {s.sector} · {s.zone}
                                  </span>
                                </td>
                                <td className="p-3 text-slate-700 dark:text-slate-300 font-semibold">
                                  {s.packageTitle}
                                </td>
                                <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                                  ${s.estimatedPrice.toLocaleString("es-MX")} MXN
                                </td>
                                <td className="p-3 text-right space-x-1 whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => openShowcaseEditModal(s.id)}
                                    className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold transition"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deleteShowcaseItem(s.id)}
                                    className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/70 hover:bg-rose-200 text-rose-700 dark:text-rose-300 font-bold transition"
                                  >
                                    Eliminar
                                  </button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: GESTOR DE PRODUCTOS */}
              {adminTab === "productos" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                        Catálogo de Productos ({appData.products.length})
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Agrega nuevos productos, modifica precios, edita su ficha técnica o reemplaza fotografías.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openProductEditModal(null)}
                      className="px-4 py-2 rounded-xl bg-slate-950 dark:bg-cyan-500 text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 btn-spring whitespace-nowrap"
                    >
                      <span>+ Nuevo Producto</span>
                    </button>
                  </div>

                  <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-semibold">
                          <tr>
                            <th className="p-3">Foto</th>
                            <th className="p-3">Nombre</th>
                            <th className="p-3">Categoría</th>
                            <th className="p-3">Precio Base</th>
                            <th className="p-3 text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {appData.products.map((p) => (
                            <tr
                              key={p.id}
                              className="hover:bg-slate-50 dark:hover:bg-slate-900/60 transition"
                            >
                              <td className="p-3">
                                <ResilientImage
                                  src={p.img}
                                  alt={p.name}
                                  category={p.category}
                                  className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                                />
                              </td>
                              <td className="p-3 font-bold text-slate-900 dark:text-white">
                                {p.name}
                              </td>
                              <td className="p-3 text-slate-600 dark:text-slate-400">
                                {getCategoryLabel(p.category)}
                              </td>
                              <td className="p-3 font-mono font-bold text-cyan-700 dark:text-cyan-400 tabular-nums">
                                ${p.price} MXN
                              </td>
                              <td className="p-3 text-right space-x-1 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => openProductEditModal(p.id)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold transition"
                                >
                                  Editar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteProduct(p.id)}
                                  className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/70 hover:bg-rose-200 text-rose-700 dark:text-rose-300 font-bold transition"
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: GESTOR DE GALERÍA */}
              {adminTab === "galeria" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                        Fotografías de Trabajos Reales ({appData.gallery.length}
                        )
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Sube fotos nuevas o edita las existentes con fotografías de tus propios proyectos en Mexicali.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openGalleryPhotoModal(null)}
                      className="px-4 py-2 rounded-xl bg-slate-950 dark:bg-cyan-500 text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 btn-spring whitespace-nowrap"
                    >
                      <span>+ Agregar Fotografía</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {appData.gallery.map((g) => (
                      <div
                        key={g.id}
                        className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3"
                      >
                        <ResilientImage
                          src={g.img}
                          alt={g.title}
                          category={g.category}
                          className="w-14 h-14 object-cover rounded-lg border border-slate-100 dark:border-slate-800 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 dark:text-white truncate">
                            {g.title}
                          </p>
                          <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-semibold font-mono block truncate">
                            {g.businessType || getCategoryLabel(g.category)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => openGalleryPhotoModal(g.id)}
                            className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-[11px]"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteGalleryPhoto(g.id)}
                            className="text-rose-600 hover:text-rose-800 p-1 font-bold text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: BACKUP & RESTORE */}
              {adminTab === "backup" && (
                <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                    Seguridad y Respaldo de Datos
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Descarga un archivo JSON con todos tus paquetes del mostrario, productos, fotos y ajustes para respaldar o restaurar en cualquier dispositivo.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={exportDatabaseJSON}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 flex flex-col items-center justify-center text-center gap-2 transition"
                    >
                      <svg
                        className="w-6 h-6 text-cyan-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        Exportar Base JSON
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Descargar archivo .json
                      </span>
                    </button>

                    <label className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition">
                      <svg
                        className="w-6 h-6 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        Importar Copia JSON
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Restaurar respaldo local
                      </span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={importDatabaseJSON}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={resetToFactoryDefaults}
                      className="p-4 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 hover:bg-rose-50 flex flex-col items-center justify-center text-center gap-2 transition"
                    >
                      <svg
                        className="w-6 h-6 text-rose-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span className="font-bold text-xs text-rose-700 dark:text-rose-300">
                        Restablecer Iniciales
                      </span>
                      <span className="text-[10px] text-rose-500">
                        Recargar demo original
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          SHOWCASE (MOSTRARIO MEXICALI) EDIT MODAL
          ============================================================ */}
      {showcaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="liquid-glass rounded-3xl p-6 max-w-lg w-full shadow-2xl my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {editShowId
                  ? "Editar Paquete de Mostrario Mexicali"
                  : "Nuevo Paquete para Negocio Local"}
              </h3>
              <button
                type="button"
                onClick={() => setShowcaseModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={saveShowcaseFromModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre del Negocio / Muestra Comercial
                </label>
                <input
                  type="text"
                  required
                  value={editShowBusinessName}
                  onChange={(e) => setEditShowBusinessName(e.target.value)}
                  placeholder="Ej: Taquería La Esquina & Café Estrella"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Giro / Sector Comercial
                  </label>
                  <input
                    type="text"
                    value={editShowSector}
                    onChange={(e) => setEditShowSector(e.target.value)}
                    placeholder="Ej: Gastronomía & Restaurantes"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Zona / Ubicación en Mexicali
                  </label>
                  <input
                    type="text"
                    value={editShowZone}
                    onChange={(e) => setEditShowZone(e.target.value)}
                    placeholder="Ej: Zona Dorada, Mexicali"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Título del Paquete
                  </label>
                  <input
                    type="text"
                    required
                    value={editShowPackageTitle}
                    onChange={(e) => setEditShowPackageTitle(e.target.value)}
                    placeholder="Ej: Kit Apertura Gastronómica HD"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Precio del Paquete ($ MXN)
                  </label>
                  <input
                    type="number"
                    step="10"
                    required
                    value={editShowPrice}
                    onChange={(e) => setEditShowPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Artículos Incluidos (Uno por línea)
                </label>
                <textarea
                  rows={3}
                  value={editShowItemsText}
                  onChange={(e) => setEditShowItemsText(e.target.value)}
                  placeholder="Lona Exterior 15oz 3x1.5m&#10;10 Playeras DTF Full Color&#10;Menús Plastificados"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Fotografía del Paquete (URL o Subir desde tu Dispositivo)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editShowImgUrl}
                    onChange={(e) => setEditShowImgUrl(e.target.value)}
                    placeholder="https://... o /src/assets/..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                  />
                  <label className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold cursor-pointer transition shrink-0">
                    Subir Foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleShowcaseImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {editShowImgUrl && (
                  <div className="mt-2">
                    <ResilientImage
                      src={editShowImgUrl}
                      alt={editShowBusinessName || "Preview"}
                      category={editShowCategory}
                      className="w-full h-28 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowcaseModalOpen(false)}
                  className="flex-1 py-2 rounded-xl liquid-glass text-slate-700 dark:text-slate-200 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold hover:from-rose-700 hover:to-rose-600 shadow-md transition btn-spring"
                >
                  Guardar Paquete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          PRODUCT EDIT MODAL (Incluye Ficha Técnica 100% Editable)
          ============================================================ */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="liquid-glass rounded-3xl p-6 max-w-lg w-full shadow-2xl my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {editProdId ? "Editar Producto" : "Nuevo Producto"}
              </h3>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={saveProductFromModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre del Producto / Servicio
                </label>
                <input
                  type="text"
                  required
                  value={editProdName}
                  onChange={(e) => setEditProdName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Categoría
                  </label>
                  <select
                    value={editProdCategory}
                    onChange={(e) =>
                      setEditProdCategory(e.target.value as CategoryKey)
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 font-medium"
                  >
                    <option value="impresion">A • Impresión</option>
                    <option value="exterior">B • Exterior</option>
                    <option value="textil">C • Textil</option>
                    <option value="promocionales">D • Promocionales</option>
                    <option value="especiales">E • Especiales</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Precio Base ($ MXN)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={editProdPrice}
                    onChange={(e) => setEditProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descripción Comercial
                </label>
                <textarea
                  rows={2}
                  value={editProdDesc}
                  onChange={(e) => setEditProdDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Etiqueta Destacada (Badge)
                  </label>
                  <input
                    type="text"
                    value={editProdBadge}
                    onChange={(e) => setEditProdBadge(e.target.value)}
                    placeholder="Ej: Más Vendido / HD 1440 DPI"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ficha Técnica (Specs)
                  </label>
                  <input
                    type="text"
                    value={editProdSpecs}
                    onChange={(e) => setEditProdSpecs(e.target.value)}
                    placeholder="Ej: Lona 15oz • Tintas UV • Ojillos"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Fotografía del Producto (URL o Carga Local)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editProdImgUrl}
                    onChange={(e) => setEditProdImgUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                  />
                  <label className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold cursor-pointer transition shrink-0">
                    Subir Foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {editProdImgUrl && (
                  <div className="mt-2">
                    <ResilientImage
                      src={editProdImgUrl}
                      alt={editProdName || "Preview"}
                      category={editProdCategory}
                      className="w-full h-28 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="flex-1 py-2 rounded-xl liquid-glass text-slate-700 dark:text-slate-200 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:from-blue-700 hover:to-cyan-600 shadow-md transition btn-spring"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          GALLERY PHOTO ADD / EDIT MODAL
          ============================================================ */}
      {addPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="liquid-glass rounded-3xl p-6 max-w-md w-full shadow-2xl my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {editPhotoId
                  ? "Editar Fotografía de Galería"
                  : "Nueva Foto en Galería"}
              </h3>
              <button
                type="button"
                onClick={() => setAddPhotoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={savePhotoToGallery} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Título del Trabajo
                </label>
                <input
                  type="text"
                  required
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  placeholder="Ej: Rotulación de Camión de Carga"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Cliente / Giro en Mexicali
                  </label>
                  <input
                    type="text"
                    value={newPhotoBusinessType}
                    onChange={(e) => setNewPhotoBusinessType(e.target.value)}
                    placeholder="Ej: Gastronomía · Mexicali"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Categoría
                  </label>
                  <select
                    value={newPhotoCategory}
                    onChange={(e) =>
                      setNewPhotoCategory(e.target.value as CategoryKey)
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                  >
                    <option value="impresion">Lonas & Impresión</option>
                    <option value="exterior">Viniles & Banderas</option>
                    <option value="textil">Textil & Bordado</option>
                    <option value="promocionales">Promocionales</option>
                    <option value="especiales">Especiales & Diseño</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descripción del Proyecto
                </label>
                <textarea
                  rows={2}
                  value={newPhotoDesc}
                  onChange={(e) => setNewPhotoDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Imagen (URL o Carga Directa)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-slate-100"
                  />
                  <label className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold cursor-pointer shrink-0">
                    Subir
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleGalleryImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAddPhotoModalOpen(false)}
                  className="flex-1 py-2 rounded-xl liquid-glass text-slate-700 dark:text-slate-200 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition shadow-md btn-spring"
                >
                  {editPhotoId ? "Guardar Cambios" : "Publicar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
