import styles from './TextArea.module.css';

function TextArea({ text, name, placeholder, handleOnChange, value}){

    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <textarea
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            >   
            </textarea>
        
        </div>
    )

}

export default TextArea;