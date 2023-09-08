import { Header, Footer } from "../../components/section";

const LayoutComponent = (props) => {
  const { component: ChildrenPage } = props;
  return (
    <>
      <Header />
      <div>
        <ChildrenPage />
      </div>
      <Footer />
    </>
  );
};

export default LayoutComponent;
