import Header from "./Header";

const MainLayout = ({page}) => {

    return (
        <>
            <Header />
            <main>{page}</main>
            {/* <Footer /> */}
        </>
    )
}

export default MainLayout;