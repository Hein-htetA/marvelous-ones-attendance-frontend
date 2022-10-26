const students = require('./data/st2');

const temp = []

for (let student of students) {
    temp.push(student.attendance.week1)
}

console.log(temp)
console.log('hey')