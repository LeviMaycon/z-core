# 🌍 Z-Core RPG — Arquitetura Completa

> Sistema de RPG de Mundo Real para Discord Bot  
> Baseado na estrutura existente, substituindo o sistema de XP por um personagem completo.

---

## 📁 Estrutura de Pastas

```
z-core
├── src
│   ├── discord
│   │   ├── commands
│   │   │   ├── character/
│   │   │   │   ├── create.ts          # Criação de personagem
│   │   │   │   ├── profile.ts         # Ver perfil/status
│   │   │   │   └── attributes.ts      # Ver/distribuir atributos
│   │   │   ├── family/
│   │   │   │   ├── marry.ts           # Pedir em casamento
│   │   │   │   ├── divorce.ts         # Divórcio
│   │   │   │   ├── have-child.ts      # Ter filhos
│   │   │   │   ├── adopt.ts           # Adotar
│   │   │   │   └── family-tree.ts     # Árvore genealógica
│   │   │   ├── housing/
│   │   │   │   ├── buy-land.ts        # Comprar terreno
│   │   │   │   ├── build-house.ts     # Construir casa
│   │   │   │   ├── upgrade-house.ts   # Melhorar casa
│   │   │   │   ├── visit.ts           # Visitar casa de alguém
│   │   │   │   └── sell.ts            # Vender propriedade
│   │   │   ├── farming/
│   │   │   │   ├── plant.ts           # Plantar culturas
│   │   │   │   ├── harvest.ts         # Colher
│   │   │   │   ├── water.ts           # Regar plantas
│   │   │   │   └── farm-status.ts     # Status da fazenda
│   │   │   ├── economy/
│   │   │   │   ├── balance.ts         # Saldo
│   │   │   │   ├── pay.ts             # Transferir dinheiro
│   │   │   │   ├── bank.ts            # Banco (depósito/saque)
│   │   │   │   ├── invest.ts          # Investimentos
│   │   │   │   ├── tax.ts             # Impostos
│   │   │   │   └── market.ts          # Mercado de itens
│   │   │   ├── inventory/
│   │   │   │   ├── bag.ts             # Ver inventário
│   │   │   │   ├── use.ts             # Usar item
│   │   │   │   ├── equip.ts           # Equipar item
│   │   │   │   └── drop.ts            # Descartar item
│   │   │   ├── skills/
│   │   │   │   ├── skill-tree.ts      # Árvore de habilidades
│   │   │   │   └── learn.ts           # Aprender habilidade
│   │   │   ├── guild/
│   │   │   │   ├── create-guild.ts    # Criar guilda
│   │   │   │   ├── join.ts            # Entrar em guilda
│   │   │   │   ├── leave.ts           # Sair de guilda
│   │   │   │   ├── guild-info.ts      # Info da guilda
│   │   │   │   └── guild-bank.ts      # Banco da guilda
│   │   │   ├── map/
│   │   │   │   ├── travel.ts          # Viajar entre zonas
│   │   │   │   ├── explore.ts         # Explorar zona atual
│   │   │   │   └── map.ts             # Ver mapa
│   │   │   └── class/
│   │   │       ├── choose-class.ts    # Escolher classe
│   │   │       └── class-info.ts      # Info de classe
│   │   ├── events
│   │   │   ├── message-create.ts      # EXP por mensagem
│   │   │   ├── guild-member-add.ts    # Criar personagem ao entrar
│   │   │   └── interaction-create.ts
│   │   ├── responders/
│   │   └── index.ts
│   │
│   ├── modules
│   │   ├── character/                 # 🧑 NÚCLEO — substitui o módulo xp
│   │   │   ├── application/
│   │   │   │   ├── character.service.ts
│   │   │   │   ├── leveling.service.ts
│   │   │   │   └── attributes.service.ts
│   │   │   ├── domain/
│   │   │   │   ├── level-calculator.ts
│   │   │   │   ├── attribute-rules.ts
│   │   │   │   └── exp-rules.ts
│   │   │   ├── infra/
│   │   │   │   └── character.repository.ts
│   │   │   ├── character.constants.ts
│   │   │   ├── character.types.ts
│   │   │   └── character.utils.ts
│   │   │
│   │   ├── class/                     # ⚔️ Classes e Profissões
│   │   │   ├── application/
│   │   │   │   └── class.service.ts
│   │   │   ├── domain/
│   │   │   │   ├── class-bonuses.ts
│   │   │   │   └── class-skills.ts
│   │   │   ├── infra/
│   │   │   │   └── class.repository.ts
│   │   │   ├── class.constants.ts     # Definição de todas as classes
│   │   │   └── class.types.ts
│   │   │
│   │   ├── skills/                    # 🔮 Habilidades
│   │   │   ├── application/
│   │   │   │   └── skills.service.ts
│   │   │   ├── domain/
│   │   │   │   ├── skill-tree.ts
│   │   │   │   └── skill-effects.ts
│   │   │   ├── infra/
│   │   │   │   └── skills.repository.ts
│   │   │   ├── skills.constants.ts
│   │   │   └── skills.types.ts
│   │   │
│   │   ├── family/                    # 👨‍👩‍👧‍👦 Sistema de Família
│   │   │   ├── application/
│   │   │   │   ├── family.service.ts
│   │   │   │   ├── marriage.service.ts
│   │   │   │   └── children.service.ts
│   │   │   ├── domain/
│   │   │   │   ├── marriage-rules.ts
│   │   │   │   ├── inheritance-rules.ts
│   │   │   │   └── family-tree.ts
│   │   │   ├── infra/
│   │   │   │   └── family.repository.ts
│   │   │   ├── family.constants.ts
│   │   │   └── family.types.ts
│   │   │
│   │   ├── housing/                   # 🏠 Casas e Terrenos
│   │   │   ├── application/
│   │   │   │   ├── housing.service.ts
│   │   │   │   └── land.service.ts
│   │   │   ├── domain/
│   │   │   │   ├── house-types.ts
│   │   │   │   ├── land-rules.ts
│   │   │   │   └── property-value.ts
│   │   │   ├── infra/
│   │   │   │   └── housing.repository.ts
│   │   │   ├── housing.constants.ts
│   │   │   └── housing.types.ts
│   │   │
│   │   ├── farming/                   # 🌾 Plantações e Colheita
│   │   │   ├── application/
│   │   │   │   ├── farming.service.ts
│   │   │   │   └── crop.service.ts
│   │   │   ├── domain/
│   │   │   │   ├── crop-types.ts
│   │   │   │   ├── grow-rules.ts
│   │   │   │   └── harvest-calculator.ts
│   │   │   ├── infra/
│   │   │   │   └── farming.repository.ts
│   │   │   ├── farming.constants.ts
│   │   │   └── farming.types.ts
│   │   │
│   │   ├── economy/                   # 💰 Finanças
│   │   │   ├── application/
│   │   │   │   ├── wallet.service.ts
│   │   │   │   ├── bank.service.ts
│   │   │   │   ├── tax.service.ts
│   │   │   │   └── market.service.ts
│   │   │   ├── domain/
│   │   │   │   ├── transaction-rules.ts
│   │   │   │   ├── tax-calculator.ts
│   │   │   │   └── interest-calculator.ts
│   │   │   ├── infra/
│   │   │   │   └── economy.repository.ts
│   │   │   ├── economy.constants.ts
│   │   │   └── economy.types.ts
│   │   │
│   │   ├── inventory/                 # 🎒 Inventário e Itens
│   │   │   ├── application/
│   │   │   │   ├── inventory.service.ts
│   │   │   │   └── item.service.ts
│   │   │   ├── domain/
│   │   │   │   ├── item-types.ts
│   │   │   │   ├── item-effects.ts
│   │   │   │   └── equipment-rules.ts
│   │   │   ├── infra/
│   │   │   │   └── inventory.repository.ts
│   │   │   ├── inventory.constants.ts # Definição de todos os itens
│   │   │   └── inventory.types.ts
│   │   │
│   │   ├── guild/                     # ⚜️ Guildas e Clãs
│   │   │   ├── application/
│   │   │   │   └── guild.service.ts
│   │   │   ├── domain/
│   │   │   │   ├── guild-ranks.ts
│   │   │   │   └── guild-rules.ts
│   │   │   ├── infra/
│   │   │   │   └── guild.repository.ts
│   │   │   ├── guild.constants.ts
│   │   │   └── guild.types.ts
│   │   │
│   │   └── map/                       # 🗺️ Mapa e Zonas
│   │       ├── application/
│   │       │   ├── map.service.ts
│   │       │   └── travel.service.ts
│   │       ├── domain/
│   │       │   ├── zones.ts
│   │       │   ├── travel-rules.ts
│   │       │   └── zone-events.ts
│   │       ├── infra/
│   │       │   └── map.repository.ts
│   │       ├── map.constants.ts       # Definição de todas as zonas
│   │       └── map.types.ts
│   │
│   ├── infra
│   │   └── database
│   │       ├── prisma.ts
│   │       └── schema.prisma          # Schema abaixo
│   │
│   ├── constants.ts
│   ├── env.ts
│   └── index.ts
```

---

## 🗄️ Schema Prisma Completo

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================
// 🧑 PERSONAGEM
// ============================================================

model Character {
  id          String   @id @default(cuid())
  discordId   String   @unique
  guildId     String
  name        String
  classId     String?
  level       Int      @default(1)
  exp         BigInt   @default(0)
  expToNext   BigInt   @default(100)

  // Atributos base
  strength    Int      @default(5)
  intelligence Int     @default(5)
  agility     Int      @default(5)
  charisma    Int      @default(5)
  endurance   Int      @default(5)
  luck        Int      @default(5)
  freePoints  Int      @default(0)

  // Status
  health      Int      @default(100)
  maxHealth   Int      @default(100)
  energy      Int      @default(100)
  maxEnergy   Int      @default(100)
  hunger      Int      @default(100) // 0 = faminto, 100 = cheio
  happiness   Int      @default(100)

  // Localização
  currentZoneId String  @default("city_center")
  isOnline    Boolean   @default(false)
  lastActive  DateTime  @default(now())

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  class       Class?          @relation(fields: [classId], references: [id])
  wallet      Wallet?
  inventory   InventoryItem[]
  skills      CharacterSkill[]
  family      FamilyMember?
  properties  Property[]
  farm        Farm?
  guildMember GuildMember?
  zone        Zone            @relation(fields: [currentZoneId], references: [id])

  @@index([discordId, guildId])
}

// ============================================================
// ⚔️ CLASSES
// ============================================================

model Class {
  id          String  @id
  name        String
  description String
  emoji       String

  // Bônus de atributos ao subir de nível
  strBonus    Float   @default(0)
  intBonus    Float   @default(0)
  agiBonus    Float   @default(0)
  chaBonus    Float   @default(0)
  endBonus    Float   @default(0)
  luckBonus   Float   @default(0)

  // Bônus especiais
  expMultiplier     Float @default(1.0)
  moneyMultiplier   Float @default(1.0)
  farmYieldBonus    Float @default(0)
  craftSuccessBonus Float @default(0)

  characters  Character[]
  classSkills ClassSkill[]
}

// ============================================================
// 🔮 HABILIDADES
// ============================================================

model Skill {
  id          String  @id
  name        String
  description String
  emoji       String
  category    String  // combat, crafting, social, farming, etc.
  maxLevel    Int     @default(5)
  expCost     Int
  requiredLevel Int
  requiredSkillId String?

  requiredSkill   Skill?         @relation("SkillTree", fields: [requiredSkillId], references: [id])
  nextSkills      Skill[]        @relation("SkillTree")
  characters      CharacterSkill[]
  classSkills     ClassSkill[]
}

model CharacterSkill {
  characterId String
  skillId     String
  level       Int    @default(1)
  experience  Int    @default(0)

  character   Character @relation(fields: [characterId], references: [id])
  skill       Skill     @relation(fields: [skillId], references: [id])

  @@id([characterId, skillId])
}

model ClassSkill {
  classId   String
  skillId   String
  isStarting Boolean @default(false)

  class     Class @relation(fields: [classId], references: [id])
  skill     Skill @relation(fields: [skillId], references: [id])

  @@id([classId, skillId])
}

// ============================================================
// 👨‍👩‍👧‍👦 FAMÍLIA
// ============================================================

model Family {
  id          String   @id @default(cuid())
  name        String   // Sobrenome da família
  createdAt   DateTime @default(now())

  members     FamilyMember[]
  marriages   Marriage[]
}

model FamilyMember {
  id          String  @id @default(cuid())
  familyId    String
  characterId String  @unique
  role        FamilyRole   // patriarch, matriarch, child, grandparent, etc.
  parentId1   String? // pai
  parentId2   String? // mãe

  family      Family    @relation(fields: [familyId], references: [id])
  character   Character @relation(fields: [characterId], references: [id])
  parent1     FamilyMember? @relation("Children1", fields: [parentId1], references: [id])
  parent2     FamilyMember? @relation("Children2", fields: [parentId2], references: [id])
  childrenOf1 FamilyMember[] @relation("Children1")
  childrenOf2 FamilyMember[] @relation("Children2")
}

model Marriage {
  id          String        @id @default(cuid())
  familyId    String?
  partnerId1  String
  partnerId2  String
  status      MarriageStatus @default(PENDING) // PENDING | ACTIVE | DIVORCED
  marriedAt   DateTime?
  createdAt   DateTime      @default(now())

  family      Family? @relation(fields: [familyId], references: [id])
}

enum FamilyRole {
  PATRIARCH
  MATRIARCH
  CHILD
  GRANDPARENT
  UNCLE
  AUNT
  COUSIN
  ADOPTED
}

enum MarriageStatus {
  PENDING
  ACTIVE
  DIVORCED
}

// ============================================================
// 🏠 CASAS E TERRENOS
// ============================================================

model Property {
  id          String       @id @default(cuid())
  ownerId     String
  zoneId      String
  type        PropertyType
  name        String
  level       Int          @default(1)
  rooms       Int          @default(1)
  condition   Int          @default(100) // 0-100, precisa de manutenção
  value       BigInt
  isForSale   Boolean      @default(false)
  salePrice   BigInt?
  purchasedAt DateTime     @default(now())
  taxDueAt    DateTime

  owner       Character    @relation(fields: [ownerId], references: [id])
  zone        Zone         @relation(fields: [zoneId], references: [id])
  farm        Farm?
}

enum PropertyType {
  LAND           // Terreno vazio
  SMALL_HOUSE    // Casinha
  HOUSE          // Casa normal
  MANSION        // Mansão
  APARTMENT      // Apartamento
  FARM_LAND      // Terreno de fazenda
  COMMERCIAL     // Imóvel comercial
}

// ============================================================
// 🌾 FAZENDA
// ============================================================

model Farm {
  id          String   @id @default(cuid())
  propertyId  String   @unique
  ownerId     String   @unique
  totalPlots  Int      @default(4)
  waterLevel  Int      @default(50)  // 0-100

  property    Property  @relation(fields: [propertyId], references: [id])
  owner       Character @relation(fields: [ownerId], references: [id])
  plots       FarmPlot[]
}

model FarmPlot {
  id          String      @id @default(cuid())
  farmId      String
  cropId      String?
  plantedAt   DateTime?
  readyAt     DateTime?
  wateredAt   DateTime?
  isWilted    Boolean     @default(false)
  plotIndex   Int         // posição do canteiro (0-N)

  farm        Farm        @relation(fields: [farmId], references: [id])
  crop        Crop?       @relation(fields: [cropId], references: [id])
}

model Crop {
  id            String @id
  name          String
  emoji         String
  description   String
  growTimeHours Int
  waterNeeded   Int    // horas entre regas
  baseYield     Int    // quantidade colhida
  sellPrice     Int
  expReward     Int
  requiredLevel Int    @default(1)

  plots         FarmPlot[]
  items         Item[]  @relation("CropItem") // item gerado na colheita
}

// ============================================================
// 💰 ECONOMIA
// ============================================================

model Wallet {
  id          String   @id @default(cuid())
  characterId String   @unique
  cash        BigInt   @default(500)    // dinheiro em mãos
  bankBalance BigInt   @default(0)      // saldo no banco
  bankDebt    BigInt   @default(0)      // dívidas
  totalEarned BigInt   @default(0)      // total ganho na vida
  lastInterest DateTime @default(now())

  character   Character     @relation(fields: [characterId], references: [id])
  transactions Transaction[]
}

model Transaction {
  id          String          @id @default(cuid())
  walletId    String
  type        TransactionType
  amount      BigInt
  description String
  fromId      String?
  toId        String?
  createdAt   DateTime        @default(now())

  wallet      Wallet @relation(fields: [walletId], references: [id])
}

model MarketListing {
  id          String   @id @default(cuid())
  sellerId    String
  itemId      String
  quantity    Int
  price       BigInt
  listedAt    DateTime @default(now())
  soldAt      DateTime?

  item        Item   @relation(fields: [itemId], references: [id])
}

enum TransactionType {
  EARN         // Ganhou (mensagem, quest, trabalho)
  SPEND        // Gastou
  TRANSFER_IN  // Recebeu transferência
  TRANSFER_OUT // Enviou transferência
  BANK_DEPOSIT
  BANK_WITHDRAW
  TAX
  INTEREST
  MARKET_SELL
  MARKET_BUY
}

// ============================================================
// 🎒 INVENTÁRIO E ITENS
// ============================================================

model Item {
  id          String   @id
  name        String
  description String
  emoji       String
  type        ItemType
  rarity      ItemRarity @default(COMMON)
  stackable   Boolean    @default(true)
  maxStack    Int        @default(99)
  sellPrice   Int        @default(0)
  buyPrice    Int?

  // Efeitos de equipamento (armas/armaduras)
  strBonus    Int @default(0)
  intBonus    Int @default(0)
  agiBonus    Int @default(0)
  chaBonus    Int @default(0)
  endBonus    Int @default(0)

  // Efeitos de uso (consumíveis)
  healthRestore  Int @default(0)
  energyRestore  Int @default(0)
  hungerRestore  Int @default(0)
  happinessBonus Int @default(0)
  expBonus       Int @default(0)

  inventoryItems InventoryItem[]
  marketListings MarketListing[]
  cropItem       Crop?           @relation("CropItem")
}

model InventoryItem {
  id          String  @id @default(cuid())
  characterId String
  itemId      String
  quantity    Int     @default(1)
  equipped    Boolean @default(false)
  slot        String? // head, chest, legs, weapon, offhand, ring, etc.

  character   Character @relation(fields: [characterId], references: [id])
  item        Item      @relation(fields: [itemId], references: [id])

  @@index([characterId])
}

enum ItemType {
  WEAPON
  ARMOR
  CONSUMABLE
  MATERIAL
  SEED
  CROP_PRODUCT
  TOOL
  FURNITURE
  DOCUMENT
  ACCESSORY
}

enum ItemRarity {
  COMMON
  UNCOMMON
  RARE
  EPIC
  LEGENDARY
}

// ============================================================
// ⚜️ GUILDAS
// ============================================================

model Guild {
  id          String   @id @default(cuid())
  discordGuildId String
  name        String   @unique
  description String?
  emoji       String   @default("⚜️")
  level       Int      @default(1)
  exp         BigInt   @default(0)
  bankBalance BigInt   @default(0)
  maxMembers  Int      @default(20)
  isOpen      Boolean  @default(true) // aceita sem convite
  createdAt   DateTime @default(now())

  members     GuildMember[]
  zoneId      String?
  zone        Zone?   @relation(fields: [zoneId], references: [id])
}

model GuildMember {
  guildId     String
  characterId String
  rank        GuildRank @default(MEMBER)
  contribution BigInt   @default(0)
  joinedAt    DateTime  @default(now())

  guild       Guild     @relation(fields: [guildId], references: [id])
  character   Character @relation(fields: [characterId], references: [id])

  @@id([guildId, characterId])
}

enum GuildRank {
  LEADER
  OFFICER
  VETERAN
  MEMBER
  RECRUIT
}

// ============================================================
// 🗺️ MAPA E ZONAS
// ============================================================

model Zone {
  id          String   @id
  name        String
  description String
  emoji       String
  type        ZoneType
  dangerLevel Int      @default(0) // 0 = seguro, 10 = mortal
  minLevel    Int      @default(1)

  // Coordenadas para display do mapa
  posX        Int
  posY        Int

  // Conexões (zonas adjacentes)
  connectedTo String[]  // IDs das zonas conectadas
  travelCost  Int       @default(0) // custo em energia ou dinheiro

  characters  Character[]
  properties  Property[]
  guilds      Guild[]
  zoneEvents  ZoneEvent[]
}

model ZoneEvent {
  id          String    @id @default(cuid())
  zoneId      String
  type        String    // resource_spawn, enemy_raid, festival, etc.
  startsAt    DateTime
  endsAt      DateTime
  data        Json      // dados extras do evento

  zone        Zone      @relation(fields: [zoneId], references: [id])
}

enum ZoneType {
  CITY        // Cidade principal
  TOWN        // Vilarejo
  FARM_AREA   // Área rural/fazendas
  FOREST      // Floresta (recursos)
  MOUNTAIN    // Montanha (mineração)
  BEACH       // Praia
  MARKET      // Mercado/Shopping
  INDUSTRIAL  // Zona industrial
  SUBURB      // Subúrbio residencial
}
```

---

## 🔗 Como os Módulos se Conectam

```
                        ┌─────────────────────────────────────┐
                        │           CHARACTER (núcleo)         │
                        │  level · exp · attributes · status   │
                        └──────────────┬──────────────────────┘
                                       │
           ┌───────────────────────────┼───────────────────────────┐
           │                           │                           │
    ┌──────▼──────┐           ┌───────▼───────┐         ┌────────▼────────┐
    │    CLASS    │           │    ECONOMY    │         │     FAMILY      │
    │ bônus attrs │           │ wallet · bank │         │ casamento/filhos│
    │ skills base │           │ tax · market  │         │ herança         │
    └──────┬──────┘           └───────┬───────┘         └────────┬────────┘
           │                          │                           │
    ┌──────▼──────┐           ┌───────▼───────┐         ┌────────▼────────┐
    │   SKILLS    │           │   INVENTORY   │         │    HOUSING      │
    │ skill tree  │           │ items · equip │         │ casas · terrenos│
    └─────────────┘           └───────┬───────┘         └────────┬────────┘
                                      │                           │
                              ┌───────▼───────┐         ┌────────▼────────┐
                              │   FARMING     │         │      MAP        │
                              │ plantar/colher│         │ zonas · viagens │
                              │ crops · plots │         │ eventos         │
                              └───────────────┘         └─────────────────┘
                                      │
                              ┌───────▼───────┐
                              │     GUILD     │
                              │ clã · banco   │
                              └───────────────┘
```

---

## 📊 Fluxo de EXP (substitui o XP atual)

```
Mensagem enviada
       │
       ▼
[message-create.ts]
       │
       ├─ character.service.addExp(discordId, amount)
       │
       ▼
[leveling.service.ts]
       │
       ├─ Calcula exp necessário baseado na classe
       ├─ Aplica bônus de itens equipados
       ├─ Aplica bônus de skills ativas
       │
       ▼
   Level up?
       │
   ┌───┴───┐
  SIM     NÃO
   │       │
   ▼       └─ Salva e encerra
[Distribuir atributos]
[Notificar no Discord]
[Verificar quests]
```

---

## 🌾 Fluxo de Fazenda (Tempo Real)

```
/plantar [semente]
       │
       ▼
farming.service.ts
  ├─ Verifica se tem terreno (Farm)
  ├─ Verifica se tem plot vazio
  ├─ Verifica se tem a semente no inventário
  ├─ Remove semente do inventário
  ├─ Define readyAt = agora + crop.growTimeHours
  └─ Define wateredAt = agora

[Cronjob a cada 30min]
  ├─ Verifica plots com isWilted = false
  ├─ Se não regou nas últimas X horas → isWilted = true
  └─ Notifica o dono

/colher
  ├─ Verifica se readyAt <= agora
  ├─ Se isWilted → retorna item de baixa qualidade
  ├─ Calcula yield com bônus de Skills + Classe
  ├─ Adiciona itens ao inventário
  └─ Adiciona EXP de farming
```

---

## 👨‍👩‍👧‍👦 Fluxo de Família

```
/casar @usuario
  ├─ Envia proposta (botão Aceitar/Recusar)
  │
  └─ Aceito?
       ├─ Cria registro Marriage (ACTIVE)
       ├─ Cria Family (se não existir)
       ├─ Atualiza sobrenome (opcional)
       └─ Bônus de felicidade para ambos

/ter-filho
  ├─ Requer casamento ativo
  ├─ Requer que ambos confirme
  ├─ Cria Character com parentId1/parentId2
  ├─ Cria FamilyMember com role = CHILD
  └─ Herda % dos atributos dos pais (genética)

Herança:
  ├─ Se personagem "morrer" ou ficar inativo
  ├─ Bens distribuídos para filhos/cônjuge
  └─ Baseado em testament ou herança automática
```

---

## 🏠 Tipos de Casas e Progressão

| Tipo | Custo | Plots de Fazenda | Quartos | Requisito |
|------|-------|-----------------|---------|-----------|
| Terreno | 500 💰 | — | — | Nível 1 |
| Casinha | 2.000 💰 | 0 | 1 | Nível 5 |
| Casa | 8.000 💰 | 0 | 3 | Nível 10 |
| Terreno Rural | 3.000 💰 | 4 | — | Nível 8 |
| Fazenda | 15.000 💰 | 12 | 2 | Nível 15 |
| Mansão | 100.000 💰 | 0 | 10 | Nível 30 |

---

## ⚔️ Classes Sugeridas

| Classe | Foco | Bônus Principal |
|--------|------|----------------|
| 🌾 Fazendeiro | Farming | +50% yield, plantas crescem mais rápido |
| 💼 Empresário | Economia | +20% ganhos, juros melhores no banco |
| 🔨 Construtor | Housing | -30% custo de construção, mais quartos |
| 🌿 Herbalista | Farming/Itens | Plantas raras, poções mais potentes |
| 🎭 Diplomata | Social/Família | Casamento mais fácil, mais membros na guilda |
| ⚒️ Minerador | Recursos | Mais materiais ao explorar montanhas |
| 🏹 Aventureiro | Mapa/Exploração | Viagem mais barata, eventos especiais |
| 📚 Sábio | Geral | +15% EXP em tudo |

---

## 🚀 Ordem de Implementação Sugerida

**Fase 1 — Base (substitui o XP atual)**
1. `character` module — personagem, level, EXP
2. `economy` module — wallet, transações básicas
3. `class` module — classes e bônus

**Fase 2 — Mundo**
4. `map` module — zonas e viagem
5. `housing` module — terrenos e casas
6. `farming` module — plantações

**Fase 3 — Social**
7. `family` module — família, casamento, filhos
8. `guild` module — guildas e clãs
9. `inventory` module — itens e equipamentos

**Fase 4 — Profundidade**
10. `skills` module — árvore de habilidades
11. Market, banco completo, impostos, eventos de zonas

---

*Cada módulo é independente e se comunica via services injetados, mantendo o padrão DDD já existente no projeto.*