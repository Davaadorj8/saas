/
├── public/
│   └── ...svg files

├── src/
│   
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   
│   │   ├── (auth)/login/page.tsx
│   │   ├── (auth)/register/page.tsx
│   │   
│   │   ├── (dashboard)/layout.tsx
│   │   
│   │   ├── supplier/
│   │   │   └── dashboard/page.tsx
│   │   ├── customer/
│   │   │   └── dashboard/page.tsx
│   │   └── client/
│   │       └── dashboard/page.tsx
│   │   
│   ├── modules/                          # ⬅️ Business Logic Layer
│   │   ├── auth/
│   │   │   ├── services.ts               # Auth workflows
│   │   │   └── schema.ts                 # Auth schema & validators
│   │   ├── tenant/
│   │   │   ├── services.ts
│   │   │   └── utils.ts
│   │   ├── user/
│   │   │   └── profile.ts
│   │   └── shared/                       # Shared business logic
│   │       └── dateFormatter.ts
│   │   
│   ├── plugins/                          # ⬅️ Feature Plug-ins (optional, tenant-specific)
│   │   ├── notifications/
│   │   │   ├── toast.tsx
│   │   │   └── socket.ts
│   │   ├── billing/
│   │   │   └── stripe.ts
│   │   └── analytics/
│   │       └── tracker.ts
│   │   
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── forms/
│   │   
│   ├── features/                         # Redux/State management layer
│   │   ├── auth/authSlice.ts
│   │   ├── tenant/tenantSlice.ts
│   │   └── user/userSlice.ts
│   │   
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useTenant.ts
│   │   
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── rbac.ts
│   │   └── fetcher.ts
│   │   
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │   
│   ├── store/
│   │   ├── index.ts
│   │   └── rootReducer.ts
│   │   
│   ├── types/
│   │   ├── auth.ts
│   │   ├── tenant.ts
│   │   └── user.ts
│   │   
│   └── utils/
│       ├── debounce.ts
│       └── logger.ts
│   
├── middleware.ts
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── eslint.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
├── README.md

# Dev tooling
├── .vscode/settings.json
└── .idx/dev.nix