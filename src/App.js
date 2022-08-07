import './App.css';
import Navigation from './components/navbar/Navbar'
import Featured from './components/featured/Featured';
import ListComponent from './components/listcomponent/ListComponent';
function App() {
  return (
    <div className="App">
      <Featured />
      <ListComponent />
    </div>
  );
}
export default App;
