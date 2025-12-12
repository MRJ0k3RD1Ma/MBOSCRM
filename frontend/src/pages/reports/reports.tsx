import { useState } from "react";
import { Card, Select, Collapse, Table, Button, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import {
    useGetExportStatistics,
    useDownloadReport,
} from "../../config/queries/statistics/reports-query";
import dayjs from "dayjs";

const { Panel } = Collapse;
const { Option } = Select;

const months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
];

const MonthContent = ({ year, month }: { year: number; month: number }) => {
    const { data, isLoading } = useGetExportStatistics({ year, month: month + 1 });
    const { downloadReport } = useDownloadReport();

    const handleDownload = () => {
        downloadReport(year, month + 1);
    };

    const columns = [
        { title: "#", key: "index", render: (_: any, __: any, index: number) => index + 1, width: 50 },
        { title: "Mahsulot Nomi", dataIndex: "name", key: "name" },
        { title: "Mahsulot Turi", dataIndex: "type", key: "type" },
        { title: "Oy Boshlanishiga qoldiq", dataIndex: "remiderInStartOfMonth", key: "remiderInStartOfMonth" },
        { title: "Sotilgan", dataIndex: "numberOfSold", key: "numberOfSold" },
        {
            title: "Ummumiy Summasi",
            dataIndex: "priceOfSold",
            key: "priceOfSold",
            render: (val: number) => val?.toLocaleString("ru-RU")
        },
        { title: "Kelgan", dataIndex: "numberOfArrived", key: "numberOfArrived" },
        {
            title: "Ummumiy Summasi",
            dataIndex: "priceOfArrived",
            key: "priceOfArrived",
            render: (val: number) => val?.toLocaleString("ru-RU")
        },
        { title: "Foyda", dataIndex: "profit", key: "profit", render: (val: number) => val?.toLocaleString("ru-RU") },
        { title: "Oy Oxiridagi Qoldiq", dataIndex: "remiderInEndOfMonth", key: "remiderInEndOfMonth" },
    ];

    if (isLoading) return <div style={{ textAlign: "center", padding: 20 }}><Spin /></div>;

    return (
        <div>
            <Table
                dataSource={data?.rows}
                columns={columns}
                pagination={false}
                rowKey={(record) => record.name + record.type}
                bordered
                scroll={{ x: true }}
                summary={() => {
                    if (!data?.totals) return null;
                    return (
                        <Table.Summary.Row style={{ fontWeight: "bold", }}>
                            <Table.Summary.Cell index={0} colSpan={5} className="text-right">
                                <div style={{ textAlign: "right" }}>Jami:</div>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>{data.totals.priceOfTotalSold?.toLocaleString("ru-RU")}</Table.Summary.Cell>
                            <Table.Summary.Cell index={2} />
                            <Table.Summary.Cell index={3}>{data.totals.priceOfTotalArrived?.toLocaleString("ru-RU")}</Table.Summary.Cell>
                            <Table.Summary.Cell index={4}>{data.totals.profit?.toLocaleString("ru-RU")}</Table.Summary.Cell>
                            <Table.Summary.Cell index={5} />
                        </Table.Summary.Row>
                    );
                }}
            />
            <div style={{ marginTop: 16, textAlign: "right" }}>
                <Button icon={<DownloadOutlined />} onClick={handleDownload} type="primary">
                    Download Excel
                </Button>
            </div>
        </div>
    );
};

export default function Reports() {
    const [year, setYear] = useState(dayjs().year());
    const [activeKey, setActiveKey] = useState<string | string[] | undefined>(undefined);

    const onChange = (key: string | string[]) => {
        setActiveKey(key);
    };

    return (
        <Card >
            <div style={{ marginBottom: 20 }}>
                <span style={{ marginRight: 10 }}>Yilni tanlang:</span>
                <Select value={year} onChange={setYear} style={{ width: 120 }}>
                    <Option value={2025}>2025</Option>
                    <Option value={2026}>2026</Option>
                </Select>
            </div>
            <Collapse accordion onChange={onChange}>
                {months.map((m, index) => {
                    const isActive = Array.isArray(activeKey) ? activeKey.includes(String(index)) : activeKey === String(index);
                    return (
                        <Panel header={m} key={String(index)}>
                            {isActive && <MonthContent year={year} month={index} />}
                        </Panel>
                    );
                })}
            </Collapse>
        </Card>
    );
}
