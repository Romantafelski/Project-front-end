import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login'
import Register from './register'
import Dashboard from "./Dashboard";


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/Dashboard" element={<Dashboard/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App