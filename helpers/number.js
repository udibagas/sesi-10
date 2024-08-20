exports.toRupiah = (value) => {
  return value.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
};
