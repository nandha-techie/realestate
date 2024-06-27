import { lazy, Suspense } from "react";
import Banner from "./Banner";
const Widgets = lazy(() => import("./Widgets"));

const Home = () => {
  return (
    <>
      <Banner />
      <Suspense fallback={<div>Loading</div>}>
        <Widgets />
      </Suspense>
    </>
  );
};

export default Home;
