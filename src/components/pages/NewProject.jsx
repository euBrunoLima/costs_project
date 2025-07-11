import styles from './NewProject.module.css'
import ProjectForm from '../projects/ProjectForm';
import { useNavigate } from 'react-router-dom';

function NewProjects(){

   const navigate = useNavigate();

    function createPost(project){
   
        project.cost = 0;
        project.services = [];

        fetch('http://localhost:5000/projects',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } }); // Substituir history.push por navigate
        })
        .catch((err) => console.log(err));    
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projetos</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>

            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProjects;