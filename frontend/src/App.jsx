import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import ExerciseLibrary from "./pages/ExerciseLibrary";
import History from "./components/History"; // Import History component
import { UserProvider } from "./contexts/UserContext"; // Ensure this path is correct

function App() {
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
              <Layout>
                <Workouts />
              </Layout>
            }
          />
          <Route
            path="/exercises"
            element={
              <Layout>
                <ExerciseLibrary />
              </Layout>
            }
          />
          <Route
            path="/exercises/:bodyPart"
            element={
              <Layout>
                <ExerciseLibrary />
              </Layout>
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
          <Route
            path="/history" // Add history route
            element={
              <Layout>
                <History />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
