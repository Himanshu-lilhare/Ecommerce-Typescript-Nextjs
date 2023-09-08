import { useState } from "react"
import Table from "../../components/table/Table"
import "./users.scss"
import AddModal from "../../components/modal/AddModal"
const Users = () => {
  const [open,setOpen] = useState<boolean>(false)
  return (
    <div>
      <div className="info">
        <h1>Users</h1>
        <button onClick={()=>setOpen(true)}>Add User</button>
      </div>
      <Table/>
      {
        open && <AddModal slug='user' columns={[1,2,3,4]}  setOpen={setOpen}/>
      }
    </div>
  )
}

export default Users