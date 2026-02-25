
```
z-core
├─ .discloudignore
├─ constants.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ scripts
│  └─ organize-xp.ts
├─ src
│  ├─ constants.ts
│  ├─ discord
│  │  ├─ commands
│  │  │  ├─ economy
│  │  │  │  └─ money.ts
│  │  │  └─ xp
│  │  │     ├─ leaderboard.ts
│  │  │     └─ rank.ts
│  │  ├─ events
│  │  │  └─ message-create.ts
│  │  ├─ index.ts
│  │  └─ responders
│  ├─ env.ts
│  ├─ functions
│  │  └─ index.ts
│  ├─ index.ts
│  ├─ infra
│  │  └─ database
│  │     ├─ prisma.ts
│  │     └─ schema.prisma
│  └─ modules
│     └─ xp
│        ├─ application
│        │  ├─ leveling.service.ts
│        │  └─ xp.service.ts
│        ├─ domain
│        │  ├─ answer-xp.policy.ts
│        │  ├─ level-calculator.ts
│        │  └─ xp-rules.ts
│        ├─ infra
│        │  └─ xp.repository.ts
│        ├─ xp.constants.ts
│        ├─ xp.types.ts
│        └─ xp.utils.ts
├─ tsconfig.json
└─ tsup.config.ts

```