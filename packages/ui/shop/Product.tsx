import { ProductType } from "common";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image"
import Link from "next/link"
export type Props = {
  product: ProductType;
};

const Product = ({ product }: Props) => {
  return (
    <div className="product-div">
 
      <Link href={`/shop/product/${product._id}`}>
      <Image 
     style={{objectFit:"contain",zIndex:'1'}}
 className="product-image"
     width={270} height={270} 
     
    //  sizes="(max-width: 768px) 250px, (max-width: 1200px) 50vw, 33vw"
     src={product.images ?  product.images[0].url : "ckhfujd" } alt="product Image"/>
      </Link>
    
     
    <div className="shop-product-detail-div" style={{width:"100%",padding:'0.6rem'}}>
    <h2  className="product-name">{product.name}</h2>
      <p className="product-price">Price : {product.price}</p>

      <AddToCartButton product={product}/>
    </div>
   
    </div>
  );
};

export default Product;
