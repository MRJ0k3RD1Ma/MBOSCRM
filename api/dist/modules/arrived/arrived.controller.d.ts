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
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        waybillNumber: string | null;
        code: string | null;
        codeId: number | null;
        created: Date;
        updated: Date;
    }>;
    findAll(dto: FindAllArrivedQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            supplier: {
                description: string | null;
                name: string;
                phone: string;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                balance: number;
                registerId: number | null;
                modifyId: number | null;
                phoneTwo: string | null;
            };
            register: {
                name: string;
                username: string;
                password: string;
                phone: string | null;
                roleId: number | null;
                chatId: string | null;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
            };
            ArrivedProduct: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                price: number | null;
                arrivedId: number | null;
                productId: number | null;
                count: number;
                priceCount: number | null;
            }[];
        } & {
            description: string | null;
            id: number;
            isDeleted: boolean | null;
            registerId: number | null;
            modifyId: number | null;
            price: number;
            supplierId: number;
            date: Date | null;
            waybillNumber: string | null;
            code: string | null;
            codeId: number | null;
            created: Date;
            updated: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        supplier: {
            description: string | null;
            name: string;
            phone: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            registerId: number | null;
            modifyId: number | null;
            phoneTwo: string | null;
        };
        register: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
        ArrivedProduct: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            arrivedId: number | null;
            productId: number | null;
            count: number;
            priceCount: number | null;
        }[];
    } & {
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        waybillNumber: string | null;
        code: string | null;
        codeId: number | null;
        created: Date;
        updated: Date;
    }>;
    update(id: string, updateArrivedDto: UpdateArrivedDto): Promise<{
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        waybillNumber: string | null;
        code: string | null;
        codeId: number | null;
        created: Date;
        updated: Date;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        waybillNumber: string | null;
        code: string | null;
        codeId: number | null;
        created: Date;
        updated: Date;
    }>;
}
