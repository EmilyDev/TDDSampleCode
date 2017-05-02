import { expect } from 'chai';
import { removeEmptyFields } from '../index.js'

// == importing test json file == for last test
import fs from 'fs';
const Bluebird = require('bluebird'); // used to turn fs.readfile into promise

describe('removeEmptyFields', () => {
  describe('Should return correct results given a simple JSON', () => {

    it('Returns an empty JSON when given an empty JSON', () => {
      const emptyJson = {};
      expect(removeEmptyFields(emptyJson)).to.be.empty;
    })

    it('Returns original JSON that is passed in if there are no empty fields', () => {
      const noEmptyFieldJson =
      {
        "name" : "emily",
        "gender" : "female",
        "age" : "33"
      };

      expect(removeEmptyFields(noEmptyFieldJson)).to.be.deep.equal(noEmptyFieldJson);
    });

    it('Removes a field with null', () => {
      const oneNullFieldJSON =
      {
        "name" : "emily",
        "age"  : "33",
        "emptyField" : null
      }

      expect(removeEmptyFields(oneNullFieldJSON)).to.be.deep.equal({"name" : "emily","age"  : "33"});
    });

    it('Removes a field with empty object', () => {
      const oneEmptyObjectFieldJson =
      {
        "name" : "emily",
        "age"  : "33",
        "emptyField" : {}
      }

      expect(removeEmptyFields(oneEmptyObjectFieldJson)).to.be.deep.equal({"name" : "emily","age"  : "33"});
    });

    it('Removes a field with empty array', () => {
      const oneEmptyArrayField =
      {
        "name" : "emily",
        "age"  : "33",
        "emptyField" : []
      }

      expect(removeEmptyFields(oneEmptyArrayField)).to.be.deep.equal({"name" : "emily","age"  : "33"});
    });

    it('Removes a field with empty string with single quotes', () => {
      const oneEmptySingleQuote =
      {
        "name" : "emily",
        "age"  : "33",
        "emptyField" : ''
      }

      expect(removeEmptyFields(oneEmptySingleQuote)).to.be.deep.equal({"name" : "emily","age"  : "33"});
    });

    it('Removes a field with empty string with double quotes', () => {
      const oneEmptyDoubleQuote =
      {
        "name" : "emily",
        "age"  : "33",
        "emptyField" : ""
      }

      expect(removeEmptyFields(oneEmptyDoubleQuote)).to.be.deep.equal({"name" : "emily","age"  : "33"});
    });
  });

  describe("Should return correct results when given any json", () => {

    it("Checks and removes all empty fields deep into the JSON", () =>{
      const lotsOfEmpties =
      {
        "array" : [],
        "object" : {},
        "string" : '',
        "string1" : "",
        "null" : null,
        "name" : "emily",
        "deepNulls" : { "one" : { one : ''}, "two" : "2", "emptyArr" : [''] },
        "removeME" : { "remove" : {}, 'emptyArr' :[[],{},''], 'emptyStr' : '' }
      }

      expect(removeEmptyFields(lotsOfEmpties)).to.be.deep.equal({ name: 'emily', deepNulls: { two: '2' }})
    });

    // "done" is passed in to catch any err thrown by expect
    it("It works on JSON files that are brought in and parsed", (done) => {

      // promisifies fs.readFile
      const readFile = Bluebird.promisify(fs.readFile);

      //creates promise to chain
      readFile('./tests/jsonExamples.json','utf8')
      .then( data => {
        //parse data recieved
        let parsedData = JSON.parse(data);

        //expect test
        expect(removeEmptyFields(parsedData)).to.be.deep.equal({ name: 'emily', deepNulls: { two: '2' }});
        done();

      }).catch( err => {
        done(err) // catches errors for mocha
      });
    });
  });
});
