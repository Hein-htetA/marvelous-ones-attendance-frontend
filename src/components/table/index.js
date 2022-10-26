import './index.css';
import IconButtonCell from './IconButton';
import { students } from '../../data/students';
import * as React from 'react';
import SaveButtonGroup from './SaveButtonGroup';

export default function Table() {
    const [student, setStudent] = React.useState(students);
    console.log(student);

    React.useEffect(() => {
        console.log('in useeffect')
    }, []);

    const handleClick = (index1, index2) => {
        setStudent((student) => {
            const temp = [...student];
            temp[index1].attendance[0][index2] = !temp[index1].attendance[0][index2]
            console.log(temp);
            return temp
        })
        console.log('in handleclick')
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
                    student.map((student, index1) => (
                        <tbody  key={student.no}>
                            <tr>
                                <td>{student.no}</td>
                                <td>{student.name}</td>
                                {
                                    student.attendance[0].map((attendance, index2) => (
                                        <td key={index2}>
                                            <IconButtonCell 
                                                buttonState={attendance}
                                                handleClick={handleClick}
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
            <SaveButtonGroup />
        </>
    )
}