import React from "react";

import { Container, Wrapper, ImgFile, LoadImageIcon } from "./styles";

import Skeleton from '../Skeleton';

interface Props {
  list: Array<any>;
  clearList: Function;
}

const ListImages: React.FC<Props> = ({ list, clearList }) => {
  return (
    <Container onDragEnter={()=>{
      clearList();
    }}>
      {list.map((item, index) => {
        return (
          <Wrapper key={index}>
            {item.src ? (
              <ImgFile src={item.src} /> 
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
