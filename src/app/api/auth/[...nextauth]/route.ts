import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

// TODO: change homepage url on github before deploying

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
