import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { GET_OPERATIONS, getApiUrl } from '../../../common/consts';
import { showSystemError } from '../../../common/utils/messages.utils';

export const PostsOperationsTable = () => {
  const [operations, setOperations] = useState([]);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [total, setTotal] = useState(0);

  const fetchOperations = async () => {
    try {
      const response = await axios.get(getApiUrl(GET_OPERATIONS), { params: pagination });
      setOperations(response.data.data.postsOperations);
      setTotal(response.data.data.total);
    } catch (error) {
      showSystemError();
    }
  };

  useEffect(() => {
    console.log('gerer');
    fetchOperations();
  }, [pagination]);

  const columns = [
    { title: 'Номер', dataIndex: 'post', key: 'idInSocial', render: (object) => object.idInSocial },
    { title: 'Текст', dataIndex: 'post', key: 'message', render: (object) => object.msg },
    { title: 'Акаунт', dataIndex: 'account', key: 'account', render: (object) => object.name },
    {
      title: 'Реакція',
      dataIndex: 'reaction',
      key: 'reaction',
      render: (object) => object?.reaction
    },
    {
      title: 'Коментар',
      dataIndex: 'comment',
      key: 'comment',
      render: (object) => object?.message
    },
    { title: 'Дата', dataIndex: 'createdAt', key: 'createdAt' }
  ];

  const handleTableChange = (pagination) => {
    setPagination({ limit: pagination.limit, page: pagination.current });
  };

  return (
    <Table
      columns={columns}
      dataSource={operations}
      pagination={{ ...pagination, total: total }}
      onChange={handleTableChange}
    />
  );
};
