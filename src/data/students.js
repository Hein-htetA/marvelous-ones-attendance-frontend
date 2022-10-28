const students = [
    {
        no: 1,
        name: "Hein1",
        attendance: [
            Array(6).fill(false)
        ]
    },
    {
        no: 2,
        name: "Hein2",
        attendance: [
            Array(6).fill(false)
        ]
    },
    {
        no: 3,
        name: "Hein3",
        attendance: [
            Array(6).fill(false)
        ]
    },
    {
        no: 4,
        name: "Hein4",
        attendance: [
            Array(6).fill(false)
        ]
    },
    {
        no: 5,
        name: "Hein5",
        attendance: [
            Array(6).fill(false)
        ]
    },
    {
        no: 6,
        name: "Hein6",
        attendance: [
            Array(6).fill(false)
        ]
    },
    {
        no: 7,
        name: "Hein7",
        attendance: [
            Array(6).fill(false)
        ]
    },
    {
        no: 8,
        name: "Hein8",
        attendance: [
            Array(6).fill(false)
        ]
    },
    {
        no: 9,
        name: "Hein9",
        attendance: [
            Array(6).fill(false)
        ]
    },{
        no: 10,
        name: "Kaung",
        attendance: [
            Array(6).fill(false)
        ]
    },
];

const idAndAttendance = students.map((student) => {
    const {no, attendance} = student;
    return {no, attendance}
})

console.log(idAndAttendance);