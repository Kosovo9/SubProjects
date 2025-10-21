import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  //  Inicializa Stripe DENTRO de la función
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-09-30.clover',
  });

  const { plan } = await req.json();

  const prices: Record<string, string> = {
    basic: 'price_basic_mx',
    pro: 'price_pro_mx',
    premium: 'price_premium_mx',
    clinic: 'price_clinic_mx',
  };

  const priceId = prices[plan] || prices.pro;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://whitepage-akhr0m7ej-neils-projects-8becf3f7.vercel.app';
  const successUrl = baseUrl + '?status=success';
  const cancelUrl = baseUrl + '?status=cancel';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: 'Error al crear sesion' }, { status: 500 });
  }
}
