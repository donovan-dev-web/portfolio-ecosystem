import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

type RouteContext<TParams extends Record<string, string>> = {
  params: Promise<TParams>;
};

type ErrorOverride = {
  matches: (error: Error) => boolean;
  response: { message: string; status: number };
};

export async function getRouteParam<TParams extends Record<string, string>>(
  context: RouteContext<TParams>,
  key: keyof TParams
) {
  const params = await context.params;
  const value = params[key];

  if (!value) {
    throw new Error(`Missing route param: ${String(key)}`);
  }

  return value;
}

export function handleRouteError(
  error: unknown,
  fallback: { message: string; status?: number } = {
    message: 'Erreur serveur',
    status: 500,
  },
  overrides: ErrorOverride[] = []
) {
  if (error instanceof Error) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const override = overrides.find((item) => item.matches(error));
    if (override) {
      return NextResponse.json(
        { message: override.response.message },
        { status: override.response.status }
      );
    }
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      { message: 'Données invalides', errors: error.issues },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: fallback.message,
      error: error instanceof Error ? error.message : undefined,
    },
    { status: fallback.status ?? 500 }
  );
}
