import List from "../../components/Lists/Table"
import AddModal from "../../components/modal/AddModal"
import "./products.scss"
import {useState} from "react"
const Products = () => {
  const [open,setOpen] = useState<boolean>(false)
  return (
    <div>
      <div className="info">
        <h1>Productss</h1>
        <button onClick={()=>setOpen(true)}>Add User</button>
      </div>
       <List title="Product"/>
      {
        open && <AddModal slug='Products' columns={[1,2,3,4]}  setOpen={setOpen}/>
      }
    </div>
  )
}

export default Products