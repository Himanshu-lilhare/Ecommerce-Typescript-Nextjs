import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./addmodal.scss";
import { handleScroll } from "../../helpers/handleScroll";
import {
  serverLinkForAdmin,
  useGetProductsQuery,
} from "../../services/productsApi";
import axios from "axios";
type Props = {
  slug: string;
  columns: number[];
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export type TAddProductform = {
  name: string;
  description: string;
  price: number;
  images: FileList;
  category: "t-shirts" | "jeans";
  seller: string;
  stock: number;
};
const AddModal = (props: Props) => {
  const form = useForm<TAddProductform>();
  const { handleSubmit, formState, register, watch } = form;
  const { errors } = formState;
  const [selectedImagesUrls, setSelectedeImagesUrls] = useState<any>();
  const selectedImages = watch("images");
  const [isLoading, setIsloading] = useState(false);
  const {refetch} = useGetProductsQuery();
  async function submitForm(data: TAddProductform) {
    console.log(data)
    try {
      setIsloading(true);
      const { data: response } = await axios.post(
        `${serverLinkForAdmin}/createProduct`,
        {
          name: data.name,
          description: data.description,
          category: data.category,
          seller: data.seller,
          stock: data.stock,
          images: data.images,
          price: data.price,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response) {
        setIsloading(false);
        props.setOpen(false)
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let urlArray = [];

    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        urlArray.push(URL.createObjectURL(selectedImages[i]));
      }
      setSelectedeImagesUrls(urlArray);
      console.log(selectedImagesUrls);
    }
  }, [selectedImages]);

  return (
    <div className="add-modal">
      <div className="modal">
        <span
          className="close"
          onClick={() => {
            props.setOpen(false);
            handleScroll();
          }}
        >
          x
        </span>
        <h2>Add New {props.slug}</h2>
        <form onSubmit={handleSubmit(submitForm)} noValidate>
          <div className="item">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name is Required",
                minLength: {
                  message: "Min Length should be 3",
                  value: 3,
                },
                maxLength: {
                  value: 40,
                  message: "Max Limit is 40 Characters",
                },
              })}
            />
            <p style={{ color: "red", fontSize: "1rem" }}>
              {errors.name?.message}
            </p>
          </div>

          <div className="item">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  message: "Min Length should be 3",
                  value: 3,
                },
                maxLength: {
                  value: 100,
                  message: "Max Limit is 100 Characters",
                },
              })}
            />
            <p style={{ color: "red", fontSize: "1rem" }}>
              {errors.description?.message}
            </p>
          </div>
          <div className="item">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              placeholder="Price"
              {...register("price", {
                required: "Price is Required",
              })}
            />
            <p style={{ color: "red", fontSize: "1rem" }}>
              {errors.price?.message}
            </p>
          </div>
          <div className="item">
            <label htmlFor="category">Category</label>
            <select
              id="products"
              {...register("category", {
                required: "Category is Required",
              })}
            >
              <option value="*">Select Category</option>
              <option value="t-shirts">T-shirt</option>
              <option value="jeans">Jeans</option>
            </select>
            <p style={{ color: "red", fontSize: "1rem" }}>
              {errors.category?.message}
            </p>
          </div>
          <div className="item">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              min={1}
              placeholder="Stock"
              {...register("stock", {
                required: "Stock is Required",
              })}
            />
            <p style={{ color: "red", fontSize: "1rem" }}>
              {errors.stock?.message}
            </p>
          </div>
          <div className="item">
            <label htmlFor="seller">Seller</label>
            <input
              type="text"
              placeholder="Seller"
              {...register("seller", {
                required: "Seller is Required",
                maxLength: {
                  value: 40,
                  message: "Max Limit is 40 Characters",
                },
              })}
            />
            <p style={{ color: "red", fontSize: "1rem" }}>
              {errors.seller?.message}
            </p>
          </div>
          <div className="item image-item">
            <label htmlFor="images">Product Images</label>
            <input
              type="file"
              placeholder="Choose Product Images"
              multiple
              {...register("images")}
            />

            {selectedImagesUrls && (
              <div className="selected-images-div">
                {selectedImagesUrls.map((imageUrl: string, index: number) => {
                  return (
                    <img
                      src={imageUrl}
                      alt="selectedProductImage"
                      key={index}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <button>{isLoading ? "Creating....." : "Create User"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
