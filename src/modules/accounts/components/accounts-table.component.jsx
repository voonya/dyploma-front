import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Typography, message, Tooltip } from 'antd';
import axios from 'axios';

import { showSuccess, showError, showSystemError } from '../../common/utils/messages.utils';
import { GET_ACCOUNTS, getApiUrl } from '../../common/consts';

export const AccountsTable = () => {
  const [channels, setChannels] = useState([]);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [total, setTotal] = useState(0);

  const fetchChannels = async () => {
    try {
      const response = await axios.get(getApiUrl(GET_ACCOUNTS), { params: pagination });
      setChannels(response.data.data.accounts);
      setTotal(response.data.data.total);
    } catch (error) {
      showSystemError();
    }
  };

  const deleteAccount = async (account) => {
    try {
      const response = await axios.delete(`${getApiUrl(GET_ACCOUNTS)}/${account.id}`);
      console.log('Response:', response.data);
      showSuccess('Акаунт видалено!');
    } catch (error) {
      console.error('Error fetching channels:', error);
      showError('Помилка видалення акаунту!');
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [pagination]);

  const columns = [
    { title: 'Назва', dataIndex: 'name', key: 'name' },
    { title: 'Номер телефону', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Api Id', dataIndex: 'apiId', key: 'apiId' },
    { title: 'Api Hash', dataIndex: 'apiHash', key: 'apiHash' },
    {
      title: 'Сесія',
      dataIndex: 'session',
      key: 'session',
      ellipsis: {
        showTitle: false
      },
      render: (session) => (
        <Tooltip placement="topLeft" title={session}>
          {session}
        </Tooltip>
      )
    },
    {
      title: 'Дія',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => {
        return (
          <Popconfirm title="Видалити?" onConfirm={() => deleteAccount(record)}>
            <Typography.Link>Видалити</Typography.Link>
          </Popconfirm>
        );
      }
    }
  ];

  const handleTableChange = (pagination) => {
    setPagination({ limit: pagination.limit, page: pagination.current });
  };

  return (
    <Table
      columns={columns}
      dataSource={channels}
      pagination={{ ...pagination, total: total }}
      onChange={handleTableChange}
    />
  );
};
