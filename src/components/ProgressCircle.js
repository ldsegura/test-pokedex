import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useGlobalState } from "../store/StoreProvider";
import { useIntl } from "react-intl";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const ProgressCircle = (props) => {
  const { pokemons, pokemonsType } = props;
  const [types, setTypes] = useState([]);
  const { auth } = useGlobalState();
  const intl = useIntl();

  useEffect(() => {
    if (auth.complete) {
      const auxTypes = [];
      if (pokemons.data.length > 0) {
        pokemons.data.map((item) => {
          item.types.map((tps) => {
            const index = auxTypes.findIndex((i) => i.name.toLowerCase() === tps.type.name.toLowerCase());
            if (index < 0) {
              const auxNewi = pokemonsType.findIndex(
                (i) => i.name === tps.type.name
              );
              if (auxNewi >= 0)
                auxTypes.push({ ...pokemonsType[auxNewi], count: 1 });
            } else {
              auxTypes[index].count = auxTypes[index].count + 1;
            }
          });
        });
      }
      setTypes(auxTypes);
    }
  }, [auth, pokemons, pokemonsType]);

  return (
    <Card>
      <Card.Body>
        <h5>{intl.formatMessage({ id: "website.dashboardPorcentPokemonTitle" })}</h5>
        <Container>
          <Row>
            <Col style={{alignItems: "center", display: "flex"}}>
              <div style={{ height: 200, minWidth: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      data={types}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {types.map((entry, index) => {
                        return (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        );
                      })}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Col>
            <Col>
              <ListGroup>
                {types.map((entry, index) => {
                  return <ListGroup.Item key={index} style={{backgroundColor: entry.color}}>{`${entry.count} ${entry.count === 1 ? "pokémon": "pokemones"} ${intl.formatMessage({ id: `pokemon.${entry.name}` })}`}</ListGroup.Item>;
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default ProgressCircle;
