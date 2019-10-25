# removeEmptyFields

## Blog Link
[CodeWithMoi](https://codewithmoi.tumblr.com/post/160395480156/tdd-red-green-refactor) : Blog post on my experiences with TDD and the process thought process for first time. 

## Functions
Methods are located in index.js

* noMutateRemoveEmptyFields
	* removes empty fields without mutating original JSON
* removeEmptyFields
	* removes empty fields mutating original JSON
* removeEmpites
	*  helper function to remove empty arrays,strings, and objects

## Testing

Tests use [Mocha](http://mochajs.org/) and [Chai.js](http://chaijs.com/). Tests are located in `test` directory.

* To install dependencies

```
npm install
```
 or
```
yarn
```

To execute the test suite locally, run `npm test` or `yarn test`.
