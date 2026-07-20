
import { NavBar } from "@components/navBar/NavBar";
import { SideBar } from "@components/sideBar/SideBar";
import { Dashboard } from "@components/dashboard/Dashboard";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <NavBar />
      <main className="flex flex-1 w-full h-full">
        <SideBar />
        <Dashboard />
      </main>
    </div>
  );
}
