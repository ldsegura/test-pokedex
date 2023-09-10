import React from "react";
import { useGlobalState } from "../../store/StoreProvider";
const SettingsPage = () => {
  const {auth} = useGlobalState();
  return (
    <>
      <p>setiings </p>
    </>
  );
};

export default SettingsPage;
