import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const nexturl = process.env.NEXTAUTH_URL;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: `${process.env.NEXTAUTH_URL}/auth/signin`,
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(' ')
        .join('')
        .toLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
});
