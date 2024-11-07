import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HeroSectionHeader from './components/HeroSectionHeader';
import LastQuestions from './components/LatestQuestions';
import TopContributers from './components/TopContributers';

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection>
        <HeroSectionHeader />
      </HeroSection>
      <LastQuestions />
      <TopContributers />
      <Footer />
    </div>
  );
}
