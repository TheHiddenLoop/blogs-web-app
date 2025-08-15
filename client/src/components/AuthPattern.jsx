const AuthPattern = ({ title = "Welcome Back", subtitle = "Sign in to access your account and continue your journey with us." }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gray-50 w-1/2">
      <div className="max-w-sm text-center">
        <div className="grid grid-cols-3 gap-3 mb-8 p-10">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`aspect-square rounded-2xl bg-blue-600/10 ${i % 2 === 0 ? "animate-pulse" : ""}`} />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  )
}

export default AuthPattern;