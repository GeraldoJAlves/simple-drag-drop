import React, { useState, DragEvent } from "react";

import { Container } from "./styles";

import FilesList from "../../components/FilesList";
import DragDrop from "../../components/DragDrop";

interface IUploadFile {
  name: string;
  type: string;
  size: number;
  src: string;
  preview: string;
}

const Main: React.FC = () => {
  const [files, setFiles] = useState<IUploadFile[]>([]);
  const [dragFiles, setDragFiles] = useState(false);

  const stopPropagation = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const showDragArea = (event: DragEvent) => {
    setDragFiles(true);
    stopPropagation(event);
  };

  const hideDragArea = (event: DragEvent) => {
    setDragFiles(false);
    stopPropagation(event);
  };

  return (
    <Container
      onDragEnter={showDragArea}
      onDragLeave={hideDragArea}
      onDrop={hideDragArea}
      onDragOver={stopPropagation}
    >
      {files.length === 0 || dragFiles ? (
        <DragDrop
          onReadyFiles={(newFiles: IUploadFile[]) => {
            setDragFiles(false);
            const mergeFiles: IUploadFile[] = [];
            setFiles(mergeFiles.concat(...files, ...newFiles));
          }}
          hideDragArea={() => {
            setDragFiles(false);
          }}
        />
      ) : (
        <FilesList
          files={files}
          setFiles={(files: IUploadFile[]) => {
            setFiles(files);
          }}
        />
      )}
    </Container>
  );
};

export default Main;
