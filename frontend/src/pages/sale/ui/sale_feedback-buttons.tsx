import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUpdateSaleFeedbackState } from "../../../config/queries/sale/sale-feedback-querys";

export default function SaleFeedbackButtons({
  saleFeedback,
}: {
  saleFeedback: any;
}) {
  const updateState = useUpdateSaleFeedbackState();
  const firstFeedback = saleFeedback?.data?.[0];

  if (!firstFeedback) return null;

  const handleUpdateState = (newState: string) => {
    updateState.mutate({
      alias: firstFeedback.alias,
      state: newState,
    });
  };

  return (
    <div className="flex gap-2 mt-4">
      {firstFeedback.state === "TODO" && (
        <Button
          icon={<PlusOutlined />}
          type="primary"
          loading={updateState.isPending}
          onClick={() => handleUpdateState("RUNNING")}
        >
          Ishni boshlash
        </Button>
      )}

      {firstFeedback.state === "RUNNING" && (
        <Button
          icon={<PlusOutlined />}
          type="primary"
          loading={updateState.isPending}
          onClick={() => handleUpdateState("COMPLETED")}
        >
          Ish bajarib tugallanganligini belgilash
        </Button>
      )}

      {firstFeedback.state === "COMPLETED" && (
        <Button
          icon={<PlusOutlined />}
          type="primary"
          loading={updateState.isPending}
          onClick={() => handleUpdateState("TODO")}
        >
          Ishni qayta bajarish
        </Button>
      )}

      {firstFeedback.state === "REJECT" && (
        <Button
          icon={<PlusOutlined />}
          type="primary"
          loading={updateState.isPending}
          onClick={() => handleUpdateState("RUNNING")}
        >
          Ishni qayta bajarishni boshlash
        </Button>
      )}
    </div>
  );
}
