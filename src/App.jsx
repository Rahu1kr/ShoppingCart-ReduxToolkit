import Headers from "./components/Headers"
import Home from "./components/Home"
import CardDetails from "./components/CardDetails"
import './App.css'
import { Routes, Route } from 'react-router-dom'
import toast, { Toaster} from "react-hot-toast"


function App() {

  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<CardDetails/>}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
