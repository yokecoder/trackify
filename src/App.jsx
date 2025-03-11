import React from "react";
import Habits from "./pages/habits";
import Tasks from "./pages/tasks";
import TopActBar from "./comps/top-bar";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import "../src/css/App.css";

function App() {
    return (
        <>
            <div className="App">
                <TopActBar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/habits" element={<Habits />} />
                        <Route path="/tasks" element={<Tasks />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
