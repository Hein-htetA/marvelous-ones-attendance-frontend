import './index.css';
import IconButtonCell from './IconButtonCell';
import * as React from 'react';
import SaveButtonGroup from './SaveButtonGroup';
import { students as stu } from '../../data/students.js'

export default function Table(props) {

    const initialState = React.useRef(stu)

    const TableToEdit = () => {
        const [tempStudents, setTempStudents] = React.useState(initialState);
        const editAttendance = (index1, index2) => {   
            setTempStudents((students) => {
                const temp1Students = [...students]
                temp1Students[index1].attendance[props.week][index2] =
                    !temp1Students[index1].attendance[props.week][index2]  

                return temp1Students
            })
            console.log('initialState stu');
            console.log(stu);
        }
        const resetAttendance = () => {
            setTempStudents(stu)
        }

        console.log('in table to addit');
        console.log(tempStudents)

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
                    students={props.students}
                    attendanceReset={resetAttendance}
                />
            </>
        )
    }


    return (
      <TableToEdit />
    )
}