import { useEffect, useState } from "react";

import { Button } from "antd";
import {
  useCreateSaleTodo,
  useUpdateSaleTodo,
  type SaleTodo,
} from "../../../config/queries/sale/sale-todo-querys";

interface SaleTodoInputProps {
  saleId: number;
  saleFeedback: any;
  initialData?: SaleTodo;
  onClose?: () => void;
}

export default function SaleUpdateModal({
  saleId,
  initialData,
  onClose,
}: SaleTodoInputProps) {
  const [value, setValue] = useState(initialData?.name || "");

  useEffect(() => {
    if (initialData) {
      setValue(initialData.name);
    }
  }, [initialData]);

  const createTodo = useCreateSaleTodo();
  const updateTodo = useUpdateSaleTodo();

  const handleSubmit = () => {
    if (!value.trim()) return;

    if (initialData) {
      // update
      updateTodo.mutate(
        { id: initialData.id, name: value, saleId },
        { onSuccess: () => onClose?.() }
      );
    } else {
      // create
      createTodo.mutate(
        { name: value, saleId },
        { onSuccess: () => setValue("") }
      );
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border px-2 py-1 rounded w-full"
        placeholder="Qilingan ish..."
      />
      <Button type="primary" onClick={handleSubmit}>
        {initialData ? "Saqlash" : "Qo‘shish"}
      </Button>
    </div>
  );
}
