# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop topcore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/topcore-node.git
git clone git@github.com:<yourusername>/top-lib.git
```

To develop top or to compile from source:

```bash
git clone git@github.com:<yourusername>/top.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See top documentation for building top on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download top distribution, you'll need to compile topd from source, and setup your configuration to use that version.


We now will setup symlinks in `topcore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf top-lib
ln -s ~/top-lib
rm -rf topd-rpc
ln -s ~/topd-rpc
```

And if you're compiling or developing top:
```bash
cd ../bin
ln -sf ~/top/src/topd
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd topcore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/topd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/topd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch topcore-node.json
touch package.json
```

Edit `topcore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "topd",
    "web",
    "top-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "topd": {
      "spawn": {
        "datadir": "/home/<youruser>/.top",
        "exec": "/home/<youruser>/top/src/topd"
      }
    }
  }
}
```

**Note**: To install services [top-api](https://github.com/TOP/top-api) and [top-explorer](https://github.com/TOP/top-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/top-lib
ln -s ~/topcore-node
ln -s ~/top-api
ln -s ~/top-explorer
```

Make sure that the `<datadir>/top.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=18332
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../topcore-node/bin/topcore-node start
```