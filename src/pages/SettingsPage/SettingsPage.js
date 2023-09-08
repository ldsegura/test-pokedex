import React from "react";
import { useGlobalState } from "../../store/StoreProvider";
const SettingsPage = () => {
  const {auth} = useGlobalState();
  console.log(auth);
  return (
    <>
      <p>setiings </p>
    </>
  );
};

export default SettingsPage;
