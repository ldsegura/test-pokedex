const PokedexCardHeader = () => {
  return (
    <div className="poked-card-header">
      <div className="d-data">DATA</div>
      <div className="d-circle">
        <div className="red" />
        <div className="yellow" />
        <div className="green" />
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-end",
          color: "white",
        }}
      >
        POKEDEX LEO
      </div>
    </div>
  );
};

export default PokedexCardHeader;
