import styles from '../projects/ProjectCard.module.css';
import styles2 from './ServiceCard.module.css';
import styles_3 from '../form/SubmitButton.module.css'
import { BsPencil, BsTrashFill, BsX } from 'react-icons/bs';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../form/Input';
import TextArea from '../form/TextArea';
import Message from '../layout/Message';


function ServiceCard({serviceId, name, cost, description,  handleRemove, onServiceUpdated}) {
    const {id} = useParams()
    const [showModal, setModal] = useState(false);

    console.log("name: ", name)
    console.log("cost: ", cost)
    console.log("description: ", description)
 
    function toggleModal(){
        setModal(!showModal);
        console.log(`testando... o valor é ${!showModal}`)
    }


    const remove = (e) => {
        e.preventDefault();
        handleRemove(serviceId,cost);
    }

    function Modal(){
        const [project, setProject] = useState([]); //variavel para resgatar o projeto. sera usado como parms de função.
        const [service, setService] = useState([]); //variavel para preencher com os inputs do usuario/atualizar serviços.
        const [projectService,  setProjectService] = useState([]); //variavel para resgatar apenas os serviços do projetos. logo após, fazer um filtro pelo o id.
        const [message, setMessage] = useState(null);
        const [type, setType] = useState(null);

        function handleChange(e){
            const propriedade = e.target.name;
            const valor = e.target.value;
            setService({...service , [propriedade]: valor})
            console.log(service)   
        }

        useEffect(() => {
            fetch(`http://localhost:5000/projects/${id}`,{
                method: 'GET',
                headers:{
                    'Content-type': 'aplication/json'
            }
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data) // atualizando valor da variavel project
                setProjectService(data.services) // atualizando valor da variavel projectService com todos os serviços do projeto.

            } )
            .catch((err) => console.log(err))

        }, [])

        useEffect(() =>{
            console.log("todos os serviços do projeto- linha 59")
            console.log(projectService)
        },[projectService])

        function serviceUpdate(Project) {
       
            const servicoAtual = Project.services.find((serv) => serv.id == serviceId);

            let projectCost = parseFloat(project.cost || 0);
            let servicoAtualCost = parseFloat(servicoAtual.cost || 0);
            let servicoInput = parseFloat(service.cost);
          
            
            // Verifica se o valor do serviço mudou
            if (servicoInput !== servicoAtualCost) {
                const diff = Math.abs(servicoInput - servicoAtualCost);
                let newProjectCost = projectCost;
                if(servicoInput === '' || isNaN(servicoInput)) {
                    console.log("O valor do serviço não pode ser vazio ou inválido");
                    setMessage("O valor do serviço não pode ser vazio ou inválido")
                    setType("error")
                    return;
                }

                if (servicoInput > servicoAtualCost) {
                    if ((projectCost + diff) > project.budget) {
                        console.log("O valor ultrapassou o orçamento:", projectCost + diff);
                        setMessage("Orçamento ultrapassado, verifique o valor do serviço")
                        setType("error")
                        return; // cancela a atualização
                    }
                    newProjectCost += diff;
                    console.log(`Custo do projeto aumentou para: ${newProjectCost}`);
                } else {
                    newProjectCost -= diff;
                    console.log(`Custo do projeto diminuiu para: ${newProjectCost}`);
                }

                // Atualiza o estado corretamente com o novo custo
                setProject((projAtual) => ({
                    ...projAtual,
                    cost: newProjectCost,
                    services: projAtual.services.map((s) => {
                        return s.id == serviceId
                            ? { ...s, ...service, cost: servicoInput === '' ? servicoAtual.cost : servicoInput} // força atualização do cost do serviço
                            : s;
                    }),
                }));
                    
                // Atualiza o backend com os dados do projeto atualizado (opcional: usar o novo estado via callback)
                fetch(`http://localhost:5000/projects/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...project,
                        cost: newProjectCost,
                        services: project.services.map((s) => {
                            return s.id == serviceId
                                ? { ...s, ...service, cost: servicoInput !== '' ? servicoInput : s.cost }
                                : s;
                        }),
                    })
                })
                .then((resp) => resp.json())
                .then((data) => {
                    // console.log("Atualização do serviço executada com sucesso");
                    setMessage('O serviço foi atualizado com sucesso')
                    setType('success')
                    setTimeout(() => {
                        if (typeof onServiceUpdated === 'function') {
                            onServiceUpdated();
                        }
                        toggleModal(); // só fecha depois de exibir a mensagem
                    }, 2000); // espera 2 segundos
                    
                })
                .catch((err) => console.log(err));
            }

          
                
        }


        useEffect(() =>{
            console.log(project)
        }, [project])



        return(
            <div className={styles2.modal_overlay}>
                 {message != null && <Message type={type} msg={message} />}
                <div className={styles2.form_service_container}>
                    <h1>Editar Serviço</h1>
                    <button onClick={toggleModal}>
                        <BsX size={24} className={styles2.close_icon} />
                    </button>
                    <form>
                        <Input
                            type = "text"
                            text = "Nome do serviço"
                            name = "name"
                            placeholder = "Insira o nome do serviço"
                            handleOnChange={handleChange}
                            value={service.name ? service.name : ''}
                        />
                        <Input
                            type = "number"
                            text = "Custo do serviço"
                            name = "cost"
                            placeholder = "Insira o custo total"
                            handleOnChange={handleChange}
                            value={service.cost ? service.cost : ''}
                        />

                        <TextArea
                            text="Descrição do serviço"
                            placeholder = "Descreva o serviço..."
                            name="description"
                            handleOnChange={handleChange}
                            value={service.description ? service.description : ''} 
                        />  
                        <button className={styles_3.btn} onClick={(e) => {
                            e.preventDefault();
                            serviceUpdate(project)
            
                        }}>Enviar</button>
                    </form>
                 
                </div>
            </div>
        )
    }



    return(
        <div className={`${styles.project_card} ${styles2.service_card}`}>
            <h4>{name}</h4>
            <p>
                <span>Custo: </span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles2.service_card_actions}>
                <button onClick={remove}>
                    <BsTrashFill /> Excluir                               
                </button>
                <button onClick={toggleModal}>
                    <BsPencil/> Editar
                </button>
            </div>
            {
                showModal &&
                <Modal/>
            }
        </div>
    )
}

export default ServiceCard;