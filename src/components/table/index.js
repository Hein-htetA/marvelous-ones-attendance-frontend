import './index.css';
import IconButtonCell from './IconButtonCell';
import * as React from 'react';
import SaveButtonGroup from './SaveButtonGroup';
import { Box, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export default function Table(props) {

    const initialState = props.students

    const [tempStudents, setTempStudents] = React.useState(initialState);
    const [attendanceUpdateLoading, setAttendanceUpdateLoading] = React.useState(false);
    const [totalAbsent, setTotalAbsent] = React.useState([]);

    React.useEffect(() => {
        if (tempStudents.length === 0) {
            return
        }
        const attendanceArray = tempStudents.map((student) => {
            return student.attendance
        })
        const copyAttendanceArray = JSON.parse(JSON.stringify(attendanceArray));
        //total absent of each student
        const totalAbsentArray = copyAttendanceArray.map(stu => {
            const arrayWithTotalAbsentArray = stu.map(week => {
                return week.filter((att) => att === false).length
            })
            return arrayWithTotalAbsentArray.reduce((pre, cur) => pre + cur)
        })
        setTotalAbsent(totalAbsentArray)
    },[tempStudents])

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
            if (!patchResponse.ok) {
                throw Error(patchResponse.statusText)
            }
            const response = await patchResponse.json();
            setAttendanceUpdateLoading(false);         
        } catch (error) {
            console.log(error)
        }
      }

    return (
        <Box sx={{flex: 1}}>
            <table style={{width: '100%'}}>
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>No</th>
                        <th>Name</th>
                        <th style={{width: '12%'}}>Monday</th>
                        <th style={{width: '12%'}}>Tuesday</th>
                        <th style={{width: '12%'}}>Wednesday</th>
                        <th style={{width: '12%'}}>Thursday</th>
                        <th style={{width: '12%'}}>Friday</th>
                        <th style={{width: '12%'}}>Saturaday</th>
                    </tr>
                </thead>
                {
                    tempStudents.map((student, index1) => (
                        <tbody  key={student._id}>
                            <tr>
                                <td>{index1 + 1}</td>
                                <td>
                                    <Box 
                                        display='flex' 
                                        alignItems={'center'} 
                                        justifyContent='space-between'
                                    >
                                        <Typography variant='body1'>{student.name}</Typography>
                                        <Typography 
                                            sx={{
                                                alignItems: 'center',
                                                position: 'absolute',
                                                bottom: '8px',
                                                right: '8px',
                                                backgroundColor: 'white',
                                                display: totalAbsent[index1] === 0 ? 'none' : 'flex'
                                            }}
                                        >
                                            ( 
                                                <ClearIcon
                                                    sx={{
                                                        backgroundColor: '#c4001d',
                                                        color: 'white',
                                                        borderRadius: '20%',
                                                        fontSize: '16px',
                                                        ml: '4px'
                                                    }}
                                                />
                                            &nbsp;=&nbsp;
                                            {totalAbsent[index1] > 9 ?
                                                totalAbsent[index1] : "0" + totalAbsent[index1]
                                            } 
                                            )
                                        </Typography>                                           
                                    </Box>
                                </td>
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
        </Box>
    )
}