import Header from './components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Login'

import Dashboard from './components/Dashboard';
import ServerList from './components/server/ServerList'
import ServerAdd from './components/server/ServerAdd';
import ServerView from './components/server/ServerView';
import ServerEdit from './components/server/ServerEdit';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Dashboard/>} />
        <Route path="/server/list" element={<ServerList/>}/>
        <Route path='/server/add' element={<ServerAdd />} />
        <Route path='/server/view/:id' element={<ServerView />} />
        <Route path='/server/edit/:id' element={<ServerEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
