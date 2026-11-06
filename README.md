# AS PUBLICIDAD — Digital Experience iOS 27 (Mostrario Mexicali)

Plataforma web interactiva **100% editable** desarrollada para **AS PUBLICIDAD** en **Mexicali, Baja California**, bajo arquitectura visual **iOS 27 Liquid Glass** por **NEXO DIGITAL MEXICALI**.

---

## ✨ Características Principales

- **🌗 Modo Automático, Dark y Blanco**: Detecta automáticamente la configuración del sistema operativo del usuario (`prefers-color-scheme`) o permite alternar manualmente entre **Auto**, **Blanco** y **Dark** desde la *Dynamic Island*.
- **🏪 Mostrario para Negocios Locales de Mexicali**: Paquetes demostrativos con fotografías de alta resolución para restaurantes, plazas comerciales, parques industriales, consultorios y corporativos de Mexicali.
- **📲 Generador de Código QR Interactivo**:
  - Código QR para compartir el Mostrario Web o abrir WhatsApp directo.
  - Código QR individual en cada paquete, producto y boleto digital *Apple Wallet Pass*.
- **🧮 Cotizador Inteligente en 5 Pasos**:
  - Cálculo automático de descuentos por volumen (12+, 50+, 100+ piezas).
  - Generación de **Boleto Digital estilo Apple Wallet** con folio único y código QR integrado.
  - Envío directo de orden formateada a **WhatsApp Oficial**.
- **🤖 Asistente IA `AS Intelligence`**: Asesor técnico comercial impulsado por Gemini en servidor (`/api/chat`) con respaldo local inteligente para dudas sobre **DTF Textil, Lonas UV, Sublimación, Bordado y Grabado Láser**.
- **⚙️ Centro de Control 100% Editable (PIN: `1234`)**:
  1. **Identidad, Hero & QR**: Edita nombre comercial, slogan, subtítulo, número de WhatsApp, ubicación, PIN y URL del QR.
  2. **Mostrario Mexicali**: Agrega, edita o elimina paquetes para negocios locales y sube fotografías desde tu celular o PC.
  3. **Catálogo & Precios**: Administra los productos de las categorías A–E, precios base, etiquetas, ficha técnica (`specs`) y fotos.
  4. **Galería Fotográfica**: Sube nuevas fotos de proyectos entregados o edita las existentes.
  5. **Copia de Seguridad**: Exporta e importa toda tu base de datos en formato `.json`.

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd as-publicidad-mexicali
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` basado en `.env.example`:
   ```env
   GEMINI_API_KEY="TU_API_KEY_DE_GEMINI"
   ```

4. **Iniciar servidor de desarrollo (Full-Stack Express + Vite en puerto 3000):**
   ```bash
   npm run dev
   ```

5. **Compilar para producción:**
   ```bash
   npm run build
   npm start
   ```

---

## 🔒 Acceso Administrativo

- **Acceso rápido**: Haz clic en el botón **`⚙️ 100% Editable`** en la portada o en el ícono del **candado 🔒** en la barra inferior (Dock).
- **PIN por defecto**: `1234` (modificable desde la pestaña *1. Identidad, Hero & QR*).

---

**Desarrollado y Diseñado por NEXO DIGITAL MEXICALI** · *Arquitectura Web iOS 27*
