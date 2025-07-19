import Navbaar from "./Navbaar";
import Footer from "./Footer.jsx";
import HomeBody from "./Home-body.jsx";


export default function Home(){
    return(
        <div>
          <Navbaar />
          <div><HomeBody/></div>
          <Footer />
        </div>
    )
}