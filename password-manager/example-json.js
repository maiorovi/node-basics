var person = {
    name : 'Andrew',
    age : 24
};


var personJson = JSON.stringify(person);


console.log(personJson);
console.log(typeof personJson);

var personObject = JSON.parse(personJson);

console.log(typeof personObject);
console.log(personObject.name);

var animal = '{"name" : "Halley"}';

animalObject = JSON.parse(animal)
animalObject.age = 25;

console.log(JSON.stringify(animalObject));