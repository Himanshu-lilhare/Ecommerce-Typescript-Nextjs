import { useState, Dispatch, SetStateAction } from "react";
import "./table.scss";

type TUser = {
  name: string;
  username: string;
  productsBought: number;
  amountSpent: number;
  role: string;
};
type TTable = {
  title: string;
  headings: string[];
  content: TUser[];
};
const Table = (props: TTable) => {
  const [content, setCOntent] = useState<TUser[]>(props.content);

  return (
    <table className="table">
      <thead>
        <tr className="head-row">
          <th>Sr.No</th>
          {props.headings.map((heading: string, index: number) => {
            return <th key={index}>{heading.toLocaleUpperCase()}</th>;
          })}
        </tr>
      </thead>
      <tbody className="table-body">
        {content.map((info: TUser, index: number) => {
          return (
            <TableBodyRow
              info={info}
              index={index}
              key={index}
              headings={props.headings}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

function TableBodyRow({
  info,
  index,
  headings,
}: {
  info: TUser;
  index: number;
  headings: string[];
}) {
  const [row, setRow] = useState<TUser>(info);

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        {headings.map((heading, index) => {
          return (
            <TableBoodyRowData
              row={row}
              setRow={setRow}
              key={index}
              heading={heading}
              index={index}
            />
          );
        })}
      </tr>
    </>
  );
}

function TableBoodyRowData({
  heading,
  index,
  row,
  setRow,
}: {
  heading: string;
  index: number;
  row: TUser;
  setRow: Dispatch<SetStateAction<TUser>>;
}) {
  const [edit, setEdit] = useState<boolean>(false);
  let editableFields = "name,role";
  return (
    <td key={index}>
      <span style={ editableFields.includes(heading)
            ? { display: "flex", justifyContent: "space-between" }
            : {} } >
        {(row as any)[heading]}{" "}
        {GiveIcon(editableFields, heading, edit, setEdit)}
      </span>
    </td>
  );
}

function GiveIcon(
  editableFields: string,
  heading: string,
  edit: boolean,
  setEdit: Dispatch<SetStateAction<boolean>>
) {


function doneEdit(){



}

  if (editableFields.includes(heading) && edit) {
    return (
      <img
        className="edit-icon"
        src="tick.png"
        alt="edit"
        onClick={() => {
          setEdit(false);
        }}
      />
    );
  }
  if (editableFields.includes(heading) && !edit) {
    return (
      <img
        className="edit-icon"
        src="edit.png"
        alt="edit"
        onClick={() => {
            doneEdit()
        }}
      />
    );
  }

}
