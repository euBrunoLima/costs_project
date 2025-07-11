import {parse, v4 as uuidv4} from 'uuid'
import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './Project.module.css';
import styles2 from '../services/ServiceCard.module.css';
import ProjectCard from "../projects/ProjectCard";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../projects/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../services/ServiceForm";
import ServiceCard from "../services/ServiceCard";

function Project(){
    const {id} = useParams();
    const [project, setProject] = useState([null]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [services, setServices] = useState([])
    // const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then((resp) => resp.json())
        .then((data) =>{
            setProject(data);
            setServices(data.services);
            
        })
        .catch((err) => console.log(err));
        
        }, 600)
    },[id]);
    
    function editPost(project){
        setMessage("");
        setType("");
           
        if(project.budget < project.cost){
            setMessage("O orçamento não pode ser menor que o custo do projeto!");
            setType("error");
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(false);
            setMessage("Projeto atualizado com sucesso!");
            setType("success");
            // setRedirect(true);
           
        })
        .catch((err) => console.log(err))
        
    
    }
    function creatService(project){
        setMessage("")
        setType("")
        
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = parseFloat(lastService.cost) || 0
        const currentCost = parseFloat(project.cost) || 0
        const newCost = currentCost + lastServiceCost
        //maximum value validation
        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType("error")
            console.log(project.cost)
            project.services.pop()
            return false
        }

        project.cost = newCost;

        //update project
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) =>{
            console.log(data)
            setShowServiceForm(false)
        })
        .catch((err) => console.log(err))

    }

    function removeService(id, cost){
        
        const servicesUpdate = project.services.filter((service) =>(
            service.id !== id
        ))
        
        const projectUpade = project
        projectUpade.services = servicesUpdate
        projectUpade.cost = parseFloat(projectUpade.cost) - parseFloat(cost)

        console.log("Enviando para API:", {
        id: project.id,
        services: servicesUpdate,
        cost: parseFloat(project.cost) - parseFloat(cost)
        });

        fetch(`http://localhost:5000/projects/${projectUpade.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpade),
        })
        .then((resp) => resp.json())
        .then((data) =>{
            setProject(projectUpade)
            setServices(servicesUpdate)
            setMessage("Serviço removido com sucesso")
            setType('success')

        })
        .catch((err) => console.log(err))

    }

    function fetchProjectData() {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
            setServices(data.services);
        })
        .catch((err) => console.log(err));
}


    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
    }

    return(
       <div className={styles.project_container}>
           <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container className={styles.container} customsClass="column">
                        {message && <Message type={type} msg={message} />}
                 
                        <div className={styles.details_container}>
                            <div className={styles.details_container_header}>
                                <h1>Projeto: {project.name}</h1>
                                <button className={styles.btn} onClick={toggleProjectForm}>
                                    {!showProjectForm ? "Editar Projeto" : "Fechar"}
                                </button>
                            </div>
                            {!showProjectForm ? (
                                <div className={styles.project_form}>
                                    <p>
                                        <span>Categoria: </span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento: </span>R$ {project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span> R$ {project.cost}
                                    </p>
                                    
                                </div>
                            ) : (
                                <div className={styles.project_form}>
                                    <h2>Editar Projeto</h2>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir Edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.service_form_container}>
                            <div className={styles.details_container_header}>
                                <h2>Adicione um serviço</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
                                </button>
                            </div>
                            <div className={`${styles.project_info} ${styles.project_form}`}>
                                {showServiceForm  && 
                                    <ServiceForm
                                        handleSubmit={creatService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}

                                    />}
                            </div>
                        </div>

                        <div className={styles2.service_container}>
                            <h2>Serviços</h2>
                            <div className={styles2.service_card_container}>   
                                {services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard
                                            serviceId={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService}
                                            onServiceUpdated={fetchProjectData}
                                        />
                                    ))
                                }
                                {services.length === 0 && <p>Não há serviços cadastrados</p>}
                            
                            </div>
                        </div>
                        
                    </Container>
                </div>
            ):
                <Loading/>
            }
           </>
            
       </div>
    )
}

export default Project;