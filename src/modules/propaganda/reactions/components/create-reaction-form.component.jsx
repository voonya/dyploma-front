import React from 'react';
import { Collapse, Form, Input, Button, message, InputNumber } from 'antd';
import axios from 'axios';

const { Panel } = Collapse;

export const CreateReactionForm = () => {
  const onSubmit = async (values) => {
    try {
        console.log(values);
      const response = await axios.post('http://localhost:4000/reactions', {...values, rank: Number(values.rank)});
      console.log('Response:', response.data);
      message.success('Reaction created successfully!');
    } catch (error) {
      console.error('Error creating reaction:', error);
      message.error('Failed to create reaction. Please try again later.');
    }
  };

  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header="Create Reaction" key="1">
        <Form
          name="createReactionForm"
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{ accountIds: [] }}
        >
          <Form.Item
            label="Reaction"
            name="reaction"
            rules={[{ required: true, message: 'Please enter the reaction!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Rank from 0 to 10"
            name="rank"
            rules={[{ required: true, message: 'Please enter the reaction rank!' }]}
          >
            <InputNumber min={0} max={10} />
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