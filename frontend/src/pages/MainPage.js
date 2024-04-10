import "./MainPage.css"
import About from "./About";
import CreateProposal from "./CreateProposal";
import Home from "./Home";
import Involvement from "./Involvement";
import Profile from "./Profile";
import Results from "./Results";
import Voting from "./Voting";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const MainPage = () =>{
    const location = useLocation();
    let component;
    if(location.pathname === "/bloksecim") {
      component = <Home/>;
    }else if (location.pathname === "/bloksecim/create") {
      component = <CreateProposal />;
    }else if (location.pathname === "/bloksecim/voting") {
      component = <Voting />;
    }else if (location.pathname === "/bloksecim/results") {
      component = <Results />;
    }else if (location.pathname === "/bloksecim/involvement") {
      component = <Involvement />;
    }else if (location.pathname === "/bloksecim/proposals") {
      component = <Voting />;
    }else if (location.pathname === "/bloksecim/profile") {
      component = <Profile />;
    }else if (location.pathname === "/bloksecim/about") {
      component = <About />;
    }
      return (
        <div className='root-layout'>
            <header className='container-fluid'>
                <Navbar />
            </header>
            <main>
                {component}
            </main>
            <Footer />
        </div>
      
    );
  }
  
  export default MainPage;
  