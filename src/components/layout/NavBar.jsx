import { Link } from "react-router-dom"
import style from './NavBar.module.css'
import logo from '../../img/costs_logo.png'
import { useState, useEffect} from "react"



function NavBarMobile({handleUlClick}){

    return(
        <ul className={`${style.mobile_ul}`} onClick={handleUlClick}>
            <li className={style.item}>
                <Link to='/home'>Home</Link>
            </li>
            <li>
                <Link to='/projects'>Projetos</Link>
            </li>
            <li>
                <Link to='/contact'>Contato</Link>
            </li>
            <li>
                <Link to='/company'>Empresa</Link>
            </li>
        </ul>
      
    )
}

function NavBar(){


    const [toggleMenu, setToggleMenu] = useState(false)

    function showMenu(){
        setToggleMenu(!toggleMenu)
        console.log(toggleMenu);
    }

    function handleUlClick(e){
        if( e.target.tagName == 'A'){
            const href = e.target.getAttribute('href'); // pega o href do <a>
            console.log('Clicou no link:', href);
            setTimeout(() => {
                showMenu();// fecha o menu após 300ms
            }, 100);
        
        }
    }


    useEffect(() => {
        
        function handleResize() {
            const width = window.innerWidth;

            if (width > 560) {
                setToggleMenu(false)
                
            }else {
                return;
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    // State para controlar o delay
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        let timer;
        if (toggleMenu) {
            timer = setTimeout(() => setShowMobileMenu(true), 300); // 300ms de delay
        } else {
            setShowMobileMenu(false);
        }
        return () => clearTimeout(timer);
    }, [toggleMenu]);

    return(
        <header>
            <nav className={`${style.navbar} ${toggleMenu ? style.active : ''} `}>
                <div className={style.logo_and_button}>
                    <Link to='/home'>
                        <img src={logo} alt="costs" />
                    </Link>
                    <div className={`${style.hamburguer_menu} ${toggleMenu ? style.active : '' }`} onClick={showMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                {toggleMenu === false
                ?   
                    <ul className={style.list} >
                        <li className={style.item}>
                            <Link to='/home'>Home</Link>
                        </li>
                        <li className={style.item}>
                            <Link to='/projects'>Projetos</Link>
                        </li>
                        <li className={style.item}>
                            <Link to='/contact'>Contato</Link>
                        </li>
                        <li className={style.item}>
                            <Link to='/company'>Empresa</Link>
                        </li>
                    </ul>
                :
                    showMobileMenu && <NavBarMobile handleUlClick = {handleUlClick}/>
                }
            </nav>
        </header>
    
    )
}

export default NavBar;