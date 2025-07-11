import styles from './SubmitButton.module.css'

function SubmitButton({text}){
    return(
        <button  className={styles.btn}>
            {text}
        </button>
    )
}

export default SubmitButton;