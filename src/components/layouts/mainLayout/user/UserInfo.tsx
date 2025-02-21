import Button from "@/components/ui/Button";
import { useGetOneUser } from "@/hooks/users/useOneUser";

export default function UserInfo() {
  const { oneUser } = useGetOneUser();

  return (
    <div className="bg-slate-500 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Информация о пользователе</h2>
      <div className="space-y-2 mb-4">
        <p>
          <strong>Имя:</strong> {oneUser?.name}
        </p>
        {oneUser?.email && (
          <p>
            <strong>Email:</strong> {oneUser?.email}
          </p>
        )}
        <p>
          <strong>Адрес доставки:</strong> {oneUser?.profile?.address}
        </p>
        <p>
          <strong>Телефон:</strong> {oneUser?.profile?.phone}
        </p>
      </div>
      <Button variant="secondary">Редактировать профиль</Button>
    </div>
  );
}
// */
