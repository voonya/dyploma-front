import React from 'react';
import { Collapse, Form, Input, Button } from 'antd';
import axios from 'axios';
import { showSuccess, showError } from '../../common/utils/messages.utils';
import { GET_CHANNEL, getApiUrl } from '../../common/consts';

const { Panel } = Collapse;

export const CreateChannelForm = () => {
  const onSubmit = async (values) => {
    try {
      await axios.post(getApiUrl(GET_CHANNEL), { ...values });

      showSuccess('Канал успішно створено!');
    } catch (error) {
      showError('Помилка при створені канал. Спробуйте ще раз');
      console.error('Помилка при створенні каналу:', error);
    }
  };

  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header="Додати канал" key="1">
        <Form
          name="createChannelForm"
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{ accountIds: [] }}
        >
          <Form.Item
            label="Посилання"
            name="link"
            rules={[{ required: true, message: 'Введіть посилання на канал!' }]}
          >
            <Input />
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
