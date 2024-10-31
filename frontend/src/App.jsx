import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./container/AppSidebar";


const App = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />

      </SidebarProvider>
    </div>
  )
}

export default App;