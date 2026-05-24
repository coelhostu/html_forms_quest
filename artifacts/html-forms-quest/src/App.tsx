import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import MapPage from "@/pages/map";
import LevelPage from "@/pages/level";
import HowToPlay from "@/pages/how-to-play";
import Settings from "@/pages/settings";
import Visualizer from "@/pages/visualizer";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/mapa" component={MapPage} />
      <Route path="/nivel/:id" component={LevelPage} />
      <Route path="/como-jogar" component={HowToPlay} />
      <Route path="/configuracoes" component={Settings} />
      <Route path="/visualizar" component={Visualizer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
