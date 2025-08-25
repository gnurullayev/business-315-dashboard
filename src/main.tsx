import React from "react";
import { createRoot } from "react-dom/client";
import "@/assets/scss/styles.scss";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary/index.tsx";
import { getPersistor } from "@rematch/persist";
import { store } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import "@/i18n";
import { ToastContainer } from "react-toastify";

const persistor = getPersistor();
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
            <ToastContainer />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
