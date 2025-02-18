"use client";

const order = {
  id: "12345",
  date: "2025-02-15",
  total: 5000,
  status: "В обработке",
};

const CurrentOrder = () => {
  return (
    <div className="bg-slate-500 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Текущий заказ</h2>
      {order ? (
        <div>
          <p>
            <strong>Номер заказа:</strong> {order.id}
          </p>
          <p>
            <strong>Дата:</strong> {new Date(order.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Сумма:</strong> {order.total} руб.
          </p>
          <p>
            <strong>Статус:</strong> {order.status}
          </p>
        </div>
      ) : (
        <p>У вас нет текущих заказов</p>
      )}
    </div>
  );
};
export default CurrentOrder;
