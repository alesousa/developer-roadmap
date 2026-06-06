import { GlobalHeader } from '../components/global-header';
import { Footer } from '../components/footer';
import { PageWrapper } from '../components/page-wrapper';
import { HangmanGame } from '../components/HangmanGame';
import Helmet from '../components/helmet';

export default function HangmanPage() {
  return (
    <PageWrapper>
      <GlobalHeader />
      <Helmet title="Jogo da Forca | roadmap.sh" />
      <HangmanGame />
      <Footer />
    </PageWrapper>
  );
}
