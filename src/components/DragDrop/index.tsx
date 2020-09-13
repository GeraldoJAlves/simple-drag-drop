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

  const ReaderFiles = (files: Array<File>) => {
    if (files.length === 0) {
      return;
    }
    const filesAllowed = filterFiles(files);
    if (filesAllowed.length === 0) {
      return;
    }

    let list: Array<any> = Array(files.length).fill({ src: "" });
    let index: number = 0;

    setDropFile(true);
    onReadyFiles(list);

    const reader = new FileReader();
    reader.readAsDataURL(filesAllowed[index]);
    reader.onloadend = () => {
      if (typeof reader.result == "string") {
        list[index] = {
          type: filesAllowed[index].type,
          src: reader.result,
        };
      }
      index++;
      if (filesAllowed.length === index) {
        onReadyFiles([...list]);
      } else {
        setTimeout(() => {
          reader.readAsDataURL(filesAllowed[index]);
          onReadyFiles([...list]);
        }, 500);
      }
    };
  };

  const filterFiles = (fileList: Array<File>) => {
    const exp = /^(image|video|text|application\/json)/;
    return [...fileList].filter((item) => exp.test(item.type));
  };

  const stopPropagation = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const onDragEnter = (e: any) => {
    setDragEnter(true);
    stopPropagation(e);
  };

  const onDragLeave = (e: any) => {
    setDragEnter(false);
    stopPropagation(e);
  };

  const onDrop = (e: any) => {
    let dt = e.dataTransfer;
    let files: Array<File> = dt.files;
    setDragEnter(false);
    ReaderFiles(files);
    stopPropagation(e);
  };

  const onClick = () => {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    input.multiple = true;
    input.accept = "image";

    input.onchange = (e: any) => {
      if (e.target && e.target.files) {
        const fileList = e.target.files as Array<File>;
        ReaderFiles(fileList);
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
