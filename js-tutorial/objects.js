var person = {};

person.firstName = 'Andrew'
person.lastName = 'Mead'
person.age = 23

delete person.age

function greetUser(person) {
  console.log('Hello ' + person.firstName + ' ' + person.lastName)
}

greetUser(person)

var myCat = {
  type:'cat',
  'name': 'Charles'
}

function printPet(pet) {
  console.log('You have a ' + pet.type + ' named ' + pet.name )
}

printPet(myCat)
