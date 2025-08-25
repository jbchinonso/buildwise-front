import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getError } from "./error.utils";
import { login } from "../services";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1day
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, //30days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        try {
          if (!password || !email) {
            throw new Error("Enter Email and Password!");
          }

          const res = await login({ email, password });

          return res;
        } catch (error) {
          throw new Error(getError(error) || "Invalid credentials!");
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        //   Create user
        user.name = account!.id_token;
        user.email = account!.provider;
        return true;
      }

      return true;
    },

    async jwt({ token, user, account, trigger, session, profile }) {
      if (account) {
        token.access_token = account.access_token;
      }
      if ((user as any)?.access_token) {
        token.access_token = (user as any).access_token;
      }

      if (trigger === "update" && session) {
        token.user = { ...session };
      }

      if (user && account?.provider === "google") {
        // const dbUser = await prisma.user.findUnique({
        //   where: { id: user.id },
        // });
        // const linkedinAccountLinked = !!(await prisma.account.findFirst({
        //   where: {
        //     userId: dbUser!.id,
        //     provider: "google",
        //   },
        // }));
        // token.hasAccountLinked = linkedinAccountLinked;
      }

      return { ...user, ...token };
    },

    async session({ session, token }) {
      session.token = token.access_token as string;
      session.user = token.user as any;
      session.user.full_name = (
        session.user.firstName ||
        "" + " " + session.user?.lastName ||
        ""
      ).trim();
    
      return session;
    },
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
};
