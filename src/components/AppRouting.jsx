import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SearchProvider } from "../context/SearchContext";
import { Home } from "../pages/Home";
import { PreviewGif } from "../pages/PreviewGif";
import {Search} from "../pages/Search";
import { Layout } from "./Layout";

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
	    <Route path="search/:image" element={<Search />} />
            <Route path="gif/:image" element={<PreviewGif />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
};
