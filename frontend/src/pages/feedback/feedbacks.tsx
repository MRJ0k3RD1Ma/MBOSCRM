import { Card, Tabs } from "antd";

import FeedbacksTable from "./ui/feedbacks-table";
import { useUrlState } from "../../hooks/useUrlState";

const { TabPane } = Tabs;

const stateLabels: Record<string, string> = {
  ALL: "Barchasi",
  TODO: "Rejalashtirilgan",
  RUNNING: "Jarayonda",
  WAITING: "Kutilmoqda",
  COMPLETED: "Tugallangan",
  REJECTED: "Qaytarilgan",
};

const Feedbacks = () => {
  const states = ["ALL", "TODO", "RUNNING", "WAITING", "COMPLETED", "REJECTED"];

  const { page, setPage, filters, handleFilterApply } = useUrlState();
  const activeKey = filters.state || "ALL";

  return (
    <Card>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => handleFilterApply({ state: key })}
      >
        {states.map((st) => (
          <TabPane tab={stateLabels[st]} key={st}>
            <FeedbacksTable
              stateLabels={stateLabels}
              page={page}
              setPage={setPage}
              activeKey={activeKey}
            />
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
};

export default Feedbacks;
