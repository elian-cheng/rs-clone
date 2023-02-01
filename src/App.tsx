import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import FullScreenBlock from "./components/FullScreenBlock/FullScreenBlock";
import Definition from "./components/Definition/Definition";
import "./styles.scss";
import Features from "./components/Features/Features";
import { featuresData } from "./utils/featuresData";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Sidebar />
        <FullScreenBlock />
        <Definition />
        <Features features={featuresData} />
      </main>
      <Footer />
    </>
  );
}

export default App;
