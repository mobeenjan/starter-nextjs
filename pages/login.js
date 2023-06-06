import Head from "next/head"
import { signIn, getSession } from "next-auth/client";


const LogIn = ({ session }) => {
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>

            <h2 className="mb-3 mt-3 font-weight-bold">Login to Your Account!</h2>

            <div className="my-lg-3">

                <button className="w-100 bg-white d-flex align-items-center justify-content-center" style={{ padding: "12px 0px", border: "1px solid #CCCCCC" }}
                    onClick={() => signIn('facebook',
                        { callbackUrl: 'http://localhost:3000/api/auth/callback/facebook' })}
                >
                    Login with Facebook
                </button>

                <button className="w-100 bg-white d-flex align-items-center justify-content-center" style={{ padding: "12px 0px", border: "1px solid #CCCCCC" }}
                    onClick={() => signIn('google')}
                >
                    Login with Google
                </button>

            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    let { query } = context
    let redirectPath = query && query.redirectFrom ? `/validate?redirectFrom=${query.redirectFrom}` : "/validate"
    if (session && session.user && Object.keys(session.user).length) {
        return {
            redirect: {
                destination: session.user.isValid ? (query && query.redirectFrom ? `/${query.redirectFrom}` : "/") : redirectPath,
                permanent: false
            },
        }
    }
    return {
        props: {
            session: session ? session : null,
        }
    }
}
export default LogIn