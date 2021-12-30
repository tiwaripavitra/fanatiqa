import React , {useState} from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Project from "../project/ListProjects";


const Home=()=> {

  const [isLoggedIn, setIsLoggedIn]= useState('');
  return (
    <div>
      <Header></Header>
      <div className="home-main">
        <form className="d-flex justify-content-center">
          <div className="form-group m-0">
            {isLoggedIn && (
           <Project/>
           )}
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
