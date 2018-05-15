# Settings File

Your explorer requires a settings file in order for itself to work. The codebase comes with a `settings.json.template` file already (which does allow for comments). I have stripped out the comments from the JSON file and placed the provided settings options in here for clearer and cleaner file structure.

You MUST copy the `settings.json.template` to `settings.json` and EDIT the `settings.json` file with the correct values.

## Options

Here is a list of all available options and their values.

### Main / Front-end Options

- `title` - The name of your explorer.
  - **Example:** `"CAJOGOS"`
- `address` - The full address of your explorer.
  - **Example:** `"127.0.0.1:3001`
- `logo` - The location of the logo to display for the coin you are using.
  - **Example:** `"/images/logo.png"`
- `favicon` - The location of your favicon.
  - **Example:** `"public/favicon/ico"`


### Coin Options

- `coin` - The name of the coin you are using.
  - **Example:** `"PlusOneCoin"`
- `symbol` - The symbol of the coin you are using.
  - **Example:** `"PLUS1"`