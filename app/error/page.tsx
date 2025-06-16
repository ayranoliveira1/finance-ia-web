const ErrorPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg">
          An unexpected error occurred. Please try again later.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          If the problem persists, please contact support.
        </p>

        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Home
        </a>
      </div>
    </div>
  )
}

export default ErrorPage
