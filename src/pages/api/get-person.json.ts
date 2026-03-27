import { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, params }) => {
  const person = {
    name: "Enzo",
    age: 25,
    city: "Mendoza",
  };

  return new Response(JSON.stringify(person), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
