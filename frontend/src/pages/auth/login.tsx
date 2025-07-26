import { Button, Card, Form, Input, message, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAdminLogin } from "../../config/queries/auth/login-querys";

const { Title } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useAdminLogin();

  const onFinish = async (values: { name: string; password: string }) => {
    try {
      await mutateAsync(values);
      navigate("/");
    } catch (err) {
      message.error("Login muvaffaqiyatsiz tugadi");
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
        loading={isPending}
      >
        <Form
          form={form}
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
            <Button type="primary" htmlType="submit" block loading={isPending}>
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
