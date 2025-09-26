import { Button, ConfigProvider, Input, Radio, Space, Spin, theme } from "antd";
import { Send, User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useGetSaleFeedbackByAlias,
  useUpdateSaleFeedback,
} from "../../../config/queries/sale/sale-feedback-querys";
import { useNavigate, useParams } from "react-router-dom";

import { ErrorPage } from "../../error/error";
import Logo from "../../../../public/LogoMbos.svg";

export default function FbProcess() {
  const navigate = useNavigate();
  const { alias } = useParams<{ alias: string }>();

  const [result, setResult] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [Score, setScore] = useState<number | null>(null);
  const [name, setName] = useState<string>("");

  const { data, isLoading } = useGetSaleFeedbackByAlias(alias!);
  const updateFeedback = useUpdateSaleFeedback();

  useEffect(() => {
    if (data && data.state === "TODO") {
      navigate("/fb/appeals");
    }
  }, [data, navigate]);

  const handleSubmit = async () => {
    if (!alias) return;
    await updateFeedback.mutateAsync({
      alias,
      result: result,
      description: Description,
      score: Score ?? undefined,
    });
    navigate("/success");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }
  if (!data) {
    return <ErrorPage />;
  }

  const fbLightTheme = {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary: "#1677ff",
      colorBgContainer: "#ffffff",
      colorBgLayout: "#f0f2f5",
      colorText: "#000000",
    },
    components: {
      Layout: {
        bodyBg: "#ffffff",
      },
      Table: {
        headerBg: "#f1f5f9",
        headerColor: "#000000",
      },
      Modal: {
        contentBg: "#ffffff",
        headerBg: "#ffffff",
        titleColor: "#000000",
        colorText: "#000000",
      },
    },
  };

  return (
    <ConfigProvider theme={fbLightTheme}>
      <div className="w-full rounded-xl px-3 py-8">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-[160px]" />
        </div>
        <div className="w-[100%] bg-[#E4F1FF] p-3 rounded-2xl">
          <div className="mb-3 bg-white p-3 rounded-xl">
            <p className="text-base font-medium text-gray-800 mb-3">
              Bajarilgan ish natijasini tanlang
              <span className="text-red-500">*</span>
            </p>
            <Radio.Group
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <Radio value="COMPLETED" className="text-sm">
                  To‘liq bajarildi
                </Radio>
                <Radio value="PART_COMPLETED" className="text-sm">
                  Qisman bajarilgan
                </Radio>
                <Radio value="NOT_COMPLETED" className="text-sm">
                  Bajarilmasdan qoldirildi
                </Radio>
              </Space>
            </Radio.Group>
          </div>

          <div className="mb-3 bg-white p-3 rounded-xl">
            <p className="text-base font-medium text-gray-800 mb-3">Izoh</p>
            <Input.TextArea
              placeholder="Izohingizni yozing..."
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none rounded-lg placeholder:text-[18px]"
            />
          </div>

          <div className="mb-3 bg-white p-3 rounded-xl">
            <p className="text-base font-medium text-gray-800 mb-3">
              Ishni bajargan xodimni 0 dan 10 gacha baholang{" "}
              <span className="text-red-500">*</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setScore(num)}
                  className={`cursor-pointer w-10 h-10 rounded-lg border-2 font-medium transition-all duration-200 ${
                    Score === num
                      ? "bg-[#0EAF69] !text-white border-[#0EAF69] scale-105"
                      : "bg-white text-gray-600 border-gray-300 hover:border-[#0EAF69]/60"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-2 bg-white p-3 rounded-xl">
            <p className="text-base font-medium text-gray-800 mb-3">
              Ismingiz (ixtiyoriy)
            </p>
            <Input
              placeholder="Ismingizni kiriting"
              value={name}
              onChange={(e) => setName(e.target.value)}
              prefix={<User size={16} className="text-gray-400 " />}
              className="rounded-lg !placeholder:text-[18px] !h-[36px]"
            />
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
          disabled={!result || Score === null || updateFeedback.isPending}
          className="w-full !h-14 !mt-3 !bg-[#0EAF69] !hover:bg-[#0ba060] border-none rounded-lg font-medium shadow-md disabled:!bg-gray-300"
          icon={<Send size={16} />}
          loading={updateFeedback.isPending}
        >
          Yuborish
        </Button>
      </div>
    </ConfigProvider>
  );
}
