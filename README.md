# OlimpoMC Staff Bot — Warns & Strikes

Bot de Discord para gestionar advertencias (warns) y strikes del staff de OlimpoMC.

## Reglas del sistema

- **3 warns activos = 1 strike automático** (los 3 warns se consumen).
- **3 strikes activos = democión automática** de un rango (los 3 strikes se resetean).
- Los warns/strikes solo se pueden aplicar a rangos **de Admin para abajo** (Admin, Jr Admin, Head Mod, Sr Mod, Mod, Trial Mod, Helper, Trial Helper, Chat Mod). No aplican a Sr Admin, Head Admin, Coordinador, Manager, Co-Owner ni Owner.
- Cuando alguien ya está en el rango sancionable más bajo (Chat Mod) y llega a 3 strikes, el bot lo avisa en el log pero no lo puede bajar más — hay que decidirlo manualmente.

## Comandos

| Comando | Descripción |
|---|---|
| `/warn @staff razon` | Aplica un warn |
| `/strike @staff razon` | Aplica un strike directo |
| `/removewarn @staff` | Quita el warn activo más reciente |
| `/removestrike @staff` | Quita el strike activo más reciente |
| `/history @staff` | Muestra el historial completo (warns y strikes, activos e inactivos) |

Todas las respuestas son privadas (solo las ve quien ejecuta el comando); el registro público va al canal de logs configurado.

## 1. Configurar el bot en Discord

1. Andá a https://discord.com/developers/applications → **New Application**.
2. En **Bot**, creá el bot y copiá el **Token** (botón "Reset Token").
3. En **Bot > Privileged Gateway Intents**, activá **Server Members Intent** (lo necesita el bot para leer los roles de los miembros).
4. En **OAuth2 > URL Generator**, marcá el scope `bot` y `applications.commands`, y los permisos `Manage Roles` + `Send Messages`. Copiá la URL generada y usala para invitar el bot a tu servidor.
5. **Importante:** en el servidor, el rol del bot debe estar **por encima** de todos los rangos de staff que va a poder mover, si no, no va a poder quitar/agregar roles.

## 2. Configurar `config.json`

Reemplazá cada `roleId` en `config.json` por el ID real del rol de Discord (activá el Modo Desarrollador en Discord: Configuración > Avanzado, y luego clic derecho sobre el rol en Configuración del servidor > Roles > copiar ID).

También poné el `logChannelId` (el canal donde se publicarán los warns, strikes y demociones).

## 3. Variables de entorno

Copiá `.env.example` a `.env` y completá:

```
TOKEN=el_token_del_bot
CLIENT_ID=el_client_id_de_la_aplicacion
GUILD_ID=el_id_de_tu_servidor
```

**Nunca subas el `.env` a GitHub** (ya está en `.gitignore`).

## 4. Instalar y correr localmente

```bash
npm install
npm run deploy   # registra los slash commands en tu servidor
npm start        # inicia el bot
```

## 5. Desplegar en Railway (igual que el bot de tickets)

1. Subí este proyecto a un repo de GitHub (sin el `.env`, sin `node_modules`).
2. En Railway: **New Project > Deploy from GitHub repo**, elegí el repo.
3. En **Variables**, agregá `TOKEN`, `CLIENT_ID` y `GUILD_ID` (los mismos valores del `.env`).
4. Railway va a instalar dependencias y correr `npm start` automáticamente.
5. Corré `npm run deploy` **una sola vez** (localmente o con una Run/Shell en Railway) para registrar los comandos — no hace falta repetirlo salvo que agregues o cambies comandos.

## Base de datos

Usa SQLite local (`staffdb.sqlite`, se crea solo). Si Railway reinicia el contenedor sin volumen persistente, el archivo se pierde — para producción real, considerá agregar un **Volume** en Railway apuntando a la carpeta del proyecto para no perder el historial.
