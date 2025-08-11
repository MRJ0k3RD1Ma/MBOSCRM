import { ArrivedService } from './arrived.service';
import { CreateArrivedDto } from './dto/create-arrived.dto';
import { UpdateArrivedDto } from './dto/update-arrived.dto';
import { Request } from 'express';
import { FindAllArrivedQueryDto } from './dto/findAll-arrived-query.dto';
export declare class ArrivedController {
    private readonly arrivedService;
    constructor(arrivedService: ArrivedService);
    create(createArrivedDto: CreateArrivedDto, req: Request): Promise<{
        description: string | null;
        isDeleted: boolean | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        created: Date;
        updated: Date;
    }>;
    findAll(dto: FindAllArrivedQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            register: {
                name: string;
                username: string;
                password: string;
                phone: string | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                chatId: string | null;
                id: number;
                roleId: number | null;
            };
            ArrivedProduct: {
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                price: number | null;
                arrivedId: number | null;
                productId: number | null;
                count: number;
                priceCount: number | null;
            }[];
            supplier: {
                description: string | null;
                name: string;
                phone: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                balance: number;
                registerId: number | null;
                modifyId: number | null;
                phoneTwo: string | null;
            };
        } & {
            description: string | null;
            isDeleted: boolean | null;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            price: number;
            supplierId: number;
            date: Date | null;
            code: string | null;
            codeId: number | null;
            waybillNumber: string | null;
            created: Date;
            updated: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        register: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            chatId: string | null;
            id: number;
            roleId: number | null;
        };
        ArrivedProduct: {
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            arrivedId: number | null;
            productId: number | null;
            count: number;
            priceCount: number | null;
        }[];
        supplier: {
            description: string | null;
            name: string;
            phone: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            balance: number;
            registerId: number | null;
            modifyId: number | null;
            phoneTwo: string | null;
        };
    } & {
        description: string | null;
        isDeleted: boolean | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        created: Date;
        updated: Date;
    }>;
    update(id: string, updateArrivedDto: UpdateArrivedDto): Promise<{
        description: string | null;
        isDeleted: boolean | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        created: Date;
        updated: Date;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        isDeleted: boolean | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        created: Date;
        updated: Date;
    }>;
}
