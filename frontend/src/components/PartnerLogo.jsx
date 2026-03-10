function PartnerLogo({ name, logo, website }) {
  const content = (
    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center hover:shadow-md transition-shadow h-32">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
        />
      ) : (
        <span className="text-gray-600 font-medium text-center">{name}</span>
      )}
    </div>
  );

  if (website) {
    return (
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        title={name}
      >
        {content}
      </a>
    );
  }

  return content;
}

export default PartnerLogo;
