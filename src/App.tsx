import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ReaderProvider } from './contexts/ReaderContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { ReaderLayout } from './layouts/ReaderLayout';

// Pages
import { Login } from './pages/Login';
import { ChaptersIndex } from './pages/ChaptersIndex';
import { Chapter } from './pages/Chapter';
import { Settings } from './pages/Settings';
import { AboutBook } from './pages/AboutBook';
import { AboutAuthor } from './pages/AboutAuthor';
import { Post } from './pages/Post';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark text-primary">
        <span className="material-symbols-outlined animate-spin text-4xl">sync</span>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <ReaderProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Rota raiz (Login/Landing) não usa Layout (tem sua própria nav/footer na implementacao ou podemos envolver se necessário) */}
              {/* Neste caso a página de Login já tem sua própria nav e footer na modelagem original. */}
              <Route path="/" element={<Login />} />

              {/* Rotas principais do Portal (usando MainLayout público) */}
              <Route element={<MainLayout />}>
                <Route path="/capitulos" element={<ChaptersIndex />} />
                <Route path="/sobre-a-obra" element={<AboutBook />} />
                <Route path="/sobre-o-autor" element={<AboutAuthor />} />
                <Route path="/post/:slug" element={<Post />} />
              </Route>

              {/* Rota Protegida de Configurações */}
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/configuracoes" element={<Settings />} />
              </Route>

              {/* Rotas do Leitor (Públicas) */}
              <Route element={<ReaderLayout />}>
                <Route path="/capitulo/:id" element={<Chapter />} />
              </Route>

              {/* Rota 404 (fallback) */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ReaderProvider>
    </ThemeProvider>
  );
}

export default App;
