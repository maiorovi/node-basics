var grades = [100, 50]

grades.push(79)

console.log("End of array addition: " + grades)

grades.unshift(80)

console.log("Begininng addition: " + grades)

grades.pop();
console.log("The last is removed: " + grades);

grades.forEach( function (it) {
    console.log(it*2 + " ")
})

console.log(grades[1])


var totalGrade = 0

grades.forEach(function (grade) {
  totalGrade += grade
})

console.log("Total grade: " + totalGrade)
