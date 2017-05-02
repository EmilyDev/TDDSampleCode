import { expect } from 'chai';
import { noMutateRemoveEmptyFields } from '../index.js'

describe('noMutateRemoveEmptyFields', () => {
  describe('Should return correct results given a simple JSON', () => {

    it('Returns an empty JSON when given an empty JSON', () => {
      const emptyJson = {};
      expect(noMutateRemoveEmptyFields(emptyJson)).to.be.empty;
    })

    it('Returns original JSON that is passed in if there are no empty fields', () => {
      const noEmptyFieldJson =
      {
        "name" : "emily",
        "gender" : "female",
        "age" : "33"
      };

      expect(noMutateRemoveEmptyFields(noEmptyFieldJson)).to.be.deep.equal(noEmptyFieldJson);
    });

    it('Removes a field with null', () => {
      const oneNullFieldJSON =
      {
        "name" : "emily",
        "age"  : "33",
        "emptyField" : null
      }

      expect(noMutateRemoveEmptyFields(oneNullFieldJSON)).to.be.deep.equal({"name" : "emily","age"  : "33"});
    });

    it('Removes a field with empty object', () => {
      const oneEmptyObjectFieldJson =
      {
        "name" : "emily",
        "age"  : "33",
        "emptyField" : {}
      }

      expect(noMutateRemoveEmptyFields(oneEmptyObjectFieldJson)).to.be.deep.equal({"name" : "emily","age"  : "33"});
    });

    it('Removes a field with empty array', () => {
      const oneEmptyArrayField =
      {
        "name" : "emily",
        "age"  : "33",
        "emptyField" : []
      }

      expect(noMutateRemoveEmptyFields(oneEmptyArrayField)).to.be.deep.equal({"name" : "emily","age"  : "33"});
    });

    it('Removes a field with empty string with single quotes', () => {
      const oneEmptySingleQuote =
      {
        "name" : "emily",
        "age"  : "33",
        "emptyField" : ''
      }

      expect(noMutateRemoveEmptyFields(oneEmptySingleQuote)).to.be.deep.equal({"name" : "emily","age"  : "33"});
    });

    it('Removes a field with empty string with double quotes', () => {
      const oneEmptyDoubleQuote =
      {
        "name" : "emily",
        "age"  : "33",
        "emptyField" : ""
      }

      expect(noMutateRemoveEmptyFields(oneEmptyDoubleQuote)).to.be.deep.equal({"name" : "emily","age"  : "33"});
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
      expect(noMutateRemoveEmptyFields(lotsOfEmpties)).to.be.deep.equal({name:'emily',deepNulls:{ two: '2' } });
    });

    it("It works on JSON files that are brought in and parsed", () => {
        const importedJson = require('./jsonExamples.json') // tried to do it synchrous
        expect(noMutateRemoveEmptyFields(importedJson)).to.be.deep.equal({ name: 'emily', deepNulls: { two: '2' }});
    });
  });
});
