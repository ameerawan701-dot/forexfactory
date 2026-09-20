import { ForexFactory } from "./index.ts";

const ff = new ForexFactory();

const server = Bun.serve({
  port: Number(process.env.PORT || 3000),

  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/calendar") {
      try {
        const calendar = await ff.calendarEvents();

        return Response.json(calendar, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (error) {
        return Response.json(
          {
            error: "Failed to fetch ForexFactory calendar",
            message: error instanceof Error ? error.message : String(error),
          },
          { status: 500 }
        );
      }
    }

    if (url.pathname === "/api/news") {
      try {
        const news = await ff.news();

        return Response.json(news, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (error) {
        return Response.json(
          {
            error: "Failed to fetch ForexFactory news",
            message: error instanceof Error ? error.message : String(error),
          },
          { status: 500 }
        );
      }
    }

    return new Response(
      JSON.stringify({
        status: "ok",
        service: "ForexFactory API",
        endpoints: ["/api/calendar", "/api/news"],
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  },
});

console.log(`ForexFactory API running on port ${server.port}`);