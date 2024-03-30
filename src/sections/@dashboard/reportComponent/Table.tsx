import React from "react"

export default function Table() {
  return (
    <>
      <table width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Description</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
       
          <React.Fragment key={1}>
            <tbody>
              <tr className="h-10">
                <td>des</td>
                <td>Quantity</td>
                <td>1</td>
                <td>2</td>
              </tr>
            </tbody>
          </React.Fragment>
      </table>

      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          Kshs. 11
        </h2>
      </div>
    </>
  )
}
