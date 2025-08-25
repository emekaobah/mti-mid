import { NextResponse } from "next/server";

// Minimal API route handlers so this file is recognized as a module by Next.js
export async function GET(request: Request) {
  return NextResponse.json({ message: "Admin API root" }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ received: body }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
