import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { AuthModal } from './components/AuthModal';
import { Onboarding } from './components/Onboarding';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { AICareerCounsellor } from './components/AICareerCounsellor';
import { SkillGapAnalysis } from './components/SkillGapAnalysis';
import { CareerExplorer } from './components/CareerExplorer';
import { AICareerTwin } from './components/AICareerTwin';
import { apiClient } from './utils/api';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { user, loading } = useAuth();
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [userData, setUserData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      loadUserProfile();
    } else if (!user && !loading) {
      setShowAuthModal(true);
    }
  }, [user, loading]);

  const loadUserProfile = async () => {
    try {
      setProfileLoading(true);
      const { profile } = await apiClient.getProfile();
      if (profile) {
        setUserData(profile);
        setIsOnboarded(true);
        setShowAuthModal(false);
      } else {
        setIsOnboarded(false);
      }
    } catch (error) {
      console.log('No existing profile found, starting onboarding');
      setIsOnboarded(false);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleOnboardingComplete = async (data: any) => {
    try {
      await apiClient.saveProfile(data);
      setUserData(data);
      setIsOnboarded(true);
      
      // Record onboarding completion achievement
      await apiClient.recordAchievement(
        'onboarding_complete',
        'Profile Complete',
        'Successfully completed your career profile setup'
      );
    } catch (error) {
      console.error('Failed to save profile:', error);
      // For demo purposes, still allow local usage
      setUserData(data);
      setIsOnboarded(true);
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your career journey...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />;
  }

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userData={userData} onViewChange={setCurrentView} />;
      case 'counsellor':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <AICareerCounsellor userData={userData} />
          </div>
        );
      case 'skills':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <SkillGapAnalysis userData={userData} />
          </div>
        );
      case 'explorer':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <CareerExplorer userData={userData} />
          </div>
        );
      case 'twin':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <AICareerTwin userData={userData} />
          </div>
        );
      default:
        return <Dashboard userData={userData} onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentView={currentView}
        onViewChange={setCurrentView}
        userData={userData}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}