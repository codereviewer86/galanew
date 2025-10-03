import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const detailsDataStatic = [
  {
    title: 'Liner Hanger',
    description:
      'Compliance to damaged or deformed casings, enhanced reliability for the life of the well',
    imageSrc: 'completionS1.jpg', // You'll need to update these image paths
  },
  {
    title: 'Tieback Liner',
    description:
      'Ensure reliability and efficiency while simplifying well construction',
    imageSrc: 'completionS2.jpg',
  },
  {
    title: 'Advanced Well Architecture',
    description:
      'The AWA system provides zonal isolation and zonal control –for an open hole intelligent completion',
    imageSrc: 'completionS3.jpg',
  },
  {
    title: 'Well Construction & Integrity',
    description:
      'Eliminate sustained casing pressure via enhanced well integrity',
    imageSrc: 'completionS4.jpg',
  },
  {
    title: 'Inner-String Packer',
    description: 'Create a reliable and high-integrity seal',
    imageSrc: 'completionS5.jpg',
  },
  {
    title: 'Zonal Isolation',
    description: 'Enhanced zonal isolation within the reservoir',
    imageSrc: 'completionS6.jpg',
  },
  {
    title: 'Zonal Control',
    description: 'Optimize well delivery in changing reservoir conditions',
    imageSrc: 'completionS7.jpg',
  },
  {
    title: 'Well Abandonment',
    description: 'Enhance well construction for CAPEX effective P&A',
    pdfUrl:
      'https://turkmengala.com/admin/storage/item_feature/pdf/vUVVLUv7gzBjnSS75U6NidTrRhjsghwdOJjOaLzz.pdf',
    imageSrc: 'completionS8.jpg',
  },
  {
    title: 'CARBON CAPTURE AND STORAGE',
    description:
      'To reduce CO2 emissions in the atmosphere and mitigate climate change',
    imageSrc: 'completionS9.jpg',
  },
];

async function seedSectorItemServiceDetails() {
  try {
    console.log('Starting to seed SectorItemServiceDetails...');

    // First, let's find an existing SectorItemService to associate these details with
    // You'll need to update this ID based on your actual data
    const existingSectorItemService = await prisma.sectorItemService.findFirst();
    
    if (!existingSectorItemService) {
      console.error('No SectorItemService found. Please create a SectorItemService first.');
      return;
    }

    console.log(`Using SectorItemService ID: ${existingSectorItemService.id}`);

    // Delete existing details for this service (optional - remove if you want to keep existing data)
    await prisma.sectorItemServiceDetails.deleteMany({
      where: {
        sectorItemServiceId: existingSectorItemService.id
      }
    });

    // Insert the new details
    for (const detail of detailsDataStatic) {
      await prisma.sectorItemServiceDetails.create({
        data: {
          title: detail.title,
          description: [detail.description], // Convert string to array
          pdfUrl: detail.pdfUrl || null,
          imageSrc: detail.imageSrc,
          sectorItemServiceId: existingSectorItemService.id,
        },
      });
      console.log(`✅ Inserted: ${detail.title}`);
    }

    console.log('✅ Successfully seeded all SectorItemServiceDetails');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Alternative function to create details for a specific service ID
async function seedForSpecificService(sectorItemServiceId: number) {
  try {
    console.log(`Starting to seed SectorItemServiceDetails for service ID: ${sectorItemServiceId}...`);

    // Check if the service exists
    const service = await prisma.sectorItemService.findUnique({
      where: { id: sectorItemServiceId }
    });

    if (!service) {
      console.error(`SectorItemService with ID ${sectorItemServiceId} not found.`);
      return;
    }

    // Insert the details
    for (const detail of detailsDataStatic) {
      await prisma.sectorItemServiceDetails.create({
        data: {
          title: detail.title,
          description: [detail.description], // Convert string to array
          pdfUrl: detail.pdfUrl || null,
          imageSrc: detail.imageSrc,
          sectorItemServiceId: sectorItemServiceId,
        },
      });
      console.log(`✅ Inserted: ${detail.title}`);
    }

    console.log('✅ Successfully seeded all SectorItemServiceDetails');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
if (require.main === module) {
  // You can uncomment one of these based on your needs:
  
  // Option 1: Use the first available SectorItemService
  seedSectorItemServiceDetails();
  
  // Option 2: Use a specific SectorItemService ID (replace 1 with the actual ID)
  // seedForSpecificService(1);
}

export { seedSectorItemServiceDetails, seedForSpecificService };
