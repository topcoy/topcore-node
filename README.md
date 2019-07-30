TOPCORE Node
============

A TOP full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services.

## Install

```bash
npm install -g topcore-node
topcore-node start
```

## Configuration

TOPCORE includes a Command Line Interface (CLI) for managing, configuring and interfacing with your TOPCORE Node.

```bash
topcore-node create -d <data-dir> mynode
cd mynode
topcore-node install <service>
topcore-node install https://github.com/yourname/helloworld
```

This will create a directory with configuration files for your node and install the necessary dependencies. For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of TOPCORE:

- [TOP Insight API](https://github.com/TOP/top-api)
- [TOP Explorer](https://github.com/TOP/top-explorer)

## Contributing



## License
