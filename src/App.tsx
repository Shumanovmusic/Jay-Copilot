import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discovery from './pages/Discovery';
import Define from './pages/Define';
import Develop from './pages/Develop';
import Deliver from './pages/Deliver';
import VideoFeature from './pages/VideoFeature';
import Segmentation from './pages/Segmentation';
import MarketResearch from './pages/MarketResearch';
import HypothesisTask from './pages/HypothesisTask';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/define" element={<Define />} />
          <Route path="/develop" element={<Develop />} />
          <Route path="/deliver" element={<Deliver />} />
          <Route path="/video-feature" element={<VideoFeature />} />
          <Route path="/segmentation" element={<Segmentation />} />
          <Route path="/market-research" element={<MarketResearch />} />
          <Route path="/hypothesis-task" element={<HypothesisTask />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
