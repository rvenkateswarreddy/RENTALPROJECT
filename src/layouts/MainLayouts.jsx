import Navbar from "../components/Navbar";

const MainLayouts = ({ children }) => (
  <>
    <Navbar />
    <div>{children}</div>
  </>
);
export default MainLayouts;
