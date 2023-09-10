import { Badge, Button, Row, Col, Form } from "react-bootstrap";
import Autocomplete from "react-autocomplete";
import { useState } from "react";

const SearchPokemonSection = (props) => {
  const { items } = props;
  const [value, setValue] = useState("");

  const renderSearchItemAutocomplete = (state, val) => {
    return state.name.toLowerCase().indexOf(val.toLowerCase()) !== -1;
  };

  const onChangeAutocomplete = (event) => {
    const {onChange} = props;
    setValue(event.target.value);
    onChange && onChange();
}
const onSelectAutocomplete = (val) => {
    const {onSelect} = props;
    setValue(val)
    onSelect && onSelect(val);
  }
  return (
    <div className="search-pokemon-form mb-4">
      <div className="container">
        <Row>
          <Col className="col-12 col-md-6">
            <Form.Label><strong>¡Usa la búsqueda pokémon por nombre!</strong></Form.Label>
            <div className="autocomplete-wrapper">
              <Autocomplete
                getItemValue={(item) => item.name}
                items={items}
                shouldItemRender={renderSearchItemAutocomplete}
                renderItem={(item, isHighlighted) => (
                  <div key={item.name}
                    className={`item text-uppercase ${
                      isHighlighted ? "bg-secondary text-white" : "bg-white"
                    }`}
                  >
                    {item.name}
                  </div>
                )}
                onChange={onChangeAutocomplete}
                onSelect={onSelectAutocomplete}
                value={value}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SearchPokemonSection;
