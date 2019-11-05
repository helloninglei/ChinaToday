import React from 'react';
import './App.css';
import NewsList from './components/News/newsList'
import NewsDetail from './components/News/newsDetail'
import MyPagenation from './components/pagination'
import { Container, Row, Col } from 'reactstrap';

function App() {
  return (

      <div style={{"height": "800px"}}>
          <div style={{"height":"100%", "width":"70%", "float": "left"}}>
              <NewsList />
              <MyPagenation />
          </div>
          <div style={{"height":"100%", "width":"30%", "float": "left", "padding": "30px"}}>
              <NewsDetail />
          </div>
      </div>
  );
}

export default App;
