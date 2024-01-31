export const formatRupiah = (amount: number) => {

    // Convert amount to string and split it by decimal point
    let parts = amount.toString().split(".");
    let rupiah = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Add decimal part if exists
    if (parts.length > 1) {
        rupiah += "." + parts[1];
    }

    return "Rp " + rupiah;
}