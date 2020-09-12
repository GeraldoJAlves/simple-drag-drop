import React, { useState } from "react";

import { Container } from "./styles";

import ListImages from '../../components/ListImages';
import DragDrop from '../../components/DragDrop';

const Main: React.FC = () => {

  const [list, setList] = useState([]);

  // const images = [
  //   {
  //     src: 'https://uploads.metropoles.com/wp-content/uploads/2017/12/28161806/rick7.jpg'
  //   },
  //   {
  //     src: 'https://uploads.metropoles.com/wp-content/uploads/2017/12/28161806/rick7.jpg'
  //   },
  //   {
  //     src: 'https://uploads.metropoles.com/wp-content/uploads/2017/12/28161806/rick7.jpg'
  //   },
  //   {
  //     src: 'https://uploads.metropoles.com/wp-content/uploads/2017/12/28161806/rick7.jpg'
  //   },
  // ]

  return (
    <Container>
      <DragDrop onReadyFiles={ (files:any) => {
        setList(files);
      }} />
      <ListImages list={list} />
    </Container>
  );
};

export default Main;
