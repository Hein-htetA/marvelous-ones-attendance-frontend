import './index.css';
import IconButtonCell from './IconButton';
import * as React from 'react';
import SaveButtonGroup from './SaveButtonGroup';

export default function Table(props) {

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
                    props.students.map((student, index1) => (
                        <tbody  key={student._id}>
                            <tr>
                                <td>{student.no}</td>
                                <td>{student.name}</td>
                                {
                                    student.attendance[props.week].map((attendance, index2) => (
                                        <td key={index2}>
                                            <IconButtonCell 
                                                buttonState={attendance}
                                                handleClick={props.handleClick}
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
            <SaveButtonGroup attendancePost={props.attendancePost}/>
        </>
    )
}