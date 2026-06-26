import Hero from '../components/Hero';
import PartnerLogo from '../components/PartnerLogo';
import { partners } from '../data/partners';
import partnersBg from '../assets/latewa2.jpg';

function Partners() {
  return (
    <div>
      <Hero title="Our Partners" subtitle="Organizations we collaborate with." showButtons={false} backgroundImage={partnersBg} />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {partners.map((p, i) => <PartnerLogo key={i} name={p.name} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Partners;
