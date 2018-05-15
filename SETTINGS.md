# Settings File

Your explorer requires a `settings.json` file in order for itself to work.

The codebase comes with a `settings.json.template` file already (which does allow for comments). I have provided settings options in here for a cleaner overview and explanation.

You MUST copy the `settings.json.template` to `settings.json` and EDIT the `settings.json` file with the correct values.

_Settings marked with **TBD** mean that the value is not yet clear, further research into the code is required. Apologies for the inconvenience._

## Available Settings:

Here is a list of all available settings, broken down by categories and examples of the options you may use.

### Main / Front-end Settings:

- `title` - The name of your explorer.
  - **Example:** `"CAJOGOS"`
- `logo` - The location of the logo to display for the coin you are using.
  - **Example:** `"/images/logo.png"`
- `favicon` - The location of your favicon.
  - **Example:** `"public/favicon/ico"`
- `theme` - The theme to be used for the front-end site. It uses Bootswatch Themes (https://bootswatch.com).
  - **Valid Options:** Cerulean, Cosmo, Cyborg, Darkly, Flatly, Journal, Lumen, Paper, Readable, Sandstone, Simplex, Slate, Spacelab, Superhero, United, Yeti. (See `/public/themes` for all the available themes.
  - **Example:** `"Lumen"`
- `locale` - The language the explorer is in. Language files can be found in `/locale`
  - **Example:** `"locale/en.json"`

### Connection Settings:

- `address` - The full address of your explorer.
  - **Example:** `"127.0.0.1:3001"`
- `port` - The port to listen requests on.
  - **Example:** `3001`

### Database (MongoDB) Settings:

The system uses MongoDB as its storage technology. You must specify the settings for your database in the `dbsettings` object.

```json
"dbsettings": {
    "user": "cajogos",
    "password": "3xp!0reR",
    "database": "explorerdb",
    "address": "localhost",
    "port": 27017
}
```

### Coin / Blockchain Settings:

- `coin` - The name of the coin you are using.
  - **Example:** `"PlusOneCoin"`
- `symbol` - The symbol of the coin you are using.
  - **Example:** `"PLUS1"`
- `confirmations` - The number of confirmations required for the coin.
  - **Example:** `40`
- `genesis_block` - The Genesis block hash. You can obtain this value by running `getblockhash 0` using your coin daemon.
  - **Example:** `"00001ef7e03e773817a36c267d6f431412a3678dec49b4171f86ce419abcddea"`
- `genesis_tx` - The Genesis transaction hash. You can obtain this value from the first value of `tx` when running `getblock <BLOCK_HASH>` (where `<BLOCK_HASH>` is the same value as `genesis_block`) using your coin daemon.
  - **Example:** `"5a5fbc104e0a21be0a745d014a87340408ef288cc4ca6ab21fa0d7565e4f6a76"`

### Wallet Settings (coin daemon)

The system will also need to connect to a coin daemon for your given coin. These values MUST match your `.conf` file. Remember to run your wallet with the `-daemon` and `-txindex` flags.

```json
"wallet": {
    "host": "localhost",
    "port": 27777,
    "user": "plusonecoinrpc",
    "pass": "superDifficultPassword1234"
}
```

### Update Script Settings:

- `update_timeout` - TBD
  - **Example:** `10`
- `check_timeout` - TBD
  - **Example:** `250`


### Menu Settings:

The `display` object is used to determine what pages and features your explorer will display to visitors. Simply switch these ON (`true`) or OFF (`false`) based on your preferences.

```json
"display": {
    "api": true,
    "search": true,
    "markets": true,
    "richlist": true,
    "movement": true,
    "network": true,
    "twitter": true,
    "facebook": false,
    "googleplus": false
}
```

### Social Media Settings:

- `twitter` - The Twitter username for your coin and/or explorer.
  - **Example:** `"Carlos_Tweets"`
- `facebook` - The Facebook username for your coin and/or explorer.
  - **Example:** `"YourFacebookPage"`
- `googleplus` - The Google Plus user for your coin and/or explorer.
  - **Example:** `"YourGooglePlus"`

### Index Page Settings:

The `index` object is used to display the values of your explorer's index page.

The valid options for `difficulty` as `POW`, `POS` or `Hybrid`.

```json
"index": {
    "show_hashrate": true,
    "difficulty": "POW",
    "last_txs": 100
}
```

### API Integrity Settings

The `api` object is used to store values of the current blockchain which allow for an integrity check on the data. Change these as needed for your coin.

```json
"api": {
    "blockindex": 51,
    "blockhash": "00004e3ce1727d38c131aa1d46fb7e1d572c64c2791f4ddeb3cd687c78df123a",
    "txhash": "0e8d470a7e81f2ee36e0c40b8bf5603cc21536fb548eba39fc840b8139a7826d",
    "address": "PMVWMPqGRaJmJDNmcbNXKukQBW8C56yUqx"
}
```
- **How do I get these values?**
  1. Choose a block height (e.g. 51) and use it in `blockindex`.
  2. To obtain the `blockhash` value you need to run `getblockhash <HEIGHT>`.
  3. To obtain the `txhash` value you need to run `getblock "<BLOCK_HASH>"` which will then provide you with an array of `tx` values, use the first one.
  4. To obtain th `address` value you need to run `gettxout "<TX_HASH>" 0` which will then give you an array of `addresses` values, use the first one.


### Market Settings:

The system currently supports the following markets (exchanges): **bittrex**, **poloniex**, **yobit**, **empoex**, **bleutrade**, **cryptopia** and **ccex**. With more to come.

The `markets` object is used to provide the valid options.

Default market is loaded by default and determines the last price shown in the header.

```json
"markets": {
    "coin": "PLUS1",
    "exchange": "BTC",
    "enabled": ["bittrex"],
    "cryptopia_id": "123456789",
    "ccex_key" : "Get-Your-Own-Key",
    "default": "bittrex"
}
```

_Make sure to enable Markets in the Menu Settings._

### Richlist/Top 100 Settings

These are the settings for the Richlist page, where the addresses with most received coins are displayed. The `richlist` object is used to store these settings.

```json
"richlist": {
    "distribution": true,
    "received": true,
    "balance": true
}
```

### Address Labels Settings:

The system allows you to mask wallet addresses with a **label** (required), **type** (optional) and a **url** (optional). You use the `labels` object to accomplish this.

```json
"labels": {
    "PXEdHbB34JQs4vYa15tjKN3Q4VQB4gB8TL": {
        "label": "Send PLUS1 to this donation address",
        "type": "primary",
        "url": "https://carlos.fyi"
    }
}
```

- **label** - The text to display.
- **type** - The class given to the label (Bootstrap inherited). Valid options are `default`, `primary`, `warning`, `danger` and `success`.
- **url** - URL to link to for more information on the address given.