import React, { useState } from "react";

import { Container } from "./styles";

import ListImages from "../../components/ListImages";
import DragDrop from "../../components/DragDrop";

const Main: React.FC = () => {
  const [list, setList] = useState([]);

  return (
    <Container>
      {list.length === 0 ? (
        <DragDrop
          onReadyFiles={(files: any) => {
            setList(files);
          }}
        />
      ) : (
        <ListImages list={list} />
      )}
    </Container>
  );
};

export default Main;
