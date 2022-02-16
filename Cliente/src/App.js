
import Home from "./Home";
import Login from "./Login";
import Registro from "./Registro";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Chat" element={<Home/>}/>     
        <Route path="/Registro" element={<Registro/>}/>     
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
