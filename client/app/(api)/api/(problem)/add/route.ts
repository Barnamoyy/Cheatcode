import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request, response: Response) {
    const body = await request.json();
    const { title, difficulty, acceptance, description } = body;
    const problem = await prisma.problem.create({
        data: {
            title,
            difficulty,
            acceptance,
            description
        }
    });
    return new Response(JSON.stringify(problem), {status: 200});
}