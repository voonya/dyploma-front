import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';

import { AuthLayout } from '../common/layouts/auth.layout';
import { showSuccess } from '../common/utils/messages.utils';
import { useUser } from '../providers/user.provider';
import { LOGIN, getApiUrl } from '../common/consts';

export const LoginPage = () => {
  const { reload } = useUser();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(getApiUrl(LOGIN), values);

      localStorage.setItem('accessToken', response.data.data.accessToken);

      showSuccess('Успішний вхід!');
      reload();
    } catch (error) {
      console.error('Error creating reaction:', error);
      showError('Помилка під час входу. Спробуйте ще раз.');
    }
  };

  return (
    <AuthLayout>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        Вхід
      </Typography.Title>
      <Form
        name="login"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        style={{
          maxWidth: 600
        }}
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        //onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Юзернейм"
          name="username"
          rules={[
            { required: true, message: `Введіть ім'я користувача!` },
            { min: 2, message: 'Поле повинно містити більше 1 символу!' },
            { max: 32, message: 'Поле не може бути довшим за 32 символи!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: 'Введіть пароль!' },
            { min: 8, message: 'Поле повинно містити більше 7 символів!' },
            { max: 32, message: 'Поле не може бути довшим за 32 символи!' }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit">
            Увійти
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};
