# Settings File

Your explorer requires a `settings.json` file in order for itself to work.

The codebase comes with a `settings.json.template` file already (which does allow for comments). I have provided settings options in here for a cleaner overview and explanation.

You MUST copy the `settings.json.template` to `settings.json` and EDIT the `settings.json` file with the correct values.

## Available Settings

Here is a list of all available settings, broken down by categories and examples of the options you may use.

### Main / Front-end Settings

- `title` - The name of your explorer.
  - **Example:** `"CAJOGOS"`
- `logo` - The location of the logo to display for the coin you are using.
  - **Example:** `"/images/logo.png"`
- `favicon` - The location of your favicon.
  - **Example:** `"public/favicon/ico"`
- `theme` - The theme to be used for the front-end site. It uses Bootswatch Themes (https://bootswatch.com).
  - **Valid Options:** Cerulean, Cosmo, Cyborg, Darkly, Flatly, Journal, Lumen, Paper, Readable, Sandstone, Simplex, Slate, Spacelab, Superhero, United, Yeti. (See `/public/themes` for all the available themes.
  - **Example:** `"Lumen"`

### Connection Settings

- `address` - The full address of your explorer.
  - **Example:** `"127.0.0.1:3001"`
- `port` - The port to listen requests on.
  - **Example:** `3001`

### Database (MongoDB) Settings

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

### Coin Settings

- `coin` - The name of the coin you are using.
  - **Example:** `"PlusOneCoin"`
- `symbol` - The symbol of the coin you are using.
  - **Example:** `"PLUS1"`
