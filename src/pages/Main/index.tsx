import React, { useState } from "react";

import { Container } from "./styles";

import ListFiles from "../../components/ListFiles";
import DragDrop from "../../components/DragDrop";

const Main: React.FC = () => {
  const [files, setFiles] = useState<Array<any>>([]);
  const [dragFiles, setDragFiles] = useState(false);

  const stopPropagation = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <Container
      onDragEnter={(e) => {
        setDragFiles(true);
      }}
      onDragLeave={(e) => {
        setDragFiles(false);
        stopPropagation(e);
      }}
      onDragOver={(e) => {
        stopPropagation(e);
      }}
      onDrop={(e) => {
        setDragFiles(false);
        stopPropagation(e);
      }}

    >
      {files.length === 0 || dragFiles ? (
        <DragDrop
          onReadyFiles={(newFiles: Array<any>) => {
            setDragFiles(false);
            setFiles([].concat(...files,...newFiles));
          }}
        />
      ) : (
        <ListFiles
          files={files}
          setFiles={(files: any) => {
            setFiles(files);
          }}
        />
      )}
    </Container>
  );
};

export default Main;
