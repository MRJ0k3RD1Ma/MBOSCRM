import { Button, ConfigProvider, Input, Radio, Space, theme } from "antd";
import { FileText, Send, User } from "lucide-react";

import Logo from "../../../public/LogoMbos.svg";
import PhoneInput from "../../components/form/phone-input";
import { useCreateAppeal } from "../../config/queries/appeal/appeal-qurys";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FbAppeals() {
  const navigate = useNavigate();
  const createAppeal = useCreateAppeal();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [state, setState] = useState<string>("NEW");

  const handleSubmit = async () => {
    await createAppeal.mutateAsync({
      name,
      phone,
      subject,
      detail,
      state,
    });
    navigate("/success");
  };

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
      <div className="w-full  rounded-xl px-3 py-8">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-[160px]" />
        </div>

        <div className="w-[100%] bg-[#E4F1FF] p-3 rounded-2xl">
          <div className="mb-3 bg-white p-3 rounded-xl">
            <p className="text-base font-medium text-gray-800 mb-2">
              Ismingiz <span className="text-red-500">*</span>
            </p>
            <Input
              placeholder="Ismingizni kiriting"
              value={name}
              onChange={(e) => setName(e.target.value)}
              prefix={<User size={16} className="text-gray-400" />}
              className="rounded-lg !h-[36px]"
            />
          </div>

          <div className="mb-3 bg-white p-3 rounded-xl">
            <p className="text-base font-medium text-gray-800 mb-2">
              Telefon raqamingiz <span className="text-red-500">*</span>
            </p>
            <PhoneInput
              value={phone}
              onChange={(val) => setPhone(val)}
              placeholder="+998XXXXXXXXX"
            />
          </div>

          <div className="mb-3 bg-white p-3 rounded-xl">
            <p className="text-base font-medium text-gray-800 mb-2">
              Murojaat mavzusi <span className="text-red-500">*</span>
            </p>
            <Input
              placeholder="Mavzu kiriting"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              prefix={<FileText size={16} className="text-gray-400" />}
              className="rounded-lg !h-[36px]"
            />
          </div>

          <div className="mb-3 bg-white p-3 rounded-xl">
            <p className="text-base font-medium text-gray-800 mb-2">Tafsilot</p>
            <Input.TextArea
              placeholder="Muammoni batafsil yozing..."
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              rows={4}
              className="resize-none rounded-lg placeholder:text-[16px]"
            />
          </div>

          <div className="mb-3 bg-white p-3 rounded-xl">
            <p className="text-base font-medium text-gray-800 mb-2">
              Holat <span className="text-red-500">*</span>
            </p>
            <Radio.Group
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <Radio value="NEW" className="text-sm">
                  Yangi
                </Radio>
                <Radio value="IN_PROGRESS" className="text-sm">
                  Ko‘rib chiqilmoqda
                </Radio>
                <Radio value="DONE" className="text-sm">
                  Bajarildi
                </Radio>
                <Radio value="REJECTED" className="text-sm">
                  Rad etildi
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
          disabled={!name || !phone || !subject || createAppeal.isPending}
          className="w-full !h-14 !mt-3 !bg-[#0EAF69] !hover:bg-[#0ba060] border-none rounded-lg font-medium shadow-md disabled:!bg-gray-300"
          icon={<Send size={16} />}
          loading={createAppeal.isPending}
        >
          Yuborish
        </Button>
      </div>
    </ConfigProvider>
  );
}
