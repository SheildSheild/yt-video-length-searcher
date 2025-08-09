import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.js";
import ResultsPage from "./pages/ResultsPage.js";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router basename="/yt-video-length-searcher">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
