import React, { useState } from "react";

import { Video } from "video-metadata-thumbnails";

import {
  Container,
  DragBox,
  UploadIcon,
  DragText,
  LoadingIcon,
  TypeFiles,
  PictureIcon,
  TextIcon,
  VideoIcon,
  FolderIcon
} from "./styles";

interface Props {
  onReadyFiles: any;
  endOnDrag: any;
}

const readBlobAsString = (file: Blob) => {
  return new Promise( (resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      resolve(reader.result);
    }
    reader.onerror = reject;
  });
}

const traverseFileTree = async (item: any, path?: any) => {
  return new Promise((resolve, reject) => {
    path = path || "";
    if (item.isFile) {
      item.file(async (file: File) => {
        resolve(file);
      });
    } else if (item.isDirectory) {
      const dirReader = item.createReader();
      dirReader.readEntries(async (entries: any) => {
        const files: any = [];

        for (let i = 0; i < entries.length; i++) {
          let file: any = await traverseFileTree(
            entries[i],
            path + item.name + "/"
          );
          if (entries[i].isDirectory) {
            files.concat(...file);
          } else {
            files.push(file);
          }
        }
        resolve(files);
      });
    }
  });
};

const DragDrop: React.FC<Props> = ({ onReadyFiles, endOnDrag }) => {
  const [dragEnter, setDragEnter] = useState(false);
  const [dropFile, setDropFile] = useState(false);

  const ReaderFiles = async (files: Array<any>) => {
    if (files.length === 0) {
      endOnDrag();
      return;
    }
    const filesAllowed = filterFiles(files);
    if (filesAllowed.length === 0) {
      endOnDrag();
      return;
    }

    let list: Array<any> = Array(files.length).fill({ src: "" });
    let index: number = 0;

    setDropFile(true);
    onReadyFiles(list);

    for (const item of filesAllowed) {
      let preview = "";
      let src:any = window.URL.createObjectURL(item);
      if (item.type.startsWith("video")) {
        const video = new Video(item);
        const thumbnails = await video.getThumbnails({
          quality: 2,
          start: 0,
          end: 5,
        });
        if(thumbnails.length > 0 && thumbnails[thumbnails.length - 1].blob ){
          preview = window.URL.createObjectURL(thumbnails[thumbnails.length - 1].blob);
        }
      }
      if (item.type.startsWith("text") || item.type.endsWith("json")) {
        preview = src;
        if(item.text){
          src = await item.text();
        } else {
          try{
            src = await readBlobAsString(item);
          }catch(e) {
            console.log(e);
          }
        }
      }
      list[index] = {
        type: item.type,
        name: item.name,
        size: item.size,
        src,
        preview,
      };
      index++;
    }

    onReadyFiles(list);
  };

  const filterFiles = (fileList: Array<any>) => {
    const exp = /^(image|video|text|application\/json)/;
    return [...fileList].filter((item) => exp.test(item.type));
  };

  const stopPropagation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragEnter = (e: any) => {
    setDragEnter(true);
    stopPropagation(e);
  };

  const onDragLeave = (e: any) => {
    setDragEnter(false);
    stopPropagation(e);
  };

  const onDrop = async (e: any) => {
    const fileList: FileList = e.dataTransfer.files;
    const items: DataTransferItemList = e.dataTransfer.items;
    stopPropagation(e);
    let filesImport: any = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === "file" && items[i].type === "") {
        //try read directory
        try {
          let item = items[i].webkitGetAsEntry();
          let filesDirectory: any = await traverseFileTree(item);
          filesImport = filterFiles(filesDirectory);
        } catch (e) {
          console.log(e);
        }
      }
    }
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].type) {
        filesImport.push(fileList[i]);
      }
    }

    setDragEnter(false);
    ReaderFiles(filesImport);
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
            <TypeFiles>
              <VideoIcon />
              <TextIcon />
              <PictureIcon />
              <FolderIcon />
            </TypeFiles>
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
