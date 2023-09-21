import React, { useContext } from 'react';
import { Routes, Route, useMatch,Link } from 'react-router-dom';
import { Layout, Menu } from 'antd'
import Help from 'components/Help/Help';
import Game from 'components/Game/Game';
import Games from 'components/Game/Games';
import Home from 'components/Home/Home';
import { Context } from 'contexts/gameSalesContext';
import Footer from 'components/Footer/Footer';

const { Header, Content } = Layout

const App = () => {

  const { games } = useContext(Context);
  const match = useMatch('/Games/:id');
  const currentGame =
    match ? games.find((game) => game.id === match.params.id) : undefined;

  return (
    <Layout className="layout">
      <Header>
      <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="games">
            <Link to="/Games">Games</Link>
          </Menu.Item>
          <Menu.Item key="help">
            <Link to="/Help">Help</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '30px 50px' }}>
      
      <Routes>
        <Route path="/help" element={<Help />} />
        <Route path="/games" element={<Games />} />
        <Route path="/" element={<Home  />} />
        <Route 
          path="/Games/:id"
          element={<Game game={currentGame} />}
        />
      </Routes>
      
      <Footer/>
      </Content>

    </Layout>
  )
}

export default App
