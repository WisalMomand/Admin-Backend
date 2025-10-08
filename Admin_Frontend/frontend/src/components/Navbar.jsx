import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Typography, Space, Avatar, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Dropdown menu for user profile
  const userMenu = {
    items: [
      {
        key: "profile",
        label: "Profile",
        icon: <UserOutlined />,
      },
      {
        key: "logout",
        label: "Logout",
        icon: <LogoutOutlined />,
        onClick: logout,
      },
    ],
  };

  const navItems = [
    { label: "Home", key: "/home", icon: <TeamOutlined /> },
    { label: "Users", key: "/admin", icon: <TeamOutlined /> },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        background: "#001529", // Dark theme color
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      {/* Logo / Title */}
      <Typography.Title
        level={3}
        style={{
          margin: 0,
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          letterSpacing: "1px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/home")}
      >
        QuizCraft
      </Typography.Title>

      {/* Navigation Menu */}
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={navItems}
        onClick={(e) => navigate(e.key)}
        theme="dark"
        style={{
          flex: 1,
          justifyContent: "center",
          background: "transparent",
          fontSize: "16px",
        }}
      />

      {/* User Section */}
      <Space>
        {user ? (
          <Dropdown menu={userMenu} placement="bottomRight" arrow>
            <Space style={{ cursor: "pointer" }}>
              <Avatar style={{ backgroundColor: "#1890ff" }} icon={<UserOutlined />} />
              <Typography.Text style={{ color: "#fff", fontWeight: 500 }}>
                {user.name || "Admin"}
              </Typography.Text>
            </Space>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            style={{
              backgroundColor: "#1890ff",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </Space>
    </Header>
  );
}

