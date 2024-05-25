import React, { useEffect, useState } from 'react';

import { MainLayout } from '../common/layouts/main.layout';
import { PostsTable } from './components/posts-table.component';
import axios from 'axios';

export const PostsPage = () => {
  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <PostsTable />
      </div>
    </MainLayout>
  );
};
