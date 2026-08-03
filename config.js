require('dotenv').config();
const raw = require('./config.json');

// El token NUNCA va en config.json (para no subirlo a GitHub por error).
// Se toma de la variable de entorno TOKEN (archivo .env local o "Variables" en Railway).
const config = {
  ...raw,
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID || raw.clientId,
  guildId: process.env.GUILD_ID || raw.guildId,
};

if (!config.token) {
  console.error('❌ Falta la variable de entorno TOKEN (ponla en .env o en Railway > Variables).');
  process.exit(1);
}

module.exports = config;
