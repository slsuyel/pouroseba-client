import { RootState } from "@/redux/features/store";
import { useAppSelector } from "@/redux/features/hooks";

import icon2 from "../../assets/icons/trade.png";
import { useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
import { useState } from "react";
import SearchBox from "../reusable/SearchBox";

const ServiceBox = () => {
  const [noUnion, setNoUnion] = useState(false);
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);

  const navigate = useNavigate();

  const handleService = (service: string) => {
    console.log(unionInfo);

    if (unionInfo?.short_name_e === "pouroseba") {
      message.warning("অনুগ্রহ করে আপনার পৌরসভা  নির্বাচন করুন");
      setNoUnion(true);
      return;
    }
    navigate(`/application/${service}`);
  };

  return (
    <div className="row mx-auto services pt-3">
      <div className="col-md-12">
        <h6 className="defaltColor  position-relative ps-3 py-2 serviceTitle text-white">
          সেবাসমূহ
        </h6>
      </div>
      {sonodInfo.map((service, index) => (
        <button
          onClick={() => handleService(service.bnname)}
          key={index}
          className="col-lg-2 col-md-3 col-sm-4 col-6 my-3 text-center border-0 bg-transparent"
        >
          <div className="serviceBox py-2">
            <div className="serviceLogo">
              <img loading="lazy" src={icon2} alt="" width={60} />
            </div>
            <div className="serviceTitle defaltTextColor mt-2">
              <h6> {service.bnname.slice(0, 20)}</h6>
            </div>
          </div>
        </button>
      ))}

      <div className="col-md-12">
        <h6 className="defaltColor  position-relative ps-3 py-2 serviceTitle text-white">
          ক্যাশলেস পৌরসভা পরিষদ সেবা
        </h6>

        <p></p>
      </div>

      <Modal
        className="w-100 container mx-auto"
        open={noUnion}
        onCancel={() => setNoUnion(false)}
        footer={null}
        animation="fade-down"
      >
        <div style={{ zIndex: 999 }} className=" py-3">
          <h3 className="">পৌরসভা নির্বাচন করুন </h3>
          <SearchBox />
        </div>
      </Modal>
    </div>
  );
};

export default ServiceBox;
