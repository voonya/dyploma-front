import React, { useEffect, useState } from 'react';
import { Table, Select  } from 'antd';
import axios from 'axios';
import './style.css';

const { Option } = Select; 

function toTitleCase(text) {
  return text.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
      return match.toUpperCase();
  });
}

const renderIsPropaganda = (active) => {
  return toTitleCase(`${active}`);
}

export const PostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({ limit: 10, page: 1 });
  const [total, setTotal] = useState(0);

  // Function to fetch paginated posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/post', { params: filters });
      setPosts(response.data.data.posts.map(post => ({...post, channel: post.channel.title.slice(0, 50)})));
      setTotal(response.data.data.total);

      //console.log(response.data.data.posts, response.data.data.total)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch posts when component mounts or pagination changes
  useEffect(() => {
    fetchPosts();
  }, [filters]);


  const handlePropagandaChange = async (isPropaganda, record) => {
    const isPropagandaValue = isPropaganda === "null" ? null : isPropaganda === "true";
    await axios.put(`http://localhost:4000/post/${record.id}`, { ...record, isPropaganda: isPropagandaValue })
      .then((response) => {
        console.log('Object updated:', response.data);
        fetchPosts();
        // Optionally, you can update the table data in state
      })
      .catch((error) => {
        console.error('Error updating object:', error);
    });
  }
  
  const renderIsPropagandaEditable = (active, record) => {
    //console.log(record, active, `${active}`);
    return (
      <Select
        style={{ width: 120 }}
        value={`${active}`}
        onChange={(value) => handlePropagandaChange(value, record)}
      >
        <Option value="null">Null</Option>
        <Option value="true">True</Option>
        <Option value="false">False</Option>
      </Select>
    )
  }

  // Define columns for Ant Design Table
  const columns = [
    { title: 'ID in Social', dataIndex: 'idInSocial', key: 'idInSocial' },
    { title: 'Channel', dataIndex: 'channel', key: 'channel' },
    { title: 'Message', dataIndex: 'msg', key: 'msg', width: '30%' },
    { title: 'Cleared', dataIndex: 'msgCleared', key: 'msgCleared', width: '30%' },
    { title: 'Topic', dataIndex: 'topicWords', key: 'topicWords' },
    { title: 'Propaganda (Predicted)', dataIndex: 'isPropagandaPredicted', key: 'isPropagandaPredicted', filters: [
      {
        text: 'True',
        value: 'true',
      },
      {
        text: 'False',
        value: 'false',
      },
      {
        text: 'Null',
        value: 'null',
      }], filterMultiple: false, render: renderIsPropaganda, },
    { title: 'Propaganda', dataIndex: 'isPropaganda', key: 'isPropaganda', filters: [
      {
        text: 'True',
        value: 'true',
      },
      {
        text: 'False',
        value: 'false',
      },
      {
        text: 'Null',
        value: 'null',
      }], filterMultiple: false, render: renderIsPropagandaEditable, },
    { title: 'Creation Date', dataIndex: 'socialCreationDate', key: 'socialCreationDate'},
  ];

  // Function to handle pagination change
  const handleTableChange = (pagination, filter, sorter) => {
    console.log(pagination, filter, sorter)
    setFilters({ limit: pagination.limit, page: pagination.current, isPropaganda: filter.isPropaganda?.[0], isPropagandaPredicted: filter.isPropagandaPredicted?.[0]});
  };

  const rowClassName = (record) => {
    //console.log(record);
    if(record.isPropaganda == null) {
      return 'propaganda-should-mark';
    }

    if(record.isPropaganda !== record.isPropagandaPredicted) {
      console.log(record)
      return 'row-propaganda-diff';
    }
  };

  

  return (
    <Table
      columns={columns}
      dataSource={posts}
      pagination={{ ...filters, total: total }} // Total count provided here
      rowClassName={rowClassName}
      onChange={handleTableChange}
    />
  );
};