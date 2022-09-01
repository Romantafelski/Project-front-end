
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Dashboard from "./Dashboard";



import './App.css';
import { useState, useEffect } from "react"
import axios from 'axios';


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/Dashboard" element={<Dashboard />}></Route>
                </Routes>
            </BrowserRouter>

    </div>
    )}


export default App