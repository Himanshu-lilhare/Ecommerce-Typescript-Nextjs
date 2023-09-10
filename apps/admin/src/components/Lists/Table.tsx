import "./table.scss"



type TUser = {
  name: string;
  username: string;
  totalProductsBought: number;
  totalAmountSpent: number;
  role: string;
};
type TTable = {
    title:string,
    keys:string[],
    content:TUser[]
}
const Table = (props:TTable) => {
  return (
    <div className="table-wrapper">

      <table className="table">
      <thead>
            <tr>
              {
                props.keys.map((heading:string,index:number)=>{
                  return <th key={index}>
                       {heading.toLocaleUpperCase()}
                  </th>
                })
              }
                
            </tr>
        </thead>

      </table>

    </div>
  )
}

export default Table