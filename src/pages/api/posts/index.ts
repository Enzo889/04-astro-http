import { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {
  const posts = await getCollection("blog");

  const url = new URL(request.url);
  const searchParams = url.searchParams.get("id");

  if (searchParams) {
    const post = await getEntry("blog", searchParams);

    if (post) {
      return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(
        JSON.stringify({ message: `Post with id ${searchParams} not found` }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  }

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
