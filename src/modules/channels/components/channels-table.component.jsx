import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

export const ChannelsTable = () => {
  const [channels, setChannels] = useState([]);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [total, setTotal] = useState(0);

  // Function to fetch paginated channels
  const fetchChannels = async () => {
    try {
      const response = await axios.get('http://localhost:4000/channel', { params: pagination });
      setChannels(response.data.data.channels);
      setTotal(response.data.data.total);

      console.log(response.data.data.channels, response.data.data.total)
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  // Fetch channels when component mounts or pagination changes
  useEffect(() => {
    fetchChannels();
  }, [pagination]);

  // Define columns for Ant Design Table
  const columns = [
    { title: 'ID in Social', dataIndex: 'idInSocial', key: 'idInSocial' },
    { title: 'Link', dataIndex: 'link', key: 'link' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Available Reactions', dataIndex: 'availableReactions', key: 'availableReactions' },
    { title: 'Last Post ID in Social', dataIndex: 'lastPostIdInSocial', key: 'lastPostIdInSocial' },
  ];

  // Function to handle pagination change
  const handleTableChange = (pagination) => {
    setPagination({ limit: pagination.limit, page: pagination.current });
  };

  return (
    <Table
      columns={columns}
      dataSource={channels}
      pagination={{ ...pagination, total: total }} // Total count provided here
      onChange={handleTableChange}
    />
  );
};