import React, { useEffect, useState } from 'react';

import { MainLayout } from '../../common/layouts/main.layout';
import { ReactionsTable } from './components/reactions-table.component';
import { CreateReactionForm } from './components/create-reaction-form.component';

export const ReactionsPage = () => {
  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <CreateReactionForm />
        <ReactionsTable />
      </div>
    </MainLayout>
  );
};
