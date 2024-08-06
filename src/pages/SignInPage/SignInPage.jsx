import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import Container from '../../components/Container/Container.jsx';
import SignInForm from '../../components/SignInForm/SignInForm.jsx';
import { useMedia } from '../../hooks/useMedia.js';
import css from './SignInPage.module.css';

const SignInPage = () => {
  const { isDesktop } = useMedia();
  return (
    <div>
      <Container>
        <div className={css.wrapperHome}>
          <SignInForm />
          {isDesktop && <AdvantagesSection />}
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;
