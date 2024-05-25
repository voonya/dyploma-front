import React from 'react';
import { ChannelsTable } from './components/channels-table.component';
import { CreateChannelForm } from './components/create-channel-form.component';
import { MainLayout } from '../common/layouts/main.layout';

export const ChannelsPage = () => {
  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <CreateChannelForm />
        <ChannelsTable />
      </div>
    </MainLayout>
  );
};
