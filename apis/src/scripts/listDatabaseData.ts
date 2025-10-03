import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listSectorItemServices() {
  console.log('📋 Available SectorItemServices:');
  const services = await prisma.sectorItemService.findMany({
    include: {
      sectorItem: true,
      _count: {
        select: { details: true }
      }
    }
  });

  if (services.length === 0) {
    console.log('❌ No SectorItemServices found. Please create some first.');
    return [];
  }

  services.forEach((service, index) => {
    console.log(`${index + 1}. ID: ${service.id} | Label: "${service.label}" | Sector: "${service.sectorItem.label}" | Details: ${service._count.details}`);
  });

  return services;
}

async function listAllData() {
  console.log('\n📊 Current Database State:');
  
  // List all sector items
  const sectorItems = await prisma.sectorItem.findMany();
  console.log('\n🏷️ Sector Items:');
  sectorItems.forEach(item => {
    console.log(`- ID: ${item.id} | Label: "${item.label}"`);
  });

  // List all services
  await listSectorItemServices();

  // List existing details
  const existingDetails = await prisma.sectorItemServiceDetails.findMany({
    include: {
      sectorItemService: {
        include: {
          sectorItem: true
        }
      }
    }
  });

  console.log('\n📝 Existing Service Details:');
  if (existingDetails.length === 0) {
    console.log('❌ No service details found.');
  } else {
    existingDetails.forEach(detail => {
      console.log(`- "${detail.title}" (Service: "${detail.sectorItemService.label}" | Sector: "${detail.sectorItemService.sectorItem.label}")`);
    });
  }
}

// Run the listing function
if (require.main === module) {
  listAllData()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
}

export { listSectorItemServices, listAllData };
