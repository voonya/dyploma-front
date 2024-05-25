import React, { useEffect, useState } from 'react';
import { Table, Select } from 'antd';
import axios from 'axios';
import './style.css';

import { renderIsPropaganda } from '../../common/utils/common';
import { GET_POSTS, getApiUrl } from '../../common/consts';
import { showSuccess, showSystemError } from '../../common/utils/messages.utils';

const { Option } = Select;

export const PostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({ limit: 10, page: 1 });
  const [total, setTotal] = useState(0);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(getApiUrl(GET_POSTS), { params: filters });
      setPosts(
        response.data.data.posts.map((post) => ({
          ...post,
          channel: post.channel.title.slice(0, 50)
        }))
      );
      setTotal(response.data.data.total);
    } catch (error) {
      showSystemError();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filters]);

  const handlePropagandaChange = async (isPropaganda, record) => {
    const isPropagandaValue = isPropaganda === 'null' ? null : isPropaganda === 'true';
    await axios
      .put(`${getApiUrl(GET_POSTS)}/${record.id}`, { ...record, isPropaganda: isPropagandaValue })
      .then(() => {
        showSuccess('Успішно');
        fetchPosts();
      })
      .catch((error) => {
        showSystemError();
      });
  };

  const renderIsPropagandaEditable = (active, record) => {
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
    );
  };

  const columns = [
    { title: 'Номер', dataIndex: 'idInSocial', key: 'idInSocial' },
    { title: 'Канал', dataIndex: 'channel', key: 'channel' },
    { title: 'Текст', dataIndex: 'msg', key: 'msg', width: '50%' },
    { title: 'Тема', dataIndex: 'topic', key: 'topicWords', render: (value) => value?.words },
    {
      title: 'Пропаганда (Передбачене)',
      dataIndex: 'isPropagandaPredicted',
      key: 'isPropagandaPredicted',
      filters: [
        {
          text: 'True',
          value: 'true'
        },
        {
          text: 'False',
          value: 'false'
        },
        {
          text: 'Null',
          value: 'null'
        }
      ],
      filterMultiple: false,
      render: renderIsPropaganda
    },
    {
      title: 'Пропаганда',
      dataIndex: 'isPropaganda',
      key: 'isPropaganda',
      filters: [
        {
          text: 'True',
          value: 'true'
        },
        {
          text: 'False',
          value: 'false'
        },
        {
          text: 'Null',
          value: 'null'
        }
      ],
      filterMultiple: false,
      render: renderIsPropagandaEditable
    },
    { title: 'Дата', dataIndex: 'socialCreationDate', key: 'socialCreationDate' }
  ];

  const handleTableChange = (pagination, filter, sorter) => {
    console.log(pagination, filter, sorter);
    setFilters({
      limit: pagination.limit,
      page: pagination.current,
      isPropaganda: filter.isPropaganda?.[0],
      isPropagandaPredicted: filter.isPropagandaPredicted?.[0]
    });
  };

  const rowClassName = (record) => {
    console.log(record);
    if (record.isPropaganda == null) {
      return 'propaganda-should-mark';
    }

    if (record.isPropaganda !== record.isPropagandaPredicted) {
      console.log(record);
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
