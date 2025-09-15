"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionState = exports.PaymeData = exports.PaymeError = exports.PaymeMethod = void 0;
var PaymeMethod;
(function (PaymeMethod) {
    PaymeMethod["CheckPerformTransaction"] = "CheckPerformTransaction";
    PaymeMethod["CheckTransaction"] = "CheckTransaction";
    PaymeMethod["CreateTransaction"] = "CreateTransaction";
    PaymeMethod["PerformTransaction"] = "PerformTransaction";
    PaymeMethod["CancelTransaction"] = "CancelTransaction";
    PaymeMethod["GetStatement"] = "GetStatement";
})(PaymeMethod || (exports.PaymeMethod = PaymeMethod = {}));
exports.PaymeError = {
    InvalidAmount: {
        name: 'InvalidAmount',
        code: -31001,
        message: {
            uz: "Noto'g'ri summa",
            ru: 'Недопустимая сумма',
            en: 'Invalid amount',
        },
    },
    UserNotFound: {
        name: 'UserNotFound',
        code: -31050,
        message: {
            uz: 'Biz sizning hisobingizni topolmadik.',
            ru: 'Мы не нашли вашу учетную запись',
            en: "We couldn't find your account",
        },
    },
    ProductNotFound: {
        name: 'ProductNotFound',
        code: -31050,
        message: {
            uz: 'Biz mahsulotni topolmadik.',
            ru: 'Нам не удалось найти товар.',
            en: 'We could not find the product.',
        },
    },
    CantDoOperation: {
        name: 'CantDoOperation',
        code: -31008,
        message: {
            uz: 'Biz operatsiyani bajara olmaymiz',
            ru: 'Мы не можем сделать операцию',
            en: "We can't do operation",
        },
    },
    TransactionNotFound: {
        name: 'TransactionNotFound',
        code: -31003,
        message: {
            uz: 'Tranzaktsiya topilmadi',
            ru: 'Транзакция не найдена',
            en: 'Transaction not found',
        },
    },
    AlreadyDone: {
        name: 'AlreadyDone',
        code: -31060,
        message: {
            uz: "Mahsulot uchun to'lov qilingan",
            ru: 'Оплачено за товар',
            en: 'Paid for the product',
        },
    },
    Pending: {
        name: 'Pending',
        code: -31050,
        message: {
            uz: "Mahsulot uchun to'lov kutilayapti",
            ru: 'Ожидается оплата товар',
            en: 'Payment for the product is pending',
        },
    },
    InvalidAuthorization: {
        name: 'InvalidAuthorization',
        code: -32504,
        message: {
            uz: 'Avtorizatsiya yaroqsiz',
            ru: 'Авторизация недействительна',
            en: 'Authorization invalid',
        },
    },
};
var PaymeData;
(function (PaymeData) {
    PaymeData["UserId"] = "user_id";
    PaymeData["ProductId"] = "product_id";
})(PaymeData || (exports.PaymeData = PaymeData = {}));
var TransactionState;
(function (TransactionState) {
    TransactionState[TransactionState["Paid"] = 2] = "Paid";
    TransactionState[TransactionState["Pending"] = 1] = "Pending";
    TransactionState[TransactionState["PendingCanceled"] = -1] = "PendingCanceled";
    TransactionState[TransactionState["PaidCanceled"] = -2] = "PaidCanceled";
})(TransactionState || (exports.TransactionState = TransactionState = {}));
//# sourceMappingURL=transaction.enum.js.map