import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ReaderProvider } from './contexts/ReaderContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Analytics } from '@vercel/analytics/react';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { ReaderLayout } from './layouts/ReaderLayout';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { ResetPassword } from './pages/ResetPassword';
import { ChaptersIndex } from './pages/ChaptersIndex';
import { Chapter } from './pages/Chapter';
import { Settings } from './pages/Settings';
import { AboutBook } from './pages/AboutBook';
import { AboutAuthor } from './pages/AboutAuthor';
import { PostsIndex } from './pages/PostsIndex';
import { Post } from './pages/Post';
import { Search } from './pages/Search';
import { Admin } from './pages/Admin';
import { TagNetwork } from './pages/TagNetwork';

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
  const { session, loading, user } = useAuth();

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

  if (adminOnly && user?.user_metadata?.is_admin !== true) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <>
      <ThemeProvider>
        <ReaderProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Rota raiz (Landing Page) */}
                <Route path="/" element={<Landing />} />

                {/* Rota de Login */}
                <Route path="/login" element={<Login />} />

                {/* Rota de Reset de Senha */}
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Rotas principais do Portal (usando MainLayout público) */}
                <Route element={<MainLayout />}>
                  <Route path="/capitulos" element={<ChaptersIndex />} />
                  <Route path="/buscar" element={<Search />} />
                  <Route path="/artigos" element={<PostsIndex />} />
                  <Route path="/rede-de-tags" element={<TagNetwork />} />
                  <Route path="/sobre-a-obra" element={<AboutBook />} />
                  <Route path="/sobre-o-autor" element={<AboutAuthor />} />
                </Route>

                {/* Rota Protegida de Configurações */}
                <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                  <Route path="/configuracoes" element={<Settings />} />
                </Route>

                {/* Rota Admin (apenas is_admin) */}
                <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />

                {/* Rotas do Leitor (Públicas) */}
                <Route element={<ReaderLayout />}>
                  <Route path="/capitulo/:id" element={<Chapter />} />
                  <Route path="/post/:slug" element={<Post />} />
                </Route>

                {/* Rota 404 (fallback) */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ReaderProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default App;
