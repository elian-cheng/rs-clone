import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./styles.scss";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <h1>Hello World</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
