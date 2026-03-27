import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

const jsonResponse = (data: any, status: number = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const post = await getEntry("blog", id as string);

  if (!post) {
    return jsonResponse({ message: `Post with id ${id} not found` }, 404);
  }

  return jsonResponse(post);
};

export const POST: APIRoute = async ({ request, params }) => {
  const { id } = params;
  try {
    const body = await request.json();
    return jsonResponse(
      { message: "Post created successfully", id, data: body },
      201,
    );
  } catch (error) {
    return jsonResponse({ message: "Invalid JSON body" }, 400);
  }
};

export const PUT: APIRoute = async ({ request, params }) => {
  const { id } = params;
  try {
    const body = await request.json();
    return jsonResponse(
      { message: "Post completely updated", id, data: body },
      200,
    );
  } catch (error) {
    return jsonResponse({ message: "Invalid JSON body" }, 400);
  }
};

export const PATCH: APIRoute = async ({ request, params }) => {
  const { id } = params;
  try {
    const body = await request.json();
    return jsonResponse(
      { message: "Post partially updated", id, data: body },
      200,
    );
  } catch (error) {
    return jsonResponse({ message: "Invalid JSON body" }, 400);
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  return jsonResponse(
    { message: `Post with id ${id} deleted successfully` },
    200,
  );
};
