// Cloudflare Worker для проксирования API запросов к Railway backend
// Используется для обхода CORS ограничений между Cloudflare Pages и Railway

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Обработка CORS preflight запросов (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Проксируем только запросы на /api/
    if (url.pathname.startsWith("/api")) {
      try {
        // URL Railway backend
        const backendUrl = new URL(url.pathname + url.search, "https://web-production-dbe6.up.railway.app");

        // Создаем новые заголовки для backend запроса
        const backendHeaders = new Headers(request.headers);
        backendHeaders.set("Host", backendUrl.hostname);

        // Отправляем запрос на Railway backend
        const backendResponse = await fetch(backendUrl.toString(), {
          method: request.method,
          headers: backendHeaders,
          body: request.method === "GET" || request.method === "HEAD"
            ? undefined
            : await request.arrayBuffer(),
        });

        // Клонируем ответ и добавляем CORS заголовки
        const response = new Response(backendResponse.body, backendResponse);

        // Добавляем CORS заголовки к ответу
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

        return response;
      } catch (error) {
        // Обработка ошибок при проксировании
        return new Response(
          JSON.stringify({
            error: "Backend connection failed",
            message: error.message
          }),
          {
            status: 502,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }
    }

    // Для всех остальных путей возвращаем информацию о Worker
    return new Response(
      JSON.stringify({
        status: "Worker is active",
        message: "This path is not proxied. Only /api/* routes are forwarded to backend."
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  },
};
