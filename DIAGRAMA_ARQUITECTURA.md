# 🏗️ DIAGRAMA DE ARQUITECTURA - SISTEMA KENDA

## 📊 **FLUJO COMPLETO DEL SISTEMA**

```mermaid
graph TB
    %% FRONTEND LAYER
    subgraph "FRONTEND - Astro Application"
        A[👤 Usuario Distribuidor] --> B[🌐 Landing Page<br/>distribuidorkenda.com]
        B --> C[📝 Formulario de Registro<br/>FormSection.astro]
        C --> D[✅ Validación Frontend<br/>JavaScript + TypeScript]
        D --> E[💾 Auto-save<br/>localStorage]
    end

    %% INTEGRATION LAYER  
    subgraph "INTEGRATION - Make.com"
        F[🔗 Webhook Endpoint<br/>hook.make.com]
        G[🔍 Data Validation]
        H[🎯 Promoter Assignment Logic]
        I[📊 Analytics & Logging]
    end

    %% BACKEND SERVICES
    subgraph "BACKEND SERVICES"
        J[📈 Google Sheets<br/>Database]
        K[📱 WhatsApp API<br/>Notifications]
        L[📧 Email Service<br/>Confirmations]
        M[📊 Google Analytics<br/>Tracking]
    end

    %% BUSINESS LOGIC
    subgraph "BUSINESS LOGIC"
        N[🗺️ Estado Mapping]
        O[👥 Promoter Pool]
        P[⚖️ Load Balancing]
        Q[📞 Contact Assignment]
    end

    %% CONNECTIONS
    D --> F
    E --> F
    F --> G
    G --> H
    H --> I
    
    G --> J
    H --> K
    H --> L
    I --> M
    
    H --> N
    N --> O
    O --> P
    P --> Q
    Q --> K

    %% FEEDBACK LOOPS
    J -.-> B
    K -.-> A
    L -.-> A
    
    %% STYLING
    classDef frontend fill:#e1f5fe
    classDef integration fill:#f3e5f5
    classDef backend fill:#e8f5e8
    classDef business fill:#fff3e0
    
    class A,B,C,D,E frontend
    class F,G,H,I integration  
    class J,K,L,M backend
    class N,O,P,Q business
```

## 🔄 **FLUJO DETALLADO DE DATOS**

```mermaid
sequenceDiagram
    participant U as 👤 Usuario
    participant F as 🌐 Frontend
    participant W as 🔗 Webhook
    participant M as 🤖 Make.com
    participant S as 📊 Sheets
    participant WA as 📱 WhatsApp
    participant E as 📧 Email

    Note over U,E: FASE 1: CAPTACIÓN
    U->>F: Accede a landing page
    F->>U: Muestra formulario
    U->>F: Completa datos
    F->>F: Validación frontend
    
    Note over U,E: FASE 2: PROCESAMIENTO
    F->>W: POST webhook/datos
    W->>M: Trigger scenario
    M->>M: Validar datos
    M->>M: Determinar promotor
    
    Note over U,E: FASE 3: ALMACENAMIENTO
    M->>S: INSERT nueva fila
    S-->>M: Confirmación
    
    Note over U,E: FASE 4: NOTIFICACIONES
    M->>WA: Notificar promotor
    M->>E: Email bienvenida
    M->>F: Response success
    F->>U: Toast confirmación
    
    Note over U,E: FASE 5: SEGUIMIENTO
    WA-->>M: Status delivery
    E-->>M: Status delivery
    M->>S: Update status
```

## 🎯 **ARQUITECTURA DE COMPONENTES**

```mermaid
graph LR
    subgraph "ASTRO APPLICATION"
        subgraph "Pages"
            A1[index.astro]
        end
        
        subgraph "Layouts"
            B1[BaseLayout.astro]
            B2[Container.astro]
        end
        
        subgraph "Components"
            C1[HeroSection.astro]
            C2[BenefitsSection.astro]
            C3[FormSection.astro]
            C4[TestimonialsSection.astro]
        end
        
        subgraph "UI System"
            D1[BenefitCard.astro]
            D2[Button.astro]
            D3[Input.astro]
            D4[ProgressBar.astro]
        end
        
        subgraph "Data Layer"
            E1[benefits.ts]
            E2[promotores.ts]
            E3[utils.ts]
        end
    end

    A1 --> B1
    B1 --> C1
    B1 --> C2
    B1 --> C3
    B1 --> C4
    
    C2 --> D1
    C3 --> D2
    C3 --> D3
    B1 --> D4
    
    C2 --> E1
    C3 --> E2
    C3 --> E3
```

## 🗄️ **ESTRUCTURA DE DATOS**

```mermaid
erDiagram
    LEAD {
        string id PK
        string nombre
        string email
        string telefono
        string giro_comercial
        string estado
        string inversion
        string inicio_operaciones
        datetime created_at
        string status
    }
    
    PROMOTER {
        string id PK
        string nombre
        string whatsapp
        string email
        string region
        array estados
        boolean activo
    }
    
    ASSIGNMENT {
        string id PK
        string lead_id FK
        string promoter_id FK
        string tipo
        datetime assigned_at
        datetime contacted_at
        string status
    }
    
    ANALYTICS {
        string id PK
        string lead_id FK
        string event_type
        json metadata
        datetime timestamp
    }

    LEAD ||--o{ ASSIGNMENT : "assigned_to"
    PROMOTER ||--o{ ASSIGNMENT : "handles"
    LEAD ||--o{ ANALYTICS : "tracks"
```

## 🔄 **ESTADOS Y TRANSICIONES**

```mermaid
stateDiagram-v2
    [*] --> FormSubmitted: Usuario envía formulario
    
    FormSubmitted --> Validating: Webhook recibe datos
    Validating --> ValidationError: Datos inválidos
    Validating --> PromoterAssignment: Datos válidos
    
    PromoterAssignment --> SinglePromoter: Estado con 1 promotor
    PromoterAssignment --> MultiplePromoters: Estado con 2+ promotores
    
    SinglePromoter --> NotificationSent: WhatsApp enviado
    MultiplePromoters --> NotificationSent: WhatsApp a ambos
    
    NotificationSent --> DataStored: Google Sheets
    DataStored --> EmailSent: Confirmación al lead
    EmailSent --> Completed: Proceso terminado
    
    ValidationError --> [*]: Error reportado
    Completed --> [*]: Lead en sistema
    
    state NotificationSent {
        [*] --> Sending
        Sending --> Delivered: WhatsApp entregado
        Sending --> Failed: Error en envío
        Failed --> Retry: Reintentar
        Retry --> Delivered: Éxito en reintento
        Delivered --> [*]
    }
```

## 📊 **MÉTRICAS Y MONITOREO**

```mermaid
graph TD
    subgraph "MÉTRICAS DE NEGOCIO"
        A[📈 Conversion Rate]
        B[⏱️ Response Time]
        C[🎯 Lead Quality Score]
        D[📍 Geographic Distribution]
    end
    
    subgraph "MÉTRICAS TÉCNICAS"
        E[🔄 Webhook Success Rate]
        F[⚡ Page Load Speed]
        G[🐛 Error Rate]
        H[📱 Mobile Usage]
    end
    
    subgraph "DASHBOARDS"
        I[📊 Google Analytics]
        J[📈 Make.com Stats]
        K[📋 Sheets Analytics]
        L[🔍 Custom Dashboard]
    end
    
    A --> I
    B --> J
    C --> K
    D --> L
    
    E --> J
    F --> I
    G --> L
    H --> I
```

## 🔐 **SEGURIDAD Y PERMISOS**

```mermaid
graph TB
    subgraph "FRONTEND SECURITY"
        A[🔒 HTTPS Encryption]
        B[🛡️ Input Validation]
        C[🔐 CORS Policy]
        D[🚫 Rate Limiting]
    end
    
    subgraph "API SECURITY"
        E[🔑 Webhook Signatures]
        F[🎫 OAuth2 Tokens]
        G[📝 Request Logging]
        H[🔍 Data Validation]
    end
    
    subgraph "DATA SECURITY"
        I[🗃️ Sheets Permissions]
        J[🔐 Service Accounts]
        K[📋 Audit Logs]
        L[🔄 Backup Strategy]
    end
    
    A --> E
    B --> H
    C --> F
    D --> G
    
    E --> I
    F --> J
    H --> K
    G --> L
```

---

*Diagramas generados para documentación técnica del Sistema KENDA*
*Versión: 1.0.0 | Fecha: 2024-01-15*