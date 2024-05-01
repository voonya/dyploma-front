import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

export const PostsOperationsTable = () => {
  const [operations, setOperations] = useState([]);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [total, setTotal] = useState(0);

  // Function to fetch paginated operations
  const fetchOperations = async () => {
    try {
      const response = await axios.get('http://localhost:4000/post/operations', { params: pagination });
      setOperations(response.data.data.postsOperations);
      setTotal(response.data.data.total);

      console.log(response.data.data.postsOperations, response.data.data.total)
    } catch (error) {
      console.error('Error fetching operations:', error);
    }
  };

  // Fetch operations when component mounts or pagination changes
  useEffect(() => {
    fetchOperations();
  }, [pagination]);

  // Define columns for Ant Design Table
  const columns = [
    { title: 'ID in Social', dataIndex: 'post', key: 'idInSocial', render: (object) => object.idInSocial},
    { title: 'Message', dataIndex: 'post', key: 'message', render: (object) => object.msg },
    { title: 'Reaction', dataIndex: 'reaction', key: 'reaction' },
    { title: 'Comment', dataIndex: 'comment', key: 'comment' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  ];

  // Function to handle pagination change
  const handleTableChange = (pagination) => {
    setPagination({ limit: pagination.limit, page: pagination.current });
  };

  return (
    <Table
      columns={columns}
      dataSource={operations}
      pagination={{ ...pagination, total: total }} // Total count provided here
      onChange={handleTableChange}
    />
  );
};