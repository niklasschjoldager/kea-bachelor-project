import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  debugger: true,
  secret: "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

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

        console.log("user ", user);

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
