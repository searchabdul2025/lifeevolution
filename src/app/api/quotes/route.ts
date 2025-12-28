import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/quotes - List quotes
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const status = searchParams.get('status');

        const where: any = {};
        if (userId) where.userId = userId;
        if (status) where.status = status;

        const quotes = await prisma.quote.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch quotes' },
            { status: 500 }
        );
    }
}

// POST /api/quotes - Create quote
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, insuranceType, coverageAmount, term, premium, notes } = body;

        const quote = await prisma.quote.create({
            data: {
                userId,
                insuranceType,
                coverageAmount,
                term,
                premium,
                notes,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(quote, { status: 201 });
    } catch (error) {
        console.error('Error creating quote:', error);
        return NextResponse.json(
            { error: 'Failed to create quote' },
            { status: 500 }
        );
    }
}
