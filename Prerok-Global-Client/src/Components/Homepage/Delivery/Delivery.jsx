import deliveryMan from "../../../../public/images/deliveryMan.png";

const Delivery = () => {
  return (
    <div className=" bg-[#fefefe] py-20">
      <div className="flex justify-center items-center h-11/12 my-auto">
        <div className="relative left-20">
          <h2 className="text-3xl text-[#222222] font-bold mb-2">GET THE <span className="text-[#f5ab35]">FASTEST</span>  PRODUCT DELIVERY</h2>
          <p className="text-md text-[#c9b4ac] space-y-2">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam <br />
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam <br /> erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci <br /> tation
            ullamcorper suscipit lobortis nisl ut aliquip.
          </p>
        </div>
        <div>
          <img src={deliveryMan} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
