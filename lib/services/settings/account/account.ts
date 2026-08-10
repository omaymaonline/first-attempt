import { prisma } from "@/lib/prisma";

import { formatName, validateName, } from "@/lib/services/settings/account/validation";

type Failed = {
    success: false;
    status: number;
    message: string;
};

type Success = {
    success: true;
    name: string;
};

export async function updateName(userId: string, rawName: string,): Promise<Success | Failed> {

    const error = validateName(rawName);

    if (error) { return { success: false, status: 400, message: error, }; }

    const formattedName = formatName(rawName);

    await prisma.user.update({
        where: { id: userId, },
        data: { name: formattedName, },
    });

    return { success: true, name: formattedName, };
}