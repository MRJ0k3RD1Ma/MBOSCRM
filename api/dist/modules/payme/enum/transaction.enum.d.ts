export declare enum PaymeMethod {
    CheckPerformTransaction = "CheckPerformTransaction",
    CheckTransaction = "CheckTransaction",
    CreateTransaction = "CreateTransaction",
    PerformTransaction = "PerformTransaction",
    CancelTransaction = "CancelTransaction",
    GetStatement = "GetStatement"
}
export interface PaymeErrorMessage {
    uz: string;
    ru: string;
    en: string;
}
export interface PaymeErrorType {
    name: string;
    code: number;
    message: PaymeErrorMessage;
}
export declare const PaymeError: {
    readonly InvalidAmount: {
        readonly name: "InvalidAmount";
        readonly code: -31001;
        readonly message: {
            readonly uz: "Noto'g'ri summa";
            readonly ru: "Недопустимая сумма";
            readonly en: "Invalid amount";
        };
    };
    readonly UserNotFound: {
        readonly name: "UserNotFound";
        readonly code: -31050;
        readonly message: {
            readonly uz: "Biz sizning hisobingizni topolmadik.";
            readonly ru: "Мы не нашли вашу учетную запись";
            readonly en: "We couldn't find your account";
        };
    };
    readonly ProductNotFound: {
        readonly name: "ProductNotFound";
        readonly code: -31050;
        readonly message: {
            readonly uz: "Biz mahsulotni topolmadik.";
            readonly ru: "Нам не удалось найти товар.";
            readonly en: "We could not find the product.";
        };
    };
    readonly CantDoOperation: {
        readonly name: "CantDoOperation";
        readonly code: -31008;
        readonly message: {
            readonly uz: "Biz operatsiyani bajara olmaymiz";
            readonly ru: "Мы не можем сделать операцию";
            readonly en: "We can't do operation";
        };
    };
    readonly TransactionNotFound: {
        readonly name: "TransactionNotFound";
        readonly code: -31003;
        readonly message: {
            readonly uz: "Tranzaktsiya topilmadi";
            readonly ru: "Транзакция не найдена";
            readonly en: "Transaction not found";
        };
    };
    readonly AlreadyDone: {
        readonly name: "AlreadyDone";
        readonly code: -31060;
        readonly message: {
            readonly uz: "Mahsulot uchun to'lov qilingan";
            readonly ru: "Оплачено за товар";
            readonly en: "Paid for the product";
        };
    };
    readonly Pending: {
        readonly name: "Pending";
        readonly code: -31050;
        readonly message: {
            readonly uz: "Mahsulot uchun to'lov kutilayapti";
            readonly ru: "Ожидается оплата товар";
            readonly en: "Payment for the product is pending";
        };
    };
    readonly InvalidAuthorization: {
        readonly name: "InvalidAuthorization";
        readonly code: -32504;
        readonly message: {
            readonly uz: "Avtorizatsiya yaroqsiz";
            readonly ru: "Авторизация недействительна";
            readonly en: "Authorization invalid";
        };
    };
};
export declare enum PaymeData {
    UserId = "user_id",
    ProductId = "product_id"
}
export declare enum TransactionState {
    Paid = 2,
    Pending = 1,
    PendingCanceled = -1,
    PaidCanceled = -2
}
