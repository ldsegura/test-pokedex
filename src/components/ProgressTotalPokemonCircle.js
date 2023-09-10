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
const ProgressTotalPokemonCircle = (props) => {
  const { pokemons, pokemonsType, pokedex } = props;
  const [types, setTypes] = useState([]);
  const { auth } = useGlobalState();
  const intl = useIntl();

  useEffect(() => {
    if (auth.complete) {
      const auxTypes = [
        {
          name: "dashboardTotalListMyPokemons",
          count: pokemons.data.length,
          color: "#9bcc50"
        },
        {
          name: "dashboardTotalListPokemons",
          count: pokedex.results.length - pokemons.data.length,
          color: "#a4acaf"
        },
      ];
      setTypes(auxTypes);
    }
  }, [auth, pokemons, pokemonsType]);

  return (
    <Card>
      <Card.Body>
        <h5>
          {intl.formatMessage({ id: "website.dashboardTotalPokemonTitle" })}
        </h5>
        <Container>
          <Row>
            <Col style={{ alignItems: "center", display: "flex" }}>
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
                  return (
                    <ListGroup.Item key={index}>{`${entry.count} ${intl.formatMessage({
                      id: `website.${entry.name}`,
                    })}`}</ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default ProgressTotalPokemonCircle;
