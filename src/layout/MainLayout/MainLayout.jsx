import {
  DashboardOutlined,
  PoweroffOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu, theme, Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import avatar from "assets/img/default.jpg";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, danger, children) {
  return {
    key,
    icon,
    children,
    danger,
    label,
  };
}
const items = [
  getItem("Dashboard", "/dashboard", <DashboardOutlined />),
  getItem("User", "/users", <UserOutlined />),
  getItem("Customers", "/customers", <UserOutlined />),
  getItem("Product", "/products", <UserOutlined />),
  getItem("Orders", "/orders", <UserOutlined />),
  getItem("Coupon", "/coupons", <UserOutlined />),
  getItem("Chart", "/charts", <UserOutlined />, false, [
    getItem("Bar chart", "/barchart"),
    getItem("Radial Chart", "/radial"),
    getItem("Line Chart", "/linechart"),
  ]),
  getItem("Signout", "/signout", <PoweroffOutlined />, true),
];

const MainLayout = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [current]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.key === "signout") {
    } else {
      navigate(e.key);
      setCurrent(e.key);
    }
  };

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" style={{ textAlign: "center" }}>
            <img
              src={avatar}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginTop: "5px",
              }}
            />
          </div>

          <Menu
            theme="dark"
            defaultSelectedKeys={[current]}
            mode="inline"
            items={items}
            onClick={handleClick}
            selectedKeys={[current]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Row>
              <Col md={18}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Col>
              <Col md={6}>
                <div>
                  <Avatar size="default" icon={<UserOutlined />}></Avatar>
                  Nguyen Trong Khuong
                </div>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
            {children}
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
