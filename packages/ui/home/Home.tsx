import "./home.css";
import Image from "next/image";
import Link from "next/link";
export const Home = () => {
  return (
    <main className="home ">
      <section className="left-image-section ">
        <Image width={400} height={400} src={"/heroimage.png"} alt="djfdh" />
      </section>
      <section className="right-section ">
        <div className="right-section-content ">
          <h1 className="right-section-head">
            <span style={{ display: "block", color: "#6446e7" }}>FASHION</span>{" "}
            UP <span style={{ color: "#f76b4d" }}>YOUR</span> LOOK
          </h1>

          <Link href={"/shop"} className="right-section-shop-link">
            <span>Shop Now</span>
          </Link>

          <div className="right-section-2-color-divs">
            <div className="first-color-div">
              <p className="first-color-div-para">
                <span style={{boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.681)"}}> LIVE </span> <span style={{color:"white",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.681)"}}>FOR</span>
                <span style={{display:"block",marginLeft:"5rem",marginTop:'1rem',color:"white",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.681)"}}>FASHION</span>
              </p>
            </div>
            <div className="second-color-div">
              <p className="second-color-div-para">
                <span style={{fontWeight:"700",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.681)"}}>HURRY</span>
                <span className="up" style={{display:'block',marginLeft:'2rem'}}>UP</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
