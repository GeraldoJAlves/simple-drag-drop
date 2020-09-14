import React, { useState } from "react";

import {
  Container,
  Wrapper,
  ImgFile,
  LoadImageIcon,
  Video,
  TextFile,
  DeleteIcon,
  NextIcon,
  PrevIcon,
  FirstIcon,
  LastIcon,
  ToolBar,
  MenuIcon,
  Preview,
  PreviewItem
} from "./styles";

import Skeleton from "../Skeleton";

interface Props {
  files: Array<any>;
  setFiles: Function;
}

const ListFiles: React.FC<Props> = ({ files, setFiles }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const total = files.length;
  const getTypeFile = (item: any) => {
    if (item.type.startsWith("image")) {
      return <ImgFile src={item.src} />;
    }
    if (item.type.startsWith("text") || item.type.endsWith("json")) {
      const base = item.src.replace(/^.+base64,/, "");
      return <TextFile readOnly={true} value={atob(base)} />;
    }
    if (item.type.startsWith("video")) {
      return (
        <Video
          controls={true}
          autoPlay={true}
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
    <Container>
      {total > 0 ? (
        <>
          <Preview>
              {files.map( (item, index) => {
                return (
                  <PreviewItem key={index} src={item.src} className={index === currentItem ? 'active' : ''} />
                );
              })}
          </Preview>
          <Wrapper>
            {files[currentItem].src ? (
              <>
                <ToolBar>
                  <MenuIcon />
                  <span className="name-file">{files[currentItem].name}</span>
                  <DeleteIcon
                    onClick={() => {
                      setFiles(files.filter((v, i) => i !== currentItem));
                      setCurrentItem(0);
                    }}
                  />
                </ToolBar>
                {getTypeFile(files[currentItem])}
                <ToolBar>
                  <FirstIcon
                    className={currentItem > 0 ? "" : "disable"}
                    onClick={() => {
                      currentItem > 0 && setCurrentItem(0);
                    }}
                  />
                  <PrevIcon
                    className={currentItem > 0 ? "" : "disable"}
                    onClick={() => {
                      currentItem > 0 && setCurrentItem(currentItem - 1);
                    }}
                  />
                  <span>
                    {currentItem + 1} / {total}
                  </span>
                  <NextIcon
                    className={currentItem < total - 1 ? "" : "disable"}
                    onClick={() => {
                      currentItem < total - 1 &&
                        setCurrentItem(currentItem + 1);
                    }}
                  />
                  <LastIcon
                    className={currentItem < total - 1 ? "" : "disable"}
                    onClick={() => {
                      currentItem < total - 1 && setCurrentItem(total - 1);
                    }}
                  />
                </ToolBar>
              </>
            ) : (
              <Skeleton className="image-skeleton">
                <LoadImageIcon />
              </Skeleton>
            )}
          </Wrapper>
        </>
      ) : null}
    </Container>
  );
};

export default ListFiles;
