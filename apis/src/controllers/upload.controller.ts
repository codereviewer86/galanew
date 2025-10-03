import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import uploadService, { CompressionOptions } from '../services/upload.service';

export class UploadController {
  /**
   * Upload image endpoint
   * @route POST /api/upload/image
   */
  public uploadImage = async (req: Request, res: Response) => {
    try {
      const file = req.file;

      if (!file) {
        throw new HttpException(400, 'No image file provided');
      }

      // Validate file type
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new HttpException(400, 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed');
      }

      // Validate file size (max 10MB before compression)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new HttpException(400, 'File size too large. Maximum size is 10MB');
      }

      // Get compression options from query parameters
      const quality = req.query.quality ? parseInt(req.query.quality as string) : undefined;
      const maxWidth = req.query.maxWidth ? parseInt(req.query.maxWidth as string) : undefined;
      const maxHeight = req.query.maxHeight ? parseInt(req.query.maxHeight as string) : undefined;
      const format = req.query.format as 'jpeg' | 'webp' | 'png' || 'jpeg';

      const compressionOptions: CompressionOptions = {
        quality: quality && quality > 0 && quality <= 100 ? quality : 85,
        maxWidth: maxWidth && maxWidth > 0 ? maxWidth : 1920,
        maxHeight: maxHeight && maxHeight > 0 ? maxHeight : 1080,
        format: format
      };

      // Upload to local storage with compression
      const result = await uploadService.uploadImage(file, 'sector-items', compressionOptions);

      res.status(200).json({
        success: true,
        message: 'Image uploaded and compressed successfully',
        url: result.url,
        filename: result.filename,
        compression: {
          originalSize: result.originalSize,
          compressedSize: result.compressedSize,
          compressionRatio: `${result.compressionRatio}%`,
          savedBytes: result.originalSize - result.compressedSize
        }
      });
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({
          success: false,
          message: error.message,
        });
      } else {
        console.error('Upload error:', error);
        res.status(500).json({
          success: false,
          message: 'Internal server error during upload',
        });
      }
    }
  };

  /**
   * Delete image endpoint
   * @route DELETE /api/upload/image/:filename
   */
  public deleteImage = async (req: Request, res: Response) => {
    try {
      const { filename } = req.params;

      if (!filename) {
        throw new HttpException(400, 'Filename is required');
      }

      // Decode URL-encoded filename
      const decodedFilename = decodeURIComponent(filename);

      const deleted = await uploadService.deleteImage(decodedFilename);

      if (deleted) {
        res.status(200).json({
          success: true,
          message: 'Image deleted successfully',
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Image not found or could not be deleted',
        });
      }
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({
          success: false,
          message: error.message,
        });
      } else {
        console.error('Delete error:', error);
        res.status(500).json({
          success: false,
          message: 'Internal server error during deletion',
        });
      }
    }
  };
}

export default new UploadController();
