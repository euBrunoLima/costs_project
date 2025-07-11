import styles from './Contact.module.css';
import styles_2 from '../form/SubmitButton.module.css'
import Input from '../form/Input';
import TextArea from '../form/TextArea';
import ImgInsta from '../../img/instagram.png';
import ImgFace from '../../img/facebook.png';
import ImgWhats from '../../img/whatsapp.png';
import ImgTikTok from '../../img/tiktok.png';
import { useState } from 'react';

function Contact(){

    const [userMs, setUserMs] = useState({});

    function handleChange(e){
        const propriedade = e.target.name;
        const valor = e.target.value 
        setUserMs({...userMs , [propriedade]: valor});
        console.log(userMs);
    }

    
    function createUserMs(userMs){
        fetch('http://localhost:5000/mensagens',{
            method: 'POST', 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userMs)  
        })
        .then((resp) => resp.json())
        .then((data) => console.log(data), console.log("Mensagem salva com sucesso!!"))
        .catch((err) => console.log(err))
    }

    function limpar(){

    }




    return(

        <div className={styles.container_pai}>
            <div className={styles.contact_container}>

                <div className={styles.side1}>
                <h1>Localização</h1>
                <p>28 Jackson Blvd Ste 1020 Chicago IL 60604-2340</p>
                <div className={styles.redes_sociais_container}>
                    <h2>Siga-nos</h2>
                    <div className={styles.container_imgs}>
                        <img src={ImgInsta} alt="instagram img" />
                        <img src={ImgFace} alt="facebook img" />
                        <img src={ImgWhats} alt="whatsapp img" />
                        <img src={ImgTikTok} alt="tiktok img" />   
                    </div>
                    <span>&copy; 2025 Política de privacidade</span>
                </div>
                </div>

                <div className={styles.form_container}>
                    <form onClick={onsubmit}>
                        <h1>Formulário de Contato</h1>
                        <Input
                            type = "text"
                            text = "Digite o seu nome"
                            name = "name"
                            value = {userMs.name ? userMs.name : ''}
                            placeholder = "Insira o seu nome"
                            handleOnChange= {handleChange}
                        />
                        <Input
                            type = "email"
                            text = "Digite o seu e-mail"
                            name = "email"
                            value = {userMs.email ? userMs.email : ''}
                            placeholder = "Insira um email valido"
                            handleOnChange = {handleChange}
                        />

                        <TextArea
                            text="Digite sua mensagem"
                            placeholder = "Escreva sua mensagem aqui..."
                            name="mensagem"
                            value = {userMs.mensagem ? userMs.mensagem : ''}
                            handleOnChange={handleChange}   
                        />   
                        <button className={styles_2.btn} onClick={(e) => {
                            e.preventDefault();
                            createUserMs(userMs);
                        }
                        } >Enviar</button>
                    </form>
                </div>

            </div>
        </div>

        
    )
}

export default Contact;