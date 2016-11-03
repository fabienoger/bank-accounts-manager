import React          from 'react';
import {Row, Col}     from 'react-bootstrap'
import Sidenav        from '/imports/ui/components/Sidenav'

const MainLayout = ({pageName, pageComponent}) => (
  <div>
    <header>
      <Sidenav page={pageName}/>
    </header>
    <main className="container-fluid">
      <Row>
        <Col xs={12} style={{ margin: 0 }}>
          {pageComponent}
        </Col>
      </Row>
    </main>
  </div>
);

export default MainLayout
