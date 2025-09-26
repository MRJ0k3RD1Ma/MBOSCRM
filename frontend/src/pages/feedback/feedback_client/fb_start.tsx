import { Button, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { ErrorPage } from "../../error/error";
import Logo from "../../../../public/LogoMbos.svg";
import info from "../../../../public/info.svg";
import raceta from "../../../../public/raceta.svg";
import { useEffect } from "react";
import { useGetSaleFeedbackByAlias } from "../../../config/queries/sale/sale-feedback-querys";

export default function FbStart() {
  const navigate = useNavigate();
  const { alias } = useParams<{ alias: string }>();
  const { data, isLoading } = useGetSaleFeedbackByAlias(alias!);

  useEffect(() => {
    if (data && data.state === "TODO") {
      navigate("/appeals");
    }
  }, [data, navigate]);

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 px-6 py-8 flex flex-col gap-4">
        <div className="w-full flex justify-center items-center">
          <img src={Logo} alt="" className="w-[160px] " />
        </div>
        <div className="w-[100%] bg-[#E4F1FF] p-5 flex flex-col justify-center items-center rounded-2xl">
          <p className="font-semibold text-2xl leading-[120%] tracking-normal text-center uppercase">
            XIZMAT SIFATINI
            <br />
            BAHOLANG
          </p>

          <div className="">
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              Xizmatlardan foydalanganingiz uchun tashakkur bildiramiz. Sizni
              qisqa so'rovnomamizda ishtirok etishga takif qilamiz. Ushbu
              so'rovnoma orqali biz ko'rsatgan xizmatlar sifatini baholashingiz
              va o'z fikr-mulohazalaringizni bildirishingiz imkoniyatiga ega
              bo'lasiz. Sizning fikringiz biz uchun juda muhim – u bizning
              xizmatlarimizni yanada yaxshilash va sizga yuqori sifatli
              xizmatlar taqdim etishimizga yordam beradi. Iltimos, quyidagi
              savollarga javob berib, bizning xizmatini baholashda ishtirok
              eting.
            </p>
          </div>
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(`/fb/process/${alias}`)}
          className="w-full !h-14 !bg-[#0EAF69] !hover:bg-[#0ba060] border-none rounded-lg font-medium"
          icon={<img src={raceta} alt="" />}
        >
          START
        </Button>

        <div className="w-full flex justify-center items-center gap-2 text-[#BF6A02]">
          <img src={info} alt="" className="-mt-3" />
          <p className="text-xs">
            So'rovnomani to'ldirishga atigi 1 daqiqa vaqt oladi!
          </p>
        </div>
      </div>
    </div>
  );
}
