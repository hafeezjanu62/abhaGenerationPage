import HomePage from "./Components/HomePage";
import AppBar from "./Components/AppBar";
import { Routes,Route } from 'react-router-dom';


function App() {
  return (
    <>
    <AppBar />
    <Routes>
<Route exact path="/" element={<HomePage/>}/>
    </Routes>
    </>
  );
}

export default App;
