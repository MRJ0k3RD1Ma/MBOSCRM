import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function SaleFeedbackButtons({
  saleFeedback,
}: {
  saleFeedback: any;
}) {
  return (
    <div className="flex gap-2 mt-4">
      {saleFeedback?.data[0]?.state === "TODO" && (
        <Button icon={<PlusOutlined />} type="primary">
          Ishni boshlash
        </Button>
      )}

      {saleFeedback?.data[0]?.state === "RUNNING" && (
        <Button icon={<PlusOutlined />} type="primary">
          Ish bajarib tugallanganligini belgilash
        </Button>
      )}

      {saleFeedback?.data[0]?.state === "COMPLETED" && (
        <Button icon={<PlusOutlined />} type="primary">
          Ishni qayta bajarish
        </Button>
      )}

      {saleFeedback?.data[0]?.state === "REJECT" && (
        <Button icon={<PlusOutlined />} type="primary">
          Ishni qayta bajarishni boshlash
        </Button>
      )}
    </div>
  );
}
