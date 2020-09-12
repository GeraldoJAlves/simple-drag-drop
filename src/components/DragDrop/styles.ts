import styled from 'styled-components';

import { FaDownload } from 'react-icons/fa';

export const Container = styled.div`
  margin-top: 30px;
`;

export const DragBox = styled.div`

  border: 7px solid black;
  border-style: dashed;
  position: relative;
  width: 50vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #DDD;
  cursor: pointer;

  &.drag-enter {
    border-style: solid;
    width: 55vw;
    height: 55vh;
    background-color: #BBB;
  }
  &.drag-drop {
    border: 2px solid black;
  }
  transition: width .5s, height .5s; 

`;

export const UploadIcon = styled(FaDownload)`
  width: 40px;
  height: 40px;
`;

export const DragText = styled.h2`

`;

