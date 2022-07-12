import {
  AppstoreOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "../../styles/admin.module.scss";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem("Quản lý tài khoản", "account", <UsergroupAddOutlined />),
  getItem("Quản lý danh mục", "category", <PieChartOutlined />),
  getItem("Quản lý sản phẩm", "product", <DesktopOutlined />),
  getItem("Quản lý nhân viên", "3", <UsergroupAddOutlined />),
  getItem("Quản lý đơn hàng", "order", <MailOutlined />, [
    getItem("Đơn hàng đã đặt", "order-1"),
    getItem("Đơn hàng đã huỷ", "6"),
    getItem("Đơn hàng đã hoàn thành", "7"),
  ]),
  getItem("Quản lý doanh thu", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option   12", "12"),
    ]),
  ]),
  getItem("Quản lý liên hệ", "contact", <UsergroupAddOutlined />),
];
const MenuAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  return (
    <div className={collapsed ? cx(styles.left, styles.close) : styles.left}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={(values) => {
          if (values.key === "product") {
            navigate("/admin/product");
          }
          if (values.key === "category") {
            navigate("/admin");
          }
          if (values.key === "order-1") {
            navigate("/admin/order-list");
          }
          if (values.key === "account") {
            navigate("/admin/user-list");
          }
        }}
      />
    </div>
  );
};

export default MenuAdmin;
