import { useEffect, useMemo, useState } from "react";
import {
  Table,
  Select,
  Space,
  Tag,
  Button,
  message,
  Card,
  Modal,
  Form,
  Input,
  Typography
} from "antd";

const { Title } = Typography;
const API_BASE = "http://localhost:5000/api";

const statusColor = {
  approved: "green",
  pending: "gold",
  declined: "red",
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const q = statusFilter ? `?status=${statusFilter}` : "";
      const res = await fetch(`${API_BASE}/admin/users${q}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load users");
      setUsers(data.data || []);
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [statusFilter]);

  // Create new admin user
  const handleCreateAdmin = async (values) => {
    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      };

      const res = await fetch(`${API_BASE}/admin/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create admin");

      message.success("Admin user created successfully");
      setIsModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (e) {
      message.error(e.message);
    }
  };

  // Change user status
  const changeStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");
      message.success(`Status updated to ${status}`);
      fetchUsers();
    } catch (e) {
      message.error(e.message);
    }
  };

  // Table columns
  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <strong>{text}</strong>,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (role) => <Tag color="blue">{role}</Tag>,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag color={statusColor[status] || "default"} style={{ fontSize: "14px", padding: "4px 8px" }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
            <Button
              type="primary"
              shape="round"
              onClick={() => changeStatus(record._id, "approved")}
              disabled={record.status === "approved"}
            >
              Approve
            </Button>
            <Button
              danger
              shape="round"
              onClick={() => changeStatus(record._id, "declined")}
              disabled={record.status === "declined"}
            >
              Decline
            </Button>
            <Button
              shape="round"
              onClick={() => changeStatus(record._id, "pending")}
              disabled={record.status === "pending"}
            >
              Reset
            </Button>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ maxWidth: 1200, margin: "32px auto", padding: "0 16px" }}>
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          padding: "24px",
        }}
      >
        <Title level={3} style={{ marginBottom: 24 }}>
          Admin Users Management
        </Title>

        {/* Filter & Actions */}
        <Space style={{ marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 500 }}>Filter by Status:</span>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 180 }}
            options={[
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Declined", value: "declined" },
              { label: "All", value: "" },
            ]}
          />
          <Button onClick={fetchUsers} style={{ borderRadius: "8px" }}>
            Refresh
          </Button>
          <Button
            type="primary"
            style={{ borderRadius: "8px", backgroundColor: "#1890ff" }}
            onClick={() => setIsModalVisible(true)}
          >
            + Create Admin
          </Button>
        </Space>

        {/* Table */}
        <Table
          rowKey="_id"
          loading={loading}
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          bordered
          style={{ borderRadius: "10px", overflow: "hidden" }}
        />

        {/* Modal */}
        <Modal
          title={<span style={{ fontWeight: 600 }}>Create New Admin</span>}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          destroyOnClose
          style={{ top: 80 }}
        >
          <Form form={form} onFinish={handleCreateAdmin} layout="vertical">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input placeholder="Enter admin name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, type: "email", message: "Please input a valid email!" },
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input the password!" }]}
            >
              <Input.Password placeholder="Enter a secure password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block style={{ borderRadius: "8px" }}>
                Create Admin
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}


