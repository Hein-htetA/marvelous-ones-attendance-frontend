import './index.css';
import IconButtonCell from './IconButtonCell';
import * as React from 'react';
import SaveButtonGroup from './SaveButtonGroup';

export default function Table(props) {

    const studentsForTemp = () => [...props.students]

    const [tempStudents, setTempStudents] = React.useState(studentsForTemp());

    const editAttendance = (index1, index2) => {   
        setTempStudents((tempStudents) => {
            const temp1Students = [...tempStudents]
            temp1Students[index1].attendance[props.week][index2] = !temp1Students[index1].attendance[props.week][index2]  
            return temp1Students
        })  
        console.log('student for temp');
        console.log(studentsForTemp);

    }

    const attendanceReset = () => {
        setTempStudents(() => studentsForTemp());
      }

    return (
        <>
            <table style={{width: '100%'}}>
                <caption>Elementary Class</caption>
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>No</th>
                        <th>Name</th>
                        <th style={{width: '13%'}}>Monday</th>
                        <th style={{width: '13%'}}>Tuesday</th>
                        <th style={{width: '13%'}}>Wednesday</th>
                        <th style={{width: '13%'}}>Thursday</th>
                        <th style={{width: '13%'}}>Friday</th>
                        <th style={{width: '13%'}}>Saturaday</th>
                    </tr>
                </thead>
                {
                    tempStudents.map((student, index1) => (
                        <tbody  key={student._id}>
                            <tr>
                                <td>{index1 + 1}</td>
                                <td>{student.name}</td>
                                {
                                    student.attendance[props.week].map((attendance, index2) => (
                                        <td key={index2}>
                                            <IconButtonCell 
                                                buttonState={attendance}
                                                editAttendance={editAttendance}
                                                index1={index1}
                                                index2={index2}
                                            />
                                        </td>
                                    ))
                                }
                            </tr>
                        </tbody>
                    ))
                }
            </table>
            <SaveButtonGroup 
                tempStudents={tempStudents} 
                setTempStudents={setTempStudents} 
                students={props.students}
                attendanceReset={attendanceReset}
            />
        </>
    )
}