"use client"
import Navigation from "@/app/components/Navigation/Navigation";
import Main from "@/app/components/Main/Main";
import { useAppContext } from "./AppContext";
export default function App() {
  const { state: {themeMode, displayNavigation} } = useAppContext();
  return (
    
    <div className={` ${themeMode} flex min-h-screen`}>
      <Navigation  />
      <Main />
    </div>


  );
}
