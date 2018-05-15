# Crypto Explorer - 2.0.0

An open source block exploer written in Node. A fork from [Iquidus Explorer](https://github.com/iquidus/explorer) (ver 1.6.1).


## See it in action

**NOTE:** If you would like your instance mentioned here contact me, or make a pull request changing this README file.

## Requirements

*  node.js >= 0.10.28
*  mongodb 2.6.x
*  A coin daemon

**NOTE:** The aim of this fork is to improve upon the old version. I aim to be fully compatible with latest technologies at some point in the future. Future proofing this great project!

## Getting Started

Follow these simple steps to get your explorer up and running in no time.

### Create MongoDB database

1. Enter MongoDB cli:
```
$ mongo
```
2. Create databse:
```
> use explorerdb
```

3. Create user with read/write access:
```
> db.createUser( { user: "cajogos", pwd: "3xp!0reR", roles: [ "readWrite" ] } )
```

### Get the source from GitHub
```
git clone https://github.com/cajogos/crypto-explorer explorer
```

### Install node modules
```
cd explorer && npm install --production
```

### Create your settings.json file
```
cp ./settings.json.template ./settings.json
```
*Make required changes in settings.json*. See [SETTINGS](SETTINGS.md) for more information.

### Start Explorer
```
npm start
```

**NOTE:** `mongod` must be running in order to start the explorer.

**NOTE:** The explorer defaults to cluster mode, forking an instance of its process to each CPU core. This results in increased performance and stability. Load balancing gets automatically taken care of and any instances, that for some reason die, will be restarted automatically.

For testing/development (or if you just wish to) a single instance can be launched with:
```
node --stack-size=10000 bin/instance
```

To stop the cluster you can use:
```
npm stop
```

### Syncing databases with the blockchain

`sync.js` (located in scripts/) is used for updating the local databases.

This script must be called from the explorers root directory.

```
Usage: node scripts/sync.js [database] [mode]

database: (required)
    index [mode]    - Main index: coin info/stats, transactions & addresses.
    market          - Market data: summaries, orderbooks, trade history & chartdata.

mode: (required for index database only)
    update          - Updates index from last sync to current block.
    check           - Checks index for (and adds) any missing transactions/addresses
    reindex         - Clears index then resyncs from genesis to current block.
```
- `current block` is the latest created block when script is executed.
- The market database only supports (& defaults to) reindex mode.
- If check mode finds missing data (ignoring new data since last sync), `index_timeout` in settings.json is set too low.

**NOTE:** It is recommended to have this script launched via a cronjob at 1+ min intervals. The example below is for a crontab that updates data in different minute interval. See https://crontab.guru for a better explanation.
```
*/1 * * * * cd /path/to/explorer && /usr/bin/nodejs scripts/sync.js index update > /dev/null 2>&1
*/2 * * * * cd /path/to/explorer && /usr/bin/nodejs scripts/sync.js market > /dev/null 2>&1
*/5 * * * * cd /path/to/explorer && /usr/bin/nodejs scripts/peers.js > /dev/null 2>&1
```

### Starting coin daemon

This Cryptocurrency Explorer is intended to be generic so it can be used with any wallet following the usual standards. The wallet must be running with atleast the following flags:

```
-daemon -txindex
```

## Known Issues

**script is already running**
- If you receive this message when launching the sync script either:
  - The sync is currently in progress.
  - A previous sync was killed before it completed.
- If you are certian a sync is not in progress remove the `index.pid` from the `tmp/` folder in the explorer root directory using:
```
rm tmp/index.pid
```

**Exceeding Stack Size**
```
RangeError: Maximum call stack size exceeded
```
- Nodes default stack size may be too small to index addresses with many transactions.
- If you experience the above error while running `sync.js` the stack size needs to be increased.

To determine the default setting run:
```
node --v8-options | grep -B0 -A1 stack_size
```
To run sync.js with a larger stack size launch with:
```
node --stack-size=[SIZE] scripts/sync.js index update
```

Where `[SIZE]` is an integer higher than the default. `SIZE` will depend on which blockchain you are using, you may need to play around a bit to find an optimal setting.

## License

Please refer to [LICENSE](LICENSE) for the license information.