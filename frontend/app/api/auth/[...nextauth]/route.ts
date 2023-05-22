import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function login(credentials: { username: string; password: string }) {
  let body = Object.entries(credentials)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);

      return `${encodedKey}=${encodedValue}`;
    })
    .join("&");

  const res = await fetch("http://127.0.0.1:8000/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body,
  });

  const user = await res.json();

  if (res.ok && user) {
    return user;
  }

  return null;
}

async function signup(credentials: {
  email: string;
  password: string;
  full_name: string;
}) {
  const res = await fetch("http://127.0.0.1:8000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const user = await res.json();

  if (res.ok && user) {
    return user;
  }

  return null;
}

export const authOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "mail@mail.com",
        },
        password: { label: "Password", type: "password" },
        full_name: {
          label: "Full name",
          type: "text",
          placeholder: "John Doe",
        },
        isNewUser: { label: "Is new user?", type: "hidden" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        console.log("Creds", credentials);

        if (JSON.parse(credentials.isNewUser)) {
          return await signup({
            email: credentials.username,
            password: credentials.password,
            full_name: credentials.full_name,
          });
        }

        return await login({
          username: credentials.username,
          password: credentials.password,
        });
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
