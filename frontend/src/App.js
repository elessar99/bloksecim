import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
}
  from 'react-router-dom';
import { WalletContextProvider } from './context/WalletContext';
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home';
import Proposals from './pages/Proposals';
import GetPin from './pages/GetPin';
import About from './pages/About';
import Tokenomics from './pages/Tokenomics';
import Profile from './pages/Profile';
import Token from './pages/Token';
import MartianProposals from './pages/MartianProposals';
import XyzProposals from './pages/XyzProposals';
import CreateProposal from './pages/CreateProposal';
import Voting from './pages/Voting';
import Results from './pages/Results';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/getpin' element={<GetPin />} />
      <Route path='/create' element={<CreateProposal/>}/>
      <Route path='/voting' element={<Voting/>}/>
      <Route path='/results' element={<Results/>}/>
      <Route path='/proposals' element={<Voting />}/>
      <Route path='/proposals/martians' element={<MartianProposals/>}/>
      <Route path='/proposals/xyz' element={<XyzProposals/>}/>
      <Route path='/tokenomics' element={<Tokenomics />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/about' element={<About />} />
      <Route path='/token' element={<Token />}>
        <Route path='martians'/>
        <Route path='xyz'/>
      </Route>
    </Route>
  )
);

export default function App() {
  return (
    <WalletContextProvider>
      <RouterProvider router={router} />
    </WalletContextProvider>
  );
};