import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import DoarMoedasView from 'src/views/doarMoedas/DoarMoedasView';
import MoedasEnviadasListView from 'src/views/moedasEnviadas/MoedasEnviadasListView';
import MoedasRecebidasListView from 'src/views/moedasRecebidas/MoedasRecebidasListView';
import TodasMoedasListView from 'src/views/todasMoedas/TodasMoedasListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ResgateListView from 'src/views/resgate/ResgateListView';
import RegisterView from 'src/views/auth/RegisterView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'doarMoedas', element: <DoarMoedasView /> },
      { path: 'moedasEnviadas', element: <MoedasEnviadasListView /> },
      { path: 'moedasRecebidas', element: <MoedasRecebidasListView /> },
      { path: 'moedas', element: <TodasMoedasListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'resgate', element: <ResgateListView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
