import './App.css';
import Homepage from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer';
import {WilderProvider} from "./hooks/useWilder";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Header/>
                <WilderProvider>
                    <Homepage/>
                </WilderProvider>
                <Footer/>
            </DndProvider>
        </div>
    );
}

export default App;
