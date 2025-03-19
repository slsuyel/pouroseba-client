/* eslint-disable @typescript-eslint/no-explicit-any */
import { TDistrict, TDivision } from "@/types";
import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const SearchBox: React.FC = () => {
  const [selecteddivisions, setSelectedDivisions] = useState<
    string | undefined
  >(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(
    undefined
  );
  const [divisions, setDivisions] = useState<TDivision[]>([]);
  const [districts, setDistricts] = useState<TDistrict[]>([]);
  const [pourosebas, setPourosebas] = useState<any[]>([]);

  useEffect(() => {
    fetch("/divisions.json")
      .then((res) => res.json())
      .then((data: TDivision[]) => setDivisions(data))
      .catch((error) => console.error("Error fetching divisions data:", error));
  }, []);

  useEffect(() => {
    if (selecteddivisions) {
      fetch("/districts.json")
        .then((response) => response.json())
        .then((data: TDistrict[]) => {
          const filteredDistricts = data.filter(
            (d) => d.division_id === selecteddivisions
          );
          setDistricts(filteredDistricts);
        })
        .catch((error) =>
          console.error("Error fetching districts data:", error)
        );
    } else {
      setDistricts([]); // Clear districts when no division is selected
    }
  }, [selecteddivisions]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch("/pouroseba.json")
        .then((response) => response.json())
        .then((data: any[]) => {
          const filteredUpazilas = data.filter(
            (upazila) => upazila.district_id === selectedDistrict
          );
          setPourosebas(filteredUpazilas);
        })
        .catch((error) =>
          console.error("Error fetching upazilas data:", error)
        );
    } else {
      setPourosebas([]); // Clear pourosebas when no district is selected
    }
  }, [selectedDistrict]);

  const handleDivChange = (value: string) => {
    setSelectedDivisions(value);
    setSelectedDistrict(undefined); // Reset district when division changes
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
  };

  const handlePourosebaChange = (value: string) => {
    const pouroseba = value.replace(/\s+/g, "").toLowerCase();
    console.log(pouroseba);
    window.location.href = `http://${pouroseba}.pouroseba.gov.bd`;
  };

  return (
    <Form>
      <div className="row">
        {/* Division Field */}
        <div className="col-4">
          <Form.Item>
            <Select
              value={selecteddivisions}
              onChange={handleDivChange}
              placeholder="বিভাগ নির্বাচন করুন"
            >
              {divisions?.map((d) => (
                <Option key={d.id} value={d.id}>
                  {d.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* District Field */}
        <div className="col-4">
          <Form.Item>
            <Select
              placeholder="জেলা নির্বাচন করুন"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selecteddivisions}
            >
              {districts?.map((d) => (
                <Option key={d.id} value={d.id}>
                  {d.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Pouroseba Field */}
        <div className="col-4">
          <Form.Item>
            <Select
              placeholder="পৌরসভা নির্বাচন করুন"
              onChange={handlePourosebaChange}
              disabled={!selectedDistrict}
              value={undefined} // Ensure placeholder is shown when no value is selected
            >
              {pourosebas.map((pouroseba) => (
                <Option key={pouroseba.id} value={pouroseba.name}>
                  {pouroseba.bn_name} পৌরসভা
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default SearchBox;
