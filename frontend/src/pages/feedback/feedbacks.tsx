import { Card, Tabs } from "antd";

import FeedbacksTable from "./ui/feedbacks-table";
import { useState } from "react";

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
  const [activeKey, setActiveKey] = useState("ALL");
  const [page, setPage] = useState(1);

  return (
    <Card>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
          setPage(1);
        }}
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
