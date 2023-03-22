const { defineConfig } = require('cypress')
const getCompareSnapshotsPlugin = require("cypress-visual-regression/dist/plugin");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const excel = require("./cypress/support/excel-helper");
const imaps = require("imap-simple");

module.exports = defineConfig({
  screenshotsFolder: './cypress/snapshots',
  trashAssetsBeforeRuns: true,
  defaultCommandTimeout: 100000,
  requestTimeout: 100000,
  taskTimeout: 150000,
  responseTimeout: 100000,
  pageLoadTimeout: 100000,
  video: true,
  viewportHeight: 900,
  viewportWidth: 1000,
  watchForFileChanges: false,
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,


  env: {
    allureResultsPath: 'report/allure-results',
    allure: true,
    failSilently: false,
    failOnSnapshotDiff: true,
    cypressRunnerLocal: true,
  //skipError: true
  },
  retries: 0,
  projectId: 'dij6ho',
  /*e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },*/

    e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');
      getCompareSnapshotsPlugin(on, config);

      const allureWriter = require('@shelex/cypress-allure-plugin/writer');
      allureWriter(on, config);

      const imaps = require('imap-simple');
      const fs = require('fs');
      var path = require('path');
      const _ = require('lodash');

      const data = {}
      on('task', {
        saveData(x) {
          console.log('accountNo', x)
          data['accountNo'] = x
          return null
        },

        loadData() {
          console.log('returning accountNo', data.accountNo)
          return data['accountNo'] || null
        },

        generate_excel_file(args) {

          let filename = args.filename;
          let dataObject = args.dataObject;

          let excel = require('../testing-plugin-error/cypress/support/excel-helper');
          return new Promise((resolve, reject) => {
            excel.generate_file(filename, dataObject);
            return resolve(true)
          });
        },

        log(message) {
          console.log(message);
          return null
        },

        fetchGmailUnseenMails({username, password, markSeen}) {
          var config = {
            imap: {
              user: username,
              password: password,
              host: 'imap.gmail.com',
              port: 993,
              tls: true,
              authTimeout: 5000,
              rejectUnauthorized: false
            }
          };

          return imaps.connect(config).then(function (connection) {

            return connection.openBox('INBOX').then(function () {
              var searchCriteria = [
                'UNSEEN'
              ];

              var fetchOptions = {
                bodies: ['HEADER', 'TEXT'],
                markSeen: markSeen
              };

              return connection.search(searchCriteria, fetchOptions).then(function (results) {
                var mails = [];
                if (results) {
                  results.forEach(item => {
                    var _mail = {};
                    if (item && item.parts) {
                      item.parts.forEach(_item => {
                        if (_item.which == "TEXT") {
                          _mail.body = _item.body;
                        }
                        if (_item.which == "HEADER" && _item.body && _item.body.from && _item.body.from.length) {
                          _mail.from = _item.body.from[0];
                        }
                        if (_item.which == "HEADER" && _item.body && _item.body.subject && _item.body.subject.length) {
                          _mail.subject = _item.body.subject[0];
                        }
                        if (_item.which == "HEADER" && _item.body && _item.body.to && _item.body.to.length) {
                          _mail.to = _item.body.to[0];
                        }
                      })
                    }
                    mails.push(_mail);
                  });
                  //connection.end()
                }
                return mails;
              });
            });
          });
        },


      })
      return config;
    },
    specPattern: './cypress/specs/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
    cacheAcrossSpecs: false,
    cache: false,
    testIsolation: false,

  },
})
