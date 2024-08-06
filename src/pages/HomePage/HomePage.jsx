import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import Container from "../../components/Container/Container.jsx";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection.jsx";

export default function HomePage() {
  return <Container>
            <AdvantagesSection>
                <WelcomeSection />
            </AdvantagesSection>  
          </Container>
}
