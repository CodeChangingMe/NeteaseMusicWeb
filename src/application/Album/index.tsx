import React, { useState } from 'react';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../../baseUI/header';

interface IProps extends RouteComponentProps<any> {}

const Album: React.FC<IProps> = props => {
  const [showStatus, setShowStatus] = useState(true);

  const handleBack = () => {
    setShowStatus(false);
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}>
      <Container>
        <Header title={'返回'} handleClick={handleBack}></Header>
      </Container>
    </CSSTransition>
  );
};

export default Album;
