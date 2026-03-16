import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Taxatie from "@/pages/Taxatie";
import Privacyverklaring from "@/pages/Privacyverklaring";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/taxatie" component={Taxatie}/>
      <Route path="/privacyverklaring" component={Privacyverklaring}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
