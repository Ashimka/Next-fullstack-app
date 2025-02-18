"use client";

import Button from "@/components/ui/Button";
import React from "react";

const orders = [
  { id: "12345", date: "2023-05-15", total: 5000, status: "В обработке" },
  { id: "12344", date: "2023-04-20", total: 3500, status: "Доставлен" },
  { id: "12343", date: "2023-03-10", total: 7800, status: "Доставлен" },
];

const OrderHistory = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">История заказов</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Номер заказа</th>
              <th className="py-3 px-6 text-left">Дата</th>
              <th className="py-3 px-6 text-left">Сумма</th>
              <th className="py-3 px-6 text-left">Статус</th>
              <th className="py-3 px-6 text-center">Действия</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {order.id}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">{order.total} руб.</td>
                <td className="py-3 px-6 text-left">{order.status}</td>
                <td className="py-3 px-6 text-center">
                  <Button variant="secondary" size="sm">
                    Подробнее
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderHistory;
