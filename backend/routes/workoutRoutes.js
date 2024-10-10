import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import { UserProvider, UserContext } from "./contexts/UserContext"; // Import UserProvider and UserContext

function App() {
    const { isLoggedIn } = useContext(UserContext); // Get login status

    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        }
                    />
                    <Route
                        path="/workouts"
                        element={
                            isLoggedIn ? (
                                <Layout>
                                    <Workouts />
                                </Layout>
                            ) : (
                                <Layout>
                                    <h1>Please log in to access your workouts.</h1>
                                </Layout>
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Layout>
                                <Login />
                            </Layout>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Layout>
                                <Register />
                            </Layout>
                        }
                    />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
