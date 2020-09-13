import React, { useState } from "react";

import {
  Container,
  DragBox,
  UploadIcon,
  DragText,
  LoadingIcon,
} from "./styles";

interface Props {
  onReadyFiles: any;
}

const DragDrop: React.FC<Props> = ({ onReadyFiles }) => {
  const [dragEnter, setDragEnter] = useState(false);
  const [dropFile, setDropFile] = useState(false);

  const ReaderFiles = (files:Array<File>) => {
    
    if (files.length === 0) {
      return;
    }

    let index: number = 0;
    let list: Array<any> = Array(files.length).fill({ src: "" });

    const imageFiles = filterImages(files);
    if (imageFiles.length === 0) {
      return;
    }

    setDropFile(true);
    onReadyFiles(list);

    const reader = new FileReader();
    reader.readAsDataURL(imageFiles[index]);
    reader.onloadend = () => {
      if (typeof reader.result == "string") {
        list[index] = { src: reader.result };
      }
      index++;
      if (imageFiles.length === index) {
        onReadyFiles([...list]);
      } else {
        setTimeout(() => {
          reader.readAsDataURL(imageFiles[index]);
          onReadyFiles([...list]);
        }, 500);
      }
    };
  };

  const filterImages = (fileList: Array<File>) => {
    return  [...fileList].filter((item) => item.type.startsWith("image/"));
  }

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
    let files: Array<File> = dt.files;

    setDragEnter(false);
    ReaderFiles(files);
  };

  const onClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = 'image';

    input.onchange = (e:any) => {
      // getting a hold of the file reference
      console.log(e.target.files);
      if (e.target && e.target.files) {
        ReaderFiles(e.target.files);
      }
    };

    input.click();
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
        onClick={onClick}
        className={
          (dragEnter ? "drag-enter" : "") + (dropFile ? " drag-drop" : "")
        }
      >
        {!dropFile ? (
          <>
            <UploadIcon />
            <DragText>Drag&Drop images here</DragText>
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
