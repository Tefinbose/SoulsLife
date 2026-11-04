"use client";

export default function BookSessionButton({
  serviceTitle = "",
  doctorName = "",
  className = "",
  style = {},
  children,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-booking-modal", {
          detail: { service: serviceTitle, doctor: doctorName },
        })
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`cursor-pointer ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}

