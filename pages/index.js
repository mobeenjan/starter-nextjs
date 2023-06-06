import { signIn, getSession } from "next-auth/client";
const Home = () => {
    return (
        <div>
            <p>Home PAge</p>
        </div>
    )
}
export const getServerSideProps = async (context) => {
    const session = await getSession(context);
  // console.log(session)
    return {
        props: {
            session: session ? session : null,
        }
    }
}
export default Home;
