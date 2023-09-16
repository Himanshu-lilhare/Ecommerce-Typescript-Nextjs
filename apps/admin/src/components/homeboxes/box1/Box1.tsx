import { ITop3Products } from "../../../types/stats.ts";
import "./box1.scss";

const Box1 = ({ top3Products }: { top3Products: ITop3Products[] }) => {
  return (
    <div className="boxes-box1">
      <h1>Top Product</h1>
      {top3Products?.map((product, index) => {
        return (
          <div className="list-item" key={index}>
            <div className="product">
              <span className="list-index">{index + 1}</span>
              <span className="product-name">{product.product.description}</span>
            </div>
            <div className="product-price">
              <span className="amount">{product.totalSold}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Box1;
