import React from "react";
const BoxDeveloper = () => {
  return (
    <div className="content-by">
      <p
        style={{ paddingTop: "30px", fontSize: "16px" }}
      >{`${new Date().getFullYear()} © ${process.env.REACT_APP_SITENAME} Developers by Leonardo Segura`}</p>
    </div>
  );
};

export default BoxDeveloper;
