import './index.css';
import IconButtonCell from './IconButtonCell';
import * as React from 'react';
import SaveButtonGroup from './SaveButtonGroup';

export default function Table(props) {

    const initialState = props.students

    const [tempStudents, setTempStudents] = React.useState(initialState);
    const [attendanceUpdateLoading, setAttendanceUpdateLoading] = React.useState(false);

    const editAttendance = (index1, index2) => {   
        setTempStudents((initialState) => {
            const temp1Students = JSON.parse(JSON.stringify(initialState))
            temp1Students[index1].attendance[props.week][index2] = !temp1Students[index1].attendance[props.week][index2]  
            return temp1Students
        })   
    }

    const attendanceReset = () => {
        setTempStudents(initialState);
    }

    const attendancePost = async () => {
        setAttendanceUpdateLoading(true);
        const idAndAttendance = tempStudents.map((student) => {
          const {_id, attendance} = student;
          return {_id, attendance}
        })
        const requestOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
          },
          body: JSON.stringify(idAndAttendance)
        }
        try {
            const patchResponse = await fetch('http://localhost:5000/api/v1/students', requestOptions)
            const response = await patchResponse.json();
            console.log(response);
            setAttendanceUpdateLoading(false);         
        } catch (error) {
            console.log(error)
        }
      }

    return (
        <>
            <table style={{width: '100%'}}>
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
                                                attendanceUpdateLoading={attendanceUpdateLoading}
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
                attendancePost={attendancePost}
                attendanceUpdateLoading={attendanceUpdateLoading}
            />
        </>
    )
}