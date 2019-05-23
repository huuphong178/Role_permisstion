import React from "react";
import { makeData } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// Import React Table HOC Fixed columns
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);
function gen(date){
  return (
    {
      Header: date,
      columns: [
        {
          Header: "Opening",
          accessor: "age",
          width: 100,
        },
        {
          Header: "Cash In",
          accessor: "visits",
          width: 100
        },
        {
          Header: "Cash Out",
          accessor: "progress",
          width: 100
        },
        {
          Header: "Closed",
          accessor: "age",
          id: "age2",
          width: 100
        },
        
      ]
    }
  )
}
class FixTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTableFixedColumns
          data={data}
          columns={
            [
            {
              Header: "",
              fixed: "left",
              columns: [
                {
                  Header: "Index",
                  accessor: "index",
                  width: 100
                },
                {
                  Header: "Wallet",
                  accessor: "wallet",
                  width: 200
                },
                {
                  Header: "Wallet ID",
                  accessor: "walletid",
                  width: 250,
                }
              ]
            },
            gen("2019-03-26"),
            gen("2019-03-28"),
            gen("2019-03-29"),
            gen("2019-03-30"),
            gen("2019-03-31"),
            gen("2019-04-01"),
            {
              Header: "",
              fixed: "right",
              columns: [
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            }
          ]}
          defaultPageSize={50}
          style={{ height: 450 }}
          className="-striped"
        />
        <br />
      </div>
    );
  }
}
export default FixTable;
