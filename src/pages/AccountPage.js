import React from "react";
import { useGlobalState } from "../store/StoreProvider";
const AccountPage = () => {
  const {auth} = useGlobalState();
  console.log(auth);
  return (
    <>
      <p>setting cuenta de {auth.username} </p>
    </>
  );
};

export default AccountPage;
