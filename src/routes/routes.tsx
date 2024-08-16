import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Main from '../pages/Main/Main';
import UnControlledForm from '../components/Uncontrolled-form/Uncontrolled-form';
import ReactHookForm from '../components/React-hook-form/React-hook-form';
import Layout from '../components/Layout/Layout';
import NotFound from '../pages/Not-found/Not-found';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Main />} />
      <Route path="/uncontrolled" element={<UnControlledForm />} />
      <Route path="/react-hook-form" element={<ReactHookForm />} />
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);

export default router;
