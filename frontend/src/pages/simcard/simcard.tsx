import { Button, Card, Form, Space } from "antd";

import SimCardFromModal from "./ui/simcard-from-modal";
import SimCardTable from "./ui/simcard-table";
import { useState } from "react";

export default function SimCard() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <Card>
      <Space
        direction="horizontal"
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <div className="flex justify-center items-center p-3 h-8  bg-[#FFFFFF1A] rounded-[6px] text-[15px]">
          Jami simkartalar soni:
        </div>
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            setOpen(true);
          }}
        >
          + Sim karta qo‘shish
        </Button>
      </Space>

      <SimCardTable page={page} setPage={setPage} />
      <SimCardFromModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Card>
  );
}
