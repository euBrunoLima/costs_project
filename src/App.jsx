import {BrowserRouter as Router,Routes,Route, Navigate,} from 'react-router-dom'
import Home from './components/pages/Home';
import Company from './components/pages/Comapany';
import Contact from './components/pages/Contact';
import Projects from './components/pages/Projects';
import NewProjects from './components/pages/NewProject';
import Project from './components/pages/Project'

import Container from './components/layout/Container';
import Footer from   './components/layout/Footer';
import NavBar from  './components/layout/NavBar';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customsClass="min-height">
        <Routes>
            <Route path='/' element={<Navigate to={'/home'}/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/projects' element={<Projects/>}></Route>
            <Route path='/company' element={<Company/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/newprojects' element={<NewProjects/>}></Route>
            <Route path='/project/:id' element={<Project/>}></Route>
        </Routes>
      </Container>

      <Footer/>
    </Router>
  );
}

export default App;
