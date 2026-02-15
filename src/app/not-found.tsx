import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-700">
        Oops! Page not found.
      </h2>
      <p className="mt-2 text-gray-500 text-center max-w-sm">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block bg-primary text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
