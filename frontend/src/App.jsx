import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./container/AppSidebar";
import Dashboard from "./container/Dashboard";


const App = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <Dashboard />
      </SidebarProvider>
    </div>
  )
}

export default App;