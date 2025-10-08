import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, Card, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (values) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save token and user in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Logged in successfully");

      // ✅ Redirect to Admin Dashboard after 1.5 sec
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400 }}>
        <Typography.Title
          level={2}
          style={{ textAlign: "center", marginBottom: 24 }}
        >
          Login
        </Typography.Title>

        <Form onFinish={onSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        {error && <Alert message={error} type="error" showIcon />}
        {success && <Alert message={success} type="success" showIcon />}
      </Card>
    </div>
  );
}
