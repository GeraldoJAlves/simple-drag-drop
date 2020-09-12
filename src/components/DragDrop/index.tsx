import React, { useState } from "react";

import { Container, DragBox, UploadIcon, DragText, LoadingIcon } from "./styles";

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
    let list:Array<any> = Array(files.length).fill({src:''});
    let index:number = 0;
    
    if( files.length === 0) {
      return;
    }
    
    onReadyFiles(list);
    
    const reader = new FileReader();
    reader.readAsDataURL(files[index]);
    reader.onloadend = () => {

      if (typeof reader.result == "string") {
        list[index] = { src : reader.result};
      }
      index++;
      if(files.length === index) {
        onReadyFiles([...list]);
      } else {
        setTimeout(() => {
          reader.readAsDataURL(files[index]);
          onReadyFiles([...list]);
        },500);
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
            <DragText>Drag&Drop files here</DragText>
          </>
        ) : (
          <>
            <LoadingIcon />
            <DragText>Loading...</DragText>
          </>
        )}
      </DragBox>
    </Container>
  );
};

export default DragDrop;
