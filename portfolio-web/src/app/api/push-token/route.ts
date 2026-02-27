import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/backend/database/mongoose';
import { PushTokenServices } from '@/backend/push-token/pushToken.services';
import { requireAuth } from '@/backend/auth/auth.middleware';

/**
 * Envoi et enregistrement du Token de notifification
 * @response 200:Token enregisté
 * @response 400:Donnée invalide
 * @response 500:Erreur serveurs
 * @openapi
 */

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

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

/**
 * Récupération des Token de notifification
 * @response 200:PushTokenType:Liste des Tokens
 * @response 500:Erreur serveurs
 * @openapi
 */

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

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
