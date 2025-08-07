"use client";

import { useState, forwardRef } from "react";
import { CheckCircle2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@/components/Button2";
import ModalHeader from "@/components/ModalHeader";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDashboardContext } from "@/context/DashboardContext";
import ConfirmModal from "@/components/ConfirmationModal";
import PortalWrapper from "@/components/PortalWrapper";

interface InputFieldProps {
  label: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white/80 text-sm">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        className={`bg-transparent border border-white/30 px-3 py-2 text-sm text-white rounded-md outline-none focus:border-white transition-all duration-200`}
      />
    </div>
  );
};

const CustomDateInput = forwardRef<HTMLInputElement, any>(
  ({ value, onClick, placeholder }, ref) => (
    <div className="flex w-full flex-1 flex-col gap-1">
      <label className="text-white/80 text-sm">Date of birth</label>
      <input
        onClick={onClick}
        ref={ref}
        value={value}
        placeholder={placeholder}
        readOnly
        className="bg-transparent w-full border border-white/30 px-3 py-2 text-sm text-white rounded-md outline-none focus:border-white transition-all duration-200 cursor-pointer"
      />
    </div>
  )
);
CustomDateInput.displayName = "CustomDateInput";

export default function EditProfileForm({
  setModal,
}: {
  setModal: (val: string) => void;
}) {
  const { traderData } = useDashboardContext();
  const [form, setForm] = useState({
    firstName: traderData?.firstName || "",
    lastName: traderData?.lastName || "",
    dob: traderData?.dateOfBirth || "",
    phone: traderData?.phoneNumber || "",
    postalCode: traderData?.postalCode || "",
    state: traderData?.state || "",
    address: traderData?.addressLine || "",
  });

  const [dobDate, setDobDate] = useState<Date | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalForm = {
      ...form,
      dob: dobDate ? dobDate.toISOString().split("T")[0] : "",
    };

    setForm(finalForm);
    setOpenConfirmation(true);
  };

  const confirmClicked = () => {
    setOpenConfirmation(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // console.log(form);
  };
  const cancelClicked = () => {
    setOpenConfirmation(false);
  };

  return (
    <div className={`h-full w-full`}>
      <ModalHeader title={"Edit Profile"} onClose={() => setModal("Profile")} />
      <form
        onSubmit={handleSubmit}
        className="absolute inset-0 z-30 flex flex-col gap-4 mt-[62px] max-sm:mt-[78px] px-6 max-h-[calc(100dvh-130px)] w-full overflow-y-auto custom-scrollbar"
      >
        {showSuccess && (
          <div className="absolute w-[90%] top-[30%] left-1/2 z-40 -translate-x-1/2 bg-green-600 text-white py-4 px-4 rounded-md text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            BIO-DATA Success!
          </div>
        )}

        <div className=" flex items-center justify-center mb-4">
          <div className="relative rounded-full w-[64px] h-[64px] overflow-hidden">
            <div className="absolute bg-black/60 inset-0 z-10 flex items-center justify-center cursor-pointer">
              <Icon
                icon="cuida:edit-outline"
                height="20px"
                className=" text-white"
              />
            </div>
            <Image
              src="/images/traderAvatar.png"
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full border border-white/10"
            />
          </div>
        </div>

        <InputField
          label="First Name"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          type="text"
        />
        <InputField
          label="Last Name"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          type="text"
        />

        <div className="w-full">
          <DatePicker
            selected={dobDate}
            onChange={(date) => setDobDate(date)}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            placeholderText="Date of birth"
            wrapperClassName="w-full"
            customInput={<CustomDateInput />}
          />
        </div>

        <InputField
          label="Phone Number"
          value={form.phone}
          onChange={handleChange}
          name="phone"
        />
        <InputField
          label="Postal code"
          value={form.postalCode}
          onChange={handleChange}
          name="postalCode"
        />
        <InputField
          label="State"
          value={form.state}
          onChange={handleChange}
          name="state"
        />
        <InputField
          label="Address"
          value={form.address}
          onChange={handleChange}
          name="address"
        />

        <Button
          type="submit"
          className="w-full bg-[#79DA7E] text-black font-semibold text-sm py-2.5 rounded-md mt-2"
        >
          Save Changes
        </Button>
      </form>
      {openConfirmation && (
        <PortalWrapper>
          <ConfirmModal
            onCancel={cancelClicked}
            onConfirm={confirmClicked}
            title="Confirm"
            message="Are you sure that BIO-DATA is correct?"
          />
        </PortalWrapper>
      )}
    </div>
  );
}
