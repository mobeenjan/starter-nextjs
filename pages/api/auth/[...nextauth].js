import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const providers = [
    Providers.Google({
        clientId: "909250051096-cpsk737ip2kgcv0stvouqcerv13gj0qv.apps.googleusercontent.com",
        clientSecret: "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",
        authorizationUrl:
            'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    Providers.Facebook({
        clientId: "274462795054859",
        clientSecret: "6997c0a832073deacd94123ef34fff4b"
    })
];

const options = {
    providers,
    pages: { signIn: '/login' },
    session: {
        jwt: true,
        maxAge: 24 * 60 * 60,
    },
    jwt: {
        secret: "logo-maker.net",
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async redirect(url) {
            return url;
        },
        async jwt(token, user) {
            if (user?.token) {
                token.accessToken = user.token
            }
            return token
        },
        async session(session, token) {


            if (!token.accessToken && session.user && session.user.name && session.user.email) {
                session.user = { ...session.user, isValid: true }
                return Promise.resolve(session);
            }
            return Promise.resolve(session);
        }
    }
}

export default (req, res) => NextAuth(req, res, options);
