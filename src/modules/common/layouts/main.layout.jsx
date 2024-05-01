import { Space, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Typography } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const { Title } = Typography;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const idToRoute = {
    '1': '/dashboard',
    '2': '/channels',
    '3': '/posts',
    '4': '/propaganda/reactions',
    '5': '/propaganda/topics',
    '6': '/propaganda/post-operations',
}

const routeToId = {
    '/dashboard': '1',
    '/channels': '2',
    '/posts': '3',
    '/propaganda/reactions': '4',
    '/propaganda/topics': '5',
    '/propaganda/post-operations': '6',
  };

  const routeBreadCrumbs = {
    '/dashboard': ['Dashboard'],
    '/channels': ['Channels'],
    '/posts': ['Posts'],
    '/propaganda/reactions': ['Propaganda', 'Reactions'],
    '/propaganda/topics':  ['Propaganda', 'Topics'],
    '/propaganda/post-operations':  ['Propaganda', 'Post Operations'],
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
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Channels', '2', <DesktopOutlined />),
  getItem('Posts', '3', <DesktopOutlined />),
  getItem('Propaganga', 'sub1', <UserOutlined />, [
    getItem('Reaction', '4'),
    getItem('Topics', '5'),
    getItem('Post Operations', '6'),
  ]),
];

export const MainLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick = (e) => {
    const link = idToRoute[e.key];

    if(!!link) {
        navigate(link);
    }
  }

  const getDefaultSelectedKey = () => {
    return routeToId[location.pathname]
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Title level={2} style={{margin: "6px", textAlign: "center", color: "white"}}>{collapsed ? 'BF' : 'BotFarm'}</Title>
        <Menu onClick={onMenuClick} theme="dark" defaultSelectedKeys={[getDefaultSelectedKey()]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {routeBreadCrumbs[location.pathname]?.map(el => (<Breadcrumb.Item key={el}>{el}</Breadcrumb.Item>))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Bot Farm ©{new Date().getFullYear()} Created by Ivan Nikolaiev
        </Footer>
      </Layout>
    </Layout>
  );
};