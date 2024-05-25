import React from 'react';
import { Collapse, Form, Input, Button, message, InputNumber } from 'antd';
import axios from 'axios';
import { showError, showSuccess } from '../../../common/utils/messages.utils';
import { getApiUrl, GET_TOPICS } from '../../../common/consts';

const { Panel } = Collapse;

export const CreateTopicMessageForm = () => {
  const onSubmit = async (values) => {
    try {
      await axios.post(`${getApiUrl(GET_TOPICS)}/${values.topicId}/messages`, { ...values });
      showSuccess('Коментар успішно створено!');
    } catch (error) {
      showError('Помилка при створенні коментаря. Спробуйте ще.');
      console.error(error);
    }
  };

  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header="Створити коментар" key="1">
        <Form
          name="createTopicMessageForm"
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{ accountIds: [] }}
        >
          <Form.Item
            label="Номер теми"
            name="topicId"
            rules={[{ required: true, message: 'Введіть номер теми!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Коментар"
            name="message"
            rules={[{ required: true, message: 'Введіть оцінку реакції!' }]}
          >
            <Input.TextArea autoSize={{ minRows: 3 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Створити
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};
