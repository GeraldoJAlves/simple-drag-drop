import styled from 'styled-components';

import { FaDownload } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';

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
    width: 55vw;
    height: 55vh;
    background-color: #BBB;
  }

  transition: width .5s, height .5s; 

`;

export const UploadIcon = styled(FaDownload)`
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
`;

