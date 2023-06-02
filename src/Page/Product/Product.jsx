import React from "react";
import { Helmet } from "react-helmet";
import {
  Space,
  Button,
  Popconfirm,
  Table,
  Row,
  Col,
  Typography,
  Tag,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";

const Product = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product</title>
      </Helmet>
      <Typography.Title level={3}>List Products</Typography.Title>
    </div>
  );
};

export default Product;
