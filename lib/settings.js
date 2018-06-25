var fs = require('fs');
var jsonminify = require('jsonminify');


// Main / Front-end Settings
exports.title = 'Crypto Explorer';
exports.logo = '/images/logo.png';
exports.favicon = 'favicon.ico';
exports.theme = 'Yeti';
exports.locale = 'locale/en.json';
exports.copyright = {
  'name': 'PlusOneCoin',
  'website': 'https://plusonecoin.org'
};

// Connection Settings
exports.port = process.env.PORT || 3001;
exports.address = '127.0.0.1:3001';

// Database (MongoDB) Settings
exports.dbsettings = {
  'user': 'cajogos',
  'password': '3xp!0reR',
  'database': 'explorerdb',
  'address': 'localhost',
  'port': 27017
};

// Coin / Blockchain Settings
exports.coin = 'PlusOneCoin';
exports.symbol = 'PLUS1';
exports.confirmations = 40;
exports.genesis_block = 'b2926a56ca64e0cd2430347e383f63ad7092f406088b9b86d6d68c2a34baef51';
exports.genesis_tx = '65f705d2f385dc85763a317b3ec000063003d6b039546af5d8195a5ec27ae410';

// Wallet Settings
exports.wallet = {
  'host': 'localhost',
  'port': 22777,
  'user': 'carlos',
  'pass': 'carlos1234'
};

// Update Script Settings
exports.update_timeout = 10;
exports.check_timeout = 250;

// Menu Settings
exports.display = {
  'api': true,
  'market': true,
  'twitter': true,
  'discord': true,
  'facebook': false,
  'googleplus': false,
  'search': true,
  'richlist': true,
  'movement': true,
  'network': true
};

// Social Media Settings
exports.twitter = 'Carlos_Tweets';
exports.discord = 'https://discord.gg/mZEYGty';
exports.facebook = 'YourFacebookPage';
exports.googleplus = 'YourGooglePlus';

// Index Page Settings
exports.index = {
  'show_hashrate': true,
  'difficulty': 'POW',
  'last_txs': 100
};

// API Integrity Settings
exports.api = {
  'blockindex': 51,
  'blockhash': '00004e3ce1727d38c131aa1d46fb7e1d572c64c2791f4ddeb3cd687c78df123a',
  'txhash': '0e8d470a7e81f2ee36e0c40b8bf5603cc21536fb548eba39fc840b8139a7826d',
  'address': 'PMVWMPqGRaJmJDNmcbNXKukQBW8C56yUqx',
};

// Market Settings
exports.markets = {
  'coin': 'PLUS1',
  'exchange': 'BTC',
  'enabled': ['bittrex'],
  'cryptopia_id': '1658',
  'ccex_key': 'Get-Your-Own-Key',
  'default': 'bittrex'
};

// Richlist / Top 100 Settings
exports.richlist = {
  'distribution': true,
  'received': true,
  'balance': true
};

// Movement Page Settings
exports.movement = {
  'min_amount': 100,
  'low_flag': 1000,
  'high_flag': 5000
},

// Address Labels Settings
exports.labels = {};

// Additional Settings
exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = true;
exports.supply = 'COINBASE';
exports.nethash = 'getnetworkhashps';
exports.nethash_units = 'G';

exports.reloadSettings = function reloadSettings()
{
  var settingsFilename = 'settings.json';
  settingsFilename = './' + settingsFilename;

  var settingsStr;
  try
  {
    settingsStr = fs.readFileSync(settingsFilename).toString();
  }
  catch (e)
  {
    console.warn('No settings file found. Continuing using defaults!');
  }

  var settings;
  try
  {
    if (settingsStr)
    {
      settingsStr = jsonminify(settingsStr).replace(',]', ']').replace(',}', '}');
      settings = JSON.parse(settingsStr);
    }
  }
  catch (e)
  {
    console.error('There was an error processing your settings.json file: ' + e.message);
    process.exit(1);
  }

  for (var key in settings)
  {
    if (settings.hasOwnProperty(key))
    {
      if (key.charAt(0).search('[a-z]') !== 0)
      {
        console.warn('Settings should start with a low character: >>' + key + '<<');
      }
      if (typeof exports[key] !== 'undefined')
      {
        exports[key] = settings[key];
      }
      else
      {
        console.warn('Unknown Setting: >>' + key + '<< This setting does not exist or has been removed');
      }
    }
  }
};

exports.reloadSettings();