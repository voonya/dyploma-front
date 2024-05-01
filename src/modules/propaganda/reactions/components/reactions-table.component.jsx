import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

export const ReactionsTable = () => {
  const [reactions, setReactions] = useState([]);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [total, setTotal] = useState(0);

  // Function to fetch paginated reactions
  const fetchReactions = async () => {
    try {
      const response = await axios.get('http://localhost:4000/reactions', { params: pagination });
      setReactions(response.data.data.reactions);
      setTotal(response.data.data.total);

      console.log(response.data.data.postsReactions, response.data.data.total)
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };

  // Fetch reactions when component mounts or pagination changes
  useEffect(() => {
    fetchReactions();
  }, [pagination]);

  // Define columns for Ant Design Table
  const columns = [
    { title: 'id', dataIndex: 'id', key: 'id'},
    { title: 'Reaction', dataIndex: 'reaction', key: 'reaction' },
    { title: 'Rank', dataIndex: 'rank', key: 'rank' },
  ];

  // Function to handle pagination change
  const handleTableChange = (pagination) => {
    setPagination({ limit: pagination.limit, page: pagination.current });
  };

  return (
    <Table
      columns={columns}
      dataSource={reactions}
      pagination={{ ...pagination, total: total }} // Total count provided here
      onChange={handleTableChange}
    />
  );
};