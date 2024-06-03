import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Client from "./components/client/Client";
import Admin from "./components/admin/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "./core/utils/axiosInstance";
import PublicRoute from "./PublicRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import CreateProduct from "./components/admin/product/CreateProduct";

function App() {
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await API.get("/auth/verifyToken");
            } catch (error) {
                console.error("User is not authenticated");
            }
        };
        checkAuthentication();
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ToastContainer />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PublicRoute>
                                    <Home />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <RoleBasedRoute allowedRoles={["admin"]}>
                                    <Admin />
                                </RoleBasedRoute>
                            }
                        />
                        <Route
                            path="/products/create"
                            element={
                                <RoleBasedRoute allowedRoles={["admin"]}>
                                    <CreateProduct />
                                </RoleBasedRoute>
                            }
                        />
                        <Route
                            path="/client"
                            element={
                                <RoleBasedRoute allowedRoles={["client"]}>
                                    <Client />
                                </RoleBasedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
