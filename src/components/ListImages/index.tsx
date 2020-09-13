import React from "react";

import {
  Container,
  Wrapper,
  ImgFile,
  LoadImageIcon,
  Video,
  DeleteButton,
  TextFile,
} from "./styles";

import Skeleton from "../Skeleton";

interface Props {
  files: Array<any>;
  setFiles: Function;
}

const ListImages: React.FC<Props> = ({ files, setFiles }) => {
  const getTypeFile = (item: any) => {
    if (item.type.startsWith("image")) {
      return <ImgFile src={item.src} />;
    }
    if (item.type.startsWith("text") || item.type.endsWith("json")) {
      const base = item.src.replace(/^.+base64,/,'');
      return <TextFile readOnly={true}  value={atob(base)} />;
    }
    if (item.type.startsWith("video")) {
      return (
        <Video
          controls={true}
          autoPlay={false}
          loop={true}
          muted={true}
          onEnded={() => {
            console.log("video acabou");
          }}
        >
          <source src={item.src} type="video/mp4" />
        </Video>
      );
    }
    return null;
  };

  return (
    <Container
      
      onDragEnter={() => {
        setFiles([]);
      }}
    >
      {files.map((item, index) => {
        return (
          <Wrapper key={index}>
            {item.src ? (
              <>
                {getTypeFile(item)}
                <DeleteButton
                  onClick={() => {
                    setFiles(files.filter((v, i) => i !== index));
                  }}
                />
              </>
            ) : (
              <Skeleton className="image-skeleton">
                <LoadImageIcon />
              </Skeleton>
            )}
          </Wrapper>
        );
      })}
    </Container>
  );
};

export default ListImages;
