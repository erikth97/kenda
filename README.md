# 🚗 KENDA DISTRIBUIDORES - Sistema de Captación de Leads

<div align="center">

![KENDA Logo](./public/images/kenda-logo.png)

**Sistema automatizado de captación y gestión de distribuidores KENDA México**

[![Astro](https://img.shields.io/badge/Astro-5.7.9-FF5D01?style=for-the-badge&logo=astro)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.5-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[🌐 Demo Live](https://distribuidorkenda.com) • [📚 Documentación](./DOCUMENTACION_COMPLETA.md) • [🏗️ Arquitectura](./DIAGRAMA_ARQUITECTURA.md)

</div>

---

## 🎯 **Visión General**

Sistema integral de captación de leads para el programa de distribuidores KENDA México, que combina una landing page moderna con automatización backend completa mediante Make.com y Google Sheets.

### **🏆 Características Principales**

- ⚡ **Landing Page Ultra-rápida** con Astro + React
- 🎯 **Sistema de Asignación Inteligente** de promotores por estado
- 📊 **Base de Datos** en Google Sheets con 36+ leads registrados
- 🤖 **Automatización Completa** con Make.com webhooks
- 📱 **Design Responsivo** mobile-first
- ♿ **Accesibilidad Completa** (ARIA, reduced-motion)
- 🔄 **Auto-save** en formularios para mejor conversión

---

## 🚀 **Quick Start**

```bash
# Clonar repositorio
git clone [REPO_URL]
cd kenda

# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env.local

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

### **🔧 Variables de Entorno**

```env
# .env.local
PUBLIC_MAKE_WEBHOOK_URL=https://hook.make.com/[WEBHOOK_ID]
PUBLIC_GA_ID=G-9MY6DBBCDC
PUBLIC_SITE_URL=https://distribuidorkenda.com
GOOGLE_SHEETS_ID=1DJIjuRAs_fLtoweKXX4xbrt8bLIqHAnB3AcFCMeFal8
```

---

## 🏗️ **Arquitectura del Sistema**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │   INTEGRATION    │    │    BACKEND      │
│                 │    │                  │    │                 │
│ • Astro 5.7.9   │───▶│ • Make.com       │───▶│ • Google Sheets │
│ • React 19      │    │ • Webhooks       │    │ • WhatsApp API  │
│ • TypeScript    │    │ • Automation     │    │ • Email Service │
│ • Tailwind v4   │    │ • Validation     │    │ • Analytics     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **📊 Flujo de Datos**

1. **Usuario** completa formulario en landing page
2. **Frontend** valida datos y envía via webhook
3. **Make.com** procesa, asigna promotor y almacena
4. **Google Sheets** recibe el lead como nueva fila
5. **WhatsApp/Email** notifica a promotor y usuario
6. **Analytics** registra métricas de conversión

---

## 💼 **Características de Negocio**

### **🎯 Sistema de Asignación de Promotores**

```typescript
// Asignación inteligente por estado geográfico
const PROMOTORES_POR_ESTADO = {
  'mexico': {
    tipo: 'multiple',
    asesores: [
      'ALEJANDRO ROBERTO PIÑA GARCIA',  // Principal
      'OCTAVIO NAVARRETE FERNANDEZ'     // Alternativo
    ]
  },
  'jalisco': {
    tipo: 'single', 
    asesor: 'LUIS MARTINEZ RODRIGUEZ'
  }
  // ... 32 estados cubiertos
}
```

### **📈 Métricas de Performance**

- **36+ leads** registrados actualmente
- **5,000+ distribuidores** activos en México  
- **$50,000 MXN** inversión inicial promedio
- **66 años** de experiencia KENDA

---

## 🔧 **Stack Tecnológico**

| Categoría | Tecnología | Versión | Propósito |
|-----------|------------|---------|-----------|
| **Framework** | Astro | 5.7.9 | SSG + Hydration selectiva |
| **Frontend** | React | 19.1.0 | Componentes interactivos |
| **Styling** | Tailwind CSS | 4.1.5 | Design system + utilidades |
| **Animaciones** | GSAP | 3.13.0 | Micro-interactions avanzadas |
| **Lenguaje** | TypeScript | 5.0+ | Type safety + DX |
| **Backend** | Make.com | - | Automatización + webhooks |
| **Database** | Google Sheets | API v4 | Storage + colaboración |
| **Analytics** | Google Analytics | 4 | Métricas + conversiones |

---

## 📁 **Estructura del Proyecto**

```
src/
├── components/
│   ├── form/
│   │   └── FormSection.astro           # 🎯 Componente principal del negocio
│   ├── sections/
│   │   ├── HeroSection.astro           # 🌟 Landing hero con animaciones
│   │   ├── BenefitsSection.astro       # 💎 Beneficios con micro-animations
│   │   └── TestimonialsSection.astro   # 👥 Social proof
│   ├── common/
│   │   ├── Footer.astro                # 🦶 Footer corporativo
│   │   └── Section.astro               # 📦 Wrapper reutilizable
│   └── ui/
│       ├── custom/                     # 🎨 Componentes branded
│       └── shadcn/                     # 🧩 Design system
├── data/
│   └── benefits.ts                     # 📊 Datos tipados del negocio
├── layouts/
│   ├── BaseLayout.astro                # 🏗️ Layout principal + SEO
│   └── Container.astro                 # 📐 Sistema de grid
├── pages/
│   └── index.astro                     # 🏠 Single page application
└── styles/
    ├── global.css                      # 🎨 Estilos globales
    └── theme-variables.css             # 🎨 Variables KENDA
```

---

## 🎨 **Componentes Destacados**

### **FormSection.astro** - ⭐⭐⭐⭐⭐
```astro
<!-- Sistema de validación en tiempo real -->
<input 
  type="email" 
  class="focus:ring-kenda-orange"
  aria-describedby="error-email"
  aria-invalid="false"
/>

<script>
  // Lógica de asignación de promotores
  const assignPromoter = (estado) => {
    return PROMOTORES_POR_ESTADO[estado] || DEFAULT_PROMOTER;
  }
</script>
```

### **HeroSection.astro** - 🏆 Excelencia Técnica
```typescript
// Patrón SOLID con Dependency Injection
class HeroController {
  constructor(
    private scrollService: ScrollService,
    private animationService: AnimationService
  ) {}
}
```

---

## 📊 **Google Sheets Database**

**URL**: [KENDA Leads Database](https://docs.google.com/spreadsheets/d/1DJIjuRAs_fLtoweKXX4xbrt8bLIqHAnB3AcFCMeFal8/edit)

| Columna | Tipo | Descripción |
|---------|------|-------------|
| NOMBRE | Text | Nombre completo del prospecto |
| EMAIL | Email | Correo de contacto |
| TELEFONO | Text | Número telefónico |
| GIRO COMERCIAL | Enum | Tipo de negocio |
| ESTADO | Text | Estado de México |
| INVERSIÓN | Text | Rango de capital |
| INICIO DE OPERACIONES | Text | Timeline estimado |
| ASESOR QUE ATENDERA | Text | Promotor asignado |

---

## 🔗 **Integraciones**

### **Make.com Webhook**
```javascript
// Endpoint principal
POST https://hook.make.com/[WEBHOOK_ID]

// Payload típico
{
  "nombre": "Juan Pérez García",
  "email": "juan@ejemplo.com",
  "telefono": "5512345678",
  "giroComercial": "taller",
  "estado": "mexico",
  "inversion": "50k-100k",
  "inicioOperaciones": "3-6 meses"
}
```

### **WhatsApp Integration**
- Notificación automática a promotores
- Template mensaje con datos del lead
- Status de entrega y lectura

---

## ♿ **Accesibilidad y UX**

- ✅ **WCAG 2.1 AA** compliant
- ✅ **Screen reader** optimizado
- ✅ **Keyboard navigation** completa
- ✅ **Reduced motion** support
- ✅ **Color contrast** validado
- ✅ **Mobile-first** responsive

---

## 📈 **Performance**

### **Core Web Vitals**
- **LCP**: < 2.5s (Excellent)
- **FID**: < 100ms (Excellent)  
- **CLS**: < 0.1 (Excellent)

### **Optimizaciones**
```html
<!-- Preload crítico -->
<link rel="preload" href="/images/hero/gradas-background.png" as="image" />
<link rel="preconnect" href="https://hook.make.com" />

<!-- Lazy loading -->
<img loading="lazy" decoding="async" />
```

---

## 🚢 **Deployment**

### **Production Build**
```bash
npm run build
npm run preview
```

### **Hosting Platforms**
- **Netlify** (Recomendado)
- **Vercel** 
- **GitHub Pages**
- **Cloudflare Pages**

### **Domain Setup**
```dns
# DNS Configuration
A     @           [IP_ADDRESS]
CNAME www         distribuidorkenda.com
```

---

## 🔒 **Seguridad**

- 🔐 **HTTPS** enforcement
- 🛡️ **Input validation** + sanitization
- 🚫 **Rate limiting** en webhooks
- 📝 **Audit logging** en Make.com
- 🔑 **OAuth2** para Google Sheets
- 🎯 **CORS** policy configurado

---

## 📋 **Scripts Disponibles**

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor desarrollo (localhost:4321) |
| `npm run build` | Build producción |
| `npm run preview` | Preview del build |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier format |

---

## 🧪 **Testing**

```bash
# Lighthouse CI
npm run lighthouse

# Validación HTML
npm run validate

# Accesibilidad
npm run a11y
```

---

## 📚 **Documentación Adicional**

- 📖 [**Documentación Completa**](./DOCUMENTACION_COMPLETA.md) - Guía técnica detallada
- 🏗️ [**Diagramas de Arquitectura**](./DIAGRAMA_ARQUITECTURA.md) - Flujos y componentes
- 🎨 [**Design System**](./docs/design-system.md) - Guía de componentes UI
- 🔧 [**API Reference**](./docs/api.md) - Webhooks y endpoints

---

## 🚀 **Roadmap**

### **Q1 2024**
- [ ] Dashboard analytics avanzado
- [ ] A/B testing framework  
- [ ] Mobile app para promotores

### **Q2 2024**
- [ ] AI-powered lead scoring
- [ ] Multi-language support (EN/ES)
- [ ] CRM integration (HubSpot)

### **Q3 2024**
- [ ] WhatsApp chatbot automation
- [ ] Video call scheduling
- [ ] Contract generation

---

## 🤝 **Contribuir**

1. Fork el repositorio
2. Crear feature branch (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

---

## 📞 **Soporte**

- **Email**: tech-support@motosyequipos.com
- **Phone**: +52 81 8218 2838 Ext. 8332
- **Slack**: #kenda-support
- **Issues**: [GitHub Issues](./issues)

---

## 📄 **Licencia**

© 2024 KENDA México - Motos y Equipos. Todos los derechos reservados.

---

<div align="center">

**⭐ Desarrollado con excelencia técnica ⭐**

*Si este proyecto te resulta útil, por favor dale una estrella* ⭐

</div>