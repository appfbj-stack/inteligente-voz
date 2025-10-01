import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router basename="/inteligente-voz">
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Diário Inteligente
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <div className="flex items-center justify-center h-full">
                  <p className="text-2xl font-semibold text-gray-700">
                    Bem-vindo ao Diário Inteligente!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;