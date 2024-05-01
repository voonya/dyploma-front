import React from 'react';
import { Collapse, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const { Panel } = Collapse;

export const CreateChannelForm = () => {
  const onSubmit = async (values) => {
    try {
        console.log(values);
      const response = await axios.post('http://localhost:4000/channel', {...values, accountIds: values.accountIds.length > 0 ? values.accountIds.split(',') : []});
      console.log('Response:', response.data);
      message.success('Channel created successfully!');
    } catch (error) {
      console.error('Error creating channel:', error);
      message.error('Failed to create channel. Please try again later.');
    }
  };

  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header="Create Channel" key="1">
        <Form
          name="createChannelForm"
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{ accountIds: [] }}
        >
          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: 'Please enter the channel link!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Account IDs"
            name="accountIds"
          >
            <Input.TextArea autoSize={{ minRows: 3 }} placeholder="Enter account IDs separated by commas" />
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