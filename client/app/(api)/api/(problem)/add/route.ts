import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const { title, difficulty, acceptance, description, example } = body;
  const problem = await prisma.problem.create({
    data: {
      title,
      difficulty,
      acceptance,
      description,
      examples: {
        create: example.map((ex:any) => ({
          input: ex.input,
          output: ex.output,
        })),
      },
    },
  });
  return new Response(JSON.stringify(problem), { status: 200 });
}
