import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/transactions - List transactions
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const status = searchParams.get('status');
        const type = searchParams.get('type');

        const where: any = {};
        if (userId) where.userId = userId;
        if (status) where.status = status;
        if (type) where.type = type;

        const transactions = await prisma.transaction.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                policy: {
                    select: {
                        id: true,
                        policyNumber: true,
                        insuranceType: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch transactions' },
            { status: 500 }
        );
    }
}

// POST /api/transactions - Create transaction
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, policyId, amount, type, method, description, metadata } = body;

        const transaction = await prisma.transaction.create({
            data: {
                transactionId: `TXN-${Date.now()}`,
                userId,
                policyId,
                amount,
                type,
                method,
                description,
                metadata,
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

        return NextResponse.json(transaction, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json(
            { error: 'Failed to create transaction' },
            { status: 500 }
        );
    }
}
