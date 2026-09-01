import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { RecipesView } from './components/RecipesView';
import { FridgeModeView } from './components/FridgeModeView';
import { MealPlannerView } from './components/MealPlannerView';
import { FoodDiaryView } from './components/FoodDiaryView';
import { HistoryStatsView } from './components/HistoryStatsView';
import { ShoppingListView } from './components/ShoppingListView';
import { ProfileView } from './components/ProfileView';
import { BonusHubView } from './components/BonusHubView';
import { RecipeModal } from './components/RecipeModal';
import { InstallPromptModal } from './components/InstallPromptModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardView />;
      case 'recipes':
        return <RecipesView />;
      case 'fridge':
        return <FridgeModeView />;
      case 'mealplan':
        return <MealPlannerView />;
      case 'diary':
        return <FoodDiaryView />;
      case 'history':
        return <HistoryStatsView />;
      case 'shopping':
        return <ShoppingListView />;
      case 'profile':
        return <ProfileView />;
      case 'bonus':
        return <BonusHubView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div id="shapechef-app-root" className="flex min-h-screen w-full bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Desktop Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-50">
        {/* Sticky Header */}
        <Header />

        {/* Dynamic Page View */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Recipe Modal */}
      <RecipeModal />

      {/* PWA Install & Add to Home Screen Prompt Modal */}
      <InstallPromptModal />

      {/* Bottom Navigation for Mobile / Tablet */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
