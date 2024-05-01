import React from 'react';
import { Collapse, Form, Input, Button, message, InputNumber } from 'antd';
import axios from 'axios';

const { Panel } = Collapse;

export const CreateTopicMessageForm = () => {
  const onSubmit = async (values) => {
    try {
      console.log(values);
      const response = await axios.post(`http://localhost:4000/topics/${values.topicId}/messages`, {...values});
      console.log('Response:', response.data);
      message.success('TopicMessage created successfully!');
    } catch (error) {
      console.error('Error creating topicmessage:', error);
      message.error('Failed to create topicmessage. Please try again later.');
    }
  };

  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header="Create TopicMessage" key="1">
        <Form
          name="createTopicMessageForm"
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{ accountIds: [] }}
        >
          <Form.Item
            label="Topic id"
            name="topicId"
            rules={[{ required: true, message: 'Please enter the topic id!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Topic message"
            name="message"
            rules={[{ required: true, message: 'Please enter the topicmessage rank!' }]}
          >
            <Input.TextArea autoSize={{ minRows: 3 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};