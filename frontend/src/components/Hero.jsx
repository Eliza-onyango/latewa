import { Link } from 'react-router-dom';

function Hero({ title, subtitle, backgroundImage, showButtons = true }) {
  return (
    <section
      className="relative bg-cover bg-center bg-fixed min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] flex items-center overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.4)), url(${backgroundImage || '/placeholder-images/hero-bg.jpg'})`,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
        <div className="max-w-4xl">
          {/* Decorative line */}
          <div className="decoration-line mb-8" />

          <h1 className="heading-xl md:heading-2xl lg:heading-xl text-red-600 mb-8 leading-tight">
            {title || 'Law, Technology, Art for Social Change'}
          </h1>
          
          <p className="text-body-lg md:text-xl text-red-600/90 font-medium leading-relaxed mb-12">
            {subtitle || 'Latewa International NGO champions social justice, climate action, environmental conservation, legal aid, arts, and community empowerment.'}
          </p>
          
          {showButtons && (
            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                <Link
                  to="/programs"
                  className="btn-primary text-lg px-8 py-4 group"
                >
                  <span className="group-hover:translate-x-2 transition-transform inline-flex items-center">
                    Our Programs
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  to="/get-involved"
                  className="btn-secondary text-lg px-8 py-4 group"
                >
                  <span className="group-hover:translate-x-2 transition-transform inline-flex items-center">
                    Get Involved
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-white/60 text-sm mb-2">Scroll to explore</div>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto">
          <div className="w-1 h-2 bg-white rounded-full mx-auto mt-2" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
