import { Helmet } from 'react-helmet-async';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import Container from '../../components/Container/Container.jsx';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection.jsx';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home - AquaTrack</title>
      </Helmet>
      <Container>
        <AdvantagesSection>
          <WelcomeSection />
        </AdvantagesSection>
      </Container>
    </>
  );
}
