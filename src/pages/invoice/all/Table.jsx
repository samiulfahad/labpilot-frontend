/** @format */

import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Table(props) {
  const tableBtn = "px-2 py-1 text-white text-sm bgColor rounded";
  const tableBtn2 =
    "text-[11px] px-2 py-1 bgColor border-2 border-blue-gray-700 hover:text-blue-gray-500 rounded text-sm text-white hover:bg-white hover:text-blue-gray-500 duration-300";

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {props.head.map((head) => (
              <th key={head} className="border-b border-blue-gray-900 bgColor p-4">
                <p className="text-gray-300 font-bold">{head}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((item, index) => {
            const isLast = index === props.rows.length - 1;
            const classes = isLast ? "p-2" : "p-2 border-b-2 border-blue-gray-200";

            return (
              <tr key={item.invoiceId}>
                {/* ALL Invoice Table */}
                {props.type === "AllInvoices" && (
                  <>
                    <td className={classes + " text-sm"}>{item.invoiceId}</td>
                    <td className={classes}>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-sm">{item.contact}</p>
                    </td>
                    {item.netAmount === item.paid ? (
                      <td className={classes + " text-blue-gray-600"}>পরিশোধিত </td>
                    ) : (
                      <td className={classes + " text-sm"}>
                        <div className="flex space-x-2 text-[13px] text-justify">
                          {/* <p>জমা- {item.paid}</p> */}
                          <p className="text-red-500">বাকি- {item.netAmount - item.paid}</p>
                        </div>
                        <button
                          onClick={() => props.onOpenModal(item, "dueCollection")}
                          className={tableBtn2 + " text-[11px]"}
                        >
                          Collect Due
                        </button>
                      </td>
                    )}

                    <td className={classes}>
                      {item.delivered ? (
                        <p className="text-[14px] pl-2">ডেলিভারি হয়েছে</p>
                      ) : (
                        <div>
                          <button onClick={() => props.onOpenModal(item, "reportDelivery")} className={tableBtn2}>
                            Deliver Now
                          </button>
                        </div>
                      )}
                    </td>

                    <td className={classes}>
                      <Link to="/invoice/action" state={item} className="tableBtn mr-2 text-sm py-1 px-2">
                        Action
                      </Link>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default Table;
