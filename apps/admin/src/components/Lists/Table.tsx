import { useState, Dispatch, SetStateAction } from "react";
import "./table.scss";
import { TUser } from "../../types/user";
import { TProduct } from "../../types/product";
import { TOrder } from "../../types/order";
import { useEditUserInfoMutation } from "../../services/usersApi";

type TContent = TUser | TProduct | TOrder;
type TTable = {
  title: string;
  headings: string[];
  content: TContent[];
};
const Table = (props: TTable) => {
  return (
    <table className="table">
      <thead>
        <tr className="head-row">
          <th className="table-head">Sr.No</th>
          {props.headings.map((heading: string, index: number) => {
            return <th key={index}>{heading.toLocaleUpperCase()}</th>;
          })}
        </tr>
      </thead>
      <tbody className="table-body">
        {props.content.map((info: TContent, index: number) => {
          return (
            <TableBodyRow
              info={info}
              index={index}
              key={index}
              headings={props.headings}
              title={props.title}
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
  title,
}: {
  info: TContent;
  index: number;
  headings: string[];
  title: string;
}) {
  const [row, setRow] = useState<TContent>(info);

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
              title={title}
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
  title,
}: {
  heading: string;
  index: number;
  row: TContent;
  setRow: Dispatch<SetStateAction<TContent>>;
  title: string;
}) {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>((row as any)[heading]);
  const [updateUser] = useEditUserInfoMutation();

  let editableFields = "name,role,stock";

  function doneEdit(keys: string) {
    let updatedValue = { ...row, [keys]: value };
    setRow(updatedValue);

    if (title === "Users") {
      updateUser(updatedValue);
    }
    if (title === "Products") {
      updateUser(updatedValue);
    }
    if (title === "Ordeers") {
    }
  }
  return (
    <td key={index}>
      <span
        style={
          editableFields.includes(heading)
            ? { display: "flex", justifyContent: "space-between" }
            : {}
        }
      >
        {edit ? (
          <input
            className="input"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            autoFocus
          />
        ) : (
          (row as any)[heading] !== undefined ?  (row as any)[heading]  :   (row as any)._id
        )}{" "}
        {GiveIcon(editableFields, heading, edit, setEdit, doneEdit)}
      </span>
    </td>
  );
}

function GiveIcon(
  editableFields: string,
  heading: string,
  edit: boolean,
  setEdit: Dispatch<SetStateAction<boolean>>,
  doneEdit: (heading: string) => void
) {
  if (editableFields.includes(heading) && edit) {
    return (
      <img
        className="edit-icon"
        src="tick.png"
        alt="edit"
        onClick={() => {
          setEdit(false);
          doneEdit(heading);
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
          setEdit(true);
        }}
      />
    );
  }
}
