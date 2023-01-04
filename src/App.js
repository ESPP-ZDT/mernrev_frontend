import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNoteScreen from "./screens/CreateNoteScreen/CreateNoteScreen";
import UpdateNoteScreen from "./screens/UpdateNoteScreen/UpdateNoteScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<RegisterScreen />} exact />
          <Route path="/mynotes" element={<MyNotes search={search} />} exact/>
          <Route path="/note/:id" element={<UpdateNoteScreen />} />
          <Route path="/createnote" element={<CreateNoteScreen />} exact />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;
