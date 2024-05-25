import React from 'react';
import { AccountsTable } from './components/accounts-table.component';
import { CreateAccountForm } from './components/create-account-form.component';
import { MainLayout } from '../common/layouts/main.layout';

export const AccountsPage = () => {
  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <CreateAccountForm />
        <AccountsTable />
      </div>
    </MainLayout>
  );
};
