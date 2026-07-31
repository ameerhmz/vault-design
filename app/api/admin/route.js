import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'db.json');

function getDbData() {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading db.json:", e);
  }
  return { templates: [] };
}

function saveDbData(data) {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error("Error writing db.json:", e);
  }
}

// GET /api/admin - List all user analyzed website links
export async function GET() {
  const db = getDbData();
  return NextResponse.json({ success: true, templates: db.templates || [] });
}

// POST /api/admin - Toggle featured status or delete template
export async function POST(req) {
  try {
    const { action, id, isFeatured } = await req.json();

    const db = getDbData();
    let updatedTemplates = [...(db.templates || [])];

    if (action === 'toggle-featured') {
      updatedTemplates = updatedTemplates.map((item) => {
        if (item.id === id) {
          return { ...item, isFeatured: Boolean(isFeatured) };
        }
        return item;
      });
    } else if (action === 'delete') {
      updatedTemplates = updatedTemplates.filter((item) => item.id !== id);
    }

    db.templates = updatedTemplates;
    saveDbData(db);

    return NextResponse.json({ success: true, templates: db.templates });
  } catch (error) {
    console.error("API /api/admin Error:", error);
    return NextResponse.json({ error: error.message || 'Admin action failed' }, { status: 500 });
  }
}
