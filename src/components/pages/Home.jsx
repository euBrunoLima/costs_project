import styles from './Home.module.css'
import LinkButton from '../layout/LinkButton';
import savings from '../../img/savings.svg'

function Home(){
    return(
        <section className={styles.home_container   }>
            <h1>Bem-vindo ao <span>Costs</span> </h1>
            <p>comece a gerenciar seus projetos agora mesmo</p>
            <LinkButton to="/newprojects" text="Criar Projetos"/>
           
            <img src={savings} alt="costs" /> 
        </section>
    )
}

export default Home;