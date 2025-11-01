import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

// Ensure the upload directory exists
const uploadDir = join(process.cwd(), 'public/uploads');

// Note: Next.js 13+ handles multipart/form-data automatically

export async function POST(request) {
  try {
    // Verify user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the form data
    const formData = await request.formData();
    const files = [];
    
    // Process each file
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('files[') && key.endsWith('][file]')) {
        const index = key.match(/\[(\d+)\]/)[1];
        const displayName = formData.get(`files[${index}][displayName]`);
        
        if (value instanceof File) {
          // Ensure the upload directory exists
          await mkdir(uploadDir, { recursive: true });
          
          // Generate a unique filename
          const timestamp = Date.now();
          const ext = value.name.split('.').pop();
          const filename = `${timestamp}-${Math.random().toString(36).substring(2, 15)}.${ext}`;
          const filePath = join(uploadDir, filename);
          
          // Convert file to buffer and save to disk
          const bytes = await value.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(filePath, buffer);
          
          // Save file info to database
          const fileRecord = await prisma.file.create({
            data: {
              userId: session.user.id,
              originalName: value.name,
              displayName: displayName || value.name,
              path: `/uploads/${filename}`,
              mimeType: value.type,
              size: value.size,
            },
          });
          
          files.push({
            id: fileRecord.id,
            originalName: value.name,
            displayName: displayName || value.name,
            url: `/uploads/${filename}`,
            size: value.size,
          });
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Files uploaded successfully',
      files,
    });

  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { error: 'Failed to upload files', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const fileId = request.nextUrl.searchParams.get('id');
    if (fileId) {
      const file = await prisma.file.findUnique({
        where: { id: fileId },
        include: { user: true },
      });
      if (!file) {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        );
      }
      if (file.userId !== session.user.id) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      const filePath = join(uploadDir, file.path.split('/').pop());
      return NextResponse.json({ file, filePath });
    }

    const files = await prisma.file.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    // Verify user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const fileId = request.nextUrl.searchParams.get('id');
    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    const file = await prisma.file.findUnique({
      where: { id: fileId },
      include: { user: true },
    });
    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    if (file.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const displayName = formData.get('displayName');
    if (displayName) {
      await prisma.file.update({
        where: { id: fileId },
        data: { displayName },
      });
    }

    return NextResponse.json({ success: true, message: 'File updated successfully' });
  } catch (error) {
    console.error('Error updating file:', error);
    return NextResponse.json(
      { error: 'Failed to update file', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Verify user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const fileId = request.nextUrl.searchParams.get('id');
    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    const file = await prisma.file.findUnique({
      where: { id: fileId },
      include: { user: true },
    });
    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    if (file.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const filePath = join(uploadDir, file.path.split('/').pop());
    await unlink(filePath);
    await prisma.file.delete({ where: { id: fileId } });

    return NextResponse.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Failed to delete file', details: error.message },
      { status: 500 }
    );
  }
}
