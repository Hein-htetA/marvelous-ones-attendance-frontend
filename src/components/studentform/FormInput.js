import { useState } from 'react';
import './formInput.css';

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMsg, onChange, id, onBlur, formSubmit, ...inputProps} = props;

    const handleBlurFocused = (e) => {
        onBlur();
        setFocused(true);
    }

    return (
        <div className="formInput">
            <div>
                <label>{label}</label>
                <span style={{display: focused | formSubmit ? 'inline' : 'none'}}>{errorMsg}</span>
            </div>

            <input 
                {...inputProps}
                onChange={onChange}
                onBlur={handleBlurFocused}
            />
        </div>
    )
}

export default FormInput;
