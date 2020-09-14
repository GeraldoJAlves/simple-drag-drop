import styled from "styled-components";

import {
  FaDownload,
  FaFileAlt,
  FaFileImage,
  FaFileVideo,
  FaFolder,
} from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";

export const Container = styled.div``;

export const DragBox = styled.div`
  border: 7px solid black;
  border-style: dashed;
  position: relative;
  width: 80vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #bbb;
  cursor: pointer;

  @media (min-width: 500px) {
    width: 50vw;
  }

  &.drag-enter {
    width: 75vw;
    height: 75vh;
    background-color: #ddd;
  }

  transition: width 0.5s, height 0.5s;
`;

export const TypeFiles = styled.div`
  margin-top: 20px;
  display: flex;
  width: 70%;
  justify-content: space-between;
  @media (min-width: 900px) {
    width: 50%;
    justify-content: space-between;
  }
`;

export const UploadIcon = styled(FaDownload)`
  pointer-events: none;
  width: 40px;
  height: 40px;
`;

export const VideoIcon = styled(FaFileVideo)`
  pointer-events: none;
  width: 40px;
  height: 40px;
`;

export const PictureIcon = styled(FaFileImage)`
  pointer-events: none;
  width: 40px;
  height: 40px;
`;

export const TextIcon = styled(FaFileAlt)`
  pointer-events: none;
  width: 40px;
  height: 40px;
`;

export const FolderIcon = styled(FaFolder)`
  pointer-events: none;
  width: 40px;
  height: 40px;
`;

export const LoadingIcon = styled(FaSpinner)`
  width: 40px;
  height: 40px;

  animation: mymove infinite 5s;

  @keyframes mymove {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(720deg);
    }
  }
`;

export const DragText = styled.h2`
  margin-top: 10px;
  text-align: center;
  pointer-events: none;
`;
