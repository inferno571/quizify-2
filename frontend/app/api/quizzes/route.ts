import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Quiz } from "../../../lib/types";

import fsSync from "fs";

// Path to root quizzes directory
function getQuizzesDir() {
  const p1 = path.resolve(process.cwd(), "..", "quizzes");
  if (fsSync.existsSync(p1)) return p1;
  const p2 = path.resolve(process.cwd(), "quizzes");
  if (fsSync.existsSync(p2)) return p2;
  return p1;
}

function sanitizeFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 50);
}

// GET /api/quizzes - Read all local quiz JSON files from disk
export async function GET() {
  try {
    const dir = getQuizzesDir();
    await fs.mkdir(dir, { recursive: true });

    const files = await fs.readdir(dir);
    const quizzes: Quiz[] = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        try {
          const filePath = path.join(dir, file);
          const raw = await fs.readFile(filePath, "utf-8");
          const parsed = JSON.parse(raw);
          if (parsed && parsed.id && parsed.title && Array.isArray(parsed.questions)) {
            quizzes.push(parsed);
          }
        } catch (e) {
          console.error(`Failed to parse quiz file ${file}:`, e);
        }
      }
    }

    return NextResponse.json({ quizzes });
  } catch (error: any) {
    console.error("Error reading quizzes directory:", error);
    return NextResponse.json({ quizzes: [], error: error.message }, { status: 500 });
  }
}

// POST /api/quizzes - Save a quiz to disk as a JSON file
export async function POST(req: NextRequest) {
  try {
    const quiz: Quiz = await req.json();

    if (!quiz || !quiz.id || !quiz.title || !Array.isArray(quiz.questions)) {
      return NextResponse.json({ error: "Invalid quiz structure" }, { status: 400 });
    }

    const dir = getQuizzesDir();
    await fs.mkdir(dir, { recursive: true });

    const safeName = sanitizeFilename(quiz.id || quiz.title);
    const filePath = path.join(dir, `${safeName}.json`);

    await fs.writeFile(filePath, JSON.stringify(quiz, null, 2), "utf-8");

    return NextResponse.json({ success: true, filePath: `${safeName}.json`, quiz });
  } catch (error: any) {
    console.error("Error saving quiz to disk:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/quizzes?id=... - Delete a quiz file from disk
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
    }

    const dir = getQuizzesDir();
    const files = await fs.readdir(dir);

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(dir, file);
        try {
          const raw = await fs.readFile(filePath, "utf-8");
          const parsed = JSON.parse(raw);
          if (parsed.id === id) {
            await fs.unlink(filePath);
            return NextResponse.json({ success: true, deleted: file });
          }
        } catch (e) {
          // ignore error reading individual file
        }
      }
    }

    return NextResponse.json({ success: false, message: "Quiz file not found" }, { status: 404 });
  } catch (error: any) {
    console.error("Error deleting quiz from disk:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
