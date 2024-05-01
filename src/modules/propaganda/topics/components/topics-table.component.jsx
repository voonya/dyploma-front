import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, message } from 'antd';
import axios from 'axios';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input.TextArea />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const TopicsTable = () => {
  const [topics, setTopics] = useState([]);

  // Function to fetch paginated topics
  const fetchTopics = async () => {
    try {
      const response = await axios.get('http://localhost:4000/topics');

      setTopics(response.data.data.topics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  // Fetch topics when component mounts or pagination changes
  const isEditing = (record) => record.id === editingKey;
  const [editingKey, setEditingKey] = useState('');
  useEffect(() => {
    fetchTopics();
  }, [editingKey]);

  // Define columns for Ant Design Table
  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id'},
    { title: 'Words', dataIndex: 'words', key: 'words'},
  ];

  
  const [form] = Form.useForm();
  const editMessage = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  
  const expandedRowRender = (dataRow) => {
    const save = async (key, ...params) => {
      try {
        const row = await form.validateFields();

        const data = dataRow.messages.find((item) => key === item.id);
  
        if (data) {
          try {
            const response = await axios.post(`http://localhost:4000/topics/${data.topicId}/messages/${data.id}`, {...row});
            console.log('Response:', response.data);
            message.success('Reaction created successfully!');

          } catch (error) {
            console.error('Error creating reaction:', error);
            message.error('Failed to create reaction. Please try again later.');
          }
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    const handleDelete = async (record) => {
          try {
            const response = await axios.delete(`http://localhost:4000/topics/${record.topicId}/messages/${record.id}`);
            console.log('Response:', response.data);
            message.success('Message created deleted!');

          } catch (error) {
            console.error('Error creating Message:', error);
            message.error('Failed to create Message. Please try again later.');
          }
        }

    const defaultColumns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'messageId',
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
        editable: true,
        width: '70%'
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        width: "15%",
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.id)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <>
            <Typography.Link style={{
                  marginRight: 8,
                }} disabled={editingKey !== ''} onClick={() => editMessage(record)}>
              Edit
            </Typography.Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
              <Typography.Link >
              Delete
            </Typography.Link>
            </Popconfirm>
          </>
          );
        },
      },
    ];

    const columns = defaultColumns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        })};
    });

    return <Form form={form}  component={false}><Table  components={{
      body: {
        cell: EditableCell,
      },
    }} columns={columns} dataSource={dataRow.messages} pagination={false} size="small" rowKey={(el) => el.id} /></Form>;
  }

  return (
    <Table
      columns={columns}
      dataSource={topics}
      expandable={{
        expandedRowRender,
      }}
      rowKey={(data) => data.id}
    />
  );
};