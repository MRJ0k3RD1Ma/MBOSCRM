import { Card, Modal, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetSaleById,
  useUpdateSale,
  type Sale,
} from "../../config/queries/sale/sale-querys";
import PaidClientFormModal from "../clients/ui/paid-clients-form-modal";
import {
  useCreatePaidClient,
  type PaidClientDto,
} from "../../config/queries/clients/paid-client-querys";
import { type SaleTodo } from "../../config/queries/sale/sale-todo-querys";
import { useGetAllSaleFeedback } from "../../config/queries/sale/sale-feedback-querys";
import SaleTodoInput from "./ui/sale-todo-input";
import SaleUpdateModal from "./ui/sale-update-modal";
import SaleTodoTable from "./ui/sale-todo-table";
import SaleProductsTable from "./ui/sale-products-table";
import SaleFeedbackTable from "./ui/sale-feedback-table";
import SaleInfos from "./ui/sale-infos";
import SaleFeedbackButtons from "./ui/sale_feedback-buttons";
import SaleHeaderButtons from "./ui/sale-header-buttons";
import { useGetUserById } from "../../config/queries/users/users-querys";

const { Title } = Typography;

export default function Sale() {
  const { id } = useParams();
  const [paidOpen, setPaidOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [isClosed, setIsClosed] = useState(false);
  const [editTodo, setEditTodo] = useState<SaleTodo | null>(null);

  const { data: saleFeedback } = useGetAllSaleFeedback({
    page: 1,
    limit: 5,
    saleId: Number(id),
  });
  const { data: sale } = useGetSaleById(currentId ?? undefined);
    const { data: modify } = useGetUserById(sale?.modifyId);
  
  const createPaidClient = useCreatePaidClient();
  const updateSale = useUpdateSale();

  useEffect(() => {
    if (id) setCurrentId(Number(id));
  }, [id]);

  const onSubmit = (values: PaidClientDto) => {
    createPaidClient.mutate(values);
    setPaidOpen(false);
  };
  return (
    <Card style={{ width: "100%" }}>
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: 24,
          borderBottom: "1px solid #303030",
          paddingBottom: "20px",
        }}
      >
        <Title level={4}>Savdo tafsilotlari</Title>
        <SaleHeaderButtons
          currentId={currentId}
          sale={sale}
          setIsClosed={setIsClosed}
          setPaidOpen={setPaidOpen}
        />
      </Row>
      <div className="flex gap-6">
        <SaleInfos sale={sale} modify={modify} />
        <div className="w-[70%] flex flex-col gap-6">
          <SaleProductsTable currentId={currentId} />
          <Card
            title="Qilingan ishlar ro‘yxati"
            bordered={false}
            style={{ paddingBottom: 0 }}
          >
            <div className="w-full flex gap-2 mb-4">
              <SaleTodoInput saleId={Number(id)} saleFeedback={saleFeedback} />
            </div>
            <SaleTodoTable
              id={id}
              setEditTodo={setEditTodo}
              saleFeedback={saleFeedback}
            />
            <SaleFeedbackTable saleFeedback={saleFeedback} />
            <SaleFeedbackButtons saleFeedback={saleFeedback} />
          </Card>
        </div>
      </div>
      <PaidClientFormModal
        open={paidOpen}
        onClose={() => {
          setPaidOpen(false);
        }}
        onSubmit={onSubmit}
        clientId={Number(sale?.client?.id)}
        saleId={currentId}
      />

      <Modal
        title="Tasdiqlash"
        open={isClosed}
        onOk={() => {
          updateSale.mutate({ id: Number(currentId), state: "CLOSED" });
          setIsClosed(false);
        }}
        onCancel={() => setIsClosed(false)}
        okText="Ha"
        cancelText="Yo'q"
      >
        Rostdan ushbu savdoni tugatmoqchimisiz?
      </Modal>
      {editTodo && (
        <Modal
          open={true}
          title="Ishni tahrirlash"
          footer={null}
          onCancel={() => setEditTodo(null)}
          destroyOnClose
        >
          <SaleUpdateModal
            saleId={Number(id)}
            saleFeedback={saleFeedback}
            initialData={editTodo}
            onClose={() => setEditTodo(null)}
          />
        </Modal>
      )}
    </Card>
  );
}
