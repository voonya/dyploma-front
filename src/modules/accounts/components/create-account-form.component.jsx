import React, { useState } from 'react';
import { Collapse, Form, Input, Button, message, InputNumber } from 'antd';
import axios from 'axios';
import { TelegramClient, password } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Api } from 'telegram';

const { Panel } = Collapse;

export const CreateAccountForm = () => {
  const [form] = Form.useForm();
  const [client, setClient] = useState();
  const [phoneCodeHash, setPhoneCodeHash] = useState();

  const onSendCode = async () => {
    try {
      const values = form.getFieldsValue();

      // await client.invoke(
      //   new Api.auth.SignIn({
      //     phoneNumber,
      //     phoneCodeHash,
      //     phoneCode: String(code),
      //   })
      // )

      // const session = client.session.save();

      // await client.disconnect();

      // console.log(session);

      const response = await axios.post('http://localhost:4000/accounts/code', values);
      setPhoneCodeHash(response.data.data.phoneCodeHash);
      showSuccess('Channel created successfully!');
    } catch (error) {
      console.error('Error creating channel:', error);
      showError('Failed to create channel. Please try again later.');
    }
    // console.log(form.getFieldsValue());
    // const { phoneNumber, apiId, apiHash } = form.getFieldsValue();
    // const client = new TelegramClient(new StringSession(''), Number(apiId), apiHash, { connectionRetries: 5 });
    // await client.connect() // Connecting to the server
    // const res = await client.sendCode(
    //   {
    //     apiId: Number(apiId),
    //     apiHash: apiHash
    //   },
    //   phoneNumber
    // )

    // setPhoneCodeHash(res.phoneCodeHash);
    // setClient(client);
    // try {
    //     console.log(values);
    //   const response = await axios.post('http://localhost:4000/channel', {...values, accountIds: values.accountIds.length > 0 ? values.accountIds.split(',') : []});
    //   console.log('Response:', response.data);
    //   showSuccess('Channel created successfully!');
    // } catch (error) {
    //   console.error('Error creating channel:', error);
    //   showError('Failed to create channel. Please try again later.');
    // }
  };

  const onSubmit = async (values) => {
    try {
      const { phoneNumber, apiId, apiHash, code } = values;

      // await client.invoke(
      //   new Api.auth.SignIn({
      //     phoneNumber,
      //     phoneCodeHash,
      //     phoneCode: String(code),
      //   })
      // )

      // const session = client.session.save();

      // await client.disconnect();

      // console.log(session);

      const response = await axios.post('http://localhost:4000/accounts', {
        ...values,
        phoneCodeHash
      });
      console.log('Response:', response.data);
      showSuccess('Акаунт yспішно створено!');
    } catch (error) {
      console.error('Error creating channel:', error);
      showError('Помилка при створенні акаунту. Спробуйте ще раз.');
    }
  };

  function userAuthParamCallback(param) {
    return async function () {
      return await new ((resolve) => {
        resolve(param);
      })();
    };
  }

  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header="Додати акаунт" key="1">
        <Form name="createAccountForm" onFinish={onSubmit} layout="vertical" form={form}>
          <Form.Item
            label="Назва"
            name="name"
            rules={[{ required: true, message: 'Please enter name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Api Hash"
            name="apiHash"
            rules={[{ required: true, message: 'Please enter api hash!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Api Id"
            name="apiId"
            rules={[{ required: true, message: 'Please enter api id!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Номер телефону"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please enter api hash!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Сесія"
            name="session"
            rules={[{ required: true, message: 'Please enter session!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          {/* <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: 'Please enter code!' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item>
            {/* <Button type="secondary" onClick={onSendCode}>
              Send code
            </Button> */}
            <Button type="primary" htmlType="submit">
              Додати
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};

// import React, { useState } from 'react'

// import { TelegramClient } from 'telegram'
// import { StringSession } from 'telegram/sessions'
// import { Api } from 'telegram'

// const SESSION = new StringSession('') //create a new StringSession, also you can use StoreSession
// const API_ID = 28094941 // put your API id here
// const API_HASH = 'b220ba64b0ecf5bbf57b15ee48a8c7c4' // put your API hash here

// const client = new TelegramClient(SESSION, API_ID, API_HASH, { connectionRetries: 5 }) // Immediately create a client using your application data

// const initialState = { phoneNumber: '', password: '', phoneCode: '' } // Initialize component initial state

// export function CreateAccountForm () {
//   const [{ phoneNumber, password, phoneCode, phoneCodeHash }, setAuthInfo] = useState(initialState)

//   async function sendCodeHandler () {
//     await client.connect() // Connecting to the server
//     const res = await client.sendCode(
//       {
//         apiId: API_ID,
//         apiHash: API_HASH
//       },
//       phoneNumber
//     )

//     setAuthInfo((authInfo) => ({ ...authInfo, phoneCodeHash: res.phoneCodeHash }))
//   }

//   async function clientStartHandler () {
//     console.log(phoneNumber, password, phoneCode)
//     //await client.disconnect();
//     const res = await client.invoke(
//       new Api.auth.SignIn({
//         phoneNumber,
//         phoneCodeHash,
//         phoneCode,
//       })
//     );

//     console.log(res);
//     console.log(client.session.save())
//     await client.sendMessage('me', { message: "You're successfully logged in!" })
//   }

//   function inputChangeHandler ({ target: { name, value } }) {
//     setAuthInfo((authInfo) => ({ ...authInfo, [name]: value }))
//   }

//   function userAuthParamCallback (param) {
//     return async function () {
//       return await new (resolve => {
//         resolve(param)
//       })()
//     }
//   }

//   return (
//     <>
//       <input
//         type="text"
//         name="phoneNumber"
//         value={phoneNumber}
//         onChange={inputChangeHandler}
//       />

//       <input
//         type="text"
//         name="password"
//         value={password}
//         onChange={inputChangeHandler}
//       />

//       <input type="button" value="start client" onClick={sendCodeHandler} />

//       <input
//         type="text"
//         name="phoneCode"
//         value={phoneCode}
//         onChange={inputChangeHandler}
//       />

//       <input type="button" value="insert code" onClick={clientStartHandler} />
//     </>
//   )
// }
