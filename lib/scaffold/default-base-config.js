'use strict';

var path = require('path');

/**
 * Will return the path and default topcore-node configuration on environment variables
 * or default locations.
 * @param {Object} options
 * @param {String} options.network - "testnet" or "livenet"
 * @param {String} options.datadir - Absolute path to bitcoin database directory
 */
function getDefaultBaseConfig(options) {
  if (!options) {
    options = {};
  }
  return {
    path: process.cwd(),
    config: {
      network: options.network || 'livenet',
      port: 3001,
      services: ['topd', 'web'],
      servicesConfig: {
        topd: {
          spawn: {
            datadir: options.datadir || path.resolve(process.env.HOME, '.top'),
            exec: path.resolve(__dirname, '../../bin/topd')
          }
        }
      }
    }
  };
}

module.exports = getDefaultBaseConfig;
