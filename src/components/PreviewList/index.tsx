import React, { useEffect, WheelEvent, MouseEvent } from "react";

import { Container, LoadImageIcon, PreviewText, PreviewImage, PreviewPdf } from "./styles";

import Skeleton from "../Skeleton";

interface IUploadFile {
  name: string;
  type: string;
  size: number;
  src: string;
  preview: string;
}

interface Props {
  files: IUploadFile[];
  currentItem: number;
  setCurrentItem(index:number):void;
}

interface PropsItem {
  src: string;
  type: string;
  name: string;
  active?: boolean;
  onClick(event: MouseEvent): void;
}

let element: HTMLDivElement | null;

const scrollTo = (preview: number) => {
  const element = document.querySelector(
    `.preview > .preview-item:nth-child(${preview + 1})`
  );
  element?.scrollIntoView(true);
};

const PreviewList: React.FC<Props> = ({ files, currentItem, setCurrentItem }) => {
  const PreviewItem: React.FC<PropsItem> = ({
    src,
    type,
    name,
    active,
    onClick,
  }) => {
    if (src) {
      if (type.startsWith("text") || type.endsWith("json")) {
        return (
          <PreviewText
            onClick={onClick}
            readOnly={true}
            value={src}
            className={"preview-item " + (active ? "active" : "")}
          />
        );
      }
      if (type.endsWith("pdf")) {
        return (
          <PreviewPdf
            onClick={onClick}
            src={src}
            className={"preview-item " + (active ? "active" : "")}
          />
        );
      }
      return (
        <PreviewImage
          src={src}
          onClick={onClick}
          className={"preview-item " + (active ? "active" : "")}
        />
      );
    } else {
      return (
        <Skeleton className="image-skeleton">
          <LoadImageIcon />
        </Skeleton>
      );
    }
  };

  useEffect(() => {
    scrollTo(currentItem);
  }, [currentItem]);

  return (
    <Container
      className="preview"
      onWheel={(event: WheelEvent<HTMLDivElement>) => {
        if (!element) {
          element = document.querySelector(".preview");
        }
        element?.scrollBy(event.deltaY, 0);
      }}
    >
      {files.map((item, index) => {
        return (
          <PreviewItem
            key={index}
            src={item.preview}
            name={item.name}
            type={item.type}
            active={index === currentItem}
            onClick={(event: MouseEvent) => {
              index !== currentItem && setCurrentItem(index);
            }}
          />
        );
      })}
    </Container>
  );
};

export default PreviewList;
