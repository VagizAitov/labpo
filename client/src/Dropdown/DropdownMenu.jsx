import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function DropdownMenu(props) {
  const [chosenItem, setChosenItem] = useState();
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ background: "grey", border: "1px solid grey" }}
      >
        {chosenItem || props.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.data == undefined ? (
          <p>Loading</p>
        ) : (
          props.data.map((obj) => (
            <Dropdown.Item
              key={obj.id}
              onClick={() => {
                setChosenItem(obj.name);
                props.setSearchData((prev) => {
                  if (props.name == "Автор") {
                    return { ...prev, author: [obj.name, obj.id] };
                  } else if (props.name == "Компания") {
                    return { ...prev, company: [obj.name, obj.id] };
                  } else if (props.name == "Главный герой") {
                    return { ...prev, mainactor: [obj.name, obj.id] };
                  } else {
                    return { ...prev, producer: [obj.name, obj.id] };
                  }
                });
              }}
            >
              {obj.name}
            </Dropdown.Item>
          ))
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
