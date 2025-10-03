import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function createInitialAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst();
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create initial admin
    const hashedPassword = await hash('admin123', 10);
    
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@turkmengala.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'super_admin',
      }
    });

    console.log('Initial admin user created successfully:');
    console.log('Email: admin@turkmengala.com');
    console.log('Password: admin123');
    console.log('Please change the password after first login');

  } catch (error) {
    console.error('Error creating initial admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createInitialAdmin();
