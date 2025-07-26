import { PrismaClient } from '@prisma/client';
import regions from './region.json';

interface RegionData {
  id: number;
  title: string;
}

export async function main(prisma: PrismaClient) {
  console.log(regions);
  for (const region of regions as RegionData[]) {
    await prisma.region.upsert({
      where: { id: region.id },
      update: {},
      create: {
        id: region.id,
        name: region.title,
      },
    });
    console.log(`Region ${region.title} qo'shildi`);
  }

  console.log('All regions have been seeded successfully.');
}
