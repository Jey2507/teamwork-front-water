import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import Container from '../../components/Container/Container.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import { useMedia } from '../../hooks/useMedia.js';
import css from './SignUpPage.module.css';

const SignUpPage = () => {
  const { isDesktop } = useMedia();
  return (
    <div>
      <Container>
        <div className={css.wrapperHome}>
          <SignUpForm />
          {isDesktop && <AdvantagesSection />}
        </div>
      </Container>
    </div>
  );
};

export default SignUpPage;
