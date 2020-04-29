import React from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";

const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
  }) => {
    const count = preGlobalFilteredRows && preGlobalFilteredRows.length;
  
    return (
        <input
          value={globalFilter || ""}
          onChange={e => {
            setGlobalFilter(e.target.value || undefined);
          }}
          placeholder={`Search ${count} item(s)...`}
          className="form-control form-control-lg mb-3"
        />
    );
};

const Table = ({columns, data, history}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
          columns,
          data,
          initialState: {pageIndex: 0, pageSize: 10}
        },
        useGlobalFilter,
        usePagination
    );

    const viewJobPage = (id) => {
        history.push(`/job/${id}`);
    }

    return (
    <>
    <div className="row d-flex justify-content-end">
    <div className="col col-lg-4 col-xl-3">
    <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
    />
    </div>
    </div>
    
    <table className="table table-bordered table-striped table-hover" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => {viewJobPage(row.original.jobId)}} style={{cursor:'pointer'}}>
                {row.cells.map((cell, i) => {

                    // Check if colored badge needs to be rendered
                    if(cell.column.Header === "Completion Status" || cell.column.Header === "Reports") {
                        let color = "primary";
                        if(cell.value === "Complete") {
                            color = "success";
                        } else if(cell.value === "In Progress") {
                            color = "warning";
                        } else if(cell.value === "Required") {
                            color = "danger";
                        }
                        return (
                        <td {...cell.getCellProps()}>
                            <span className={`badge badge-${color}`}>
                            {cell.render("Cell")}
                            </span>
                        </td>
                        );
                    }
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
    </table>
    <div className="row d-flex align-items-center justify-content-between mt-3">
        <div className="col">
            <strong>
                {`Page ${pageIndex + 1} of ${pageOptions.length}`}
            </strong>
            <button
                onClick={() => previousPage()} disabled={!canPreviousPage}
                className="ml-3 btn btn-primary pt-1 pb-0 mr-2 table-pagination-btn"
            >
                <i className="material-icons">arrow_back</i>
            </button>
            <button
                onClick={() => nextPage()} disabled={!canNextPage}
                className="btn btn-primary pt-1 pb-0 table-pagination-btn"
            >
                <i className="material-icons">arrow_forward</i>
            </button>
        </div>
    </div>
    </>
    );
}

export default Table;