var person = {
    name : 'Andrew',
    age : 21
}

function updatePersonNotWorking(obj) {
    obj = {
        name : 'Andrew',
        age : 24
    };
}

function updatePersonWorking(obj) {
    obj.age = 24;
}

//passed by value to method
updatePersonNotWorking(person);

console.log(person);


updatePersonWorking(person);

console.log(person);

// array example
var array = [1,2,3,4,5];

function updateArrayWrong(arr) {
    arr = [1,2,3,4,5,6]
}

function updateArrayCorrect(arr) {
    arr.push(6);
}

updateArrayWrong(array);
console.log(array);

updateArrayCorrect(array);
console.log(array);
