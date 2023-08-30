import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";

const CheckClient: React.FC = () => (
  <Result
    icon={<SmileOutlined />}
    title="Great, you have succesfully registred!"
  />
);

export default CheckClient;
