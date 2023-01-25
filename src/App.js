import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import FullScreenBlock from "./components/FullScreenBlock/FullScreenBlock";
import "./styles.scss";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <FullScreenBlock />
      </main>
      <Footer />
    </>
  );
}

export default App;
