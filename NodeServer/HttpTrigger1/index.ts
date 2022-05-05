import { AzureFunction, Context, Cookie, HttpRequest } from '@azure/functions';
import { Prisma, PrismaClient } from '@prisma/client';

// i have no idea why this interface isn't a part of the azure functions types
// https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2-v3-v4-export%2Cv2-v3-v4-done%2Cv2%2Cv2-log-custom-telemetry%2Cv2-accessing-request-and-response%2Cwindows-setting-the-node-version#response-object
export interface HttpResponse {
    body?: Object,
    headers?: Object,
    isRaw?: boolean,
    status?: number,
    cookies?: Cookie[]
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    if (!req.body) {
        context.res = { status: 400 } as HttpResponse; // default 200
        return;
    }

    const user: Prisma.UserCreateArgs = {
        data: req.body as Prisma.UserCreateInput
    };

    const prisma = new PrismaClient();

    prisma.user
        .create(user)
        .then(user => {
            context.res = {
                body: user
            } as HttpResponse;
            console.log('created user', user);
        })
        .finally(() => prisma.$disconnect);
};

export default httpTrigger;
