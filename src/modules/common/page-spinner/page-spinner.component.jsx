import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const PageSpinner = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 72 }} spin />} />
    </div>
  );
};
