import React, { useState } from "react";

import PreviewList from "../PreviewList";

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
  PreviewIconClose,
  PreviewIconOpen,
} from "./styles";

import Skeleton from "../Skeleton";

interface Props {
  files: IUploadFile[];
  setFiles(files: IUploadFile[]): void;
}
interface IUploadFile {
  name: string;
  type: string;
  size: number;
  src: string;
  preview: string;
}

const FilesList: React.FC<Props> = ({ files, setFiles }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const total = files.length;

  const getTypeFile = (item: IUploadFile) => {
    if (item.type.startsWith("image")) {
      return <ImgFile src={item.src} />;
    }
    if (item.type.startsWith("text") || item.type.endsWith("json")) {
      return <TextFile readOnly={true} value={item.src} />;
    }
    if (item.type.startsWith("video")) {
      return (
        <Video
          key={currentItem}
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
          {showPreview ? (
            <PreviewList
              files={files}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
            />
          ) : null}

          <Wrapper style={showPreview ? {} : { height: "100vh" }}>
            {files[currentItem].src ? (
              <>
                <ToolBar>
                  {showPreview ? (
                    <PreviewIconOpen
                      onClick={() => {
                        setShowPreview(!showPreview);
                      }}
                    />
                  ) : (
                    <PreviewIconClose
                      onClick={() => {
                        setShowPreview(!showPreview);
                      }}
                    />
                  )}
                  ;<span className="name-file">{files[currentItem].name}</span>
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

export default FilesList;
