"use client"

import type { RootState } from "@/redux/features/store"
import { useAppSelector } from "@/redux/features/hooks"
import icon2 from "../../assets/icons/trade.png"
import { useNavigate } from "react-router-dom"
import { message, Modal } from "antd"
import { useState } from "react"
import SearchBox from "../reusable/SearchBox"
import './service-box.css'

const ServiceBox = () => {
  const [noUnion, setNoUnion] = useState(false)
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList)
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo)

  const navigate = useNavigate()

  const handleService = (service: string) => {
    console.log(unionInfo)

    if (unionInfo?.short_name_e === "pouroseba") {
      message.warning("অনুগ্রহ করে আপনার পৌরসভা  নির্বাচন করুন");
      setNoUnion(true);
      return;
    }
    navigate(`/application/${service}`)
  }

  return (
    <div className="row mx-auto services pt-4">
      <div className="col-md-12 mb-3">
        <h5 className="service-section-title position-relative ps-3 py-2 text-white rounded-2">সেবাসমূহ</h5>
      </div>

      <div className="row g-3">
        {sonodInfo?.map((service, index) => (
          <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
            <button
              onClick={() => handleService(service.bnname)}
              className="service-card w-100 h-100 border-0 bg-transparent"
            >
              <div className="service-card-inner p-3 rounded-3 d-flex flex-column align-items-center justify-content-center h-100">
                <div className="service-icon mb-3 d-flex align-items-center justify-content-center rounded-circle">
                  <img loading="lazy" src={icon2 || "/placeholder.svg"} alt="icon2" width={40} height={40} />
                </div>
                <div className="service-title text-center">
                  <h6 className="mb-0 fw-semibold">{service.bnname}</h6>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="col-md-12 mt-5">
        <h5 className="service-section-title position-relative ps-3 py-2 text-white rounded-2">
        ক্যাশলেস পৌরসভা পরিষদ সেবা
        </h5>

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
  )
}

export default ServiceBox

