import { DishForm } from './components/DishForm';
import { Routes, Route } from 'react-router-dom';
import { Success } from './components/Success';
const App = () => {
  return (
    <Routes>
      <Route path="/dishes-app" element={<DishForm />} />
      <Route path="/dishes-app/success" element={<Success />} />
    </Routes>
  );
};

export default App;
