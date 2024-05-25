import { message } from 'antd';

export const showSuccess = (text) => {
  message.success(text);
};

export const showError = (text) => {
  message.error(`${text}. Спробуйте ще раз`);
};

export const showSystemError = () => {
  message.error('Шось пішло не так... Спробуйте ще раз');
};
