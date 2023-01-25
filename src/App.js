import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import FullScreenBlock from "./components/FullScreenBlock/FullScreenBlock";
import Definition from "./components/Definition/Definition";
import "./styles.scss";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <FullScreenBlock />
        <Definition />
      </main>
      <Footer />
    </>
  );
}

export default App;
