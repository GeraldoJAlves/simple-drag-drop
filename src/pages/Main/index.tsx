import React, { useState } from "react";

import { Container } from "./styles";

import ListImages from "../../components/ListImages";
import DragDrop from "../../components/DragDrop";

const Main: React.FC = () => {
  const [files, setFiles] = useState([]);

  return (
    <Container>
      {files.length === 0 ? (
        <DragDrop
          onReadyFiles={(files: any) => {
            setFiles(files);
          }}
        />
      ) :  (
        <ListImages
          files={files}
          setFiles={(files:any) => {
            setFiles(files);
          }}
        />
      )}
    </Container>
  );
};

export default Main;
