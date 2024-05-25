import React, { useEffect, useState } from 'react';
import { Form, Popconfirm, Table, Typography } from 'antd';
import axios from 'axios';

import { GET_REACTIONS, getApiUrl } from '../../../common/consts';
import { EditableCell } from '../../../common/components/editable-cell.component';
import { showSystemError, showError, showSuccess } from '../../../common/utils/messages.utils';

export const ReactionsTable = () => {
  const [reactions, setReactions] = useState([]);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [total, setTotal] = useState(0);

  const fetchReactions = async () => {
    try {
      const response = await axios.get(getApiUrl(GET_REACTIONS), { params: pagination });
      setReactions(response.data.data.reactions);
      setTotal(response.data.data.total);
    } catch (error) {
      showSystemError();
      console.error('Error fetching reactions:', error);
    }
  };
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    fetchReactions();
  }, [pagination, editingKey]);

  const editReactions = (record) => {
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

  const isEditing = (record) => record.id === editingKey;

  const save = async (key) => {
    try {
      const row = await form.validateFields();

      const data = reactions.find((item) => key === item.id);

      if (data) {
        await axios.put(`${getApiUrl(GET_REACTIONS)}/${data.id}`, { ...row });
        showSuccess('Реакцію успішно оновлено!');

        setEditingKey('');
      }
    } catch (errInfo) {
      showError('Помилка при оновленні реакції. Спробуйте ще раз.');
      console.error('Error creating reaction:', error);
    }
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`${getApiUrl(GET_REACTIONS)}/${record.id}`);
      showSuccess('Реакцію успішно видалено!');
    } catch (error) {
      showError('Помилка при видаленні реакції. Спробуйте ще раз.');
      console.error('Error creating Message:', error);
    }
  };

  const handleTableChange = (pagination) => {
    setPagination({ limit: pagination.limit, page: pagination.current });
  };

  const defaultColumns = [
    { title: 'Номер', dataIndex: 'id', key: 'id' },
    { title: 'Реакція', dataIndex: 'reaction', key: 'reaction', editable: true },
    { title: 'Оцінка', dataIndex: 'rank', key: 'rank', editable: true },
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
              onClick={() => editReactions(record)}
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
        dataSource={reactions}
        columns={columns}
        pagination={{ ...pagination, total: total }}
        onChange={handleTableChange}
      />
    </Form>
  );
};
