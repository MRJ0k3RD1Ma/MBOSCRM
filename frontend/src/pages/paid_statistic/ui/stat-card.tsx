import { Card } from "antd";
import { useThemeContext } from "../../../providers/theme-provider";

type StatCardProps = {
  title: string;
  value: number | string | undefined;
  icon: React.ReactNode;
  subtitle?: string | React.ReactNode;
  bgColor: string;
  link?: string;
  cursor?: boolean;
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  bgColor,
  link,
  cursor,
}) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const titleColor = isDark ? "" : "text-gray-800";

  return (
    <Card
      className={`!border w-full ${
        isDark ? "!border-white/20 !bg-white/10" : "!border-gray-200 !bg-white"
      } !shadow-lg !hover:shadow-xl !transition-all !duration-300 hover:scale-[1.03] !backdrop-blur-xl !rounded-2xl`}
      bodyStyle={{
        padding: "16px",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ cursor: link ? "pointer" : cursor ? "pointer" : "default" }}
      >
        <div className="flex-1">
          <p
            className={`text-lg ${titleColor} opacity-90 mb-1`}
            style={{ fontWeight: 500 }}
          >
            {title}
          </p>
          <h3 className={`text-2xl font-bold ${titleColor} mb-1`}>
            {value ?? "-"}
          </h3>
          {subtitle && (
            <div className={`text-sm ${titleColor} opacity-80`}>{subtitle}</div>
          )}
        </div>
        <div
          className={`!p-3 !rounded-full ${bgColor} !backdrop-blur-sm flex items-center justify-center`}
          style={{
            minWidth: "50px",
            minHeight: "50px",
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};
