import "antd/dist/antd.css";
import { Spin, Space } from "antd";

const LoadingSpin = () => {
  return (
    <>
      <br></br>
      <Space>
        <Spin size="large" />
      </Space>
      <br></br>
      <p>Loading...</p>
    </>
  );
};

export default LoadingSpin;
