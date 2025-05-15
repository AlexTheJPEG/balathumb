import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Get the absolute path to the jokers directory
    const jokersDirectory = path.join(process.cwd(), 'public', 'jokers');
    
    // Read the directory
    const fileNames = fs.readdirSync(jokersDirectory);
    
    // Filter out non-PNG files and remove .png extension
    const jokers = fileNames
      .filter(file => file.endsWith('.png'))
      .map(file => file.replace('.png', ''));
    
    // Return the list of jokers
    return NextResponse.json({ jokers });
  } catch (error) {
    console.error('Error reading jokers directory:', error);
    return NextResponse.json(
      { error: 'Failed to load jokers' },
      { status: 500 }
    );
  }
}