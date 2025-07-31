export const formatDate = (date: Date): string => {
    console.log("Formatting date:", date);
    
    const year = date.getFullYear();
console.log("Formatted year:", year);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};