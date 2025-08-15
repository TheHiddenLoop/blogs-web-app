const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gray-100 p-12">
      <div className="max-w-sm text-center">
        {/* Pattern */}
        <div className="grid grid-cols-3 gap-3 mb-8 p-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-green-200 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{title}</h2>

        {/* Subtitle */}
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
