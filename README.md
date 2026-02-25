# Z-Core

A Discord bot that turns your server into a real-life RPG. Members create characters, choose classes, build families, buy properties, farm crops, manage finances, and form guilds — all through slash commands.

---

## Features

**Character System**
Every member has a persistent character with level, EXP, and six core attributes: Strength, Intelligence, Agility, Charisma, Endurance, and Luck. Characters gain EXP by participating in server conversations and level up over time, earning attribute points to distribute freely.

**Classes**
Eight distinct classes shape how a character plays. The Farmer yields more from crops. The Businessman earns more from every transaction. The Builder constructs properties at lower cost. The Sage gains 15% more EXP from everything. Each class provides unique multipliers and passive bonuses that compound over time.

**Economy**
A fully simulated economy with cash, a bank system, daily interest on deposits, player-to-player transfers, and a transaction history. Members earn coins by being active, claim daily rewards, and can accumulate wealth across multiple channels.

**Family**
Players can propose marriage, start families, and have children whose attributes are genetically influenced by both parents. Family trees are tracked across generations, with inheritance rules that distribute property and wealth when characters become inactive.

**Housing**
Members purchase land and construct properties ranging from small houses to mansions. Each property has a condition rating that degrades over time and requires maintenance. Properties can be listed for sale on the open market between players.

**Farming**
Characters with land can plant, water, and harvest crops in real time. Each crop has a growth timer, water requirements, and a yield that scales with the Farmer class bonus and relevant skills. Neglected crops wilt and produce lower-quality harvests.

**Guilds**
Players form guilds with shared banks, member ranks, and contribution tracking. Guild level increases with collective activity, unlocking higher member caps and exclusive benefits.

**Skills**
A skill tree system where characters unlock and level up abilities across categories including crafting, farming, social, and exploration. Skills provide passive bonuses that stack with class multipliers.

**Map and Zones**
The world is divided into zones — cities, towns, forests, mountains, and more. Characters travel between zones to access different resources, events, and activities. Each zone has a danger level and minimum character level requirement.

---

## Commands

| Command | Description |
|---|---|
| `/criar-personagem` | Create your character |
| `/perfil` | View your character profile |
| `/atributos` | Distribute attribute points |
| `/classes` | Browse available classes |
| `/escolher-classe` | Choose your class (up to level 5) |
| `/saldo` | Check your wallet and bank balance |
| `/depositar` | Deposit coins into the bank |
| `/sacar` | Withdraw coins from the bank |
| `/pagar` | Transfer coins to another player |
| `/daily` | Claim your daily coin reward |

---

## Tech Stack

- **Runtime:** Node.js 22 with TypeScript
- **Framework:** discord.js 14 + @constatic/base
- **Database:** PostgreSQL via Prisma 7
- **Architecture:** Domain-Driven Design with separated modules for each game system

---

## Getting Started

**Prerequisites:** Node.js 22+, PostgreSQL database

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Fill in DATABASE_URL and DISCORD_TOKEN

# Run database migrations
npx prisma migrate deploy

# Seed initial data
npm run seed

# Start the bot
npm run dev
```

---

## Project Structure

The codebase is organized by domain. Each game system lives in its own module under `src/modules/` with separated application services, domain logic, and infrastructure. Discord commands in `src/discord/commands/` are thin controllers that delegate to the appropriate service.

---

## License

MIT