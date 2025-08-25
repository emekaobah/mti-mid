import { NextResponse } from 'next/server';

// Minimal POST handler for form submissions
export async function POST(request: Request) {
	try {
		const payload = await request.json();
		// TODO: validate and persist payload
		return NextResponse.json({ status: 'ok', received: payload }, { status: 201 });
	} catch (e) {
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
	}
}

export async function GET() {
	return NextResponse.json({ message: 'Submit API root' });
}

