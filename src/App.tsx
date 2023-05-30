import { DishForm } from './components/DishForm';
import { Routes, Route } from 'react-router-dom';
import { Success } from './components/Success';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DishForm />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default App;
