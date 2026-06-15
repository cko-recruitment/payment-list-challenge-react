import { I18N } from "./constants/i18n";
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { PaymentsPage } from "./pages/PaymentsPage";

// This is required for tests to pass if ReactQuery is used
// you don't have to use this library in your solution.
const queryClient = new QueryClient({

  queryCache: new QueryCache({
    onError: (error, query) => {
      //Log sentry error here
      console.error(`Query failed: ${String(query.queryKey)}`, error);
    },
  }),
  defaultOptions: {
    queries: {
      // disable retries is required for tests to pass if ReactQuery is used
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">{I18N.APP_TITLE}</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <PaymentsPage />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
