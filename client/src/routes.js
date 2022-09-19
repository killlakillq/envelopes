import React from "react";
import { Route, Routes } from 'react-router-dom';
import { EnvelopesPage } from "./pages/EnvelopesPage.js";
import { TransactionsPage } from "./pages/TransactionsPage.js";

export const useRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<EnvelopesPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    );
}