import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from "./app/App.tsx";
import { IndustryDetailPage } from "./app/pages/IndustryDetailPage.tsx";
import { FloatingActions } from "./app/components/FloatingActions.tsx";
import { SECTION_ROUTES } from "./app/data/navigation.ts";
import "./styles/index.css";

// Strip the trailing slash from Vite's BASE_URL so it works as a Router basename.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={basename}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/industries/:slug" element={<IndustryDetailPage />} />
      {/* Section routes — each renders the home App and the pathname-scroll
          effect inside App scrolls to the matching DOM id. Keeps URLs like
          /hardware instead of /#hardware. */}
      {SECTION_ROUTES.map((section) => (
        <Route key={section} path={`/${section}`} element={<App />} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <FloatingActions />
  </BrowserRouter>,
);
