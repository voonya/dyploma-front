import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ChannelsPage } from './modules/channels/channels.page';
import { MainLayout } from './modules/common/layouts/main.layout';
import { PostsPage } from './modules/posts/posts.page';
import { PostsOperationsPage } from './modules/propaganda/posts-operations/posts-operations.page';
import { ReactionsPage } from './modules/propaganda/reactions/reactions.page';
import { TopicsPage } from './modules/propaganda/topics/topics.page';

const App = () => {
  return (
    <Router>
      <div>
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <div>dashboard</div>
              </MainLayout>
            }
          />
          <Route path="/channels" element={<ChannelsPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/propaganda/reactions" element={<ReactionsPage />} />
          <Route path="/propaganda/topics" element={<TopicsPage />} />
          <Route
            path="/propaganda/post-operations"
            element={<PostsOperationsPage />}
          />
          {/* Route for 404 page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
