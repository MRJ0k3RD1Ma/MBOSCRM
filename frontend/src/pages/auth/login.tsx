import { Button, Card, Form, Input, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;

    if (username === "admin" && password === "123456") {
      message.success("Muvaffaqiyatli kirdingiz!");
      navigate("/dashboard");
    } else {
      message.error("Login yoki parol noto‘g‘ri!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--background-color)",
        padding: 24,
      }}
    >
      <Card
        title={<Title level={3}>Tizimga kirish</Title>}
        style={{ width: 360 }}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Login"
            name="username"
            rules={[{ required: true, message: "Loginni kiriting!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Login" />
          </Form.Item>

          <Form.Item
            label="Parol"
            name="password"
            rules={[{ required: true, message: "Parolni kiriting!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Parol" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
