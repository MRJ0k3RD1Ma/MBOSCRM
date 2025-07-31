import {
  Form,
  Input,
  Drawer,
  Select,
  DatePicker,
  Space,
  Button,
  InputNumber,
  Divider,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import {
  useGetAllSuppliers,
  type Supplier,
} from "../../../config/queries/supplier/supplier-querys";
import {
  useGetAllProducts,
  type Product,
} from "../../../config/queries/products/products-querys";

interface ArrivedFormModalProps {
  open: boolean;
  onClose: () => void;
  onFinish: (values: any) => void;
  initialValues?: any;
}

const ArrivedFormModal = ({
  open,
  onClose,
  onFinish,
  initialValues,
}: ArrivedFormModalProps) => {
  const [form] = Form.useForm();
  const { data } = useGetAllSuppliers();
  const { data: productId } = useGetAllProducts();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [open, initialValues]);

  return (
    <Drawer
      open={open}
      title="Yangi Kirim Qo'shish"
      onClose={onClose}
      width={700}
      destroyOnClose
      extra={
        <Button type="primary" onClick={() => form.submit()}>
          Saqlash
        </Button>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Ta'rif"
          name="description"
          rules={[{ required: true, message: "Iltimos, ta'rif kiriting" }]}
        >
          <Input placeholder="Masalan: Avgust oyidagi kirim" />
        </Form.Item>

        <Form.Item
          label="Sana"
          name="date"
          rules={[{ required: true, message: "Iltimos, sanani tanlang" }]}
        >
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Kod"
          name="code"
          rules={[{ required: true, message: "Iltimos, Kodni kiriting" }]}
        >
          <Input placeholder="Masalan: ARR-001" disabled={!!initialValues} />
        </Form.Item>

        <Form.Item
          label="Tovar hujjati"
          name="waybillNumber"
          rules={[
            { required: true, message: "Iltimos, Tovar hujjatini kiriting" },
          ]}
        >
          <Input placeholder="Masalan: WB123456" />
        </Form.Item>

        <Form.Item
          label="Yetkazib beruvchi"
          name="supplierId"
          rules={[{ required: true, message: "Yetkazib beruvchini tanlang" }]}
        >
          <Select placeholder="Yetkazib beruvchini tanlang">
            {data?.data.map((supplier: Supplier) => (
              <Select.Option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {}
        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "productId"]}
                    rules={[
                      {
                        required: true,
                        message: "Yetkazilgan mahsulotni tanlang",
                      },
                    ]}
                  >
                    <Select placeholder="Yetkazilgan mahsulot">
                      {productId?.data.map((product: Product) => (
                        <Select.Option key={product.id} value={product.id}>
                          {product.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "count"]}
                    rules={[{ required: true, message: "Soni kerak" }]}
                  >
                    <InputNumber placeholder="Soni" min={1} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    rules={[{ required: true, message: "Narxi kerak" }]}
                  >
                    <InputNumber placeholder="Narxi" min={0} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Mahsulot qo‘shish
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Divider />
      </Form>
    </Drawer>
  );
};

export default ArrivedFormModal;
