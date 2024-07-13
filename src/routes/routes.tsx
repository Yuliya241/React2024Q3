import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/Not-found/Not-found';
import Detailed from '../pages/Detailed/Detailed';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}>
        <Route path=":id" element={<Detailed />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </>
  )
);

export default router;
