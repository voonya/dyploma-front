import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChannelsPage } from './modules/channels/channels.page';
import { PostsPage } from './modules/posts/posts.page';
import { PostsOperationsPage } from './modules/propaganda/posts-operations/posts-operations.page';
import { ReactionsPage } from './modules/propaganda/reactions/reactions.page';
import { TopicsPage } from './modules/propaganda/topics/topics.page';
import { AccountsPage } from './modules/accounts/accounts.page';
import { DashboardPage } from './modules/dashboard/dashboard.page';
import { LoginPage } from './modules/auth/login.page';
import { ProtectedRoute } from './modules/routes/protected-route';
import { PublicRoute } from './modules/routes/public-route';
import { UserProvider } from './modules/providers/user.provider';

const App = () => {
  return (
    <Router>
      <div>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/channels"
              element={
                <ProtectedRoute>
                  <ChannelsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts"
              element={
                <ProtectedRoute>
                  <PostsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/propaganda/reactions"
              element={
                <ProtectedRoute>
                  <ReactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/propaganda/topics"
              element={
                <ProtectedRoute>
                  <TopicsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <ProtectedRoute>
                  <AccountsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/propaganda/post-operations"
              element={
                <ProtectedRoute>
                  <PostsOperationsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
};
export default App;
