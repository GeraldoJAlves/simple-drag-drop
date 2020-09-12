import React from "react";

import { Container, Wrapper, ImgFile } from "./styles";

import Skeleton from '../Skeleton';

interface Props {
  list: Array<any>;
}

const ListImages: React.FC<Props> = ({ list }) => {

  const columns = list.length === 4 ? 2 : Math.min(list.length, 3);

  return (
    <Container style={{
      gridTemplateColumns: `repeat(${columns},1fr)`
    }}>
      {list.map((item, index) => {
        return (
          <Wrapper key={index}>
            {item.src ? (
              <ImgFile src={item.src} /> 
              ) : (
              <Skeleton className="image-skeleton" />
            )}
          </Wrapper>
        );
      })}
    </Container>
  );
};

export default ListImages;
