/** @format */

import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Table(props) {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {props.head.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-bold leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map(({ invoiceId, name, netAmount, paid, notified }, index) => {
            const isLast = index === props.rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={invoiceId}>
                <td className={classes}>{invoiceId}</td>
                <td className={classes}>{name}</td>
                {netAmount === paid ? (
                  <td className={classes}>পরিশোধিত </td>
                ) : (
                  <td className={classes}>
                    <p>জমা- {paid}</p>
                    <p className="text-red-500">বাকি- {netAmount - paid}</p>
                  </td>
                )}

                <td className={classes}>{notified ? "হ্যাঁ" : "না"}</td>

                <td className={classes}>
                  <Link to="/invoice/print" className="tableBtn mr-2 text-sm py-1 px-2">
                    View
                  </Link>
                  <Link to="/invoice/edit" className="tableBtn text-sm py-1 px-2">
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default Table;
