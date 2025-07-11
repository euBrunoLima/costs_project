import styles from '../pages/Company.module.css';
import styles_2 from '../form/SubmitButton.module.css'
import Img from '../../img/img_company.svg';


function Company(){
    return(
        <div className={styles.container_pai}>
            <div className={styles.contact_container}>
                
                <article className={styles.side1_txt}>
                    <div className={styles.side1_header}>
                        <p>Tecnologia e inovação</p>
                        <h1>Conheça a nossa Empresa</h1>
                    </div>
                    <article className={styles.container_text}>
                        <p>
                            Nossa empresa nasceu com a missão de facilitar o controle financeiro de forma prática,
                            segura e inteligente. Oferecemos uma plataforma completa de gerenciamento de finanças,
                            onde usuários podem criar projetos personalizados, acompanhar o orçamento de cada etapa e
                            tomar decisões com base em dados claros e organizados.
                        </p>
                        <p>
                            Com uma interface intuitiva, é possível estruturar projetos financeiros e atribuir serviços
                            específicos a cada um deles, como consultorias, investimentos ou despesas operacionais.
                            Dessa forma, o usuário mantém o controle total sobre suas finanças, com relatórios detalhados
                            e visão estratégica de seus resultados.
                        </p>
                    </article>
                    <a className={styles_2.btn} href="#">Saiba mais</a>
                </article>

                <div className={styles.side2_img}>
                    <img  src={Img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Company;