import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(function middleware(request: NextRequestWithAuth) {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});
export const config = {
  // every route included here will be protected
  // the '/:path*' string will match and protect any nested routes of the routes included here
  matcher: ["/(titans)/:path*"],
};
