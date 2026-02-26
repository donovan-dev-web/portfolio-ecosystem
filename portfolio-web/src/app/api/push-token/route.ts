import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/backend/database/mongoose';
import { PushTokenServices } from '@/backend/push-token/pushToken.services';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const result = await PushTokenServices.savePushToken(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Token enregistré',
        result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Données invalides', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const tokens = await PushTokenServices.getAllTokens();

    return NextResponse.json(
      {
        success: true,
        count: tokens.length,
        data: tokens,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
