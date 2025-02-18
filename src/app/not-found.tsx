import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="bg-gray-300 flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg">Страница не найдена</p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
