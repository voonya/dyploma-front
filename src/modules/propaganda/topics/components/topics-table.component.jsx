import React, { useEffect, useState } from 'react';
import { Form, Popconfirm, Table, Typography, message } from 'antd';
import axios from 'axios';
import { EditableCell } from '../../../common/components/editable-cell.component';
import { GET_TOPICS, getApiUrl } from '../../../common/consts';
import { showError, showSuccess, showSystemError } from '../../../common/utils/messages.utils';

export const TopicsTable = () => {
  const [topics, setTopics] = useState([]);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(getApiUrl(GET_TOPICS));

      setTopics(response.data.data.topics);
    } catch (error) {
      showSystemError();
      console.error('Error fetching topics:', error);
    }
  };

  const isEditing = (record) => record.id === editingKey;
  const [editingKey, setEditingKey] = useState('');
  useEffect(() => {
    fetchTopics();
  }, [editingKey]);

  const columns = [
    { title: 'Номер', dataIndex: 'id', key: 'id' },
    { title: 'Слова', dataIndex: 'words', key: 'words' }
  ];

  const [form] = Form.useForm();
  const editMessage = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record
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
          await axios.post(`${getApiUrl(GET_TOPICS)}/${data.topicId}/messages/${data.id}`, {
            ...row
          });
          showSuccess('Коментар успішно оновлено!');

          setEditingKey('');
        }
      } catch (errInfo) {
        console.error('Error creating reaction:', error);
        showError('Помилка при оновленні коментарі. Спробуйте ще раз.');
      }
    };

    const handleDelete = async (record) => {
      try {
        await axios.delete(`${getApiUrl(GET_TOPICS)}/${record.topicId}/messages/${record.id}`);
        showSuccess('Коментар успішно видалено!');
      } catch (error) {
        console.error('Error creating Message:', error);
        showError('Помилка при видаленні коментаря. Спробуйте ще раз.');
      }
    };

    const defaultColumns = [
      {
        title: 'Номер',
        dataIndex: 'id',
        key: 'messageId'
      },
      {
        title: 'Текст',
        dataIndex: 'message',
        key: 'message',
        editable: true,
        width: '70%'
      },
      {
        title: 'Дії',
        dataIndex: 'operation',
        width: '15%',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.id)}
                style={{
                  marginRight: 8
                }}
              >
                Зберегти
              </Typography.Link>
              <Popconfirm title="Відмінити?" onConfirm={cancel}>
                <a>Відмінити</a>
              </Popconfirm>
            </span>
          ) : (
            <>
              <Typography.Link
                style={{
                  marginRight: 8
                }}
                disabled={editingKey !== ''}
                onClick={() => editMessage(record)}
              >
                Редагувати
              </Typography.Link>
              <Popconfirm title="Видалити?" onConfirm={() => handleDelete(record)}>
                <Typography.Link>Видалити</Typography.Link>
              </Popconfirm>
            </>
          );
        }
      }
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
          editing: isEditing(record)
        })
      };
    });

    return (
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          columns={columns}
          dataSource={dataRow.messages}
          pagination={false}
          size="small"
          rowKey={(el) => el.id}
        />
      </Form>
    );
  };

  return (
    <Table
      columns={columns}
      dataSource={topics}
      expandable={{
        expandedRowRender
      }}
      rowKey={(data) => data.id}
    />
  );
};
