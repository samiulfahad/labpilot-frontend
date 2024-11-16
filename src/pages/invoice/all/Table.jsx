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
          {props.rows.map(({ id, total, due }, index) => {
            const isLast = index === props.rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="tableBtn">
                    <Link to="/invoice/print">View/Print</Link>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {total}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-medium text-red-400">
                    {due}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="tableBtn">
                    Edit
                  </Typography>
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
