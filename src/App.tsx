import { Suspense } from "react";
import AppRoute from "./router/AppRouter";

function App() {
  return (
    <Suspense fallback={<p>loading</p>}>
      <AppRoute />
    </Suspense>
  );
}

export default App;
