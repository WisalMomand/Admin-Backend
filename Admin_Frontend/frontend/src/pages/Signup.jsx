import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Typography, Card, Alert } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) throw new Error(data.message || "Signup failed");

      console.log("Signup successful:", data);
      navigate("/login", { state: { success: "Account created! Please login." } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f0f2f5" }}>
      <Card style={{ width: 400 }}>
        <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          Signup
        </Typography.Title>

        <Form onFinish={onSubmit} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input your Name!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your Email!" }, { type: "email", message: "Enter a valid email!" }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
              Create account
            </Button>
          </Form.Item>
        </Form>

        {error && <Alert message={error} type="error" showIcon style={{ marginTop: 16 }} />}

        <div style={{ marginTop: 16, textAlign: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Card>
    </div>
  );
}
