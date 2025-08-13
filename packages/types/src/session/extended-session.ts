export interface DodoCustomerData {
    customer_id: string;
    business_id: string;
    email: string;
    name: string;
    phone_number: string | null;
    created_at: string;
}

export interface ExtendedSession {
    session: {
        id: string;
        userId: string;
        expiresAt: Date;
        token: string;
        createdAt: Date;
        updatedAt: Date;
        ipAddress?: string;
        userAgent?: string;
        impersonatedBy?: string;
        dodo?: DodoCustomerData | null;
    };
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image?: string;
        createdAt: Date;
        updatedAt: Date;
        role?: string;
        banned?: boolean;
        banReason?: string;
        banExpires?: Date;
    };
}
