import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/Context";
import apiService from "./services/api.service";
import functionsService from "./services/functions.service";
import "./styles/index.scss";

import App from "./App";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Cars from "./pages/Cars";
import Reservation from "./pages/Reservation";
import RegisterInfos from "./pages/RegisterInfos";
import RegisterCars from "./pages/RegisterCars";
import RegisterManager from "./components/RegisterManager";
import ModifProfil from "./pages/ModifProfil";
import BackOfficeUtilisateur from "./pages/BackOfficeUtilisateur";
import BackOfficeAccueil from "./pages/BackOfficeAccueil";
import BackOfficeModifProfil from "./pages/backOfficeModifProfil";
import BackOfficeCars from "./pages/BackOfficeCars";
import NewCar from "./pages/NewCar";
import NewReservation from "./pages/NewReservation";
import BackOfficeModifCar from "./pages/BackOfficeModifCar";
import BackOfficeManager from "./components/BackOfficeManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContextProvider apiService={apiService}>
        <App />
      </ContextProvider>
    ),

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/myaccount",
        element: <MyAccount />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterManager />,
        children: [
          { path: "/register/logs", element: <Register /> },
          { path: "/register/infos", element: <RegisterInfos /> },
        ],
      },
      {
        path: "/register/cars",
        element: <RegisterCars />,
        loader: async () => await functionsService.getPlugTypes(),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cars",
        element: <Cars />,
        loader: async () => {
          return {
            cars: await functionsService.getMyCars(),
            plugTypes: await functionsService.getPlugTypes(),
          };
        },
      },
      {
        path: "/newcar",
        element: <NewCar />,
        loader: async () => await functionsService.getPlugTypes(),
      },
      {
        path: "/reservation",
        element: <Reservation />,
        loader: async () => functionsService.getMyReservations(),
      },
      {
        path: "/newreservation/:id",
        element: <NewReservation />,
        loader: async ({ params }) =>
          functionsService.getChargingPoint(params.id),
      },
      {
        path: "/modifprofil/",
        element: <ModifProfil />,
        loader: async () => functionsService.getMyUser(),
      },
      {
        path: "/backoffice",
        element: <BackOfficeManager />,
        loader: async () => functionsService.returnAdmin(),
        children: [
          {
            path: "/backoffice/accueil",
            element: <BackOfficeAccueil />,
            loader: async () => functionsService.getCounts(),
          },
          {
            path: "/backoffice/utilisateur",
            element: <BackOfficeUtilisateur />,
            loader: async () => functionsService.getUsers(),
          },
          {
            path: "/backoffice/cars",
            element: <BackOfficeCars />,
            loader: async () => {
              return {
                cars: await functionsService.getCars(),
                plugTypes: await functionsService.getPlugTypes(),
              };
            },
          },
          {
            path: "/backoffice/modifprofil/:userId",
            element: <BackOfficeModifProfil />,
            loader: async ({ params }) =>
              functionsService.getUser(params.userId),
          },
          {
            path: "/backoffice/modifcar/:carId",
            element: <BackOfficeModifCar />,
            loader: async ({ params }) => {
              return {
                car: await functionsService.getCar(params.carId),
                plugTypes: await functionsService.getPlugTypes(),
              };
            },
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>

  <RouterProvider router={router} />

  // </React.StrictMode>
);
