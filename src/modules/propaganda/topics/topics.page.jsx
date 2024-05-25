import React from 'react';

import { MainLayout } from '../../common/layouts/main.layout';
import { TopicsTable } from './components/topics-table.component';
import { CreateTopicMessageForm } from './components/create-message-form.component';

export const TopicsPage = () => {
  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <CreateTopicMessageForm />
        <TopicsTable />
      </div>
    </MainLayout>
  );
};
