import React from 'react';

import { Container, Wrapper, ImgFile } from './styles';

interface Props {
  list: Array<any>;
}

const ListImages: React.FC<Props> = ({list}) => {
  return (
    <Container>
      {list.map( (item,index) => {
        return (
          <Wrapper key={index}>
            <ImgFile src={item.src} />
          </Wrapper>
        )
      })}
    </Container>
  );
};

export default ListImages;
