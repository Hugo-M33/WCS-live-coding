import './App.css';
import Homepage from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer';
import {WilderProvider} from "./hooks/useWilder";

function App() {
  return (
    <div className="App">
      <Header/>
        <WilderProvider>
      <Homepage/>
        </WilderProvider>
      <Footer/>
    </div>
  );
}

export default App;
