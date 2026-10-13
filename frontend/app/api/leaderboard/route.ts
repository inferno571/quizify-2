import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface LeaderboardEntry {
  name: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  submittedAt: string;
}

interface LeaderboardDB {
  users: string[]; // registered unique names
  entries: LeaderboardEntry[];
}

import fsSync from "fs";

function getDBPath() {
  const p1 = path.resolve(process.cwd(), "..", "leaderboard.json");
  if (fsSync.existsSync(p1)) return p1;
  const p2 = path.resolve(process.cwd(), "leaderboard.json");
  if (fsSync.existsSync(p2)) return p2;
  return p1;
}

async function readDB(): Promise<LeaderboardDB> {
  try {
    const raw = await fs.readFile(getDBPath(), "utf-8");
    return JSON.parse(raw);
  } catch {
    return { users: [], entries: [] };
  }
}

async function writeDB(db: LeaderboardDB): Promise<void> {
  await fs.writeFile(getDBPath(), JSON.stringify(db, null, 2), "utf-8");
}

// GET /api/leaderboard?quizId=xxx — get leaderboard for a quiz
// GET /api/leaderboard?action=check-name&name=xxx — check if name is taken
// GET /api/leaderboard?action=all-users — get all registered users
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const db = await readDB();

    if (action === "check-name") {
      const name = searchParams.get("name")?.trim();
      if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
      }
      const taken = db.users.some(
        (u) => u.toLowerCase() === name.toLowerCase()
      );
      return NextResponse.json({ name, taken, available: !taken });
    }

    if (action === "all-users") {
      return NextResponse.json({ users: db.users });
    }

    const quizId = searchParams.get("quizId");
    if (!quizId) {
      // Return all entries
      return NextResponse.json({ entries: db.entries, users: db.users });
    }

    const entries = db.entries
      .filter((e) => e.quizId === quizId)
      .sort((a, b) => b.percentage - a.percentage || a.name.localeCompare(b.name));

    return NextResponse.json({ entries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/leaderboard
// Body: { action: "register", name: string } — register a new user name
// Body: { action: "submit", name: string, quizId: string, score: number, totalQuestions: number } — submit a score
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await readDB();

    if (body.action === "register") {
      const name = body.name?.trim();
      if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
      }
      if (name.length < 2) {
        return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
      }
      if (name.length > 50) {
        return NextResponse.json({ error: "Name must be at most 50 characters" }, { status: 400 });
      }
      const taken = db.users.some(
        (u) => u.toLowerCase() === name.toLowerCase()
      );
      if (taken) {
        return NextResponse.json(
          { error: "This name is already taken. Please choose a different name." },
          { status: 409 }
        );
      }
      db.users.push(name);
      await writeDB(db);
      return NextResponse.json({ success: true, name });
    }

    if (body.action === "submit") {
      const { name, quizId, score, totalQuestions } = body;
      if (!name || !quizId || score === undefined || !totalQuestions) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      // Ensure user is registered
      const isRegistered = db.users.some(
        (u) => u.toLowerCase() === name.trim().toLowerCase()
      );
      if (!isRegistered) {
        // Auto-register
        db.users.push(name.trim());
      }

      const percentage = Math.round((score / totalQuestions) * 100);

      // Update or insert entry for this user + quiz combo
      const existingIdx = db.entries.findIndex(
        (e) =>
          e.name.toLowerCase() === name.trim().toLowerCase() &&
          e.quizId === quizId
      );

      const entry: LeaderboardEntry = {
        name: name.trim(),
        quizId,
        score,
        totalQuestions,
        percentage,
        submittedAt: new Date().toISOString(),
      };

      if (existingIdx >= 0) {
        db.entries[existingIdx] = entry;
      } else {
        db.entries.push(entry);
      }

      await writeDB(db);
      return NextResponse.json({ success: true, entry });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
