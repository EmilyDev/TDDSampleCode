/*
   Input : JSON
   Output : JSON with removes all empty fields
====================
   empty fields include :
   empty arrays = []
   empty object = {}
   empty strings = '' or ""
   Null
=====================
   Will remove deeply embedded empty fields as well as fields that are empty once inner fields are removed
*/


//=== function will not mutate original JSON ===
export const noMutateRemoveEmptyFields = (inputJSON) => {
      let outputJSON = Object.assign({},inputJSON);
      return removeEmptyFields(outputJSON);
}

//=== function will mutate original JSON ===
export const removeEmptyFields = (inputJSON) => {

  for (let field in inputJSON) {
    if (inputJSON[field] === null || inputJSON[field] === undefined ){// checks for nulls/undefined first to prevent errors
      delete inputJSON[field];
    } else if (typeof inputJSON[field] === 'object') {
      removeEmptyFields(inputJSON[field]);               //recursive call to check inner objects and arrays
      removeEmpties(inputJSON,field)          // removes any fields that became empty after inner fields removed
    }else {
      removeEmpties(inputJSON,field);
    }
  }
  return inputJSON;
};


//=== removes fields with empty Arrays, Strings, and Objects
const removeEmpties = ( obj, key ) => {
  if (obj[key].length === 0 || Object.keys(obj[key]).length === 0) delete obj[key];
}
