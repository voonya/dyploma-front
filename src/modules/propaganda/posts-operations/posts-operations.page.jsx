import React, { useEffect, useState } from 'react';

import { MainLayout } from '../../common/layouts/main.layout';
import { PostsOperationsTable } from './components/posts-operations-table.component';


export const PostsOperationsPage = () => {
  return (
    <MainLayout>
      <div style={{display: "flex", flexDirection: 'column', gap: "12px"}}>
        <PostsOperationsTable />
      </div>
    </MainLayout>
  );
};