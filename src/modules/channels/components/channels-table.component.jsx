import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

import { GET_CHANNEL, getApiUrl } from '../../common/consts';
import { showSystemError } from '../../common/utils/messages.utils';

export const ChannelsTable = () => {
  const [channels, setChannels] = useState([]);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [total, setTotal] = useState(0);

  const fetchChannels = async () => {
    try {
      const response = await axios.get(getApiUrl(GET_CHANNEL), { params: pagination });
      setChannels(response.data.data.channels);
      setTotal(response.data.data.total);
    } catch (error) {
      showSystemError();
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [pagination]);

  // Define columns for Ant Design Table
  const columns = [
    { title: 'Номер', dataIndex: 'idInSocial', key: 'idInSocial' },
    { title: 'Посилання', dataIndex: 'link', key: 'link' },
    { title: 'Назва', dataIndex: 'title', key: 'title' },
    { title: 'Опис', dataIndex: 'description', key: 'description' },
    { title: 'Доступні реакції', dataIndex: 'availableReactions', key: 'availableReactions' },
    {
      title: 'Останній оброблений пост',
      dataIndex: 'lastPostIdInSocial',
      key: 'lastPostIdInSocial'
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
