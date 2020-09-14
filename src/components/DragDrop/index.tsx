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
  endOnDrag:any;
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

  const ReaderFiles = (files: Array<File>) => {
    console.log(files);
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

    const reader = new FileReader();
    reader.readAsDataURL(filesAllowed[index]);
    reader.onloadend = () => {
      if (typeof reader.result == "string") {
        list[index] = {
          type: filesAllowed[index].type,
          name: filesAllowed[index].name,
          size: filesAllowed[index].size,
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
    console.log('drop certo');
    //let dt = e.dataTransfer;
    //let files: Array<any> = dt.files;
    const fileList: FileList = e.dataTransfer.files;
    const items: DataTransferItemList = e.dataTransfer.items;
    stopPropagation(e);
    let filesImport:any = [];

    
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file' && items[i].type === '') {
        //try read directory
        try{

          let item = items[i].webkitGetAsEntry();
          let filesDirectory:any = await traverseFileTree(item);
          filesImport = filterFiles(filesDirectory);
        } catch(e) {
          console.log(e);
        }
      }
    }
    for (let i = 0; i < fileList.length; i++) {
      if(fileList[i].type) {
        filesImport.push(fileList[i]);
      }
    }
    console.log(filesImport);

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
