import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import FullScreenBlock from './components/FullScreenBlock/FullScreenBlock';
import Definition from './components/Definition/Definition';
import './styles.scss';
import Features from './components/Features/Features';
import { featuresData } from './utils/featuresData';
import CodeEditor from './components/CodeEditor/CodeEditor';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <FullScreenBlock />
        <Definition />
        <Features features={featuresData} />
        <CodeEditor />
      </main>
      <Footer />
    </>
  );
}

export default App;
