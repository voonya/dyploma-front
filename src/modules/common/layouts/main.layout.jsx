import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Typography } from 'antd';
import { useUser } from '../../providers/user.provider';
const { Content, Footer, Sider } = Layout;

const { Title } = Typography;

const idToRoute = {
  1: '/dashboard',
  2: '/channels',
  3: '/posts',
  4: '/propaganda/reactions',
  5: '/propaganda/topics',
  6: '/propaganda/post-operations',
  7: '/accounts',
  8: '/logout'
};

const routeToId = {
  '/dashboard': '1',
  '/channels': '2',
  '/posts': '3',
  '/propaganda/reactions': '4',
  '/propaganda/topics': '5',
  '/propaganda/post-operations': '6',
  '/accounts': '7',
  '/logout': '8'
};

const routeBreadCrumbs = {
  '/dashboard': ['Дашбоард'],
  '/channels': ['Канали'],
  '/posts': ['Пости'],
  '/propaganda/reactions': ['Пропаганда', 'Реакції'],
  '/propaganda/topics': ['Пропаганда', 'Теми'],
  '/propaganda/post-operations': ['Пропаганда', 'Протидія'],
  '/accounts': ['Акаунти']
};

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
    link: '/channels'
  };
}

const items = [
  getItem('Дашбоард', '1', <PieChartOutlined />),
  getItem('Канали', '2', <DesktopOutlined />),
  getItem('Пости', '3', <DesktopOutlined />),
  getItem('Пропаганда', 'sub1', <UserOutlined />, [
    getItem('Реакції', '4'),
    getItem('Теми', '5'),
    getItem('Протидія', '6')
  ]),
  getItem('Облікові записи', '7', <UserOutlined />),
  getItem('Вийти', '8', <UserOutlined />)
];

export const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const { logout } = useUser();

  const onMenuClick = (e) => {
    const link = idToRoute[e.key];
    if (link === '/logout') {
      logout();

      return;
    }

    if (!!link) {
      navigate(link);
    }
  };

  const getDefaultSelectedKey = () => {
    return routeToId[location.pathname];
  };

  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Title level={2} style={{ margin: '6px', textAlign: 'center', color: 'white' }}>
          {collapsed ? 'TS' : 'TruthShield'}
        </Title>
        <Menu
          onClick={onMenuClick}
          theme="dark"
          defaultSelectedKeys={[getDefaultSelectedKey()]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '0 16px'
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0'
            }}
          >
            {routeBreadCrumbs[location.pathname]?.map((el) => (
              <Breadcrumb.Item key={el}>{el}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center'
          }}
        >
          TruthShield ©{new Date().getFullYear()} Created by Ivan Nikolaiev
        </Footer>
      </Layout>
    </Layout>
  );
};
