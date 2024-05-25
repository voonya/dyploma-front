import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export const AuthLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: '400px' }}>{children}</div>
      </Content>
    </Layout>
  );
};
