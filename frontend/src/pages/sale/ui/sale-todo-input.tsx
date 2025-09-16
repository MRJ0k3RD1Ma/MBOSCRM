import { Button, Input } from "antd";
import { useEffect, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { useCreateSaleTodo } from "../../../config/queries/sale/sale-todo-querys";
import { useGetAllTodos } from "../../../config/queries/sale/todo-querys";

interface Props {
  saleId: number;
  saleFeedback: any;
}

export default function SaleTodoInput({ saleId, saleFeedback }: Props) {
  const [search, setSearch] = useState("");
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: todos } = useGetAllTodos({
    name: search.length >= 3 ? search : undefined,
  });
  const createSaleTodo = useCreateSaleTodo();

  const handleSelect = (name: string) => {
    setSelectedName(name);
    setSearch(name);
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    if (!saleId) return;

    const nameToSend = selectedName || search;

    if (!nameToSend.trim()) return;

    createSaleTodo.mutate({ saleId, name: nameToSend });

    setSearch("");
    setSelectedName(null);
  };

  useEffect(() => {
    if (search.length >= 3) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [search]);

  return (
    <div className="relative w-full flex gap-2 mb-4">
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedName(null); // ✅ Input o‘zgarsa dropdown tanlovi bekor bo‘ladi
        }}
        placeholder="Ishlarni yozing"
      />
      {(saleFeedback?.data?.[0]?.state === "TODO" ||
        saleFeedback?.data?.[0]?.state === "REJECT") && (
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleSubmit}
          disabled={!search.trim()} // ✅ input bo‘sh bo‘lsa disable
        >
          Qo‘shish
        </Button>
      )}

      {showDropdown && todos && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            width: "100%",
            borderRadius: 4,
            background: "#001529",
            zIndex: 1000,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {todos.map((t) => (
            <div
              key={t.id}
              onClick={() => handleSelect(t.name)}
              style={{
                padding: "6px 12px",
                cursor: "pointer",
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              <p>{t.name}</p>
            </div>
          ))}
          {todos.length === 0 && (
            <div style={{ padding: "6px 12px", color: "#999" }}>
              Hech narsa topilmadi
            </div>
          )}
        </div>
      )}
    </div>
  );
}
