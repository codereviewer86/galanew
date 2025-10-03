import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export interface UploadResult {
  url: string;
  filename: string;
  path: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'png';
}

export class UploadService {
  private uploadDir = path.join(process.cwd(), 'uploads', 'images');
  private baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  
  // Default compression settings
  private defaultCompressionOptions: CompressionOptions = {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 85,
    format: 'jpeg'
  };

  constructor() {
    this.ensureUploadDirExists();
  }

  /**
   * Ensure upload directory exists
   */
  private async ensureUploadDirExists(): Promise<void> {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  /**
   * Upload image to local storage with compression
   * @param file - The file to upload
   * @param folder - Optional subfolder name
   * @param compressionOptions - Optional compression settings
   * @returns Promise<UploadResult>
   */
  public async uploadImage(
    file: Express.Multer.File, 
    folder: string = 'general',
    compressionOptions?: CompressionOptions
  ): Promise<UploadResult> {
    try {
      // Create subfolder if it doesn't exist
      const subfolderPath = path.join(this.uploadDir, folder);
      await fs.mkdir(subfolderPath, { recursive: true });

      const options = { ...this.defaultCompressionOptions, ...compressionOptions };
      
      // Generate unique filename with appropriate extension
      const extension = options.format === 'jpeg' ? 'jpg' : options.format!;
      const filename = `${uuidv4()}.${extension}`;
      const filePath = path.join(subfolderPath, filename);

      const originalSize = file.buffer.length;

      // Compress and optimize image using Sharp
      const compressedBuffer = await this.compressImage(file.buffer, options);
      const compressedSize = compressedBuffer.length;

      // Write compressed file to disk
      await fs.writeFile(filePath, compressedBuffer);

      // Calculate compression ratio
      const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100);

      // Generate public URL
      const publicUrl = `/uploads/images/${folder}/${filename}`;

      return {
        url: publicUrl,
        filename: filename,
        path: filePath,
        originalSize: originalSize,
        compressedSize: compressedSize,
        compressionRatio: compressionRatio,
      };
    } catch (error) {
      throw new Error(`Upload service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Compress image using Sharp
   * @param buffer - Image buffer to compress
   * @param options - Compression options
   * @returns Promise<Buffer>
   */
  private async compressImage(buffer: Buffer, options: CompressionOptions): Promise<Buffer> {
    try {
      let sharpInstance = sharp(buffer);

      // Resize if max dimensions are specified
      if (options.maxWidth || options.maxHeight) {
        sharpInstance = sharpInstance.resize(
          options.maxWidth, 
          options.maxHeight, 
          { 
            fit: 'inside', 
            withoutEnlargement: true 
          }
        );
      }

      // Apply format-specific compression
      switch (options.format) {
        case 'jpeg':
          return await sharpInstance
            .jpeg({ 
              quality: options.quality || 85,
              progressive: true,
              mozjpeg: true 
            })
            .toBuffer();
            
        case 'webp':
          return await sharpInstance
            .webp({ 
              quality: options.quality || 85,
              effort: 6 
            })
            .toBuffer();
            
        case 'png':
          return await sharpInstance
            .png({ 
              quality: options.quality || 85,
              compressionLevel: 9,
              adaptiveFiltering: true
            })
            .toBuffer();
            
        default:
          // Default to JPEG
          return await sharpInstance
            .jpeg({ 
              quality: options.quality || 85,
              progressive: true,
              mozjpeg: true 
            })
            .toBuffer();
      }
    } catch (error) {
      throw new Error(`Image compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Delete image from local storage
   * @param filePath - The full path or filename of the image to delete
   * @returns Promise<boolean>
   */
  public async deleteImage(filePath: string): Promise<boolean> {
    try {
      // If it's just a filename, construct the full path
      let fullPath = filePath;
      if (!path.isAbsolute(filePath)) {
        // Extract folder and filename from URL or path
        const urlParts = filePath.split('/');
        if (urlParts.length >= 2) {
          const folder = urlParts[urlParts.length - 2];
          const filename = urlParts[urlParts.length - 1];
          fullPath = path.join(this.uploadDir, folder, filename);
        } else {
          fullPath = path.join(this.uploadDir, filePath);
        }
      }

      await fs.unlink(fullPath);
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  /**
   * Get image info
   * @param filename - The filename to get info for
   * @returns Promise<{ exists: boolean, path?: string, url?: string }>
   */
  public async getImageInfo(filename: string, folder: string = 'general'): Promise<{ exists: boolean, path?: string, url?: string }> {
    try {
      const filePath = path.join(this.uploadDir, folder, filename);
      await fs.access(filePath);
      
      return {
        exists: true,
        path: filePath,
        url: `${this.baseUrl}/uploads/images/${folder}/${filename}`
      };
    } catch {
      return { exists: false };
    }
  }
}

export default new UploadService();
