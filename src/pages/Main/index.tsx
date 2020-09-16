import React, { useState, DragEvent } from "react";

import { Container } from "./styles";

import ListFiles from "../../components/ListFiles";
import DragDrop from "../../components/DragDrop";

interface IUploadFile {
  name: string;
  type: string;
  size: number;
  src: string;
  preview?:string;
}

const Main: React.FC = () => {
  
  const [files, setFiles] = useState<IUploadFile[]>([]);
  const [dragFiles, setDragFiles] = useState(false);

  const stopPropagation = (e:DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <Container
      onDragEnter={(event:DragEvent) => {
        setDragFiles(true);
        stopPropagation(event);
      }}
      onDragLeave={(event:DragEvent) => {
        stopPropagation(event);
        setDragFiles(false);
      }}
      onDrop={(event:DragEvent) => {
        stopPropagation(event);
        setDragFiles(false);
      }}
      onDragOver={(event:DragEvent) => {
        stopPropagation(event);
      }}
    >
      {files.length === 0 || dragFiles ? (
        <DragDrop
          onReadyFiles={(newFiles: IUploadFile[]) => {
            setDragFiles(false);
            const mergeFiles:IUploadFile[] = [];
            setFiles(mergeFiles.concat(...files,...newFiles));
          }}
          endOnDrag={()=>{
            setDragFiles(false);
          }}
        />
      ) : (
        <ListFiles
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
