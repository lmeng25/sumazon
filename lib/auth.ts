import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import mongodb from '@/lib/mongodb';
import NextAuth from 'next-auth';
import UserModel from '@/lib/models/UserModel';

export const config = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    type: 'email',
                },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                await mongodb();

                if (credentials == null) return null;
                const user = await UserModel.findOne({
                    email: credentials.email,
                });
                if (user) {
                    const isMatch = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );
                    if (isMatch) {
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/signin',
        newUser: '/register',
        error: '/signin',
    },
    callbacks: {
        async jwt({ user, trigger, session, token }: any) {
            if (user) {
                token.user = {
                    _id: user._doc._id,
                    email: user._doc.email,
                    name: user._doc.name,
                    isAdmin: user._doc.isAdmin,
                    address: user._doc.address,
                    number: user._doc.number,
                };
            }
            if (trigger === 'update' && session) {
                token.user = {
                    ...token.user,
                    email: session.user.email,
                    name: session.user.name,
                    address: session.user.address,
                    number: session.user.number,
                };
            }
            return token;
        },
        session: async ({ session, token }: any) => {
            session.user = token.user;
            return session;
        },
    },
};

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth(config);
