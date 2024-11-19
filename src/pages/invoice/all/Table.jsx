/** @format */

import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Table(props) {
  const tableBtn = "px-2 py-1 text-white text-sm bgColor rounded";

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {props.head.map((head) => (
              <th key={head} className="border-b border-blue-gray-400 bgColor p-4">
                <p className="text-gray-300 font-bold">
                  {head}
                </p>
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
                    {/* Test status */}
                    {/* <td className={classes}>
                      <p className="text-sm">Completed - {item.testList.length}</p>
                      <p className="text-sm">Pending- {item.testList.length}</p>
                    </td> */}
                    {item.netAmount === item.paid ? (
                      <td className={classes + " text-blue-gray-600"}>পরিশোধিত </td>
                    ) : (
                      <td className={classes + " text-sm"}>
                        <div className="flex space-x-2 text-[13px] text-justify">
                          {/* <p>জমা- {item.paid}</p> */}
                          <p className="text-red-500">বাকি- {item.netAmount - item.paid}</p>
                        </div>
                        <button onClick={props.onDueCollection} className={tableBtn + " text-[11px]"}>
                          Collect Due
                        </button>
                      </td>
                    )}

                    <td className={classes}>
                      {item.notified ? (
                        <p className="text-[14px] pl-2">Done</p>
                      ) : (
                        <div>
                          <button className={tableBtn}>Deliver</button>
                        </div>
                      )}
                    </td>

                    <td className={classes}>
                      <Link to="/invoice/print" className="tableBtn mr-2 text-sm py-1 px-2">
                        View
                      </Link>
                      <Link to="/invoice/print" className="tableBtn mr-2 text-sm py-1 px-2">
                        Edit
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
