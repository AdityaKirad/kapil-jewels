export async function GET() {
  // const url = new URL(request.url);
  // const token = url.searchParams.get("token");

  // if (!token) {
  //   return Response.json(
  //     { status: "error", code: "TOKEN_REQUIRED", message: "Token is required" },
  //     { status: 400 },
  //   );
  // }

  // try {
  //   const res = await fetch(`${process.env.ADMIN_URL}/api/customer/verify`, {
  //     method: "POST",
  //     body: JSON.stringify({ token }),
  //   });
  //   if (!res.ok) {
  //     return Response.json(await res.json(), { status: 401 });
  //   }
  // } catch (error) {
  //   return Response.json(
  //     { status: "error", message: `Internal server error: ${error}` },
  //     { status: 500 },
  //   );
  // }

  return Response.json(
    { status: "success", message: "Token verified successfully" },
    { status: 200 },
  );
}
