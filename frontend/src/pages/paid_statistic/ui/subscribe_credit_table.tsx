import { Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ClientsPaidFilter from "./clients_paid_filter";
import { useGetAllSubscribes } from "../../../config/queries/subscribe/subscribe-querys";
import { useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function SubscribeCreditTable({
    fromDate,
    toDate,
}: {
    fromDate: string;
    toDate: string;
}) {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [filters, setFilters] = useState<any>({});
    const [filterOpen, setFilterOpen] = useState(false);

    const { data: subscribes, isLoading } = useGetAllSubscribes({
        page,
        limit,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
        ...filters,
        state: "NOTPAYING",
    });

    const columns = [
        indexColumn(page, limit),
        { title: "Mijoz", dataIndex: ["client", "name"] },
        { title: "Telefon raqami", dataIndex: ["client", "phone"] },
        {
            title: "Obuna narxi",
            dataIndex: "price",
            render: (v: number) =>
                v ? v.toLocaleString("uz-UZ") + " so'm" : "0 so'm",
        },
        {
            title: "To'langan",
            dataIndex: "paid",
            render: (v: number) =>
                v ? v.toLocaleString("uz-UZ") + " so'm" : "0 so'm",
        },
        {
            title: "Qarzdorlik",
            key: "credit",
            render: (_: any, record: any) => {
                const credit = (record.price || 0) - (record.paid || 0);
                return credit > 0 ? credit.toLocaleString("uz-UZ") + " so'm" : "0 so'm";
            },
        },
        {
            title: "Sana",
            dataIndex: "paying_date",
            render: (v: string) => (v ? dayjs(v).format("YYYY-MM-DD") : "-"),
        },
    ];

    return (
        <div>
            <ClientsPaidFilter
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                initialValues={filters}
                onApply={(values) => {
                    setFilters(values);
                    setPage(1);
                }}
            />

            <Table
                rowKey="id"
                columns={columns}
                dataSource={subscribes?.data || []}
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: subscribes?.total || 0,
                    onChange: setPage,
                }}
                onChange={(_, __, sorter: any) => {
                    if (!sorter.field) return;
                }}
                onRow={(record: any) => ({
                    onClick: (e) => {
                        if (
                            (e.target as HTMLElement).closest("button") ||
                            (e.target as HTMLElement).closest("svg")
                        )
                            return;
                        navigate(`/client/${record.client?.id}`);
                    },
                })}
            />
        </div>
    );
}
