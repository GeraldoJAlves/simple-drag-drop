import React, { useState } from "react";

import { Container, DragBox, UploadIcon, DragText } from "./styles";

interface Props {
  onReadyFiles: any;
}

const DragDrop: React.FC<Props> = ({onReadyFiles}) => {
  const [dragEnter, setDragEnter] = useState(false);
  const [dropFile, setDropFile] = useState(false);

  const onDragEnter = (e: any) => {
    console.log("onDragEnter");
    setDragEnter(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragLeave = (e: any) => {
    console.log("onDragLeave");
    setDragEnter(false);
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files:Array<any> = dt.files;
    let list:Array<any> = [];
    let index:number = 0;

    const reader = new FileReader();

    if( files.length === 0) {
      return;
    }

    reader.readAsDataURL(files[index]);
    reader.onloadend = () => {
      index++;
      if (typeof reader.result == "string") {
        list.push({ src : reader.result});
      }

      if(files.length === index) {
        onReadyFiles(list);
      } else {
        reader.readAsDataURL(files[index]);
      }
    };

    setDragEnter(false);
    setDropFile(true);
  };

  return (
    <Container>
      <DragBox
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={onDrop}
        className={
          (dragEnter ? "drag-enter" : "") + (dropFile ? " drag-drop" : "")
        }
      >
        {!dropFile ? (
          <>
            <UploadIcon />
            <DragText>Choose a file</DragText>
          </>
        ) : null}
      </DragBox>
    </Container>
  );
};

export default DragDrop;
