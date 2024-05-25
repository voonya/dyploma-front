import React from 'react';
import { Collapse, Form, Input, Button, InputNumber } from 'antd';
import axios from 'axios';

import { GET_REACTIONS, getApiUrl } from '../../../common/consts';
import { showSuccess, showError } from '../../../common/utils/messages.utils';

const { Panel } = Collapse;

export const CreateReactionForm = () => {
  const onSubmit = async (values) => {
    try {
      await axios.post(getApiUrl(GET_REACTIONS), { ...values, rank: Number(values.rank) });

      showSuccess('Реакція успішно додана!');
    } catch (error) {
      showError('Помилка при створенні реакції. Спробуйте ще раз.');
      console.error('Error creating reaction:', error);
    }
  };

  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header="Додати реакцію" key="1">
        <Form
          name="createReactionForm"
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{ accountIds: [] }}
        >
          <Form.Item
            label="Реакція"
            name="reaction"
            rules={[{ required: true, message: 'Введіть реакцію!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Оцінка від 0 до 10"
            name="rank"
            rules={[{ required: true, message: 'Введіть оцінку реакції!' }]}
          >
            <InputNumber min={0} max={10} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Додати
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};
