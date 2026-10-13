import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const API_URL = process.env.API_URL || "http://localhost:8080";
    
    console.log(`[API Route] Proxying POST to ${API_URL}/api/extract-quiz`);
    
    const backendRes = await fetch(`${API_URL}/api/extract-quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const rawText = await backendRes.text();
    let data;
    try {
      data = rawText ? JSON.parse(rawText) : { error: "Empty response from backend server (possible crash/panic)." };
    } catch (e) {
      data = { error: `Invalid JSON from backend: ${rawText.substring(0, 200)}...` };
    }

    if (!backendRes.ok) {
      console.error("[API Route] Backend error status:", backendRes.status, "Raw Response:", rawText.substring(0, 200));
      return NextResponse.json(data, { status: backendRes.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("[API Route] Exception during proxying:", err);
    return NextResponse.json({ error: `Next.js internal proxy error: ${err.message}` }, { status: 500 });
  }
}
