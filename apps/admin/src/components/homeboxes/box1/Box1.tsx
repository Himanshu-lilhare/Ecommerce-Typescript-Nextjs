import { topDealUsers } from '../../../data.ts'
import './box1.scss'

const Box1 = () => {
  return (
    <div className="boxes-box1">
      <h1>Top Product</h1>
      {
       topDealUsers.map((product,index)=>{
          return <div className='list-item' key={product.id}>
         <div className="product">
          <span className='list-index'>{index + 1}</span>
          <span className='product-name'>{product.username}</span>
         </div>
         <div className="product-price">
       <span className='amount'>{product.amount}</span>
         </div>
          </div>
        })
      }
    </div>
  )
}

export default Box1