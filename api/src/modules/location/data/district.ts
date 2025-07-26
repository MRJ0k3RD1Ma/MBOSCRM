import { PrismaClient } from '@prisma/client';
import districts from './district.json';

interface DistrictData {
  id: number;
  title: string;
  region_id: number;
}

export async function main(prisma: PrismaClient) {
  for (const district of districts as DistrictData[]) {
    await prisma.district.upsert({
      where: { id: district.id }, // id должно быть строкой
      update: {}, // Здесь можно добавить логику обновления, если нужно
      create: {
        id: district.id, // Преобразуем id в строку
        name: district.title,
        regionId: district.region_id, // Преобразуем regionId в строку
      },
    });
    console.log(`District ${district.title} qo'shildi.`);
  }

  console.log("Barcha Tumanlar muvaffaqiyatli qo'shildi");
}
