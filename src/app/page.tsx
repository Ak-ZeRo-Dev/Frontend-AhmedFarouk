import Footer from "../components/footer/Footer";
import Home from "../components/home/Home";
import Navbar from "../components/navbar/Navbar";

type Props = {};

export default async function Page({}: Props) {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}
