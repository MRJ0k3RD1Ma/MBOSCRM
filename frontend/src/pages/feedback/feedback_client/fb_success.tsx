import Check from "../../../../public/check.svg";
import Logo from "../../../../public/LogoMbos.svg";

export default function FbSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 px-6 py-8 flex flex-col gap-4">
        <div className="w-full flex justify-center items-center ">
          <img src={Logo} alt="" className="w-[160px] " />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="mb-8">
            <img src={Check} alt="" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Rahmat!</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
